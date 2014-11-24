/* add by leo*/
$(document).ajaxError(function (event, jqxhr, settings, thrownError) {
    if (jqxhr.status == 401) {
        // perform a redirect to the login page since we're no longer authorized
        window.location.replace("/Account/logon");
    }
    if (jqxhr.status == 405) {
        
    }
});

var clearPageVariable = [];
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
                method();
            }
        }
    }

});

//Chat's

    require(['/Scripts/avalons/chat/chat.js'], function() {
        avalon.define("chatList", function(vm) {
            vm.$chatOpts = {
                host: 'http://location:3000'
            };
        });
        avalon.scan();
    });


