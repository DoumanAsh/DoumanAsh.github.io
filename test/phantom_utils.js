const fs = require('fs');
const webpage = require('webpage');

/**
 * @param {Strng} name Name of HTML file.
 * @return {String} Absolute path HTML file.
 */
function public_page(name) {
    return 'file:///' + fs.absolute('public/' + name)
}

function fail_if(result, msg) {
    if (result) {
        console.log(msg);
        phantom.exit(1);
    }
}

function create_page() {
    var page = webpage.create();
    page.viewportSize = {
        width: 1920,
        height: 1080
    }

    page.onError = function(msg, trace) {
        console.log(msg);
        phantom.exit(1);
    };

    page.onConsoleMessage = function(msg) {
        console.log(msg);
    };

    return page;
}

module.exports.public_page = public_page;
module.exports.fail_if = fail_if;
module.exports.create_page = create_page;
