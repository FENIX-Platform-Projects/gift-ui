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
    "../charts/pieThreeLevDrilldown",
    "fenix-ui-filter"
], function ($, log, _, template, labels, C, RC, Percentage, PieMacronutrients, PieThreeLevDrilldown, Filter) {

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

        PIE_CONTAINER_ID : "pieThreeLevDrilldown",

        FILTER : "[data-role='filter']"

    };

    function Nutrition(opts) {

        $.extend(true, this, {initial: opts});

        this._initVariables();

        this._attach();

        this._initComponents();

        this._bindEventListeners();

    }

    Nutrition.prototype._initComponents = function (obj) {

        this.filter = new Filter({
            el: this.$el.find(s.FILTER),
            selectors: RC.nutritionSourceFilter
        });
    };

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

    Nutrition.prototype._refreshBarsChart = function () {

        if (this.barsChart && $.isFunction(this.barsChart.dispose)) {
            this.barsChart.dispose();
        }

        var values = this.filter.getValues(),
            items = values.values.items;

        this.barsChart = new PieThreeLevDrilldown({
            elID : s.PIE_CONTAINER_ID,
            cache: C.cache,
            environment : C.environment,
            selected_config : this.process.parameters,
            selected_items : items,
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

        this.filter.on("click", _.bind(this._onSourceNutrientChange, this));
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

        this._refreshBarsChart();

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