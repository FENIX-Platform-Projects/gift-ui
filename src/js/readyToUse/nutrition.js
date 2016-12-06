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
], function ($, log, _, template, labels, C, RC, Percentage, pieMacronutrients, PieThreeLevDrilldown, Filter) {

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
        TABS_A: "#nutritionTabs > li > a",

        PERCENTAGE_CONTAINER_ID: "stacked-percentage",
        BAR_PERCENTAGE_ID: "#stacked-bar-percentage",
        PERCENTAGE_LABELS_ID : "stackedPercentage",

        MACRONUTRIENTS_PIE_CONTAINER_ID: "macronutrients-pie",
        MACRONUTRIENTS_PIE_LABELS_ID : "macronutrientsPie",

        PIE_CONTAINER_ID: "pieThreeLevDrilldown",
        PIE_LABELS_ID : "pieThreeLevDrilldown",

        FILTER: "[data-role='filter']"

    };

    function Nutrition(opts) {

        $.extend(true, this, {initial: opts});

        this._initVariables();

        this._attach();

        this._initComponents();

        this._bindEventListeners();


    }

    Nutrition.prototype.show = function () {
        this._render();
    };

    Nutrition.prototype._initComponents = function () {

        this.$tabs = this.$el.find(s.TABS_A);

        this.filter = new Filter({
            el: this.$el.find(s.FILTER),
            selectors: RC.nutritionSourceFilter
        });
    };

    Nutrition.prototype.refresh = function (obj) {

        this._disposeCharts();

        this.model = obj.model;

        this.process = obj.process;

    };

    // end api

    Nutrition.prototype._render = function () {

        this._renderTab(this.currentTab);

    };

    Nutrition.prototype._renderTab = function (tab) {

        switch (tab.toLowerCase()) {
            case "dietary":
                this._refreshStackedChart();
                break;
            case "source" :
                this._refreshBarsChart();
                break;
            case "macronutrients":
                this._refreshPieChart();
                break;
        }

        this.currentTab = tab;

    };

    Nutrition.prototype._refreshStackedChart = function () {

        if (this.stackedChartReady) {
            console.log("redraw stacked");
            return;
        }

        console.log("render stacked")

        this.stackedChartReady = true;

        this.stackedChart = new Percentage({
            elID: s.PERCENTAGE_CONTAINER_ID,
            labelsId : s.PERCENTAGE_LABELS_ID,
            barID: s.BAR_PERCENTAGE_ID,
            cache: C.cache,
            environment: C.environment,
            uid: "gift_process_total_food_consumption_" + this.model.uid,
            selected_items: $.extend(true, {}, this.process.parameters, {
                "item": "VITA"
            }),
            selected_item_label : "VITAMINA A",
            language: this.lang.toUpperCase()
        });

    };

    Nutrition.prototype._refreshPieChart = function () {

        if (this.pieMacronutrientsReady) {
            console.log("redraw pie")
            return;
        }

        console.log("render pie");

        this.pieMacronutrientsReady = true;

        this.pieMacronutrients = new pieMacronutrients({
            elID: s.MACRONUTRIENTS_PIE_CONTAINER_ID,
            labelsId : s.MACRONUTRIENTS_PIE_LABELS_ID,
            cache: C.cache,
            environment: C.environment,
            uid: "gift_process_total_food_consumption_" + this.model.uid,
            selected_items: $.extend(true, {}, this.process.parameters, {
                "item": null
            }),
            language: this.lang.toUpperCase()
        });

    };

    Nutrition.prototype._refreshBarsChart = function (force) {

        if (!force && this.barsChartReady) {
            console.log("redraw bars")
            return;
        }

        console.log("render bars")

        this.barsChartReady = true;

        var values = this.filter.getValues(),
            items = values.values.items;

        this.barsChart = new PieThreeLevDrilldown({
            elID: s.PIE_CONTAINER_ID,
            labelsId : s.PIE_LABELS_ID,
            title : 'IRON',
            cache: C.cache,
            environment: C.environment,
            selected_config: this.process.parameters,
            selected_items: items,
            uid: "gift_process_total_weighted_food_consumption_" + this.model.uid,
            language: this.lang.toUpperCase()
        });

    };

    Nutrition.prototype._initVariables = function () {
        this.lang = this.initial.lang || C.lang;
        this.$el = this.initial.el;
        this.model = this.initial.model;

        this.currentTab = "dietary"
    };

    Nutrition.prototype._attach = function () {
        this.$el.html(template(labels[this.lang.toLowerCase()]));
    };

    Nutrition.prototype._bindEventListeners = function () {

        this.filter.on("click", _.bind(this._onSourceNutrientChange, this));

        this.$tabs.on("click", _.bind(this._onTabClick, this))
    };

    Nutrition.prototype._onTabClick = function (evt) {
        var tab = $(evt.target).data("tab");

        this._renderTab(tab);
    };

    Nutrition.prototype._onSourceNutrientChange = function () {

        this._disposeBarChart();

        this._refreshBarsChart();

    };

    Nutrition.prototype._disposeCharts = function () {

        this._disposeBarChart();

        this._disposeMacronitrients();

        this._disposeStacked();

    };

    Nutrition.prototype._disposeBarChart = function () {
        this.barsChartReady = false;
        if (this.barsChart) {
            if ($.isFunction(this.barsChart.dispose)) {
                this.barsChart.dispose();
            } else {
                console.log("Bar charts has not dispose method");
            }

        }
    };

    Nutrition.prototype._disposeMacronitrients = function () {
        this.pieMacronutrientsReady = false;
        if (this.pieMacronutrients) {

            if ($.isFunction(this.pieMacronutrients.dispose)) {
                this.pieMacronutrients.dispose();
            } else {
                console.log("Pie macronutrients has not dispose method")
            }

        }
    };

    Nutrition.prototype._disposeStacked = function () {
        this.stackedChartReady = false;
        if (this.stackedChart) {
            if ($.isFunction(this.stackedChart.dispose)) {
                this.stackedChart.dispose();
            } else {
                console.log("stacked method has not dispose method")
            }

        }
    };

    return Nutrition;
});