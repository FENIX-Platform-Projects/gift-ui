define([
    "jquery",
    "loglevel",
    "underscore",
    "../../html/readyToUse/foodConsumption.hbs",
    "../../nls/labels",
    "../../config/config",
    "../../config/readyToUse/config",
    "../charts/bubble",
    "../charts/donutHole",
    "../charts/largeTreeMap",
    "fenix-ui-filter"
], function ($, log, _, template, labels, C, RC, Bubble, DonutHole, LargeTreeMap, Filter) {

    "use strict";

    var s = {
            BUBBLE_FOOD: "#bubble-food",
            BUBBLE_FOOD_HOLDER: "#bubble-food-holder",
            BUBBLE_BEVERAGES: "#bubble-beverages",
            BUBBLE_BEVERAGES_HOLDER: "#bubble-beverages-holder",
            LARGE_TREE_MAP_CONTAINER_ID : "largeTree",
            LARGE_TREE_BEVERAGER_MAP_CONTAINER_ID : "largeTree-beverages",
            MENU_ITEMS: "[data-chart]",
            CONTENTS: "[data-content]",
            BUBBLE_EL: "#bubble",
            TREEMAP: "#treemap",
            DONUT_EL: "donut",
            TITLE: "[data-role='title']",
            DESCRIPTION: "[data-role='description']",
            FILTER: "[data-role='filter']"
        },
        allowedCharts = ["bubble", "treemap", "donut"];

    function FoodConsumption(opts) {

        $.extend(true, this, {initial: opts});

        this._initVariables();

        this._attach();

        // TODO uncomment
        //this._initComponents();

        this._bindEventListeners();

    }

    FoodConsumption.prototype.show = function () {

        // TODO uncomment
        //this.filter.printDefaultSelection();

        this._render();

    };

    FoodConsumption.prototype.refresh = function (obj) {

        this._disposeCharts();

        this.model = obj.model;

        this.process = obj.process;

    };

    FoodConsumption.prototype._initComponents = function () {

        this.filter = new Filter({
            el: this.$el.find(s.FILTER),
            selectors: RC.foodSafetyFilter
        })
    };


    FoodConsumption.prototype._render = function () {

        this._renderDietaryPattern();

        this._renderDailyPortion();

    };

    FoodConsumption.prototype._renderDietaryPattern = function () {

        this._renderChart(this.currentType || allowedCharts[0]);
    };

    FoodConsumption.prototype._renderDailyPortion = function () {

    };

    // end api

    FoodConsumption.prototype._initVariables = function () {
        this.lang = this.initial.lang || C.lang;
        this.$el = this.initial.el;
        this.model = this.initial.model;
        this.environment = this.initial.environment;
        this.process = this.initial.process;

        this.charts = {};
    };

    FoodConsumption.prototype._attach = function () {
        this.$el.html(template(labels[this.lang.toLowerCase()]));
    };

    FoodConsumption.prototype._bindEventListeners = function () {

        this.$el.find(s.MENU_ITEMS).on("click", _.bind(this._onMenuItemClick, this));

        // TODO uncomment
        // this.filter.on("click", _.bind(this._onFilterClick, this));

    };

    /* // TODO uncomment
     FoodConsumption.prototype._onFilterClick = function (evt) {

     var values = this.filter.getValues();
     };*/

    FoodConsumption.prototype._onMenuItemClick = function (evt) {

        var chart = $(evt.target).data("chart");

        if (!chart) {
            alert("Impossible to find [data-chart] on menu item");
            return;
        }

        this._renderChart(chart);
    };

    FoodConsumption.prototype._renderBubbleChart = function (obj) {

        if (obj.initialized) {
            _.each(obj.instances, function (i) {
                i.redraw();
            });
            return;
        }

        var process = $.extend(true, {}, this.process);

        process.parameters.item = "FOOD_AMOUNT_PROC";

        process.sid = [
            {uid: "gift_process_total_weighted_food_consumption_" + this.model.uid}
        ];

        obj.instances.push(new Bubble({
            el: s.BUBBLE_FOOD,
            holderEl: s.BUBBLE_FOOD_HOLDER,
            cache: C.cache,
            type: "foods",
            environment: C.environment,
            process: process,
            model: this.model
        }));

        obj.instances.push(new Bubble({
            el: s.BUBBLE_BEVERAGES,
            holderEl: s.BUBBLE_BEVERAGES_HOLDER,
            cache: C.cache,
            environment: C.environment,
            type: "beverages",
            process: process,
            model: this.model
        }));
    };

    FoodConsumption.prototype._renderTreeMap = function (obj) {
        if (obj.initialized) {
            console.log("redraw treemap");
            // _.each(obj.instances, function(i){
            //     i.redraw();
            // });
            return;
        }

     /*   //age_year OR age_month
        var param = {
            selected_items : {
                "item": "FOOD_AMOUNT_PROC",
                "gender": null,
                "special_condition": ["2"],
                "age_year": {
                    "from": 10.5,
                    "to": 67
                }
            }
        };*/

        var process = $.extend(true, {}, this.process);

        process.parameters.item = "FOOD_AMOUNT_PROC";

        process.sid = [
            {uid: "gift_process_total_weighted_food_consumption_" + this.model.uid}
        ];

        obj.instances.push(new LargeTreeMap({
            elID : s.LARGE_TREE_MAP_CONTAINER_ID,
            cache: C.cache,
            environment : C.environment,
            uid : "gift_process_total_food_consumption_" + this.model.uid,
            selected_items : process.parameters,
            language: this.lang.toUpperCase()
        }));
    };

    FoodConsumption.prototype._renderDonutChart = function (obj) {

        if (obj.initialized) {
            console.log("redraw donut");
            /* _.each(obj.instances, function(i){
             i.redraw();
             });*/
            return;
        }

        console.log("render donut");

        var config = {
            elID: s.DONUT_EL,
            cache: C.cache,
            environment: C.environment,
            uid: "gift_process_total_weighted_food_consumption_" + this.model.uid,
            selected_items: this.process.parameters,
            language: this.lang.toUpperCase()
        };

        obj.instances.push(new DonutHole(config));
    };


    FoodConsumption.prototype._renderChart = function (chart) {

        if (!_.contains(allowedCharts, chart)) {
            alert(chart + " is not a valid chart");
            return;
        }

        this.currentType = chart;

        var type = chart.toLowerCase(),
            obj = this.charts[type] || {};

        this._showChart(type);

        if (!obj.id) {
            obj.id = type;
        }

        if (!obj.instances) {
            obj.instances = [];
        }

        switch (type) {
            case "bubble" :
                this._renderBubbleChart(obj);
                break;
            case "treemap" :
                this._renderTreeMap(obj);
                break;
            case "donut" :
                this._renderDonutChart(obj);
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

            _.each(chart.instances, function (c) {
                if ($.isFunction(c.dispose)) {
                    c.dispose();
                } else {
                    console.log(id + " has not the disposition method");
                }
            });
        });

        this.charts = {};
    };

    return FoodConsumption;
});