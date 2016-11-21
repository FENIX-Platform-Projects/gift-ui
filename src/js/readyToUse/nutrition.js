define([
    "jquery",
    "loglevel",
    "underscore",
    "../../html/readyToUse/nutrition.hbs",
    "../../nls/labels",
    "../../config/config",
    "../../config/readyToUse/config"
], function ($, log, _, template, labels, C, RC) {

    "use strict";

    var s = {
        CONTENTS: "[data-content]",
        TITLE: "[data-role='title']",
        DESCRIPTION: "[data-role='description']",
        DIETARY_TAB : "#dietaryAdequacy",
        SOURCE_TAB : "#sourceOfNutrientsInTheDiet",
        MACRONUTIENTS_TAB : "#macronutrients",
        NUTRIENTS: "[data-nutrient]"
    };

    function Nutrition(opts) {

        $.extend(true, this, {initial: opts});

        this._initVariables();

        this._attach();

        this._bindEventListeners();

        this._render();

    }

    Nutrition.prototype.refresh = function (model) {

        this._disposeCharts();

        this.model = model;

        this._render();
    };

    // end api

    Nutrition.prototype._render = function() {

        var nutrient = this.$el.find(s.NUTRIENTS).first().data("nutrient");

        this._highlightMenuItem(s.DIETARY_TAB, nutrient);
        this._refreshStackedChart(nutrient);

        this._highlightMenuItem(s.SOURCE_TAB, nutrient);
        this._refreshBarsChart(nutrient);

        //show fist tab
        this.$el.find('a[href="#dietaryAdequacy"]').tab('show');
    };

    Nutrition.prototype._refreshStackedChart = function(nutrient) {

        if (this.stackedChart && $.isFunction(this.stackedChart.dispose)){
            this.stackedChart.dispose();
        }

        //render stacked chart here
        console.log(nutrient)
    };

    Nutrition.prototype._refreshBarsChart = function(nutrient) {

        if (this.barsChart && $.isFunction(this.barsChart.dispose)){
            this.barsChart.dispose();
        }

        //render bars chart here
        console.log(nutrient)
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

        if (this.dietaryNutrient === nutrient){
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

        if (this.sourceNutrient === nutrient){
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