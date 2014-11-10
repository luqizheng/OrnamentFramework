/* add by leo*/
$(document).ajaxError(function (event, jqxhr, settings, thrownError) {
    if (jqxhr.status == 401) {
        // perform a redirect to the login page since we're no longer authorized
        window.location.replace("/Account/logon");
    }
});