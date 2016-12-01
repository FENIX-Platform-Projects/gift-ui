define([
    "jquery",
    "loglevel",
    "../config/config",
    "./charts/bubble",
    "./charts/donut",
    "./charts/donutHole",
    "./charts/column",
    "./charts/percentage",
    "./charts/pieMacronutrients"
], function ($, log, C, Bubble, Donut, DonutHole, Column, Percentage, PieMacronutrients) {
    "use strict";

    var s = {
        BUBBLE: "#bubble",
        COLUMN_CONTAINER_ID : "column",
        PERCENTAGE_CONTAINER_ID : "column-percentage",
        BAR_ID : "#columns-progress-bar",
        BAR_PERCENTAGE_ID : "#bar-percentage",
        AMOUNT_LOW : "#amount_low",
        AMOUNT_MIDDLE : "#amount_middle",
        AMOUNT_HIGH : "#amount_high",
        DONUT_CONTAINER_ID : "donut",
        MACRONUTRIENTS_PIE_CONTAINER_ID : "macronutrients-pie",
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
        //percentage chart
        //this._renderPercentageChart();
        //macronutrients chart
        //this._renderMacronutrientsChart();

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

    Charts.prototype._renderMacronutrientsChart = function () {

        var param = {
            selected_items : {
                    "item": null,
                    "gender": "2",
                    "special_condition": ["1"],
                    "age_year": {
                        "from": 10.5,
                            "to": 67
                    }
            }
        }

        this.PieMacronutrients = new PieMacronutrients({
            elID : s.MACRONUTRIENTS_PIE_CONTAINER_ID,
            cache: C.cache,
            environment : C.environment,
            uid : "gift_process_total_food_consumption_000042BUR201001",
            selected_items : param.selected_items,
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
    };

    Charts.prototype._renderPercentageChart = function () {

        var param = {
            selected_items : {
                "item": "VITA",
                "gender": "2",
                "special_condition": ["1"],
                "age_year": {
                    "from": 10.5,
                    "to": 67
                }
            }
        }

        this.Percentage = new Percentage({
            elID : s.PERCENTAGE_CONTAINER_ID,
            barID : s.BAR_PERCENTAGE_ID,
            cache: C.cache,
            environment : C.environment,
            uid : "gift_process_total_food_consumption_000042BUR201001",
            selected_items : param.selected_items,
            language : s.language
        });
    };

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