/* add by leo*/

    var models = true;
    $(document).ajaxError(function (event, jqxhr, settings, thrownError) {
        if (jqxhr.status == 401) {
            // perform a redirect to the login page since we're no longer authorized
            window.location.replace("/Account/logon");
        }
        if (jqxhr.status == 405) {
            $("#ajaxlogin").modal('show');
        }
    });
    
    //兼容IE的方法
    if (!console) {
        document.console = {
            log: function (str) { }
        }
    }
    //修改Smart Admin的 导航方式，在切换导航的时候，要能够正确调用清理函数
    var clearPageVariable = [];
    $(window).off('hashchange');
    $(window).on('hashchange', function () {
        while (clearPageVariable.length != 0) {
            var method = (clearPageVariable.shift());
            if (typeof method == "function") {
                method();
            }
        }
        checkURL();
    });
    $(document).off('click', 'nav a[href!="#"]');
    $(document).on('click', 'nav a[href!="#"]', function (e) {

            e.preventDefault();
            var $this = $(e.currentTarget);

            // if parent is not active then get hash, or else page is assumed to be loaded
            if (!$this.parent().hasClass("active") && !$this.attr('target')) {

                // update window with hash
                // you could also do here:  thisDevice === "mobile" - and save a little more memory

                if ($.root_.hasClass('mobile-view-activated')) {
                    $.root_.removeClass('hidden-menu');
                    $('html').removeClass("hidden-menu-mobile-lock");
                    window.setTimeout(locto, 150);
                    // it may not need this delay...
                } else {
                    locto();
                }
                // clear DOM reference
                // $this = null;
            }

            function locto() {
                var src, target;
                if (window.location.search) {
                    src = window.location.href;
                    target = window.location.href.replace(window.location.search, '')
                            .replace(window.location.hash, '') + '#' + $this.attr('href');
                    clearup(src, target);
                    window.location.href = target;
                } else {
                    clearup(window.location.hash, $this.attr('href'));
                    window.location.hash = $this.attr('href');
                }
            }

            function clearup(src, target) {
                if (src != target) {
                    while (clearPageVariable.length != 0) {
                        
                        var method = (clearPageVariable.shift());
                        
                        if (typeof method == "function") {
                            method();
                        }
                    }
                }
            }

        });


