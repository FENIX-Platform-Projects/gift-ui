define([
    "underscore",
    "jquery",
    "loglevel",
    "../../../nls/labels",
    "../../../config/readyToUse/config",
    "fenix-ui-bridge",
    "highcharts",
    "../../charts/valueFormatter"
], function (_, $, log, labels, RC, Bridge, Highcharts, Formatter) {

    var s = {
        HEIGHT: 500,
        WIDTH: 500,
        level_number: 1,
        //Food
        three_levels_process: [
            {
                "name": "gift_population_filter",
                "sid": [{"uid": "GIFT_afc_000042BUR201001"}],
                "parameters": {
                    "item": "FOOD_AMOUNT_PROC",
                    "gender": null,
                    "special_condition": ["2"],
                    "age_year": {
                        "from": 10.5,
                        "to": 67
                    }
                }
            },

            {
                "name": "filter",
                "parameters": {
                    "columns": [
                        "group_code",
                        "subgroup_code",
                        "foodex2_code",
                        "value"
                    ],
                    "rows": {
                        "!group_code": {
                            "codes": [
                                {
                                    "uid": "GIFT_FoodGroups",
                                    "codes": ["14"]
                                }
                            ]
                        }
                    }
                }
            },

            {
                "name": "group",
                "rid": {"uid": "food_level_group"},
                "parameters": {
                    "by": [
                        "group_code",
                        "subgroup_code",
                        "foodex2_code"
                    ],
                    "aggregations": [
                        {
                            "columns": ["value"],
                            "rule": "SUM"
                        }
                    ]
                }
            },

            {
                "name": "group",
                "rid": {"uid": "subgroup_level_group"},
                "parameters": {
                    "by": [
                        "group_code",
                        "subgroup_code"
                    ],
                    "aggregations": [
                        {
                            "columns": ["value"],
                            "rule": "SUM"
                        }
                    ]
                }
            },

            {
                "name": "group",
                "rid": {"uid": "group_level_group"},
                "parameters": {
                    "by": [
                        "group_code"
                    ],
                    "aggregations": [
                        {
                            "columns": ["value"],
                            "rule": "SUM"
                        }
                    ]
                }
            },

            {
                "name": "asTable"
            },

            {
                "name": "percentage"
            },

            {
                "name": "addcolumn",
                "rid": {"uid": "group_data"},
                "parameters": {
                    "column": {
                        "dataType": "code",
                        "id": "um",
                        "subject": "um",
                        "title": {
                            "EN": "Unit of measure"
                        },
                        "domain": {
                            "codes": [
                                {
                                    "idCodeList": "GIFT_UM"
                                }
                            ]
                        }
                    },
                    "value": "perc"
                }
            },


            {
                "name": "join",
                "sid": [
                    {"uid": "group_level_group"},
                    {"uid": "subgroup_level_group"}
                ],
                "parameters": {
                    "joins": [
                        [{"type": "id", "value": "group_code"}],
                        [{"type": "id", "value": "group_code"}]
                    ],
                    "values": []
                }
            },

            {
                "name": "select",
                "parameters": {
                    "values": {
                        "group_code": null,
                        "subgroup_level_group_subgroup_code": null,
                        "subgroup_level_group_value": "(subgroup_level_group_value*100.0)/group_level_group_value"
                    }
                }
            },

            {
                "name": "addcolumn",
                "rid": {"uid": "subgroup_data"},
                "parameters": {
                    "column": {
                        "dataType": "code",
                        "id": "um",
                        "subject": "um",
                        "title": {
                            "EN": "Unit of measure"
                        },
                        "domain": {
                            "codes": [
                                {
                                    "idCodeList": "GIFT_UM"
                                }
                            ]
                        }
                    },
                    "value": "perc"
                }
            },


            {
                "name": "join",
                "sid": [
                    {"uid": "subgroup_level_group"},
                    {"uid": "food_level_group"}
                ],
                "parameters": {
                    "joins": [
                        [{"type": "id", "value": "subgroup_code"}],
                        [{"type": "id", "value": "subgroup_code"}]
                    ],
                    "values": []
                }
            },

            {
                "name": "select",
                "parameters": {
                    "values": {
                        "subgroup_code": null,
                        "food_level_group_foodex2_code": null,
                        "food_level_group_value": "(food_level_group_value*100.0)/subgroup_level_group_value"
                    }
                }
            },

            {
                "name": "addcolumn",
                "rid": {"uid": "food_data"},
                "parameters": {
                    "column": {
                        "dataType": "code",
                        "id": "um",
                        "subject": "um",
                        "title": {
                            "EN": "Unit of measure"
                        },
                        "domain": {
                            "codes": [
                                {
                                    "idCodeList": "GIFT_UM"
                                }
                            ]
                        }
                    },
                    "value": "perc"
                }
            }

        ],
        //Beverages
        two_levels_process: [
            {
                "name": "gift_population_filter",
                "sid": [{"uid": "GIFT_afc_000042BUR201001"}],
                "parameters": {
                    "item": "FOOD_AMOUNT_PROC",
                    "gender": null,
                    "special_condition": ["2"],
                    "age_year": {
                        "from": 10.5,
                        "to": 67
                    }
                }
            },

            {
                "name": "filter",
                "parameters": {
                    "columns": [
                        "subgroup_code",
                        "foodex2_code",
                        "value"
                    ],
                    "rows": {
                        "group_code": {
                            "codes": [
                                {
                                    "uid": "GIFT_FoodGroups",
                                    "codes": ["14"]
                                }
                            ]
                        }
                    }
                }
            },

            {
                "name": "group",
                "rid": {"uid": "food_level_group"},
                "parameters": {
                    "by": [
                        "subgroup_code",
                        "foodex2_code"
                    ],
                    "aggregations": [
                        {
                            "columns": ["value"],
                            "rule": "SUM"
                        }
                    ]
                }
            },

            {
                "name": "group",
                "rid": {"uid": "subgroup_level_group"},
                "parameters": {
                    "by": [
                        "subgroup_code"
                    ],
                    "aggregations": [
                        {
                            "columns": ["value"],
                            "rule": "SUM"
                        }
                    ]
                }
            },

            {
                "name": "asTable"
            },

            {
                "name": "percentage"
            },

            {
                "name": "addcolumn",
                "rid": {"uid": "subgroup_data"},
                "parameters": {
                    "column": {
                        "dataType": "code",
                        "id": "um",
                        "subject": "um",
                        "title": {
                            "EN": "Unit of measure"
                        },
                        "domain": {
                            "codes": [
                                {
                                    "idCodeList": "GIFT_UM"
                                }
                            ]
                        }
                    },
                    "value": "perc"
                }
            },


            {
                "name": "join",
                "sid": [
                    {"uid": "subgroup_level_group"},
                    {"uid": "food_level_group"}
                ],
                "parameters": {
                    "joins": [
                        [{"type": "id", "value": "subgroup_code"}],
                        [{"type": "id", "value": "subgroup_code"}]
                    ],
                    "values": []
                }
            },

            {
                "name": "select",
                "parameters": {
                    "values": {
                        "subgroup_code": null,
                        "food_level_group_foodex2_code": null,
                        "food_level_group_value": "(food_level_group_value*100.0)/subgroup_level_group_value"
                    }
                }
            },

            {
                "name": "addcolumn",
                "rid": {"uid": "food_data"},
                "parameters": {
                    "column": {
                        "dataType": "code",
                        "id": "um",
                        "subject": "um",
                        "title": {
                            "EN": "Unit of measure"
                        },
                        "domain": {
                            "codes": [
                                {
                                    "idCodeList": "GIFT_UM"
                                }
                            ]
                        }
                    },
                    "value": "perc"
                }
            }

        ]
    };

    function LargeTreeMap(params) {

        // Load Exporting Module after Highcharts loaded
        if (!require.cache[require.resolveWeak("highcharts/modules/drilldown")]) {
            require('highcharts/modules/drilldown')(Highcharts);
        }
        if (!require.cache[require.resolveWeak("highcharts-no-data-to-display")]) {
            require('highcharts-no-data-to-display')(Highcharts);
        }
        if (!require.cache[require.resolveWeak("highcharts/modules/treemap")]) {
            require('highcharts/modules/treemap')(Highcharts);
        }

        this._init(params);

        this.bridge = new Bridge({
            environment: this.environment,
            cache: this.cache
        });

        var process = '';
        if (this.levels_number == 2) {
            process = s.two_levels_process;
        }
        else if (this.levels_number == 3) {
            process = s.three_levels_process;
        }

        this._setHTMLvariables();

        this._getProcessedResourceForChart(process)
            .then(
            _.bind(this._onSuccess, this),
            _.bind(this._onError, this)
        );
    }

    LargeTreeMap.prototype._init = function (opts) {
        this.environment = opts.environment;
        this.cache = opts.cache;

        this.uid = opts.uid;
        this.selected_items = opts.selected_items;
        this.elID = opts.elID;
        this.labelsId = opts.labelsId;
        this.levels_number = opts.levels_number;

        this.language = opts.language;

        //pub/sub
        this.channels = {};
    };

    LargeTreeMap.prototype._updateProcessConfig = function (process, group_code, subgroup_code) {
        //process=s.process.first_level_process
        process[0].sid[0].uid = this.uid;
        process[0].parameters = this.selected_items;

        return process;
    }

    LargeTreeMap.prototype._getProcessedResourceForChart = function (processConfig) {
        var process = this._updateProcessConfig(processConfig);
        return this.bridge.getProcessedResource({body: processConfig, params: {language: this.language}});
    };

    LargeTreeMap.prototype._onSuccess = function (resource) {

        //Preparing series
        var series = '';
        if (this.levels_number == 2) {
            //Subgroup Data
            series = this._processSeries_firstLevel(resource);
            //Food Data
            series = this._processSeries_thirdLevel(resource, series);
        }
        else if (this.levels_number == 3) {
            //Group Data
            series = this._processSeries_firstLevel(resource);
            //Subgroup Data
            series = this._processSeries_secondLevel(resource, series);
            //Food Data
            series = this._processSeries_thirdLevel(resource, series);
        }

        this._setHTMLvariables();
        var chartConfig = this._getChartConfig(series);
        return this._renderChart(chartConfig);
    };

    LargeTreeMap.prototype._onError = function (resource) {
        log.info("_onError");
        log.error(resource);
    };

    LargeTreeMap.prototype._processSeries_firstLevel = function (resourceObj) {

        var resource;

        if (this.levels_number == 2) {
            resource = resourceObj.subgroup_data;
        }
        else if (this.levels_number == 3) {
            resource = resourceObj.group_data;
        }

        var metadata = resource.metadata;
        var data = resource.data;
        var columns = metadata.dsd.columns;

        var dataToChart = [];
        if (this.levels_number == 2) {

            var subgroup_code_id_index = '', value_index = '', subgroup_label_index = '', um_label_index = '';
            for (var i = 0; i < columns.length; i++) {

                if (columns[i].id == "subgroup_code") {
                    subgroup_code_id_index = i;
                }
                else if (columns[i].subject == "value") {
                    value_index = i;
                }
                else if (columns[i].id == "subgroup_code_" + this.language.toUpperCase()) {
                    subgroup_label_index = i;
                }
                else if (columns[i].id == "um_" + this.language.toUpperCase()) {
                    um_label_index = i;
                }
            }

            var dataToChart = [];

            if (data) {
                for (var i = 0; i < data.length; i++) {
                    var obj = {};
                    var it = data[i];

                    obj.name = it[subgroup_label_index];
                    obj.id = it[subgroup_code_id_index];
                    obj.value = Formatter.format(it[value_index]);
                    obj.unit = it[um_label_index];
                    dataToChart.push(obj);
                }
            }
        }
        else if (this.levels_number == 3) {
            var group_code_id_index = '', value_index = '', group_label_index = '', um_label_index = '';
            for (var i = 0; i < columns.length; i++) {
                if (columns[i].id == "group_code") {
                    group_code_id_index = i;
                }
                else if (columns[i].subject == "value") {
                    value_index = i;
                }
                else if (columns[i].id == "group_code_" + this.language.toUpperCase()) {
                    group_label_index = i;
                }
                else if (columns[i].id == "um_" + this.language.toUpperCase()) {
                    um_label_index = i;
                }
            }

            if (data) {
                for (var i = 0; i < data.length; i++) {
                    var obj = {};
                    var it = data[i];

                    obj.name = it[group_label_index];
                    obj.id = it[group_code_id_index];
                    obj.value = Formatter.format(it[value_index]);
                    obj.unit = it[um_label_index];
                    dataToChart.push(obj);
                }
            }
        }


        return dataToChart;
    };

    LargeTreeMap.prototype._processSeries_secondLevel = function (resourceObj, dataToChart) {

        var resource = resourceObj.subgroup_data;

        var metadata = resource.metadata;
        var data = resource.data;

        var columns = metadata.dsd.columns;

        var parent_group_code_id_index = '', subgroup_code_index = '', value_index = '', subgroup_label_index = '', um_label_index = '';
        for (var i = 0; i < columns.length; i++) {
            if (columns[i].id == "group_code") {
                parent_group_code_id_index = i;
            }
            if (columns[i].id == "subgroup_level_group_subgroup_code") {
                subgroup_code_index = i;
            }
            else if (columns[i].id == "subgroup_level_group_value") {
                value_index = i;
            }
            else if (columns[i].id == "subgroup_level_group_subgroup_code_" + this.language.toUpperCase()) {
                subgroup_label_index = i;
            }
            else if (columns[i].id == "um_" + this.language.toUpperCase()) {
                um_label_index = i;
            }
        }

        if (data) {
            for (var i = 0; i < data.length; i++) {
                var obj = {};
                var it = data[i];

                obj.parent = it[parent_group_code_id_index];
                obj.name = it[subgroup_label_index];
                obj.id = it[subgroup_code_index];
                obj.value = parseInt(parseInt(it[value_index], 10).toFixed(2), 10);
                obj.unit = it[um_label_index];

                dataToChart.push(obj);
            }
        }

        return dataToChart;
    };

    LargeTreeMap.prototype._processSeries_thirdLevel = function (resourceObj, dataToChart) {

        var resource = resourceObj.food_data;

        var metadata = resource.metadata;
        var data = resource.data;
        var columns = metadata.dsd.columns;

        var parent_subgroup_code_id_index = '', food_code_index = '', value_index = '', food_label_index = '', um_label_index = '';

        for (var i = 0; i < columns.length; i++) {
            if (columns[i].id == "subgroup_code") {
                parent_subgroup_code_id_index = i;
            }
            if (columns[i].id == "food_level_group_foodex2_code") {
                food_code_index = i;
            }
            else if (columns[i].id == "food_level_group_value") {
                value_index = i;
            }
            else if (columns[i].id == "food_level_group_foodex2_code_" + this.language.toUpperCase()) {
                food_label_index = i;
            }
            else if (columns[i].id == "um_" + this.language.toUpperCase()) {
                um_label_index = i;
            }
        }

        if (data) {
            for (var i = 0; i < data.length; i++) {
                var obj = {};
                var it = data[i];

                obj.parent = it[parent_subgroup_code_id_index];
                obj.name = it[food_label_index];
                obj.id = it[food_code_index];
                obj.value = parseInt(parseInt(it[value_index], 10).toFixed(2), 10);
                obj.unit = it[um_label_index];
                dataToChart.push(obj);
            }
        }

        return dataToChart;
    };

    LargeTreeMap.prototype._getChartConfig = function (s) {

        var colors = RC.treemapColors.slice(0);

        var series = _.map(s, function(ser){
            return ser.parent ?ser: $.extend(true, {color : colors.pop()}, ser);
        });

        var self = this;
        var chartConfig = {
            lang: {
                drillUpText: 'Back'
            },
            chart: {
                events: {
                    load: function (event) {
                        self._trigger("ready");
                    }
                }
            },
            series: [{
                type: 'treemap',
                layoutAlgorithm: 'squarified',
                allowDrillToNode: true,
                animationLimit: 1000,
                dataLabels: {
                    enabled: false
                },
                levelIsConstant: false,
                levels: [{
                    level: 1,
                    dataLabels: {
                        enabled: true
                    },
                    borderWidth: 3
                }],

                tooltip: {
                    pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.value}{point.unit}</b><br/>'
                },

                data: series
            }],
            title: {
                text: '',
                style: {
                    display: 'none'
                }
            },
            subtitle: {
                text: '',
                style: {
                    display: 'none'
                }
            },
            credits: {
                enabled: false
            }
        };

        return chartConfig;
    };

    LargeTreeMap.prototype._renderChart = function (chartConfig) {

        $('#' + this.elID).css({
            height: s.HEIGHT,
            width: s.WIDTH
        });

        this.chart = Highcharts.chart(this.elID, chartConfig);
    };

    LargeTreeMap.prototype._setHTMLvariables = function () {
        $('#' + this.labelsId + '-title').html(labels[this.language.toLowerCase()][this.labelsId + '_title']);
    };

    LargeTreeMap.prototype.redraw = function (animation) {
        if (animation) {
            this.chart.redraw(animation);
        }
        else {
            this.chart.redraw();
        }
    };

    LargeTreeMap.prototype.dispose = function () {
        //this.chart.destroy();
    };

    LargeTreeMap.prototype._trigger = function (channel) {

        if (!this.channels[channel]) {
            return false;
        }
        var args = Array.prototype.slice.call(arguments, 1);
        for (var i = 0, l = this.channels[channel].length; i < l; i++) {
            var subscription = this.channels[channel][i];
            subscription.callback.apply(subscription.context, args);
        }

        return this;
    };

    /**
     * pub/sub
     * @return {Object} component instance
     */
    LargeTreeMap.prototype.on = function (channel, fn, context) {
        var _context = context || this;
        if (!this.channels[channel]) {
            this.channels[channel] = [];
        }
        this.channels[channel].push({context: _context, callback: fn});
        return this;
    };


    return LargeTreeMap;
});