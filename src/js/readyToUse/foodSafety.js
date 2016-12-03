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
        BAR_ID: "#columns-progress-bar",
        PERCENTAGE_ID: "#percentage",
        AMOUNT_LOW: "#amount_low",
        AMOUNT_MIDDLE: "#amount_middle",
        AMOUNT_HIGH: "#amount_high",
        DONUT_CONTAINER_ID: "donut",
        height: 300,
        width: 300,
        language: "EN",


        COLUMN_CONTAINER_ID: "column-standard",
        COLUMN_BAR_ID: "#column-standard-progress-bar",
        COLUMN_PERCENTAGE_ID: "#column-standard-percentage",
        COLUMN_PERCENTAGE_ITEM_ID: "#column-standard-percentage-item",
        COLUMN_AMOUNT_LOW: "#column_standard_amount_low",
        COLUMN_AMOUNT_MIDDLE: "#column_standard_amount_middle",
        COLUMN_AMOUNT_HIGH: "#column_standard_amount_high"
    };

    function FoodSafety(opts) {

        $.extend(true, this, {initial: opts});

        this._initVariables();

        this._attach();

        this._initComponents();

        this._bindEventListeners();

    }

    FoodSafety.prototype.show = function () {

        this.filter.printDefaultSelection();

        this._renderChart();
    };

    FoodSafety.prototype.refresh = function (obj) {

        this._disposeChart();

        this.model = obj.model;
        this.process = obj.process;

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
        });
    };

    FoodSafety.prototype._bindEventListeners = function () {

        this.filter.on("click", _.bind(this._onFilterClick, this));
    };

    FoodSafety.prototype._onFilterClick = function () {

        this._renderChart(true);
    };

    FoodSafety.prototype._renderChart = function (force) {

        if (!force && this.chartReady) {
            console.log("redraw columns");
            return;
        }

        this.chartReady = true;

        if (this.chart && $.isFunction(this.chart.dispose)) {
            //this.chart.dispose();
        }

        var values = this.filter.getValues(),
            code = values.values.foodex2_code[0],
            label = values.labels.foodex2_code[code];

        var amount_id = {
            low: s.COLUMN_AMOUNT_LOW,
            middle: s.COLUMN_AMOUNT_MIDDLE,
            high: s.COLUMN_AMOUNT_HIGH
        };

        //peculiar code parsing (code piersing)
        var group, subgroup, food;

        if (isNaN(parseInt(code))) {
            food = code;
        } else {

            if (code.length === 2) {
                group = code;
            }
            if (code.length === 4) {
                subgroup = code;
            }
        }

        var param = {
            selected_items: $.extend(true, {}, this.process.parameters, {
                "item": "FOOD_AMOUNT_PROC"
            }),
            selected_group: {
                "percentileSize": 5,
                "group": group,
                "subgroup": subgroup,
                "food": food
            },
            process_name: "gift_std_percentile"
        };

        console.log("render columns");

        this.chart = new Columns({
            elID: s.COLUMN_CONTAINER_ID,
            columnAmountID: amount_id,
            columnBarID: s.COLUMN_BAR_ID,
            columnPercentageID: s.COLUMN_PERCENTAGE_ID,
            columnPercentageItemID: s.COLUMN_PERCENTAGE_ITEM_ID,
            columnPercentageItemLabel: label.toUpperCase(),
            cache: C.cache,
            environment: C.environment,
            uid: "gift_process_total_food_consumption_" + this.model.uid,
            selected_items: param.selected_items,
            selected_group: param.selected_group,
            process_name: param.process_name,
            language: s.language
        });
    };

    FoodSafety.prototype._disposeChart = function () {

        this.chartReady = false;

        if (this.chart) {
            if ($.isFunction(this.chart.dispose)) {
                this.chart.dispose()
            } else {
                console.log("Food safery chart has not dispose method")
            }

        }
    };

    return FoodSafety;
});