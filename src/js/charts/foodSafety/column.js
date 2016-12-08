define([
    "underscore",
    "jquery",
    "loglevel",
    "../../../nls/labels",
    "fenix-ui-bridge",
    "highcharts"
], function (_, $, log, labels, Bridge, Highcharts) {

    var s = {
        HEIGHT: 300,
        WIDTH: 300,
        DAY: "/day",
        process: [
            {
                "name": "gift_population_filter",
                "sid": [{"uid": "gift_process_food_consumption_000042BUR201001"}],
                "parameters": {
                    "item": "FOOD_AMOUNT_PROC",
                    "gender": "2",
                    "special_condition": ["1"],
                    "age_year": {
                        "from": 10.5,
                        "to": 67
                    }
                }
            },

            {
                "name": "asTable"
            },

            {
                "name": "gift_std_percentile",
                "parameters": {
                    "percentileSize": 5,
                    "group": "02",
                    "subgroup": "0201",
                    "food": null
                }
            }

        ],
        // process : [
        //     {
        //         "name": "gift_population_filter",
        //         "sid": [ { "uid": "gift_process_total_food_consumption_000042BUR201001" } ],
        //         "parameters": {
        //             "item": "FOOD_AMOUNT_PROC",
        //             "gender": "2",
        //             "special_condition": ["1"],
        //             "age_year": {
        //                 "from": 10.5,
        //                 "to": 67
        //             }
        //         }
        //     },
        //     {
        //         "name": "filter",
        //         "parameters": {
        //             "columns": [
        //                 "subject",
        //                 "item",
        //                 "value",
        //                 "um"
        //             ],
        //             "rows": {
        //                 "group_code": {
        //                     "codes": [
        //                         {
        //                             "uid": "GIFT_FoodGroups",
        //                             "codes": [ "01" ]
        //                         }
        //                     ]
        //                 }
        //             }
        //         }
        //     },
        //     {
        //         "name": "group",
        //         "parameters": {
        //             "by": [
        //                 "subject",
        //                 "item"
        //             ],
        //             "aggregations": [
        //                 {
        //                     "columns": [ "value" ],
        //                     "rule": "SUM"
        //                 },
        //                 {
        //                     "columns": [ "um" ],
        //                     "rule": "max"
        //                 }
        //             ]
        //         }
        //     },
        //     {
        //         "name": "asTable"
        //     },
        //     {
        //         "name": "gift_average_percentile",
        //         "parameters": {
        //             "percentileSize" : 5
        //         }
        //     }
        // ]

    };

    function ColumnChart(params) {

        this._init(params);

        this.bridge = new Bridge({
            environment: this.environment,
            cache: this.cache
        });

        //force title to display before request for usability
        this._setHTMLvariables([{}, {}, {}, {}]);

        this._getProcessedResourceForChart(s.process).then(
            _.bind(this._onSuccess, this),
            _.bind(this._onError, this)
        );
    }

    ColumnChart.prototype._init = function (opts) {


        this.environment = opts.environment;
        this.cache = opts.cache;

        this.uid = opts.uid;
        this.selected_items = opts.selected_items;
        this.selected_group = opts.selected_group;
        this.process_name = opts.process_name;
        this.process = s.process;

        this.elID = opts.elID;
        this.labelsId = opts.labelsId;
        this.columnAmountID = opts.columnAmountID;
        this.columnBarID = opts.columnBarID;
        this.columnPercentageID = opts.columnPercentageID;
        this.columnPercentageItemID = opts.columnPercentageItemID;
        this.columnPercentageItemLabel = opts.columnPercentageItemLabel;
        this.language = opts.language;
        this.filter = opts.filter;

        //pub/sub
        this.channels = {};
    };

    ColumnChart.prototype._updateProcessConfig = function (process) {

        process[0].sid[0].uid = this.uid;

        if (this.selected_items) {
            process[0].parameters = this.selected_items;
        }

        if (this.selected_group) {
            process[2].parameters = this.selected_group;
        }

        if (this.process_name) {
            process[2].name = this.process_name;
        }

        return process;
    };

    ColumnChart.prototype._getProcessedResourceForChart = function (processConfig) {
        var process = this._updateProcessConfig(processConfig);

        return this.bridge.getProcessedResource({body: process, params: {language: this.language}});
    };

    ColumnChart.prototype._onSuccess = function (resource) {
        var data = this._processSeries(resource);
        this._setHTMLvariables(data);
        var chartConfig = this._getChartConfig();
        return this._renderChart(chartConfig);
    };

    ColumnChart.prototype._onError = function (resource) {
        log.info("_onError");
        log.error(resource)
        return;
    };

    ColumnChart.prototype._getChartConfig = function () {

        var self = this;
        var chartConfig = {
            chart: {
                type: 'column',
                animation: false,
                margin: [10, 10, 10, 10],
                spacingTop: 0,
                spacingBottom: 0,
                spacingLeft: 0,
                spacingRight: 0,
                events: {
                    load: function (event) {
                        self._trigger("ready");
                    }
                }
            },

            tooltip: {
                enabled: false
            },

            //hide xAxis
            xAxis: {
                categories: ['1', '2', '3'],
                lineWidth: 0,
                minorGridLineWidth: 0,
                lineColor: 'transparent',
                gridLineColor: 'transparent',
                labels: {
                    enabled: false
                },
                minorTickLength: 0,
                tickLength: 0
            },

            //hide yAxis
            yAxis: {
                gridLineWidth: 0,
                minorGridLineWidth: 0,
                min: 0,
                max: 100,
                lineWidth: 0,
                lineColor: 'transparent',

                title: {
                    enabled: false
                },

                labels: {
                    enabled: false
                },
                minorTickLength: 0,
                tickLength: 0
            },

            //remove title and subtitle
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

            //remove credits
            credits: {
                enabled: false
            },

            //hide legend
            legend: {
                enabled: false
            },

            plotOptions: {
                series: {
                    animation: false
                }
            },

            series: [{
                data: [5, 50, 5],
                pointWidth: 80
            }]
        };

        return chartConfig;
    };

    ColumnChart.prototype._renderChart = function (chartConfig) {
        $('#' + this.elID).css({
            height: s.HEIGHT,
            width: s.WIDTH
        })
        this.chart = Highcharts.chart(this.elID, chartConfig);
    };

    ColumnChart.prototype._processSeries = function (resource) {

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
            else if (columns[i].subject == 'item') {
                code_index = i;
                code_column_id = columns[i].id;
            }
        }

        var umLabelIdx = _.findIndex(columns, function (col) {
            return col.id == um_column_id + '_' + self.language;
        });

        var htmlData = [];
        if (data) {
            for (var i = 0; i < data.length; i++) {
                var obj = {};

                var it = data[i];
                obj.valueFormat = it[value_index].toFixed(2);
                obj.value = it[value_index];
                obj.unit = it[umLabelIdx];

                htmlData.push(obj);
            }
        }

        return htmlData;
    };

    ColumnChart.prototype._setHTMLvariables = function (dataToChart) {

        //Progress bar
        $(this.columnBarID).css({
            width: dataToChart[0].value + dataToChart[0].unit
        });
        $('#' + this.labelsId + '-title').html(labels[this.language.toLowerCase()][this.labelsId + '_title'] + ": " + this.columnPercentageItemLabel);

        $(this.columnPercentageID).html(dataToChart[0].valueFormat + dataToChart[0].unit);
        $(this.columnPercentageItemID).html(this.columnPercentageItemLabel);
        $(this.columnAmountID.low).html(dataToChart[1].valueFormat + " " + dataToChart[1].unit + s.DAY);
        $(this.columnAmountID.middle).html(dataToChart[2].valueFormat + " " + dataToChart[2].unit + s.DAY);
        $(this.columnAmountID.high).html(dataToChart[3].valueFormat + " " + dataToChart[3].unit + s.DAY);
    };

    ColumnChart.prototype.redraw = function (animation) {
        //this.chart.yAxis[0].isDirty = true;
        if (animation) {
            this.chart.redraw(animation);
        }
        else {
            this.chart.redraw();
        }
    };

    ColumnChart.prototype.dispose = function (opts) {
        //this.chart.destroy();
    };

    ColumnChart.prototype._trigger = function (channel) {

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

    ColumnChart.prototype.on = function (channel, fn, context) {
        var _context = context || this;
        if (!this.channels[channel]) {
            this.channels[channel] = [];
        }
        this.channels[channel].push({context: _context, callback: fn});
        return this;
    };

    return ColumnChart;
});