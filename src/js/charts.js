define([
    "jquery",
    "loglevel",
    "../../config/config",
    "./charts/bubble"
], function ($, log, C, Bubble) {
    "use strict";

    var s = {
        BUBBLE: "#bubble"
    };

    function Charts() {

        console.clear();

        log.setLevel("trace");

        this._importThirdPartyCss();

        this._renderCharts();

    }

    Charts.prototype._renderCharts = function () {

        //bubble chart
        this._renderBubbleChart();

    };

    Charts.prototype._renderBubbleChart = function () {

        this.bubble = new Bubble({
            el : s.BUBBLE,
            cache: C.cache,
            environment : C.environment
            // pass other params here (e.g. filtering params)
        });

    };

    Charts.prototype._importThirdPartyCss = function () {

        //Bootstrap
        require('bootstrap/dist/css/bootstrap.css');

        //host override
        require('../css/gift.css');

    };

    return new Charts();
});