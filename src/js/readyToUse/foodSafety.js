define([
    "jquery",
    "loglevel",
    "underscore",
    "../../html/readyToUse/foodSafety.hbs",
    "../../nls/labels",
    "../../config/config",
    "../../config/readyToUse/config",
    "fenix-ui-filter"
], function ($, log, _, template, labels, C, RC, Filter) {

    "use strict";

    var s = {
        CONTENTS: "[data-content]",
        COLUMNS_EL: "#columns",
        FILTER: "[data-role='filter']"
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

        this.filter.on("ready", _.bind(this._renderChart, this));

        this.filter.on("click", _.bind(this._renderChart, this));
    };

    FoodSafety.prototype._renderChart = function () {

        console.log(this.filter.getValues())
        console.log(this.model)

        //render chart here
        //this.chart = ....
    };

    FoodSafety.prototype._disposeChart = function () {

        if (this.chart && $.isFunction(this.chart.dispose)) {
            this.chart.instance.dispose()
        } else {
            console.log("Chart has not the disposition method");
        }
    };

    return FoodSafety;
});