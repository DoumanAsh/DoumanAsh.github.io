const webpage = require('webpage');
const fs = require('fs');

const utils = require('./phantom_utils.js');

const waifu = JSON.parse(fs.read('waifu.json'));

var page = utils.create_page();

function get_gallery_divs() {
    var elements = document.querySelectorAll('div.sub_page')

    var result = [];

    for (var idx = 0; idx < elements.length; idx += 1) {
        var element = elements[idx]
        result.push({
            id: element.id,
            href_left: '#' + element.children[0].href.replace(/.*#/, ''),
            href_right: '#' + element.children[2].href.replace(/.*#/, ''),
            image: getComputedStyle(element.children[1].children[0])['background-image'].slice(4, -1).replace('https', 'http'),
            description: {
                title: element.children[1].children[1].children[0].innerHTML.replace(/&amp;/g, '&'),
                details: element.children[1].children[1].children[1].innerHTML
            }
        })
    }

    return result;
}

page.open(utils.public_page('waifu.html'), function(status) {
    console.log(">Test waifu page content...");
    if (status !== 'success') {
        console.log("Couldn't load page");
        phantom.exit(1)
    }

    var gallery = page.evaluate(get_gallery_divs);

    utils.fail_if(gallery.length !== waifu.data.images.length, "Incorrect number of images in gallery")

    //Move last(default) element at the beginning.
    gallery.unshift(gallery.pop());

    var max_idx = gallery.length;

    for (var idx = 0; idx < max_idx; idx += 1) {
        var waifu_element = waifu.data.images[idx];
        var gallery_element = gallery[idx]
        //Default element(first in gallery array) has last possible ID
        var expected_id = idx ? idx : gallery.length;

        var expected_href_left = '#' + (idx ? idx - 1 : '');
        //Next link for last element is on itself.
        var expected_href_right = '#' + (idx + (idx < (max_idx-1) ? 1 : 0));


        utils.fail_if(gallery_element.id != expected_id,
                      "Expected id='" + expected_id + "' but got element with id='" + gallery_element.id + "'");
        utils.fail_if(waifu_element.link !== gallery_element.image,
                      "Unexpected image '" + gallery_element.image + "' instead of '" + waifu_element.link + "'");
        utils.fail_if(waifu_element.title !== gallery_element.description.title,
                      "Expected title='" + gallery_element.description.title + "' but got title='" + waifu_element.title + "'");

        if (!gallery_element.description.details) gallery_element.description.details = null;
        else gallery_element.description.details = gallery_element.description.details.replace(/&amp;/g, '&')

        utils.fail_if(waifu_element.description != gallery_element.description.details,
                      "Expected details='" + gallery_element.description.details + "' but got description='" + waifu_element.description + "'");

        utils.fail_if(expected_href_left !== gallery_element.href_left,
                      "Expected left href='" + expected_href_left + "' but got href='" + gallery_element.href_left + "'");
        utils.fail_if(expected_href_right !== gallery_element.href_right,
                      "Expected right href='" + expected_href_right + "' but got href='" + gallery_element.href_right + "'");
    }

    phantom.exit()
});
