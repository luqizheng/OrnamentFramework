seajs.config({
    plugins: ['shim'],
    alias: {
        jquery: {
            src: "/bundles/jquery.js",
            exports: "$"
        },
        bootstrap: {
            src: "/bundles/bootstrap.js",
            deps: ['jquery'],
            exports: "$"
        },
        easytabs: {
            src: "/scripts/plugins/ui/jquery.easytabs.js",
            deps: ['jquery'],
            exports: "$"
        },
        unobtrusive: {
            src: "/bundles/unobtrusive.js",
            deps: ['jquery'],
            exports: "$"
        },
        collapsible: {
            src: "/bundles/collapsible.js",
            deps: ['jquery'],
            exports: "$"
        },
        inputmask: {
            src: "/bundles/inputmask#",//make sure it's endwith "#"
            exports: "$"
        },
        uniform: {
            src: "/scripts/plugins/forms/jquery.uniform.min.js",
            deps: ['jquery'],
            exports: "$"
        },
        validation: {
            src: "/bundles/jqueryval.js",
            deps: ["unobtrusive"], exports: "$"
        },
        valid: {
            src: "/scripts/compatibles/valid.js",
            deps: ["validation"]
        },
        
        tagsInput: {
            src: "/scripts/plugins/forms/jquery.tagsinput.min.js",
            deps: ["jquery"],
            exports: "$"
        },
        select2: {
            src: "/scripts/plugins/forms/jquery.select2.min.js",
            deps: ["jquery"],
            exports: "$"
        },
        
        periodDailog: { exports: "$" },
        preload: ["jquery"]
    }
});

