define([
    "jquery",
    "loglevel",
    "underscore",
    "../../html/readyToUse/foodConsumption.hbs",
    "../../nls/labels",
    "../../config/config",
    "../charts/donutHole"
], function ($, log, _, template, labels, C, DonutHole) {

    "use strict";

    var s = {
            MENU_ITEMS: "[data-chart]",
            CONTENTS: "[data-content]",
            BUBBLE_EL: "#bubble",
            TREEMAP: "#treemap",
            DONUT_EL: "donut",
            TITLE: "[data-role='title']",
            DESCRIPTION: "[data-role='description']"
        },
        allowedCharts = ["bubble", "treemap", "donut"];

    function FoodConsumption(opts) {

        $.extend(true, this, {initial: opts});

        this._initVariables();

        this._attach();

        this._bindEventListeners();
    }

    FoodConsumption.prototype.refresh = function (model) {

        this._disposeCharts();

        this.model = model;

        this._render();

    };

    FoodConsumption.prototype._render = function () {

        this._renderChart(allowedCharts[0]);

    };

    // end api

    FoodConsumption.prototype._initVariables = function () {
        this.lang = this.initial.lang || C.lang;
        this.$el = this.initial.el;
        this.model = this.initial.model;
        this.environment = this.initial.environment;

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

                var config = {
                    elID : s.DONUT_EL,
                    cache: this.cache,
                    environment : this.environment,
                    uid : "gift_process_total_weighted_food_consumption_" + this.model.uid,
                    selected_items : [ "ENERGY" ],
                    height : 300,
                    width : 300,
                    language : this.lang.toUpperCase()
                };

                obj.instance = new DonutHole(config);

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

        this._updateBox(chart);

    };

    FoodConsumption.prototype._updateBox = function (chart) {

        this.$el.find(s.TITLE).html(labels[this.lang.toLowerCase()][chart + "BoxTitle"]);

        this.$el.find(s.DESCRIPTION).html(labels[this.lang.toLowerCase()][chart + "BoxDescription"]);
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