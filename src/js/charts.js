define([
    "jquery",
    "loglevel",
    "../config/config",
    "./charts/bubble",
    "./charts/donut",
    "./charts/donutHole",
    "./charts/column"
], function ($, log, C, Bubble, Donut, DonutHole, Column) {
    "use strict";

    var s = {
        BUBBLE: "#bubble",
        COLUMN_CONTAINER_ID : "column",
        BAR_ID : "#columns-progress-bar",
        PERCENTAGE_ID : "#percentage",
        AMOUNT_LOW : "#amount_low",
        AMOUNT_MIDDLE : "#amount_middle",
        AMOUNT_HIGH : "#amount_high",
        DONUT_CONTAINER_ID : "donut",
        height : 300,
        width: 300,
        language : "EN"
    };

    function Charts() {

        console.clear();

        log.setLevel("trace");

        this._importThirdPartyCss();

        this._renderCharts();

    }

    Charts.prototype._renderCharts = function () {

        //donut chart
        //this._renderDonutChart();
        //bubble chart
        //this._renderBubbleChart();
        //column chart
        this._renderColumnChart();
        //donut hole
        //this._renderDonutHoleChart();


    };

    Charts.prototype._renderDonutChart = function () {

        this.Donut = new Donut({
            elID : s.DONUT_CONTAINER_ID,
            cache: C.cache,
            environment : C.environment,
            uid : "gift_process_total_weighted_food_consumption_000042BUR201001",
            selected_items : [ "IRON" ],
            height : s.height,
            width : s.width,
            language : s.language
        });
    };

    Charts.prototype._renderDonutHoleChart = function () {

        this.DonutHole = new DonutHole({
            elID : s.DONUT_CONTAINER_ID,
            cache: C.cache,
            environment : C.environment,
            uid : "gift_process_total_weighted_food_consumption_000042BUR201001",
            selected_items : [ "ENERGY" ],
            height : s.height,
            width : s.width,
            language : s.language
        });
    };

    Charts.prototype._renderBubbleChart = function () {

        this.bubble = new Bubble({
            el : s.BUBBLE,
            cache: C.cache,
            environment : C.environment
            // pass other params here (e.g. filtering params)
        });
    };

    Charts.prototype._renderColumnChart = function () {

        // this.selected_group = opts.selected_group;
        // this.selected_subgroup = opts.selected_subgroup;
        // this.selected_food = opts.selected_food;

        var amount_id = {
            low : s.AMOUNT_LOW,
            middle : s.AMOUNT_MIDDLE,
            high : s.AMOUNT_HIGH
        }

        var param = {
            selected_items :{
                "item": "FOOD_AMOUNT_PROC",
                "gender": "2",
                "special_condition": ["1"],
                "age_year": {
                    "from": 10.5,
                    "to": 67
                }
            },
            selected_group :{
                "codes": [
                    {
                        "uid": "GIFT_FoodGroups",
                        "codes": ["01"]
                    }
                ]
            }
        }

        this.Column = new Column({
            elID : s.COLUMN_CONTAINER_ID,
            amountID : amount_id,
            barID : s.BAR_ID,
            percentageID : s.PERCENTAGE_ID,
            cache: C.cache,
            environment : C.environment,
            uid : "gift_process_total_food_consumption_000042BUR201001",
            selected_items : param.selected_items,
            selected_group : param.selected_group,
            language : s.language
        });
        //this.renderColumns();
    };

    // Charts.prototype.renderColumns = function () {
    //
    //     $('#columns').css({
    //         height: 400,
    //         width: 400
    //     }).highcharts({
    //
    //         chart: {
    //             type: 'column',
    //             margin: [10, 10, 10, 10],
    //             spacingTop: 0,
    //             spacingBottom: 0,
    //             spacingLeft: 0,
    //             spacingRight: 0
    //         },
    //
    //         //hide xAxis
    //         xAxis: {
    //             categories: ['Cereals', 'Vegetables', 'Pulses'],
    //             lineWidth: 0,
    //             minorGridLineWidth: 0,
    //             lineColor: 'transparent',
    //             gridLineColor: 'transparent',
    //             labels: {
    //                 enabled: false
    //             },
    //             minorTickLength: 0,
    //             tickLength: 0
    //         },
    //
    //         //hide yAxis
    //         yAxis: {
    //             gridLineWidth: 0,
    //             minorGridLineWidth: 0,
    //             min: 0,
    //             max: 100,
    //             lineWidth: 0,
    //             lineColor: 'transparent',
    //
    //             title: {
    //                 enabled: false
    //             },
    //
    //             labels: {
    //                 enabled: false
    //             },
    //             minorTickLength: 0,
    //             tickLength: 0
    //         },
    //
    //
    //         //remove title and subtitle
    //         title: {
    //             text: '',
    //             style: {
    //                 display: 'none'
    //             }
    //         },
    //         subtitle: {
    //             text: '',
    //             style: {
    //                 display: 'none'
    //             }
    //         },
    //
    //         //remove credits
    //         credits: {
    //             enabled: false
    //         },
    //
    //         //hide legend
    //         legend: {
    //             enabled: false
    //         },
    //
    //         tooltip: {
    //             formatter: function () {
    //                 return '<b>' + this.y + '%</b>';
    //             }
    //         },
    //
    //
    //         series: [{
    //             data: [5, 90, 5],
    //             pointWidth: 80,
    //             color: {
    //                 pattern: '../img/columns/pattern.svg',
    //                 width: 20,
    //                 height: 20
    //             }
    //         }]
    //
    //     });
    //
    //     //Progress bar
    //     $('#columns-progress-bar').css({
    //         width: '70%'
    //     });
    //
    // }


    Charts.prototype._importThirdPartyCss = function () {

        //Bootstrap
        require('bootstrap/dist/css/bootstrap.css');

        //Bootstrap
        require('highcharts/css/highcharts.css');

        //host override
        require('../css/gift.css');

    };

    return new Charts();
});