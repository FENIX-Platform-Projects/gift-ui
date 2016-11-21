define([
    "jquery",
    "loglevel",
    "underscore",
    "../../html/readyToUse/foodConsumption.hbs",
    "../../nls/labels",
    "../../config/config"
], function ($, log, _, template, labels, C) {

    "use strict";

    var s = {
            MENU_ITEMS: "[data-chart]",
            CONTENTS: "[data-content]",
            BUBBLE_EL: "#bubble",
            TREEMAP: "#treemap",
            DONUT_EL: "#donut"
        },
        allowedCharts = ["bubble", "treemap", "donut"];

    function FoodConsumption(opts) {

        $.extend(true, this, {initial: opts});

        this._initVariables();

        this._attach();

        this._bindEventListeners();

        this._renderChart(allowedCharts[0]);
    }

    FoodConsumption.prototype.refresh = function (model) {

        this._disposeCharts();

        this.model = model;

        this._renderChart(allowedCharts[0]);

    };

    // end api

    FoodConsumption.prototype._initVariables = function () {
        this.lang = this.initial.lang || C.lang;
        this.$el = this.initial.el;

        this.charts = [];
    };

    FoodConsumption.prototype._attach = function () {
        this.$el.html(template(labels[this.lang.toLowerCase()]));
    };

    FoodConsumption.prototype._bindEventListeners = function () {
        this.$el.find(s.MENU_ITEMS).on("click", _.bind(this._onMenuItemClick, this));
    };

    FoodConsumption.prototype._onMenuItemClick = function (evt) {

        var chart = $(evt.target).data("chart");

        if (!chart) {
            alert("Impossible to find [data-chart] on menu item");
            return;
        }

        this._renderChart(chart);
    };

    FoodConsumption.prototype._renderChart = function (chart) {

        if (!_.contains(allowedCharts, chart)) {
            alert(chart + " is not a valid chart");
            return;
        }

        var obj = {},
            type = chart.toLowerCase();

        this._showChart(type);

        if (this.charts[type] && this.charts[type].initialized === true) {
            log.warn(type + " is already initialized");
            return;
        }

        obj.id = type;

        switch (type) {
            case "bubble" :
                console.log("Bubble");
                break;
            case "treemap" :
                console.log("treemap");
                break;
            case "donut" :
                console.log("donut");
                break;
            default:
                log.error("Impossible to find constructor for chart: " + type);
                break;
        }

        obj.initialized = true;

        this.charts[obj.id] = obj;
    };

    FoodConsumption.prototype._highlightMenuItem = function (chart) {

        this.$el.find(s.MENU_ITEMS).removeClass("active");
        this.$el.find(s.MENU_ITEMS).filter("[data-chart='" + chart + "']").addClass("active");
    };

    FoodConsumption.prototype._showChart = function (chart) {

        this.$el.find(s.CONTENTS).hide();
        this.$el.find(s.CONTENTS).filter("[data-content='" + chart + "']").show();

        this._highlightMenuItem(chart);
    };

    FoodConsumption.prototype._disposeCharts = function () {

        _.each(this.charts, function (chart, id) {
            if ($.isFunction(chart.instance.dispose)) {
                chart.instance.dispose()
            } else {
                console.log(id + " has not the disposition method");
            }
        });

        this.charts = [];
    };

    return FoodConsumption;
});