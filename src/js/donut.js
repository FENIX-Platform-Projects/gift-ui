define([
    "jquery",
    "loglevel",
    "highcharts",
    "../js/charts/nutrition/donut_new"
], function ($, log, Highcharts, Donut) {
    "use strict";

    var chart,
        config = {
            chart: {
                type: 'pie',
                events: {
                    drilldown: function (e) {

                        console.log("drilldown event")

                        if (!e.seriesOptions) {

                            var chart = this,
                                drilldowns = {
                                    'Animals': {
                                        name: 'Animals',
                                        data: [
                                            ['Cows', 2],
                                            ['Sheep', 3]
                                        ]
                                    },
                                    'Fruits': {
                                        name: 'Fruits',
                                        data: [
                                            ['Apples', 5],
                                            ['Oranges', 7],
                                            ['Bananas', 2]
                                        ]
                                    },
                                    'Cars': {
                                        name: 'Cars',
                                        data: [
                                            ['Toyota', 1],
                                            ['Volkswagen', 2],
                                            ['Opel', 5]
                                        ]
                                    }
                                },
                                series = drilldowns[e.point.name];

                            // Show the loading label
                            chart.showLoading('Simulating Ajax ...');

                            setTimeout(function () {
                                chart.hideLoading();
                                chart.addSeriesAsDrilldown(e.point, series);
                            }, 1000);
                        }

                    }
                }
            },

            xAxis: {
                type: 'category'
            },

            legend: {
                enabled: false
            },

            plotOptions: {
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true
                    }
                }
            },

            series: [{
                name: 'Things',
                colorByPoint: true,
                data: [{
                    name: 'Animals',
                    y: 5,
                    drilldown: true
                }, {
                    name: 'Fruits',
                    y: 2,
                    drilldown: true
                }, {
                    name: 'Cars',
                    y: 4,
                    drilldown: true
                }]
            }],

            drilldown: {
                series: []
            }
        };

    function Charts() {

        console.clear();

        if(!require.cache[require.resolveWeak("highcharts/modules/drilldown")]) {
            require('highcharts/modules/drilldown')(Highcharts);
        }
        if(!require.cache[require.resolveWeak("highcharts-no-data-to-display")]) {
            require('highcharts-no-data-to-display')(Highcharts);
        }

        log.setLevel("trace");

        this._importThirdPartyCss();

        this._renderOtherCharts();

        this._bindEventListeners();
    }

    Charts.prototype._bindEventListeners = function() {

        var self= this;

       $("#remove").on("click", function() {
           chart.destroy();
       });

        $("#add").on("click", function() {
            self._renderChart();
        })
    };

    Charts.prototype._renderChart = function() {

        chart = new Donut({
            el : "#container",
            uid : "000042BUR201001",
            parameters : {
                gender: "2",
                special_condition: ["2"],
                age_year: {
                    from: 10.5,
                    to: 67
                }
            }
        });

        Highcharts.chart('other-3', config);


    };

    Charts.prototype._renderOtherCharts = function() {

        // Create the chart
        Highcharts.chart('other-1', config);

        Highcharts.chart('other-2', config);


    };

    Charts.prototype._importThirdPartyCss = function () {

        //SANDBOXED BOOTSTRAP
        require("../css/sandboxed-bootstrap.css");
        
        //host override
        require('../css/gift.css');

    };

    return new Charts();
});