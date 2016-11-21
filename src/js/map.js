define(['jquery','underscore','loglevel','handlebars', 
    '../../config/config',
    '../../config/consumption',
    '../html/consumption/map.hbs',
    //'i18n!nls/consumption',
    '../json/consuption/gaul0_centroids.json',
    'leaflet',
    '../lib/leaflet.markercluster-src',
    'fenix-ui-map',

], function ($, _, log, Handlebars,
    C,
    ConsC,
    template,
    //i18nLabels,
    gaul0Centroids,
    L,
    LeafletMarkecluster,
    FenixMap
) {
    "use strict";

    var LANG = requirejs.s.contexts._.config.i18n.locale.toUpperCase();

    var s = {
            READY_CONTAINER: "#ready-container",
            MAP_CONTAINER: "#consumption_map",
            MAP_LEGEND: "#consumption_map_legend"
        },
        confidentialityCodelistUrl = C.SERVICE_BASE_ADDRESS+'/msd/resources/uid/GIFT_STATUS',
        confidentialityDataUrl = C.SERVICE_BASE_ADDRESS+'/msd/resources/find?full=true',
        confidentialityDataPayload = {
            "dsd.contextSystem": {
                "enumeration": ["gift"]
            },
            "meContent.resourceRepresentationType": {
                "enumeration": ["dataset"]
            }
        };

    function Map() {

        console.clear();

        log.setLevel("trace");

        this._importThirdPartyCss();

        this._initVariables();

        this._attach();

    }

    Map.prototype._initVariables = function () {



    };

    Map.prototype._attach = function () {


    };

    Map.prototype._renderMap = function () {

       console.log("Render map here")

    };

    Map.prototype._importThirdPartyCss = function () {

        //Bootstrap
        require('bootstrap/dist/css/bootstrap.css');

        //host override
        require('../css/gift.css');
        require('../lib/MarkerCluster.Default.css');
        require('../lib/MarkerCluster.css');

    };

    return new Map();
});