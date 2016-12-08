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
        process = {
            firstLevel: [
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
            secondLevel: [
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
            thirdLevel: [
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
        };

    function Donut(params) {

        require('highcharts/modules/drilldown')(Highcharts);
        require('highcharts-no-data-to-display')(Highcharts);

        this._init(params);

        this.bridge = new Bridge({
            environment: this.environment,
            cache: this.cache
        });


        var chartConfig = this._getChartConfig();

        console.log("ALTRO")
        console.log(JSON.stringify(chartConfig))


        return this._renderChart(chartConfig);



        var p = process.firstLevel.slice(0),
            f = $.extend(true, {}, filter);

        f.sid.push({
            uid : "gift_process_total_weighted_food_consumption_" + this.uid
        });

        f.parameters = this.parameters;

        p.unshift(f);

            this.bridge.getProcessedResource({
                body: p,
                params: {language: "EN"}
            }).then(
                _.bind(this._onSuccess, this),
                _.bind(this._onError, this)
            );
    }

    Donut.prototype._init = function (opts) {

        this.environment = opts.environment;
        this.cache = opts.cache;

        this.uid = opts.uid;
        this.parameters = opts.parameters;
        this.el = opts.el;
        this.lang = opts.lang || "EN";
        this.lang = this.lang.toUpperCase();
        this.labelsId = opts.labelsId;
        //pub/sub
        this.channels = {};
    };

    Donut.prototype._updateProcessConfig = function (p, group_code, subgroup_code) {

        var process = p.slice(0);

        process[0].sid[0].uid = this.uid;
        process[0].parameters = this.selected_config;
        process[1].parameters.rows.item.codes[0].codes = this.selected_items;

        if (group_code) {
            process[1].parameters.rows.group_code.codes[0].codes = group_code;
        }
        if (subgroup_code) {
            process[1].parameters.rows.subgroup_code.codes[0].codes = subgroup_code;
        }

        return process;
    };


    Donut.prototype._getProcessedResourceForChart = function (processConfig, group_code, subgroup_code) {
        var process = this._updateProcessConfig(processConfig, group_code, subgroup_code);

    };

    Donut.prototype._onSuccess = function (resource) {

       // var series = this._processSeries(resource);

        var chartConfig = this._getChartConfig(series);

        return this._renderChart(chartConfig);
    };

    Donut.prototype._onError = function (resource) {
        log.info("_onError");
        log.error(resource)

    };

    Donut.prototype._processSeries = function (r) {

        var resource = r || {},
            metadata = resource.metadata,
            data = resource.data,
            dsd = metadata.dsd || {},
            columns = dsd.columns || [];

        // columns

        var um = _.findWhere(columns, {id : "um"}),
            value = _.findWhere(columns, {id : "value"}),
            groupCode = _.findWhere(columns, {id : "group_code"}),
            umLabel = _.findWhere(columns, {id : "um_" + this.lang}),
            groupCodeLabel = _.findWhere(columns, {id : "group_code_" + this.lang});

        var indexUm = _.findIndex(columns, um),
            indexValue = _.findIndex(columns, value),
            indexGroupCode = _.findIndex(columns, groupCode),
            indexUmLabele = _.findIndex(columns, umLabel),
            indexGroupCodeLabel = _.findIndex(columns, groupCodeLabel);

        var d = [];

        _.each(data, function(row) {

            d.push({
                name: row[indexGroupCodeLabel],
                y: Formatter.format(row[indexValue]),
                drilldown: true
            });

        });

        var result = [{
            name: 'Groups',
            colorByPoint: true,
            data: d
        }];

        return result;
    };

    Donut.prototype._getProccessForOtherLevels = function (point, chart) {
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

    Donut.prototype._otherLevelOnSuccess = function (chart, point, resource) {
        var ser = this._processSeries(resource);

        var chart = chart,
            drilldowns = {};
        drilldowns[point.code] = {};
        drilldowns[point.code].name = point.name;
        drilldowns[point.code].data = ser;

        var series = drilldowns[point.code];
        console.log("series", series)
        chart.hideLoading();
        chart.addSeriesAsDrilldown(point, series);

    };


    Donut.prototype._getChartConfig = function () {

        return {
            chart: {
                type: 'pie',
                events: {
                    drilldown: function (e) {

                        console.log("drilldown event")
                        if (!e.seriesOptions) {

                            var chart = this,
                                drilldowns = {
                                    'Animals': {
                                        name: 'Animals',
                                        data: [
                                            ['Cows', 2],
                                            ['Sheep', 3]
                                        ]
                                    },
                                    'Fruits': {
                                        name: 'Fruits',
                                        data: [
                                            ['Apples', 5],
                                            ['Oranges', 7],
                                            ['Bananas', 2]
                                        ]
                                    },
                                    'Cars': {
                                        name: 'Cars',
                                        data: [
                                            ['Toyota', 1],
                                            ['Volkswagen', 2],
                                            ['Opel', 5]
                                        ]
                                    }
                                },
                                series = drilldowns[e.point.name];

                            // Show the loading label
                            chart.showLoading('Simulating Ajax ...');

                            setTimeout(function () {
                                chart.hideLoading();
                                chart.addSeriesAsDrilldown(e.point, series);
                            }, 1000);
                        }

                    }
                }
            },

            xAxis: {
                type: 'category'
            },

            legend: {
                enabled: false
            },

            plotOptions: {
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true
                    }
                }
            },

            series: [{
                name: 'Things',
                colorByPoint: true,
                data: [{
                    name: 'Animals',
                    y: 5,
                    drilldown: true
                }, {
                    name: 'Fruits',
                    y: 2,
                    drilldown: true
                }, {
                    name: 'Cars',
                    y: 4,
                    drilldown: true
                }]
            }],

            drilldown: {
                series: []
            }
        }
    };

    Donut.prototype._renderChart = function (chartConfig) {

        console.log(JSON.stringify(chartConfig))

        Highcharts.chart("container", chartConfig);
    };

    Donut.prototype._setHTMLvariables = function () {

        var lang = this.language.toLowerCase(),
            prefix = labels[lang][this.labelsId + '_title_firstPart'],
            postfix = labels[lang][this.labelsId + '_title_secondPart'],
            nutrient = "<span class='title-nutrient'>" + ( this.title || " - " ) + "</span>",
            title = prefix + " " + nutrient + " " + postfix;

        $('#' + this.labelsId + '-title').html(title);
    };

    Donut.prototype.redraw = function (animation) {
        if (animation) {
            this.chart.redraw(animation);
        }
        else {
            this.chart.redraw();
        }
    };

    Donut.prototype.dispose = function () {
        console.log(Highcharts.charts)
        this.chart.destroy();

        console.log("DESTROYED")
    };

    Donut.prototype._trigger = function (channel) {

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
    Donut.prototype.on = function (channel, fn, context) {
        var _context = context || this;
        if (!this.channels[channel]) {
            this.channels[channel] = [];
        }
        this.channels[channel].push({context: _context, callback: fn});
        return this;
    };

    return Donut;
});