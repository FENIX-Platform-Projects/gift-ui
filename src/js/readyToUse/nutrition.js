define([
    "jquery",
    "loglevel",
    "underscore",
    "../../html/readyToUse/nutrition.hbs",
    "../../nls/labels",
    "../../config/config",
    "../../config/readyToUse/config",
    "../charts/percentage",
    "../charts/pieMacronutrients",
    "../charts/pieThreeLevDrilldown"
], function ($, log, _, template, labels, C, RC, Percentage, PieMacronutrients, PieThreeLevDrilldown) {

    "use strict";

    var s = {
        CONTENTS: "[data-content]",
        TITLE: "[data-role='title']",
        DESCRIPTION: "[data-role='description']",
        DIETARY_TAB: "#dietaryAdequacy",
        SOURCE_TAB: "#sourceOfNutrientsInTheDiet",
        MACRONUTRIENTS_TAB: "#macronutrients",
        NUTRIENTS: "[data-nutrient]",
        PIE_EL: "pie",

        PERCENTAGE_CONTAINER_ID : "stacked-percentage",
        BAR_PERCENTAGE_ID : "#stacked-bar-percentage",

        MACRONUTRIENTS_PIE_CONTAINER_ID : "macronutrients-pie",

        PIE_CONTAINER_ID : "pieThreeLevDrilldown"

    };

    function Nutrition(opts) {

        $.extend(true, this, {initial: opts});

        this._initVariables();

        this._attach();

        this._bindEventListeners();

    }

    Nutrition.prototype.refresh = function (obj) {

        this._disposeCharts();

        this.model = obj.model;

        this.process = obj.process;

        this._render();
    };

    // end api

    Nutrition.prototype._render = function () {

        var nutrient = this.$el.find(s.NUTRIENTS).first().data("nutrient");

        this._highlightMenuItem(s.DIETARY_TAB, nutrient);
        this._refreshStackedChart(nutrient);

        this._highlightMenuItem(s.SOURCE_TAB, nutrient);
        this._refreshBarsChart(nutrient);

        this._refreshPieChart(nutrient);

        //show fist tab
        this.$el.find('a[href="#dietaryAdequacy"]').tab('show');
    };

    Nutrition.prototype._refreshStackedChart = function (nutrient) {

        if (this.stackedChart && $.isFunction(this.stackedChart.dispose)) {
            this.stackedChart.dispose();
        }

        this.stackedChart = new Percentage({
            elID : s.PERCENTAGE_CONTAINER_ID,
            barID : s.BAR_PERCENTAGE_ID,
            cache: C.cache,
            environment : C.environment,
            uid : "gift_process_total_food_consumption_" + this.model.uid,
            selected_items : $.extend(true, {}, this.process.parameters, {
                "item": "VITA"
            }),
            language : this.lang.toUpperCase()
        });

    };

    Nutrition.prototype._refreshPieChart = function (nutrient) {

        if (this.PieMacronutrients && $.isFunction(this.PieMacronutrients.dispose)) {
            this.PieMacronutrients.dispose();
        }

        this.PieMacronutrients = new PieMacronutrients({
            elID : s.MACRONUTRIENTS_PIE_CONTAINER_ID,
            cache: C.cache,
            environment : C.environment,
            uid : "gift_process_total_food_consumption_" +this.model.uid,
            selected_items : $.extend(true, {}, this.process.parameters, {
                "item": null
            }),
            language : this.lang.toUpperCase()
        });

    };

    Nutrition.prototype._refreshBarsChart = function (nutrient) {

        console.log(nutrient)

        if (this.barsChart && $.isFunction(this.barsChart.dispose)) {
            this.barsChart.dispose();
        }

        //age_year OR age_month
        var param = {

            selected_items : ["IRON"]
        }


        //age_year OR age_month
        var param = {
            selected_config : {
                "gender": "2",
                "special_condition": ["2"],
                "age_year": {
                    "from": 10.5,
                    "to": 67
                }
                // "age_month": {
                //     "from": 10.5,
                //     "to": 67
                // }
            },
            selected_items : ["IRON"]
        };

        this.barsChart = new PieThreeLevDrilldown({
            elID : s.PIE_CONTAINER_ID,
            cache: C.cache,
            environment : C.environment,
            selected_config : this.process.parameters,
            selected_items : ["IRON"],
            uid : "gift_process_total_weighted_food_consumption_" + this.model.uid,
            language : this.lang.toUpperCase()
        });

    };

    Nutrition.prototype._initVariables = function () {
        this.lang = this.initial.lang || C.lang;
        this.$el = this.initial.el;
        this.model = this.initial.model;
    };

    Nutrition.prototype._attach = function () {
        this.$el.html(template(labels[this.lang.toLowerCase()]));
    };

    Nutrition.prototype._bindEventListeners = function () {

        this.$el.find(s.DIETARY_TAB).find(s.NUTRIENTS).on("click", _.bind(this._onDietaryNutrientChange, this));
        this.$el.find(s.SOURCE_TAB).find(s.NUTRIENTS).on("click", _.bind(this._onSourceNutrientChange, this));
    };

    Nutrition.prototype._onDietaryNutrientChange = function (evt) {

        var nutrient = $(evt.target).data("nutrient");

        if (!nutrient) {
            alert("Impossible to find [data-nutrient] on menu item");
            return;
        }

        if (this.dietaryNutrient === nutrient) {
            log.warn("Abort because nutrient is already shown");
            return;
        }
        this.dietaryNutrient = nutrient;

        this._highlightMenuItem(s.DIETARY_TAB, nutrient);

        this._refreshStackedChart(nutrient);

    };

    Nutrition.prototype._onSourceNutrientChange = function (evt) {

        var nutrient = $(evt.target).data("nutrient");

        if (!nutrient) {
            alert("Impossible to find [data-nutrient] on menu item");
            return;
        }

        if (this.sourceNutrient === nutrient) {
            log.warn("Abort because nutrient is already shown");
            return;
        }

        this.sourceNutrient = nutrient;

        this._highlightMenuItem(s.SOURCE_TAB, nutrient);

        this._refreshBarsChart(nutrient);

    };

    Nutrition.prototype._highlightMenuItem = function (tab, nutrient) {

        this.$el.find(tab).find(s.NUTRIENTS).removeClass("active");
        this.$el.find(tab).find(s.NUTRIENTS).filter("[data-nutrient='" + nutrient + "']").addClass("active");
    };

    Nutrition.prototype._disposeCharts = function () {

        _.each(this.charts, function (chart, id) {
            if ($.isFunction(chart.instance.dispose)) {
                chart.instance.dispose()
            } else {
                console.log(id + " has not the disposition method");
            }
        });

        this.charts = [];
    };

    return Nutrition;
});