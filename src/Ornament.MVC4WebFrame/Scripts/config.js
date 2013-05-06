seajs.config({
    plugins: ['shim'],
    alias: {
        jquery: {
            src: "/bundles/jquery.js",
            exports: "jQuery "
        },
        bootstrap: {
            src: "/bundles/bootstrap.js",
            deps: ['jquery'],
            exports: "jQuery "
        },
        easytabs: {
            src: "/scripts/plugins/ui/jquery.easytabs.js",
            deps: ['jquery'],
            exports: "jQuery "
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
        user: {
            src: "/bundles/user.js",
            deps: ["jquery"], exports: "jQuery "
        },

        periodDailog: { exports: "jQuery " },
        preload: ["jquery"]
    }
});

