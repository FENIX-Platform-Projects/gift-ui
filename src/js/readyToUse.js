define([
    "jquery",
    "loglevel",
    "underscore",
    "../../config/config",
    "../../config/readyToUse/config",
    "../html/readyToUse/template.hbs",
    "../nls/labels",
    "fenix-ui-catalog"
], function ($, log, _, C, RC, template, labels, Catalog) {

    "use strict";

    var s = {
            EL: "#readyToUse",
            CATALOG: "[data-role='catalog']",
            SECTIONS: "[data-section]",
            BACK_BUTTON: "[data-role='back']",
            DASHBOARD_TITLE: "[data-role='title']"
        },
        sections = {
            SEARCH: "search",
            DASHBOARD: "dashboard"
        };

    function ReadyToUse() {

        console.clear();

        log.setLevel("trace");

        this._importThirdPartyCss();

        this._validateConfig();

        this._attach();

        this._initVariables();

        this._initSections();

        this._bindEventListeners();

        //this._showSection(sections.SEARCH)
        this._showSection(sections.DASHBOARD)
    }

    ReadyToUse.prototype._validateConfig = function () {

        if (!C.lang) {
            alert("Please specify a valid LANGUAGE in config/config.js");
        }

        if (!RC.catalog) {
            alert("Please specify a valid CATALOG configuration in config/readyToUse/config.js");
        }

        if ($(s.EL).length === 0) {
            alert("Please specify a valid container [" + s.EL + "]");
        }

    };

    ReadyToUse.prototype._initVariables = function () {

        this.$el = $(s.EL);

        this.lang = C.lang.toLowerCase();

        this.$sections = this.$el.find(s.SECTIONS);

        this.allowedSections = [];
        for (var key in sections) {
            this.allowedSections.push(sections[key]);
        }

        this.$backButton = this.$el.find(s.BACK_BUTTON);

        this.$dashboardTitle = this.$el.find(s.DASHBOARD_TITLE);

    };

    ReadyToUse.prototype._attach = function () {

        $(s.EL).html(template(labels[C.lang.toLowerCase()]));
    };

    ReadyToUse.prototype._initSections = function () {

        this._initSearchSection();

        this._initDashboardSection();

    };

    ReadyToUse.prototype._initSearchSection = function () {

        this.catalog = new Catalog($.extend(true, RC.catalog, {
            el: this.$el.find(s.CATALOG),
            cache: this.cache,
            environment: this.environment,
            hideCloseButton: true
        }))

    };

    ReadyToUse.prototype._initDashboardSection = function () {

    };

    ReadyToUse.prototype._showSection = function (section) {

        if (!_.contains(this.allowedSections, section)) {
            section = sections.SEARCH;
            log.warn("Show " + section + " section abort because invalid: show 'search' section instead");
        }
/*
        if (section === sections.DASHBOARD && !this.model) {
            section = sections.SEARCH;
            log.warn("Show dashboard section abort: model not found");
        }*/

        this.$sections.hide();
        this.$sections.filter("[data-section='" + section + "']").show();

    };

    // Events

    ReadyToUse.prototype._bindEventListeners = function () {

        this.catalog.on("select", _.bind(this._onCatalogSelect, this));

        this.$backButton.on("click", _.bind(this._onBackButtonClick, this))
    };

    ReadyToUse.prototype._onCatalogSelect = function (payload) {

        if (!payload.model) {
            alert("Invalid dataset");
            return;
        }
        this.model = payload.model;

        this._showSection(sections.DASHBOARD);

        this._renderDashboard()
    };

    ReadyToUse.prototype._onBackButtonClick = function () {

        this._showSection(sections.SEARCH);
    };

    // Dashboard section

    ReadyToUse.prototype._renderDashboard = function (model) {

        this._updateTitle(model);

    };

    ReadyToUse.prototype._updateTitle = function () {

        this.$dashboardTitle.html(this.model.title[this.lang.toUpperCase() || this.model.uid])

    };

    // CSS

    ReadyToUse.prototype._importThirdPartyCss = function () {

        //Bootstrap
        require('bootstrap/dist/css/bootstrap.css');

        //dropdown selector
        require("../../node_modules/selectize/dist/css/selectize.bootstrap3.css");
        // fenix-ui-filter
        require("../../node_modules/fenix-ui-filter/dist/fenix-ui-filter.min.css");

        // bootstrap-table
        require("../../node_modules/bootstrap-table/dist/bootstrap-table.min.css");
        // fenix-ui-catalog
        require("../../node_modules/fenix-ui-catalog/dist/fenix-ui-catalog.min.css");


        //host override
        require('../css/gift.css');

    };

    return new ReadyToUse();
});