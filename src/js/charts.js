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
         BUBBLE_FOOD: "#bubble-food",
        BUBBLE_BEVERAGES: "#bubble-beverages",
        donutHole_chart : {
            DONUT_CONTAINER_ID : "hole_donut"
        },
        macronutrients_chart : {
            MACRONUTRIENTS_PIE_CONTAINER_ID : "macronutrients-pie"
        },
        column_average_chart: {
            COLUMN_CONTAINER_ID : "column-average",
            COLUMN_BAR_ID : "#column-average-progress-bar",
            COLUMN_PERCENTAGE_ID : "#column-average-percentage",
            COLUMN_PERCENTAGE_ITEM_ID : "#column-average-percentage-item",
            COLUMN_AMOUNT_LOW : "#column_average_amount_low",
            COLUMN_AMOUNT_MIDDLE : "#column_average_amount_middle",
            COLUMN_AMOUNT_HIGH : "#column_average_amount_high"
        },
        column_standard_chart: {
            COLUMN_CONTAINER_ID : "column-standard",
            COLUMN_BAR_ID : "#column-standard-progress-bar",
            COLUMN_PERCENTAGE_ID : "#column-standard-percentage",
            COLUMN_PERCENTAGE_ITEM_ID : "#column-standard-percentage-item",
            COLUMN_AMOUNT_LOW : "#column_standard_amount_low",
            COLUMN_AMOUNT_MIDDLE : "#column_standard_amount_middle",
            COLUMN_AMOUNT_HIGH : "#column_standard_amount_high"
        },
        percentage_chart: {
            PERCENTAGE_CONTAINER_ID : "stacked-percentage",
            BAR_PERCENTAGE_ID : "#stacked-bar-percentage"
        },

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
        this._renderBubbleChart();
        //column chart
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
            elID : s.macronutrients_chart.MACRONUTRIENTS_PIE_CONTAINER_ID,
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
            elID : s.donutHole_chart.DONUT_CONTAINER_ID,
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

        this.foodBubble = new Bubble({
            el : s.BUBBLE_FOOD,
            cache: C.cache,
            type : "foods",
            environment : C.environment
        });

        this.beveragesBubble = new Bubble({
            el : s.BUBBLE_BEVERAGES,
            cache: C.cache,
            environment : C.environment,
            type : "beverages"
        });
    };

    Charts.prototype._renderAverageColumnChart = function () {

        var amount_id = {
            low : s.column_average_chart.COLUMN_AMOUNT_LOW,
            middle : s.column_average_chart.COLUMN_AMOUNT_MIDDLE,
            high : s.column_average_chart.COLUMN_AMOUNT_HIGH
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
                "percentileSize" : 5,
                "group" : "02",
                "subgroup" : "0201",
                "food" : null
            },
            process_name : "gift_average_percentile"
        }

        this.Column = new Column({
            elID : s.column_average_chart.COLUMN_CONTAINER_ID,
            columnAmountID : amount_id,
            columnBarID : s.column_average_chart.COLUMN_BAR_ID,
            columnPercentageID : s.column_average_chart.COLUMN_PERCENTAGE_ID,
            columnPercentageItemID : s.column_average_chart.COLUMN_PERCENTAGE_ITEM_ID,
            columnPercentageItemLabel : 'DRIED FRUIT',
            cache: C.cache,
            environment : C.environment,
            uid : "gift_process_total_food_consumption_000042BUR201001",
            selected_items : param.selected_items,
            selected_group : param.selected_group,
            process_name : param.process_name,
            language : s.language
        });
    };

    Charts.prototype._renderStandardColumnChart = function () {

        var amount_id = {
            low : s.column_standard_chart.COLUMN_AMOUNT_LOW,
            middle : s.column_standard_chart.COLUMN_AMOUNT_MIDDLE,
            high : s.column_standard_chart.COLUMN_AMOUNT_HIGH
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
                "percentileSize" : 5,
                "group" : "02",
                "subgroup" : "0201",
                "food" : null
            },
            process_name : "gift_std_percentile"
        }

        this.Column = new Column({
            elID : s.column_standard_chart.COLUMN_CONTAINER_ID,
            columnAmountID : amount_id,
            columnBarID : s.column_standard_chart.COLUMN_BAR_ID,
            columnPercentageID : s.column_standard_chart.COLUMN_PERCENTAGE_ID,
            columnPercentageItemID : s.column_standard_chart.COLUMN_PERCENTAGE_ITEM_ID,
            columnPercentageItemLabel : 'DRIED FRUIT',
            cache: C.cache,
            environment : C.environment,
            uid : "gift_process_total_food_consumption_000042BUR201001",
            selected_items : param.selected_items,
            selected_group : param.selected_group,
            process_name : param.process_name,
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
            elID : s.percentage_chart.PERCENTAGE_CONTAINER_ID,
            barID : s.percentage_chart.BAR_PERCENTAGE_ID,
            cache: C.cache,
            environment : C.environment,
            uid : "gift_process_total_food_consumption_000042BUR201001",
            selected_items : param.selected_items,
            language : s.language
        });
    };

    Charts.prototype._importThirdPartyCss = function () {

        //host override
        require('../css/gift.css');

    };

    return new Charts();
});