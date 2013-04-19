seajs.use(['easytabs', 'collapsible', 'bootstrap', 'uniform', 'valid'], function (require) {


    $("form.uniform select, :checkbox ,:text ,:reset,:password,:radio").uniform();

    $('.tip').tooltip();
    $('.focustip').tooltip({ 'trigger': 'focus' });

    $('.sidebar-tabs').easytabs({
        animationSpeed: 150,
        collapsible: false,
        tabActiveClass: "active"
    });

    //form for boostratp
    $('form').bootstrapMakeUp().submit(function () {
        $(this).valid(); $(this).bootstrapMakeUp();
    });

    // ==== Action Wizard ===
    $('.actions').easytabs({
        animationSpeed: 300,
        collapsible: false,
        tabActiveClass: "current"
    });

    //===== Collapsible plugin for main nav =====//
    $('.expand').collapsible({
        defaultOpen: 'current,third',
        cookieName: 'navAct',
        cssOpen: 'subOpened',
        cssClose: 'subClosed',
        speed: 200
    });



});