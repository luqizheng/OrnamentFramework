/**
 * Created by leo on 2015/1/14.
 */
function formatDate(date) {
    if (typeof date == "object") {
        return date.getUTCFullYear() + date.getUTCMonth() + date.getUTCDay() + " " + date.getUTCHours() + ":" + date.getUTCMinutes() + ":" + date.getUTCSeconds();
    }
    return date;
}
exports.formatDate = formatDate;
;
//# sourceMappingURL=dateformat.js.map