/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app'),
    Funnel = require('broccoli-funnel'),
    mergeTrees = require('broccoli-merge-trees'),
    packageNames = require('./config/package-names'),
    AssetRev = require('broccoli-asset-rev');

module.exports = function(defaults) {
    var env = process.env.EMBER_ENV,
        app, packagesApplications, appTree, movedPackagesApplicationTrees;

    app = new EmberApp(defaults, {
        name: 'boot',
        hinting: false,
        fingerprint: {
            // Disabling here since we do it at the end for *all* the assets
            enabled: false,
        },
        babel: {
            // Disables babel optimization in order to remove compile warning for files larger than 100Kbs.
            compact: false
        },
        storeConfigInMeta: true,
        trees: {
            app: mergeTrees([
                new Funnel('app', {
                    files: ['index.html', 'app.js', 'router.js']
                }),
                new Funnel('app/boot'),
            ]),
            styles: new Funnel('app/boot/styles'),
            templates: mergeTrees([
                new Funnel('app/boot/templates')
            ])
        }
    });

    // Import vendor-core files into boot
    // importFilesCore.forEach(function(importFile) {
    //     app.import(importFile);
    // });

    // Import vendor files into the first package
    // importFiles.forEach(function(importFile) {
    //     app.import(importFile);
    // });

    appTree = app.toTree();

    // packages subsequent calls to EmberApp() constructor must come after the main app.toTree
    // in order for the addons to run postprocessTree correctly
    packagesApplications = packageNames.map(function(packageName) {

        // packages export their own js file and are intended to distribute the code-base.
        var package = new EmberApp(defaults, {
                name: packageName,
                // TODO: re-enable jshint once it's actually working fine, for now it just slows down the build
                // when running `ember test` it only jshints boot, but not this one. We'll rely on grunt for now
                hinting: false,
                tests: false,
                deprecationWorkflow: {
                    enabled: env !== 'production'
                },
                fingerprint: {
                    // Disabling here since we do it at the end for *all* the assets
                    enabled: false
                },
                babel: {
                    // Disables babel optimization in order to remove compile warning for files larger than 100Kbs.
                    compact: false
                },
                // lessOptions: {
                //     sourceMap: false,
                //     mergeTrees: {
                //         overwrite: true
                //     }
                // },
                outputPaths: {
                    app: {
                        js: '/assets/' + packageName + '.js'
                    }
                },
                storeConfigInMeta: true,
                trees: {
                    app: mergeTrees([
                        new Funnel('app', { files: ['index.html'] }),
                        new Funnel('app/' + packageName)
                    ]),
                    styles: new Funnel('app/' + packageName + '/styles'),
                    templates: new Funnel('app/' + packageName + '/templates')
                },
                vendorFiles: {
                    // Avoids serving the same dependency twice. List extracted from ember-cli/lib/broccoli/ember-app.js#_initVendorFiles
                    'jquery.js': null,
                    'handlebars.js': null,
                    'ember.js': null,
                    'loader.js': null,

                    // We need to leave this as is.
                    // 'ember-testing.js': null,
                    'app-shims.js': null,
                    'ember-resolver.js': null,
                    'ember-data': null, // TODO: do this for boot as well if you don't use ember-data
                    'ember-cli-app-version': null,
                    'vendor-suffix': null,
                    'ember-load-initializers.js': null,
                    'ember-debug-handlers-polyfill': null,
                    'ember-cli-deprecation-workflow': null,
                    'ic-ajax': null
                },

            });

        // Prevent packages from creating their own Ember Application
        package.contentFor = function(config, match, type) {
            if (type === 'app-boot') {
                return '';
            } else {
                return EmberApp.prototype.contentFor.call(this, config, match, type);
            }
        };
        // Only boot includes addon's code
        package.addonTreesFor = function(type) {
            if (type === 'app') {
                return [];
            } else {
                return EmberApp.prototype.addonTreesFor.call(this, type);
            }
        };
        return package;
    });

    movedPackagesApplicationTrees = packagesApplications.map(function(package) {
        var packageTree = package.toTree();
        return new Funnel(packageTree);
    });

    var allTrees = mergeTrees(movedPackagesApplicationTrees.concat([appTree/*, publicVendorFiles*/]), { overwrite: true });

    if (env === 'production') {
        allTrees = new AssetRev(allTrees);
    }

    return allTrees;
};
