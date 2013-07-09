seajs.config({
    plugins: ['shim'],
    alias: {
        jquery: {
            src: "/bundles/jquery.js",
            exports: "jQuery "
        },
        jqueryui: {
            src: "/bundles/jqueryui.js",
            deps: ['jquery'],
            exports: "jQuery"
        },
        bootstrap: {
            src: "/bundles/bootstrap.js",
            deps: ['jquery'],
            exports: "jQuery "
        },
        easytabs: {
            src: "/scripts/plugins/ui/jquery.easytabs.js",
            deps: ['jquery'],
            exports: "jQuery"
        },
        elfinder: {
            src: "/Scripts/plugins/ui/jquery.elfinder.js",
            deps:["jqueryui"]
        },
        form: {
            src: "/scripts/plugins/forms/jquery.form.js",
            deps: ['jquery'],
            exports: "jQuery"
        },
        tmpl: {
            src: "/bundles/tmpl.js",
            deps: ['jquery'],
            exports: "jQuery "
        },
        unobtrusive: {
            src: "/bundles/unobtrusive.js",
            deps: ['jquery'],
            exports: "jQuery "
        },

        collapsible: {
            src: "/bundles/collapsible.js",
            deps: ['jquery'],
            exports: "jQuery "
        },
        inputmask: {
            src: "/bundles/inputmask#",//make sure it's endwith "#"
            exports: "jQuery "
        },
        uniform: {
            src: "/scripts/plugins/forms/jquery.uniform.min.js",
            deps: ['jquery'],
            exports: "jQuery "
        },
        validation: {
            src: "/bundles/jqueryval.js",
            deps: ["unobtrusive"], exports: "jQuery "
        },
        valid: {
            src: "/scripts/compatibles/valid.js",
            deps: ["validation"]
        },

        tagsInput: {
            src: "/scripts/plugins/forms/jquery.tagsinput.min.js",
            deps: ["jquery"],
            exports: "jQuery "
        },
        select2: {
            src: "/scripts/plugins/forms/jquery.select2.min.js",
            deps: ["jquery"],
            exports: "jQuery "
        },
        endlessScroll: {
            src: "/Scripts/jquery.endless-scroll.js",
            deps: ["jquery"], exports: "jQuery"
        },
        datePicker: {
            src: "/bundles/datePicker.js",
            deps: ["bootstrap"], exports: "jQuery"
        },

        util: {
            src: "/Scripts/Utils.js",
            deps: ["jquery"]
        },
        wizard: {
            src: "/Scripts/plugins/forms/jquery.form.wizard.js",
            deps: ['jqueryui', 'form'],
            exports: 'jQuery'
        },
        periodDailog: { exports: "jQuery " },
        preload: ["jquery"]
    }
});

