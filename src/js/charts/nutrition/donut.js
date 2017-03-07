define([
    "underscore",
    "jquery",
    "loglevel",
    "../../../nls/labels",
    "../../charts/valueFormatter",
    "../../../config/readyToUse/config",
    "fenix-ui-bridge",
    "highcharts"
], function (_, $, log, labels, Formatter, RC, Bridge, Highcharts) {

    var s = {
        HEIGHT: 500,
        WIDTH: 500,
        level_number: 1,
        process: {
            first_level_process: [
                {
                    "name": "gift_population_filter",
                    "sid": [{"uid": "GIFT_afc_000042BUR201001"}],
                    "parameters": {
                        "gender": "2",
                        "special_condition": ["2"],
                        "age_year": {
                            "from": 10.5,
                            "to": 67
                        }
                        // "age_month": {
                        //     "from": 10.5,
                        //     "to": 67
                        // }
                    }
                },

                {
                    "name" : "select",
                    "parameters" : {
                        "values" : {
                            "item" : null,
                            "group_code" : null,
                            "subgroup_code" : null,
                            "foodex2_code" : null,
                            "value" : "value/<<raw_data_population_size[0]>>",
                            "um" : null
                        }
                    }
                },
                {
                    "name": "filter",
                    "parameters": {
                        "columns": [
                            "group_code",
                            "value",
                            "um"
                        ],
                        "rows": {
                            "item": {
                                "codes": [
                                    {
                                        "uid": "GIFT_Items",
                                        "codes": [
                                            "IRON"
                                        ]
                                    }
                                ]
                            }
                        }
                    }
                },

                {
                    "name": "group",
                    "parameters": {
                        "by": [
                            "group_code"
                        ],
                        "aggregations": [
                            {
                                "columns": ["value"],
                                "rule": "SUM"
                            },
                            {
                                "columns": ["um"],
                                "rule": "max"
                            }
                        ]
                    }
                },
                {
                    "name": "order",
                    "parameters": {
                        "value": "DESC"
                    }
                }
            ],
            second_level_process: [
                {
                    "name": "gift_population_filter",
                    "sid": [{"uid": "GIFT_afc_000042BUR201001"}],
                    "parameters": {
                        "gender": "2",
                        "special_condition": ["2"],
                        "age_year": {
                            "from": 10.5,
                            "to": 67
                        }
                        // "age_month": {
                        //     "from": 10.5,
                        //     "to": 67
                        // }
                    }
                },
                {
                    "name" : "select",
                    "parameters" : {
                        "values" : {
                            "item" : null,
                            "group_code" : null,
                            "subgroup_code" : null,
                            "foodex2_code" : null,
                            "value" : "value/<<raw_data_population_size[0]>>",
                            "um" : null
                        }
                    }
                },

                {
                    "name": "filter",
                    "parameters": {
                        "columns": [
                            "subgroup_code",
                            "value",
                            "um"
                        ],
                        "rows": {
                            "item": {
                                "codes": [
                                    {
                                        "uid": "GIFT_Items",
                                        "codes": ["IRON"]
                                    }
                                ]
                            },
                            "group_code": {
                                "codes": [
                                    {
                                        "uid": "GIFT_FoodGroups",
                                        "codes": ["04"]
                                    }
                                ]
                            }
                        }
                    }
                },

                {
                    "name": "group",
                    "parameters": {
                        "by": [
                            "subgroup_code"
                        ],
                        "aggregations": [
                            {
                                "columns": ["value"],
                                "rule": "SUM"
                            },
                            {
                                "columns": ["um"],
                                "rule": "max"
                            }
                        ]
                    }
                },
                {
                    "name": "order",
                    "parameters": {
                        "value": "DESC"
                    }
                }
            ],
            third_level_process: [
                {
                    "name": "gift_population_filter",
                    "sid": [{"uid": "GIFT_afc_000042BUR201001"}],
                    "parameters": {
                        "gender": "2",
                        "special_condition": ["2"],
                        "age_year": {
                            "from": 10.5,
                            "to": 67
                        }
                        // "age_month": {
                        //     "from": 10.5,
                        //     "to": 67
                        // }
                    }
                },
                {
                    "name" : "select",
                    "parameters" : {
                        "values" : {
                            "item" : null,
                            "group_code" : null,
                            "subgroup_code" : null,
                            "foodex2_code" : null,
                            "value" : "value/<<raw_data_population_size[0]>>",
                            "um" : null
                        }
                    }
                },

                {
                    "name": "filter",
                    "parameters": {
                        "columns": [
                            "foodex2_code",
                            "value",
                            "um"
                        ],
                        "rows": {
                            "item": {
                                "codes": [
                                    {
                                        "uid": "GIFT_Items",
                                        "codes": ["IRON"]
                                    }
                                ]
                            },
                            "subgroup_code": {
                                "codes": [
                                    {
                                        "uid": "GIFT_FoodGroups",
                                        "codes": ["0104"]
                                    }
                                ]
                            }
                        }
                    }
                },

                {
                    "name": "group",
                    "parameters": {
                        "by": [
                            "foodex2_code"
                        ],
                        "aggregations": [
                            {
                                "columns": ["value"],
                                "rule": "SUM"
                            },
                            {
                                "columns": ["um"],
                                "rule": "max"
                            }
                        ]
                    }
                },
                {
                    "name": "order",
                    "parameters": {
                        "value": "DESC"
                    }
                }
            ]
        }
    };

    function ThreeLevDrilldown(params) {

        if (!require.cache[require.resolveWeak("highcharts/modules/drilldown")]) {
            require('highcharts/modules/drilldown')(Highcharts);
        }
        if (!require.cache[require.resolveWeak("highcharts-no-data-to-display")]) {
            require('highcharts-no-data-to-display')(Highcharts);
        }

        this._init(params);

        s.level_number = 1;

        this.bridge = new Bridge({
            environment: this.environment,
            cache: this.cache
        });
        this._setHTMLvariables();

        this._getProcessedResourceForChart(s.process.first_level_process)
            .then(
                _.bind(this._onSuccess, this),
                _.bind(this._onError, this)
            );
    }

    ThreeLevDrilldown.prototype._init = function (opts) {
        this.environment = opts.environment;
        this.cache = opts.cache;

        this.uid = opts.uid;
        this.selected_items = opts.selected_items;
        this.selected_config = opts.selected_config;
        this.elID = opts.elID;
        this.title = opts.title;

        this.language = opts.language;
        this.labelsId = opts.labelsId;
        //pub/sub
        this.channels = {};
    };

    ThreeLevDrilldown.prototype._updateProcessConfig = function (p, group_code, subgroup_code) {

        var process = p.slice(0);

        process[0].sid[0].uid = this.uid;
        process[0].parameters = this.selected_config;
        process[2].parameters.rows.item.codes[0].codes = this.selected_items;

        if (group_code) {
            process[2].parameters.rows.group_code.codes[0].codes = group_code;
        }
        if (subgroup_code) {
            process[2].parameters.rows.subgroup_code.codes[0].codes = subgroup_code;
        }

        return process;
    };

    ThreeLevDrilldown.prototype._getProcessedResourceForChart = function (processConfig, group_code, subgroup_code) {
        var process = this._updateProcessConfig(processConfig, group_code, subgroup_code);
        //process=s.process.first_level_process
        return this.bridge.getProcessedResource({body: process, params: {language: this.language}});
    };

    ThreeLevDrilldown.prototype._onSuccess = function (resource) {
        var series = this._processSeries(resource);

        this._setHTMLvariables();

        var chartConfig = this._getChartConfig(series);

        return this._renderChart(chartConfig);
    };

    ThreeLevDrilldown.prototype._onError = function (resource) {
        log.info("_onError");
        log.error(resource)

    };

    ThreeLevDrilldown.prototype._processSeries = function (resource) {

        var self = this;
        var metadata = resource.metadata;
        var data = resource.data;

        var colors = RC["chartColors"];
        var columns = metadata.dsd.columns;
        var um_index = '', value_index = '', code_index = '', code_column_id, um_column_id;

        for (var i = 0; i < columns.length; i++) {
            if (columns[i].subject == 'um') {
                um_index = i;
                um_column_id = columns[i].id;
            }
            else if (columns[i].subject == 'value') {
                value_index = i;
            }
            else if (columns[i].dataType == 'code') {
                code_index = i;
                code_column_id = columns[i].id;
            }
        }

        var umLabelIdx = _.findIndex(columns, function (col) {
            return col.id == um_column_id + '_' + self.language;
        });

        var codeLabelIdx = _.findIndex(columns, function (col) {
            return col.id == code_column_id + '_' + self.language;
        });

        var dataToChart = [];

        if (data) {
            for (var i = 0; i < data.length; i++) {
                var obj = {};
                var it = data[i];

                obj.y = Formatter.format(it[value_index]);
                obj.unit = it[umLabelIdx];
                obj.name = it[codeLabelIdx];
                obj.code = it[code_index];
                obj.drilldown = true;
                obj.color = colors[obj.code];

                dataToChart.push(obj);
            }
        }

        return dataToChart;
    };

    ThreeLevDrilldown.prototype._getProccessForOtherLevels = function (point, chart) {
        var self = this;
        var group_code = '';
        var subgroup_code = '';
        var process = '';
        if (s.level_number == 2) {
            //Second level
            group_code = [];
            group_code.push(point.code);
            process = s.process.second_level_process;
        }
        else if (s.level_number == 3) {
            //Second level
            subgroup_code = [];
            subgroup_code.push(point.code);
            process = s.process.third_level_process.slice(0);
        }

        // Show the loading label
        chart.showLoading('Loading ...');

        self.level = s.level_number;

        this._getProcessedResourceForChart(process, group_code, subgroup_code)
            .then(function (result) {
                if (result) {
                    self._otherLevelOnSuccess(chart, point, result);
                } else {
                    this._onError();
                }
            });
    };

    ThreeLevDrilldown.prototype._otherLevelOnSuccess = function (chart, point, resource) {
        var ser = this._processSeries(resource);

        var chart = chart,
            drilldowns = {};
        drilldowns[point.code] = {};
        drilldowns[point.code].name = point.name;
        drilldowns[point.code].data = ser;

        var series = drilldowns[point.code];
        chart.hideLoading();
        chart.addSeriesAsDrilldown(point, series);

    };


    ThreeLevDrilldown.prototype._getChartConfig = function (series) {
        var self = this;

        var chartConfig = {
            lang: {
                drillUpText: 'Back'
            },
            chart: {
                type: 'pie',
                events: {
                                        load: function (event) {
                     self._trigger("ready");
                     },
                    drillup: function () {
                        s.level_number--;
                    },
                    drilldown: function (e) {

                        if (s.level_number != 3) {
                            s.level_number++;
                            if (e.point) {
                                self._getProccessForOtherLevels(e.point, this);
                            } else {
                                console.log("impossible to find point")
                            }
                        }
                        else {
                            console.log("no drildown because level_number is 3")
                        }
                    }
                }
            },
            title: {
                text: null
            },
            xAxis: {
                type: 'category'
            },

            legend: {
                enabled: true,
                floating: false,

                /*labelFormatter: function () {
                 // do truncation here and return string
                 // this.name holds the whole label
                 // for example:
                 return this.name.slice(0, 15) + '...'
                 }
                 //  layout: "hori"*/
            },
            plotOptions: {
                pie: {
                    dataLabels: {
                        enabled: false,
                        style: {
                            width: '80px'
                        }
                    },
                    showInLegend: true,
                    innerSize: '40%'
                },

                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: false
                    }
                }
            },

            tooltip: {
                formatter: function () {
                    return this.key + ': <b>  ' + this.y + ' ' + this.point.unit + '</b>';
                }
            },

            //remove credits
            credits: {
                enabled: false
            },

            series: [{
                name: 'Items',
                colorByPoint: true,
                data: series
            }]
        };

        return chartConfig;
    };

    ThreeLevDrilldown.prototype._renderChart = function (chartConfig) {

        $('#' + this.elID).css({
            height: s.HEIGHT,
            width: s.WIDTH
        });

        window.fx_req_id >= 0 ? window.fx_req_id++ : window.fx_req_id = 0;

        var id = 'test-chart-'+window.fx_req_id;

        var el = $("<div id='"+id+"'></div>");

        $('#' +this.elID).html(el);

        $(id).css({
            height: s.HEIGHT,
            width: s.WIDTH
        });

        //console.log($.fn.highcharts)
        //console.log($("#" + id).length)

        this.chart = Highcharts.chart(id, chartConfig);
    };

    ThreeLevDrilldown.prototype._setHTMLvariables = function () {


        var lang = this.language.toLowerCase(),
            prefix = labels[lang][this.labelsId + '_title_firstPart'],
            postfix = labels[lang][this.labelsId + '_title_secondPart'],
            nutrient = "<span class='title-nutrient'>" + ( this.title || " - " ) + "</span>",
            title = prefix + " " + nutrient + " " + postfix;

        $('#' + this.labelsId + '-title').html(title);
    };

    ThreeLevDrilldown.prototype.redraw = function (animation) {
        if (animation) {
            this.chart.redraw(animation);
        }
        else {
            this.chart.redraw();
        }
    };

    ThreeLevDrilldown.prototype.dispose = function () {

        //this.chart.destroy();
    };

    ThreeLevDrilldown.prototype._trigger = function (channel) {

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
    ThreeLevDrilldown.prototype.on = function (channel, fn, context) {
        var _context = context || this;
        if (!this.channels[channel]) {
            this.channels[channel] = [];
        }
        this.channels[channel].push({context: _context, callback: fn});
        return this;
    };

    return ThreeLevDrilldown;
});