"use strict";

/**
 * @param {Date} before Instance of Date before
 * @param {Date} after Instance of Date after
 * @return {Object} Date difference between before and after.
 */
export function get_date_diff(before, after) {
    if (isNaN(before)) {
        throw "Invalid date before " + after;
    }
    else if (isNaN(after)) {
        throw "Invalid date after " + after;
    }

    var diff = new Date(after.getTime() - before.getTime());

    var month_diff = diff.getMonth() + 1; //getMonth returns 0-11
    var year_diff = diff.getFullYear() - 1970; //getFullYear returns 1970 + year

    if (month_diff === 12) {
        year_diff += 1;
        month_diff = 0;
    }

    return {
        "year": year_diff,
        "month": month_diff
    };

}

/**
 * @return {String} with date difference.
 *
 * @param {Date} date_diff Object with year and month.
 * @param {String} locale String with locale name. E.g. 'en'.
 */
export function get_diff_string(date_diff, locale) {
    var locale_map = {
        "en": {
            "month": "month",
            "months": "months",
            "year": "year",
            "years": "years"
        },
        "ru": {
            "month": "месяц",
            "months": "месяцев",
            "year": "год",
            "years": "года"
        }
    };

    var result = "";
    if (date_diff.year > 0) {
        result += date_diff.year + " ";
        result += date_diff.year > 1 ? locale_map[locale].years : locale_map[locale].years;
    }
    if (date_diff.month > 0) {
        result += " " + date_diff.month + " ";
        result += date_diff.month > 1 ? locale_map[locale].months : locale_map[locale].month;
    }

    return result === "" ? "" : "(" + result + ")";
}

export function toggle_element() {
    for (var i = 0; i < arguments.length; i++) {
        var dom_elem = document.getElementById(arguments[i]);
        if (dom_elem.style.display === "none") {
            dom_elem.style.display = "";
        }
        else {
            dom_elem.style.display = "none";
        }
    }
}

export default {
    get_date_diff: get_date_diff,
    get_diff_string: get_diff_string,
    toggle_element: toggle_element
};
