define(function () {
    return {
        // get cookie setting
        get: function (cName) {
            if (document.cookie.length > 0) {
                var cStart = document.cookie.indexOf(cName + "=");
                if (cStart != -1) {
                    cStart = cStart + cName.length + 1;
                    var cEnd = document.cookie.indexOf(";", cStart);
                    if (cEnd == -1) cEnd = document.cookie.length;
                    return unescape(document.cookie.substring(cStart, cEnd));
                }
            }
            return "";
        },
        set: function (name, value, seconds) {
            /// <summary>
            /// 
            /// </summary>
            /// <param name="name"></param>
            /// <param name="value"></param>
            /// <param name="seconds">timeout时间</param>
            //设置cookie  
            seconds = seconds || 0;   //seconds有值就直接赋值，没有为0，这个根php不一样。  
            var expires = "";
            if (seconds != 0) {      //设置cookie生存时间  
                var date = new Date();
                date.setTime(date.getTime() + (seconds * 1000));
                expires = "; expires=" + date.toGMTString();
            }
            document.cookie = name + "=" + escape(value) + expires + "; path=/";   //转码并赋值  

        }
    };
})