//Sample: String.format("I am {0}, you are {1}","a","b");
String.format = function () {
    if (arguments.length == 0)
        return null;

    var str = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
        var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
        str = str.replace(re, arguments[i]);
    }
    return str;
};


//string To Date
String.toDate = function (fmt, str) {
    var patten = /(y|M|d|h|m|s)/g;
    var result = { y: 0, M: 0, d: 0, h: 0, m: 0, s: 0 };
    var r = patten.exec(fmt);
    var currentChar = r[0];
    while (r != null) {
        var a = str.substr(r.index, 1);
        if (currentChar != r[0]) {
            currentChar = r[0];
        }
        result[currentChar] = (result[currentChar] * 10) + parseInt(a);
        r = patten.exec(fmt);
    }
    return new Date(result.y, result.M, result.d, result.h, result.m, result.s);
};