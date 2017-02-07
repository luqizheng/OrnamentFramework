//var avalon = require('avalon');

$("#left-panel nav li a").click(function () {
    $("#left-panel nav li.active")
        .each(function() {
            $(this).removeClass('active');
        });
    
    $(this).parent().addClass("active");
    drawBreadCrumb();
})