/*global require*/

require([
    './submodules/fenix-ui-common/js/Compiler',
    './submodules/fenix-ui-common/js/paths',
    './submodules/fenix-ui-menu/js/paths',
    './submodules/fenix-ui-filter/src/js/paths',
    './submodules/fenix-ui-analysis/js/paths',
    './submodules/fenix-ui-catalog/js/paths',
    './submodules/fenix-ui-DataEditor/js/paths',
    './submodules/fenix-ui-DSDEditor/js/paths',
    './submodules/fenix-ui-metadata-editor/js/paths',
    './submodules/fenix-ui-metadata-viewer/src/js/paths',
    './submodules/fenix-ui-map-creator/src/js/paths',
    './submodules/fenix-ui-chart-creator/src/js/paths',
    './submodules/fenix-ui-table-creator/src/js/paths',
    './submodules/fenix-ui-reports/src/js/paths',
    './submodules/fenix-ui-dashboard/src/js/paths'

], function (Compiler, Common, Menu,Filter, Analysis, Catalog,
             DataEditor, DSDEditor,MetadataEditor, MetadataViewer,
             MapCreator,ChartCreator, TableCreator, FenixReport, Dashboard) {

    'use strict';

    var submodules_path = '../../submodules/';

    var commonConfig = Common;
    commonConfig.baseUrl = submodules_path + '/fenix-ui-common/js';

    var menuConfig = Menu;
    menuConfig.baseUrl = submodules_path + '/fenix-ui-menu/js';

    var analysisConfig = Analysis;
    analysisConfig.baseUrl = submodules_path +'fenix-ui-analysis/js/';

    var catalogConfig = Catalog;
    catalogConfig.baseUrl = submodules_path +'fenix-ui-catalog/js/';

    var dataEditorConfig = DataEditor;
    dataEditorConfig.baseUrl = submodules_path +'fenix-ui-DataEditor/js/';

    var dsdEditorConfig = DSDEditor;
    dsdEditorConfig.baseUrl = submodules_path +'fenix-ui-DSDEditor/js/';

    var metadataEditorConfig = MetadataEditor;
    metadataEditorConfig.baseUrl = submodules_path +'fenix-ui-metadata-editor/js/';

    var metadataViewerConfig = MetadataViewer;
    metadataViewerConfig.baseUrl= submodules_path +'fenix-ui-metadata-viewer/src/js/';

    var mapCreatorConfig = MapCreator;
    mapCreatorConfig.baseUrl= submodules_path +'fenix-ui-map-creator/src/js/';

    var chartCreatorConfig = ChartCreator;
    chartCreatorConfig.baseUrl= submodules_path +'fenix-ui-chart-creator/src/js/';

    var tableCreatorConfig = TableCreator;
    tableCreatorConfig.baseUrl= submodules_path +'fenix-ui-table-creator/src/js/';

    var fenixReportConfig = FenixReport;
    fenixReportConfig.baseUrl= submodules_path +'fenix-ui-reports/src/js/';

    var dashboardConfig = Dashboard;
    dashboardConfig.baseUrl= submodules_path +'fenix-ui-dashboard/src/js/';

    var filterConfig = Filter;
    filterConfig.baseUrl =  submodules_path +'fenix-ui-filter/';

    Compiler.resolve([commonConfig, menuConfig, analysisConfig,catalogConfig,
            dataEditorConfig,dsdEditorConfig,metadataEditorConfig,metadataViewerConfig,
            mapCreatorConfig,chartCreatorConfig,tableCreatorConfig,fenixReportConfig,filterConfig, dashboardConfig],
        {
            placeholders: {"FENIX_CDN": "//fenixrepo.fao.org/cdn"},

            config: {

                //Set the config for the i18n
                i18n: {
                    locale: 'en'
                },

                // The path where your JavaScripts are located
                baseUrl: './src/js',

                // Specify the paths of vendor libraries
                paths: {
                    // utility libraries
                    bootstrap:  "{FENIX_CDN}/js/bootstrap/3.2/js/bootstrap.min",
                    underscore: "{FENIX_CDN}/js/underscore/1.7.0/underscore.min",
                    lodash:     "{FENIX_CDN}/js/lodash/4.11.2/lodash.core",
                    backbone:   "{FENIX_CDN}/js/backbone/1.1.2/backbone.min",
                    handlebars: "{FENIX_CDN}/js/handlebars/2.0.0/handlebars",
                    chaplin:    "{FENIX_CDN}/js/chaplin/1.0.1/chaplin.min",
                    domReady:   "{FENIX_CDN}/js/requirejs/plugins/domready/2.0.1/domReady",
                    i18n:       "{FENIX_CDN}/js/requirejs/plugins/i18n/2.0.4/i18n",
                    amplify:    "{FENIX_CDN}/js/amplify/1.1.2/amplify.min",
                    text:       "{FENIX_CDN}/js/requirejs/plugins/text/2.0.12/text",
                    rsvp:       "{FENIX_CDN}/js/rsvp/3.0.17/rsvp",
                    swiper:     "{FENIX_CDN}/js/swiper/3.0.7/dist/js/swiper.min",
                    jstree:     "{FENIX_CDN}/js/jstree/3.0.8/dist/jstree",
                    loglevel:   "{FENIX_CDN}/js/loglevel/1.4.0/loglevel",
                    jQAllRangeSliders: "{FENIX_CDN}/js/jquery.rangeslider/5.7.0/jQRangeSlider-min",

                    // conf path
                    nls: "../../i18n",
                    config: "../../config",
                    json: "../../json",

                    // map libraries
                    leaflet:              "{FENIX_CDN}/js/leaflet/0.7.5/leaflet",
                    leaflet_markecluster: "{FENIX_CDN}/js/leaflet/plugins/leaflet.markecluster/branch-leaflet-0.7/leaflet.markercluster-src",
                    geojson_selector:     "{FENIX_CDN}/js/leaflet/plugins/leaflet-geojson-selector/0.2.2-fixed-event/dist/leaflet-geojson-selector.src",
                    worldCountries:        "../../json/statistics/world-countries.json",
                    gaul0Centroids:        "../../json/statistics/gaul0_centroids.geojson",

                    // ===============================
                    /* Override: */
                    // Authentication
                    'fx-common/config/auth_users' : '../../config/auth_users.json',
                    'packery': '{FENIX_CDN}/js/packery/1.4.3/dist/packery.pkgd.min',
                    'fx-ds/config/config': '../../config/submodules/fx-dashboard/config',

                    // Catalog
                    'fx-cat-br/config/config': '../../config/submodules/fx-catalog/config',
                    "fx-cat-br/config/fx-catalog-blank-filter": '../../config/submodules/fx-catalog/blankfilter',
                    "fx-cat-br/config/fx-catalog-filter-mapping" :  '../../config/submodules/fx-catalog/filter-mapping',

                    'fx-cat-br/widgets/bridge/Fx-catalog-bridge' : "./utils/GiftWdsCatalogBridge",
                    'fx-cat-br/config/fx-catalog-collapsible-menu-config' : '../../config/submodules/fx-catalog/menu-config',
                    'fx-cat-br/config/fx-catalog-modular-form-config' : '../../config/submodules/fx-catalog/form-config',

                    // Analysis
                    'fx-ana/config/services' : '../../config/submodules/fx-analysis/Config',

                    // FX-Report
                    "fx-report/config/md-export/config" : '../../config/submodules/fx-report/md-export/config',


                    'fx-mdv/config/config': '../../config/submodules/fx-md-viewer/config',

                    'fx-filter/config/config':'../../config/submodules/fx-filter/config',
                    
                    'fx-bridge': '../../submodules/fenix-ui-common/js/bridge',

                    'fx-ds/start': './plugins/dashboard/dashboard_start',

                    //'fenix-ui-map': '{FENIX_CDN}/fenix/fenix-ui-map/0.2.0/dist/fenix-ui-map.src',
                    //'fenix-ui-map-config': '{FENIX_CDN}/fenix/fenix-ui-map/0.2.0/dist/fenix-ui-map-config'
                    'fenix-ui-map': '../../submodules/fenix-ui-map/dist/fenix-ui-map.src',
                    'fenix-ui-map-config': '../../submodules/fenix-ui-map/dist/fenix-ui-map-config'                    
                },

                // Underscore and Backbone are not AMD-capable per default,
                // so we need to use the AMD wrapping of RequireJS
                shim: {
                    bootstrap: {
                        deps: ["jquery"]
                    },
                    underscore: {
                        exports: '_'
                    },
                    lodash: {
                        exports: '__'
                    },
                    backbone: {
                        deps: ['underscore', 'jquery'],
                        exports: 'Backbone'
                    },
                    handlebars: {
                        exports: 'Handlebars'
                    },

                    jQAllRangeSliders: ['jquery', 'jqueryui'],

                    geojson_selector: ['leaflet'],
                    leaflet_markecluster: ['leaflet']
                }
                // For easier development, disable browser caching
                // Of course, this should be removed in a production environment
                //, urlArgs: 'bust=' +  (new Date()).getTime()
            }
        });

    // Bootstrap the application
    require([
        'loglevel',
        'application',
        'routes',
        'config/config',
        'domReady!'
    ], function (log,Application, routes, C) {
        log.setLevel('trace');

        var app = new Application({
            routes: routes,
            controllerSuffix: C.CHAPLINJS_CONTROLLER_SUFFIX,
            root: C.CHAPLINJS_PROJECT_ROOT,
            pushState: C.CHAPLINJS_PUSH_STATE,
            scrollTo: C.CHAPLINJS_SCROLL_TO
        });
    });
});