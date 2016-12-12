define([
    "underscore",
    "jquery",
    "loglevel",
    "../../../nls/labels",
    "../../charts/valueFormatter",
    "fenix-ui-bridge",
    "highcharts"
], function (_, $, log, labels, Formatter, Bridge, Highcharts) {

    var filter = {
            "name": "gift_population_filter",
            "sid": [],
        },
        s = {
            HEIGHT: 500,
            WIDTH: 500,
            title: "#donut-title",
            level_number: 1,
            process: {
                first_level_process: [
                    {
                        "name": "gift_population_filter",
                        "sid": [{"uid": "gift_process_total_food_consumption_000042BUR201001"}],
                        "parameters": {
                            "item": "ENERGY",
                            "gender": "2",
                            "special_condition": ["2"],
                            "age_year": {
                                "from": 10.5,
                                "to": 67
                            }
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
                        "sid": [{"uid": "gift_process_total_food_consumption_000042BUR201001"}],
                        "parameters": {
                            "item": "ENERGY",
                            "gender": "2",
                            "special_condition": ["2"],
                            "age_year": {
                                "from": 10.5,
                                "to": 67
                            }
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
                                "group_code": {
                                    "codes": [
                                        {
                                            "uid": "GIFT_FoodGroups",
                                            "codes": ["01"]
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
                ]
            },
            totalProcess: [

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
                    "name": "group",
                    "parameters": {
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
                }
            ]
        };

    function DonutHole(params) {

        if (!require.cache[require.resolveWeak("highcharts/modules/drilldown")]) {
            require('highcharts/modules/drilldown')(Highcharts);
        }
        if (!require.cache[require.resolveWeak("highcharts-no-data-to-display")]) {
            require('highcharts-no-data-to-display')(Highcharts);
        }

        this._init(params);

        this.bridge = new Bridge({
            environment: this.environment,
            cache: this.cache
        });

        this._setHTMLvariables();

        //get title
        var p = s.totalProcess.slice(0),
            f = $.extend(true, {}, filter);

        f.sid.push({
            uid: this.uid
        });

        f.parameters = this.selected_items;

        p.unshift(f);

        this.bridge.getProcessedResource({
            body: p, params: {language: this.language}
        })
            .then(
                _.bind(this._onTitleSuccess, this),
                _.bind(this._onError, this)
            );

        this._getProcessedResourceForChart(s.process.first_level_process)
            .then(
                _.bind(this._onSuccess, this),
                _.bind(this._onError, this)
            );
    }

    DonutHole.prototype._onTitleSuccess = function (success) {
        var r = success.data.length > 0 ? success.data[0] : [],
            title = Formatter.format(r[0]) + " " + r[2];

        if (r[0]){
            $(s.title).html(title);
        } else {
            $(s.title).html(" ");
        }

    };

    DonutHole.prototype._init = function (opts) {
        this.environment = opts.environment;
        this.cache = opts.cache;

        this.uid = opts.uid;
        this.selected_items = opts.selected_items;

        this.first_level_process = s.first_level_process;
        this.elID = opts.elID;

        this.language = opts.language;
        this.labelsId = opts.labelsId;
        //pub/sub
        this.channels = {};
    };

    DonutHole.prototype._updateProcessConfig = function (process, group_code) {

        process[0].sid[0].uid = this.uid;
        process[0].parameters = this.selected_items;

        if (group_code) {
            console.log(process[2])
            process[2].parameters.rows.group_code.codes[0].codes = group_code;
        }

        return process;
    };

    DonutHole.prototype._getProcessedResourceForChart = function (processConfig, group_code) {
        var process = this._updateProcessConfig(processConfig, group_code);
        //process=s.process.first_level_process
        return this.bridge.getProcessedResource({body: process, params: {language: this.language}});
    };

    DonutHole.prototype._onSuccess = function (resource) {

        var series = this._processSeries(resource);

        this._setHTMLvariables();

        var chartConfig = this._getChartConfig(series);

        return this._renderChart(chartConfig);
    };

    DonutHole.prototype._onError = function (resource) {

        log.info("_onError");
        log.error(resource)
    };

    DonutHole.prototype._processSeries = function (resource) {

        var self = this;
        var metadata = resource.metadata;
        var data = resource.data;

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
            return col.id == um_column_id + '_' + self.language.toUpperCase();
        });

        var codeLabelIdx = _.findIndex(columns, function (col) {
            return col.id == code_column_id + '_' + self.language.toUpperCase();
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

                dataToChart.push(obj);
            }
        }

        return dataToChart;
    };

    DonutHole.prototype._getProccessForSecondLevel = function (point, chart) {
        var self = this;
        var group_code = [];
        group_code.push(point.code);

        this._getProcessedResourceForChart(s.process.second_level_process, group_code).then(function (result) {
            if (result) {
                self._secondLevelOnSuccess(chart, point, result);
            } else {
                this._onError();
            }
        });
    };

    DonutHole.prototype._secondLevelOnSuccess = function (chart, point, resource) {

        var ser = this._processSeries(resource);

        var chart = chart,
            drilldowns = {};
        drilldowns[point.code] = {};
        drilldowns[point.code].name = point.name;
        drilldowns[point.code].data = ser;

        var series = drilldowns[point.code];

        // Show the loading label
        chart.showLoading('Loading ...');

        setTimeout(function () {
            chart.hideLoading();
            chart.addSeriesAsDrilldown(point, series);
        }, 1000);
    };

    DonutHole.prototype._getChartConfig = function (series) {

        var self = this,
            chartConfig = {
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
                            if (s.level_number != 2) {
                                s.level_number++;
                                if (!e.seriesOptions) {
                                    self._getProccessForSecondLevel(e.point, this);
                                }
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

                    floating: true,

                    labelFormatter: function () {
                        // do truncation here and return string
                        // this.name holds the whole label
                        // for example:
                        return this.name.slice(0, 15) + '...'
                    }
                },

                plotOptions: {
                    pie: {
                        size : 300,
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
                        borderWidth: 0
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

    DonutHole.prototype._renderChart = function (chartConfig) {

        $('#' + this.elID).css({
            height: s.HEIGHT,
            width: s.WIDTH
        });

        Highcharts.setOptions({
            lang: {
                drillUpText: '<< Back to {series.name}'
            }
        });

        this.chart = Highcharts.chart(this.elID, chartConfig);
    };

    DonutHole.prototype._setHTMLvariables = function () {
        $('#' + this.labelsId + '-title').html(labels[this.language.toLowerCase()][this.labelsId + '_title']);
    };

    DonutHole.prototype.redraw = function (animation) {
        if (animation) {
            this.chart.redraw(animation);
        }
        else {
            this.chart.redraw();
        }
    };

    DonutHole.prototype.dispose = function () {
        //this.chart.destroy();
    };

    DonutHole.prototype._trigger = function (channel) {

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

    DonutHole.prototype.on = function (channel, fn, context) {
        var _context = context || this;
        if (!this.channels[channel]) {
            this.channels[channel] = [];
        }
        this.channels[channel].push({context: _context, callback: fn});
        return this;
    };

    return DonutHole;
});