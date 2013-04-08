seajs.use(['easytabs', 'collapsible', 'bootstrap', 'uniform'], function () {
    $("select, input").uniform();
    $('.tip').tooltip();
    $('.focustip').tooltip({ 'trigger': 'focus' });
   
        $('.sidebar-tabs').easytabs({
            animationSpeed: 150,
            collapsible: false,
            tabActiveClass: "active"
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