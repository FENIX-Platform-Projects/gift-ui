define([
    "jquery",
    "loglevel",
    "underscore",
    "../config/config",
    "../config/readyToUse/config",
    "../html/readyToUse/template.hbs",
    "../nls/labels",
    "fenix-ui-catalog",
    "fenix-ui-metadata-viewer",
    "fenix-ui-filter",
    "./readyToUse/foodConsumption",
    "./readyToUse/foodSafety",
    "./readyToUse/nutrition"
], function ($, log, _, C, RC, template, labels, Catalog, MetadataViewer, Filter, FoodConsumption, FoodSafety, Nutrition) {

    "use strict";

    var s = {
            EL: "#readyToUse",
            CATALOG: "[data-role='catalog']",
            SECTIONS: "[data-section]",
            BACK_BUTTON: "[data-role='back']",
            DASHBOARD_TITLE: "[data-role='title']",
            FOOD_CONSUMPTION_TAB_EL: "#foodConsumptionTab",
            FOOD_SAFETY_TAB_EL: "#foodSafetyTab",
            NUTRITION_TAB_EL: "#nutritionTab",
            TABS: "#readyToUseTabs",
            TABS_A: "#readyToUseTabs > li > a",
            META: "[data-role='meta']",
            META_MODAL: "#meta-modal",
            METADATA_VIEWER: "#metadata-viewer-container",
            FILTER: "#population-filter",
            SEARCH_BUTTON: "[data-role='search']"
        },
        sections = {
            SEARCH: "search",
            DASHBOARD: "dashboard"
        };

    function ReadyToUse() {

        console.clear();

        log.setLevel("silent");

        this._importThirdPartyCss();

        this._validateConfig();

        this._attach();

        this._initVariables();

        this._initSections();

        this._bindEventListeners();

        if (RC.forceShowDashboardSection === true) {
            this._showSection(sections.DASHBOARD);
        } else {
            this._showSection(sections.SEARCH);
        }

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
        this.environment = C.environment;
        this.cache = C.cache;

        this.$sections = this.$el.find(s.SECTIONS);

        this.allowedSections = [];
        for (var key in sections) {
            this.allowedSections.push(sections[key]);
        }

        this.$backButton = this.$el.find(s.BACK_BUTTON);
        this.$searchButton = this.$el.find(s.SEARCH_BUTTON);

        this.$dashboardTitle = this.$el.find(s.DASHBOARD_TITLE);

        this.$metaButton = this.$el.find(s.META);
        this.$metaModal = this.$el.find(s.META_MODAL);
        this.$tabs = this.$el.find(s.TABS_A);

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
        }));

    };

    ReadyToUse.prototype._initDashboardSection = function () {

        this.foodConsumptionTab = new FoodConsumption({
            el: this.$el.find(s.FOOD_CONSUMPTION_TAB_EL),
            lang: this.lang,
            model: this.model,
            environment: this.environment
        });

        this.foodSafetyTab = new FoodSafety({
            el: this.$el.find(s.FOOD_SAFETY_TAB_EL),
            lang: this.lang,
            model: this.model,
            environment: this.environment
        });

        this.nutritionTab = new Nutrition({
            el: this.$el.find(s.NUTRITION_TAB_EL),
            lang: this.lang,
            model: this.model,
            environment: this.environment
        });

        this.filter = new Filter($.extend(true, {
            el: s.FILTER
        }, C.populationFilter))

    };

    ReadyToUse.prototype._showSection = function (section) {

        if (!_.contains(this.allowedSections, section)) {
            section = sections.SEARCH;
            log.warn("Show " + section + " section abort because invalid: show 'search' section instead");
        }

        if (!RC.forceShowDashboardSection && section === sections.DASHBOARD && !this.model) {
            section = sections.SEARCH;
            log.warn("Show dashboard section abort: model not found");
        }

        this.$sections.hide();
        this.$sections.filter("[data-section='" + section + "']").show();

    };

    // Events

    ReadyToUse.prototype._bindEventListeners = function () {

        this.catalog.on("select", _.bind(this._onCatalogSelect, this));

        this.$backButton.on("click", _.bind(this._onBackButtonClick, this));

        this.$metaButton.on("click", _.bind(this._onMetaButtonClick, this));

        this.$searchButton.on("click", _.bind(this._onSearchButtonClick, this));

        this.$tabs.on("click", _.bind(this._onTabClick, this))
    };

    ReadyToUse.prototype._onTabClick = function (evt) {

        //TODO enable to implement lazy loading
        return;

        var tab = $(evt.target).data("tab");
        switch (tab.toLowerCase()) {
            case "foodconsumption":
                this.foodConsumptionTab.refresh(this.model);
                break;
            case "foodsafety":
                this.foodSafetyTab.refresh(this.model);
                break;
            case "nutrition":
                this.nutritionTab.refresh(this.model);
                break;
        }
    };

    ReadyToUse.prototype._updateModelAndProcess = function () {

        var values = this.filter.getValues();

        if (!this.model) {
            console.log("Select a dataset");
            return
        }

        var parameters= {},
            process = {
                name: "gift_population_filter"
            };

        addGender(values, parameters);

        addSpecialCondition(values, parameters);

        addAge(values, parameters);

        process.parameters = parameters;

        this.process = process;

        function addGender(v, parameters) {

            var values = v.values || {},
                gender = values.gender || [];

            parameters.gender = cleanValues(gender)[0]
        }

        function addSpecialCondition(v, parameters) {

            var values = v.values || {},
                special_condition = values.special_condition || [];
            parameters.special_condition = cleanValues(special_condition)
        }

        function addAge(v, parameters) {

            var values = v.values || {},
                age = values.age || [],
                ageGranularity = values.ageGranularity || [];

            parameters["age_" + ageGranularity[0]] = {
                from : _.findWhere(age, {parent : "from"}).value,
                to : _.findWhere(age, {parent : "to"}).value
            }
        }

        function cleanValues( array) {
            return _.without(array, "none");
        }

    };

    ReadyToUse.prototype._onSearchButtonClick = function () {

        this._updateModelAndProcess();

        this._disposeDashboard();

        this._renderDashboard();

    };

    ReadyToUse.prototype._onMetaButtonClick = function () {

        if (!this.model) {
            log.warn("Abort show metadata because not model was found");
            return;
        }

        this.$metaModal.modal("show");

        this.metadataViewer = new MetadataViewer({
            model: this.model,
            cache: this.cache,
            environment: this.environment,
            lang: this.lang,
            el: this.$el.find(s.METADATA_VIEWER)
        });

    };

    ReadyToUse.prototype._onCatalogSelect = function (payload) {

        if (!payload.model) {
            alert("Invalid dataset");
            return;
        }

        this.model = payload.model;

        this._updateModelAndProcess();

        this._showSection(sections.DASHBOARD);

        this._disposeDashboard();

        this._renderDashboard()
    };

    ReadyToUse.prototype._onBackButtonClick = function () {

        this._showSection(sections.SEARCH);
    };

    // Dashboard section

    ReadyToUse.prototype._renderDashboard = function () {

        this._updateTitle();

        this._updateModelAndProcess();

        this.foodConsumptionTab.refresh({
            model : this.model,
            process : this.process
        });

        this.foodSafetyTab.refresh({
            model : this.model,
            process : this.process
        });

        this.nutritionTab.refresh({
            model : this.model,
            process : this.process
        });

    };

    ReadyToUse.prototype._updateTitle = function () {

        var model = this.model,
            title = model.title || {};

        this.$dashboardTitle.html(title[this.lang.toUpperCase()] || model.uid);

    };

    ReadyToUse.prototype._disposeDashboard = function () {

    };

    // CSS

    ReadyToUse.prototype._importThirdPartyCss = function () {

        //Bootstrap
        //require('bootstrap/dist/css/bootstrap.css');

        //host override
        require('../css/gift.css');

        //dropdown selector
        require("../../node_modules/selectize/dist/css/selectize.bootstrap3.css");
        //tree selector
        require("../../node_modules/jstree/dist/themes/default/style.min.css");
        //range selector
        require("../../node_modules/ion-rangeslider/css/ion.rangeSlider.css");
        require("../../node_modules/ion-rangeslider/css/ion.rangeSlider.skinHTML5.css");
        //time selector
        require("../../node_modules/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css");
        // fenix-ui-filter
        require("../../node_modules/fenix-ui-filter/dist/fenix-ui-filter.min.css");

        // fenix-ui-dropdown
        require("../../node_modules/fenix-ui-dropdown/dist/fenix-ui-dropdown.min.css");

        // bootstrap-table
        require("../../node_modules/bootstrap-table/dist/bootstrap-table.min.css");
        // fenix-ui-catalog
        require("../../node_modules/fenix-ui-catalog/dist/fenix-ui-catalog.min.css");


    };

    return new ReadyToUse();
});