const utils = require('./phantom_utils.js');

/**
 * @return {Object} Map of sub_page divs IDs to current display value.
 */
function get_index_display() {
    var result = {};
    const children = document.body.childNodes;
    for (var idx = 0; idx < children.length; idx++) {
        const element = children[idx];
        result[element.id] = getComputedStyle(element, null).display;
    }

    return result;
}

/**
 * @param {String} expected_id ID of elements that should be displayed.
 * @param {Object} index_elements Map of sub_page divs IDs from @ref get_index_display.
 * @return {Boolean} True if expected_id is displayed and everyone else is not. False otherwise.
 */
function index_check_displayed(expected_id, index_elements) {
    var keys = Object.keys(index_elements);

    if (keys.length === 0) return false;

    for (var idx = 0; idx < keys.length; idx += 1) {
        const key = keys[idx];

        if (expected_id === key) {
            if (index_elements[key] === "none") return false;
        }
        else {
            if (index_elements[key] !== "none") return false;
        }
    }

    return true;
}

function index_click_nav(href) {
    var href_regex = new RegExp(href + '$');
    var elements = document.querySelectorAll('nav > div.sub  a');

    for (var idx = 0; idx < elements.length; idx += 1) {
        var element = elements[idx];
        if (element.href.search(href_regex) !== -1) {
            element.click();
            return;
        }
    }
}

var page = utils.create_page();

page.open(utils.public_page('index.html'), function(status) {
    console.log(">Test navigation menu on index page...");
    if (status !== 'success') {
        console.error("Couldn't load page");
        phantom.exit(1);
    }

    var NavSubPages = [
        "",
        "Goodies",
        "Goodies_Rust",
        "Goodies_Tools",
        "Goodies_Stories",
        "Goodies_JS",
        "Waifu",
        "Contact"
    ];

    for (var idx = 0; idx < NavSubPages.length; idx += 1) {
        var SubPageId = NavSubPages[0];
        page.evaluate(index_click_nav, '#' + SubPageId);
        var sub_pages = page.evaluate(get_index_display);
        utils.fail_if(!index_check_displayed(SubPageId, sub_pages), "Div wiht id='" + SubPageId + "' isn't displayed!");
    }

    phantom.exit();
});
