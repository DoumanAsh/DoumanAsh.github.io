//Utilities used during build

const moment = require('moment');

/**
 * @param {Date} before Instance of Date before
 * @param {Date} after Instance of Date after
 * @return {Object} Date difference between before and after.
 */
exports.get_date_diff = (before, after) => {
    if (isNaN(before)) {
        throw "Invalid date before " + after;
    }
    else if (isNaN(after)) {
        throw "Invalid date after " + after;
    }

    var diff = moment.duration(moment(after).diff(moment(before)));

    var month_diff = diff.months() + 1; //returns 0-11
    var year_diff = diff.years();

    if (month_diff === 12) {
        year_diff += 1;
        month_diff = 0;
    }

    return {
        "year": year_diff,
        "month": month_diff
    };

};

/**
 * @return {String} with date difference.
 *
 * @param {Date} date_diff Object with year and month.
 * @param {String} locale String with locale name. E.g. 'en'.
 */
exports.get_date_diff_string = (date_diff, locale) => {
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
        },
        "jp": {
            "month": "月",
            "months": "月",
            "year": "年",
            "years": "年"
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

    return result === "" ? "" : "(" + result.trim() + ")";
};
