define([
    "underscore",
    "jquery",
    "loglevel",
    "fenix-ui-bridge",
    "highcharts"
], function (_, $, log, Bridge, Highcharts) {


    var s = {
        HEIGHT: 500,
        WIDTH: 500,
        first_level_process: [
            {
                "name": "filter",
                "sid": [{"uid": "GIFT_afc_000042BUR201001"}],
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
                                    "codes": ["IRON"]
                                }
                            ]
                        },
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
                "name": "filter",
                "sid": [{"uid": "GIFT_afc_000042BUR201001"}],
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
            }
        ]
    };

    function DonutChart(params) {

        // Load Exporting Module after Highcharts loaded
        require('highcharts/modules/drilldown')(Highcharts);

        this._init(params);

        this.bridge = new Bridge({
            environment: this.environment,
            cache: this.cache
        });

        this._getProcessedResourceForChart(s.first_level_process).then(
            _.bind(this._onSuccess, this),
            _.bind(this._onError, this)
        );
    }

    DonutChart.prototype._init = function (opts) {
        this.environment = opts.environment;
        this.cache = opts.cache;

        this.uid = opts.uid;
        this.selected_items = opts.selected_items;
        this.first_level_process = s.first_level_process;
        this.elID = opts.elID;

        this.language = opts.language;

        //pub/sub
        this.channels = {};
    };

    DonutChart.prototype._updateProcessConfig = function (process, group_code) {
        process[0].sid[0].uid = this.uid;
        // "codes": [ "IRON" ]
        process[0].parameters.rows.item.codes[0].codes = this.selected_items;

        if (group_code) {
            process[0].parameters.rows.group_code.codes[0].codes = group_code;
        }

        return process;
    }

    DonutChart.prototype._getProcessedResourceForChart = function (processConfig, group_code) {
        var process = this._updateProcessConfig(processConfig, group_code);

        return this.bridge.getProcessedResource({body: process, params: {language: this.language}});
    };

    DonutChart.prototype._onSuccess = function (resource) {
        var series = this._processSeries(resource);
        var chartConfig = this._getChartConfig(series);
        return this._renderChart(chartConfig);
    };

    DonutChart.prototype._onError = function (resource) {
        log.info("_onError");
        log.error(resource)
    };

    DonutChart.prototype._processSeries = function (resource) {

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

                obj.y = it[value_index];
                obj.unit = it[umLabelIdx];
                obj.name = it[codeLabelIdx];
                obj.code = it[code_index];
                obj.drilldown = true;

                dataToChart.push(obj);
            }
        }

        return dataToChart;
    };

    DonutChart.prototype._getProccessForSecondLevel = function (point, chart) {
        var self = this;
        var group_code = [];
        group_code.push(point.code);

        this._getProcessedResourceForChart(s.second_level_process, group_code).then(function (result) {
            if (result) {
                self._secondLevelOnSuccess(chart, point, result);
            } else {
                this._onError();
            }
        });
    }

    DonutChart.prototype._secondLevelOnSuccess = function (chart, point, resource) {

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


    DonutChart.prototype._getChartConfig = function (series) {

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
                    drilldown: function (e) {
                        if (!e.seriesOptions) {
                            self._getProccessForSecondLevel(e.point, this);
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
                enabled: false
            },

            plotOptions: {
                pie: {
                    dataLabels: {
                        style: {
                            width: '200px'
                        }
                    }
                },
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true
                    }
                }
            },

            tooltip: {
                formatter: function () {
                    return this.key + ': <b>  ' + Highcharts.numberFormat(this.y, 2) + ' ' + this.point.unit + '</b>';
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
            }],

            drilldown: {
                series: []
            }
        };

        return chartConfig;
    };

    DonutChart.prototype._renderChart = function (chartConfig) {

        $('#' + this.elID).css({
            height: s.HEIGHT,
            width: s.WIDTH
        })
        this.chart = Highcharts.chart(this.elID, chartConfig);
    };

    DonutChart.prototype.redraw = function (animation) {
        if (animation) {
            this.chart.redraw(animation);
        }
        else {
            this.chart.redraw();
        }
    };

    DonutChart.prototype.dispose = function () {
        this.chart.destroy();
    };

    DonutChart.prototype._trigger = function (channel) {

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
    DonutChart.prototype.on = function (channel, fn, context) {
        var _context = context || this;
        if (!this.channels[channel]) {
            this.channels[channel] = [];
        }
        this.channels[channel].push({context: _context, callback: fn});
        return this;
    };

    return DonutChart;
});