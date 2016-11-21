define([
    "jquery",
    "loglevel",
    "underscore",
    "../../html/readyToUse/foodSafety.hbs",
    "../../nls/labels",
    "../../config/config",
    "../../config/readyToUse/config",
    "fenix-ui-filter",
    "../charts/column"
], function ($, log, _, template, labels, C, RC, Filter, Columns) {

    "use strict";

    var s = {
        CONTENTS: "[data-content]",
        COLUMNS_EL: "column",
        FILTER: "[data-role='filter']",

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

    function FoodSafety(opts) {

        $.extend(true, this, {initial: opts});

        this._initVariables();

        this._attach();

        this._initComponents();

        this._bindEventListeners();

    }

    FoodSafety.prototype.refresh = function (model) {

        this._disposeChart();

        this.model = model;

        this.filter.printDefaultSelection();

        this._renderChart();

    };

    // end api

    FoodSafety.prototype._initVariables = function () {
        this.lang = this.initial.lang || C.lang;
        this.$el = this.initial.el;
        this.model = this.initial.model;
    };

    FoodSafety.prototype._attach = function () {
        this.$el.html(template(labels[this.lang.toLowerCase()]));
    };

    FoodSafety.prototype._initComponents = function () {

        this.filter = new Filter({
            el: this.$el.find(s.FILTER),
            selectors: RC.foodSafetyFilter
        })
    };

    FoodSafety.prototype._bindEventListeners = function () {

        //this.filter.on("ready", _.bind(this._renderChart, this));

        this.filter.on("click", _.bind(this._renderChart, this));
    };

    FoodSafety.prototype._renderChart = function () {

        console.log("click")

        var amount_id = {
            low : s.AMOUNT_LOW,
            middle : s.AMOUNT_MIDDLE,
            high : s.AMOUNT_HIGH
        };

        //render chart here
        this.chart = new Columns({
            elID : s.COLUMNS_EL,
            amountID : amount_id,
            barID : s.BAR_ID,
            percentageID : s.PERCENTAGE_ID,
            cache: C.cache,
            environment : C.environment,
            uid : "gift_process_total_weighted_food_consumption_" + this.model.uid,
            selected_items : "FOOD_AMOUNT_PROC",
            selected_group : this.filter.getValues().values.food[0],
            language : this.lang.toUpperCase()
        });
    };

    FoodSafety.prototype._disposeChart = function () {

        if (this.chart && $.isFunction(this.chart.dispose)) {
            this.chart.dispose()
        } else {
            console.log("Chart has not the disposition method");
        }
    };

    return FoodSafety;
});