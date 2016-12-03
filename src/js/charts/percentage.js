define([
    "underscore",
    "jquery",
    "loglevel",
    "fenix-ui-bridge",
    "highcharts"
], function (_, $, log, Bridge, Highcharts) {

    var s = {
        HEIGHT : 200,
        WIDTH : 300,
        process : [
            {
                "name": "gift_population_filter",
                "sid": [ { "uid": "gift_process_total_food_consumption_000042BUR201001" } ],
                "parameters": {
                    "item": "VITA",
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
                "name": "filter",
                "parameters": {
                    "columns": [
                        "subject",
                        "value",
                        "suggested_value",
                        "um"
                    ],
                    "rows": {
                        "age_year": {
                            "number": [
                                {
                                    "from": 1
                                }
                            ]
                        }
                    }
                }
            },

            {
                "name": "group",
                "rid" : { "uid" : "subjects_data" },
                "parameters": {
                    "by": [
                        "subject"
                    ],
                    "aggregations": [
                        {
                            "columns": [ "value" ],
                            "rule": "SUM"
                        },
                        {
                            "columns": [ "suggested_value" ],
                            "rule": "MAX"
                        },
                        {
                            "columns": [ "um" ],
                            "rule": "MAX"
                        }
                    ]
                }
            },


            {
                "name" : "select",
                "parameters" : {
                    "values" : {
                        "value" : "count(*)"
                    }
                }
            },

            {
                "name" : "var",
                "result" : false,
                "parameters" : {
                    "global" : true,
                    "variables" : [
                        {
                            "key" : "populationSize",
                            "type" : "id",
                            "value" : "value"
                        }
                    ]
                }
            },


            {
                "name" : "select",
                "sid" : [{ "uid" : "subjects_data" }],
                "parameters" : {
                    "values" : {
                        "value" : "(count(*)*100.0)/<<populationSize[0]>>"
                    },
                    "query" : "where value<suggested_value"
                }
            },

            {
                "name": "addcolumn",
                "parameters": {
                    "column": {
                        "dataType": "code",
                        "title": {
                            "EN": "Unit of measure"
                        },
                        "domain": {
                            "codes": [
                                {
                                    "idCodeList": "GIFT_UM"
                                }
                            ]
                        },
                        "subject": "um",
                        "id": "um"
                    },
                    "value": "perc"
                }
            }
        ]
    };

    function PercentageChart(params) {

        this._init(params);

        this.bridge = new Bridge({
            environment :  this.environment,
            cache :  this.cache
        });

        this._getProcessedResourceForChart(s.process).then(
            _.bind(this._onSuccess, this),
            _.bind(this._onError, this)
        );
    }

    PercentageChart.prototype._init = function (opts) {

        this.environment = opts.environment;
        this.cache = opts.cache;

        this.uid = opts.uid;
        this.selected_items = opts.selected_items;
        this.process = s.process;

        this.elID = opts.elID;
        this.barID = opts.barID;

        this.language = opts.language;
    };

    PercentageChart.prototype._updateProcessConfig = function (process) {

        process[0].sid[0].uid = this.uid;

        if(this.selected_items){
            process[0].parameters = this.selected_items;
        }
        return process;
    }

    PercentageChart.prototype._getProcessedResourceForChart = function (processConfig) {
        var process = this._updateProcessConfig(processConfig);

        return this.bridge.getProcessedResource({body: process, params: {language : this.language}});
    };

    PercentageChart.prototype._onSuccess = function (resource) {
        var data = this._processSeries(resource);
        this._setHTMLvariables(data);
        var series = this._dataToChartSeries(data);
        var chartConfig = this._getChartConfig(series);
        return this._renderChart(chartConfig);
    };

    PercentageChart.prototype._onError = function (resource) {
        log.info("_onError");
        log.error(resource)
        return;
    };

    PercentageChart.prototype._getChartConfig = function (series) {

        var chartConfig = {

            chart: {
                type: 'bar',
                margin: [0, 0, 0, 0],
                spacingTop: 0,
                spacingBottom: 0,
                spacingLeft: 0,
                spacingRight: 0
            },

            //hide xAxis
            xAxis: {
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
                min : 0,
                max :100,
                gridLineWidth: 0,
                minorGridLineWidth: 0,
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

            tooltip: {
                formatter: function () {
                    return '<b>' + this.y + '%</b>';
                }
            },

            plotOptions: {
                series: {
                    stacking: 'normal'
                }
            },

            series : series
        };

        return chartConfig;
    };



    PercentageChart.prototype._getChartConfig2 = function () {

        var self = this;
        var chartConfig =  {
            chart: {
                type: 'column',
                margin: [10, 10, 10, 10],
                spacingTop: 0,
                spacingBottom: 0,
                spacingLeft: 0,
                spacingRight: 0
            },

            //hide xAxis
            xAxis: {
                categories: ['1'],
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

            tooltip: {
                formatter: function () {
                    return '<b>' + this.y + '</b>';
                }
            },

            series: [{
                data: [10],
                pointWidth: 80
            }]
        };

        return chartConfig;
    };

    PercentageChart.prototype._renderChart = function(chartConfig){
        $('#' + this.elID).css({
            height: s.HEIGHT,
            width: s.WIDTH
        })
        this.chart = Highcharts.chart(this.elID, chartConfig);
    };

    PercentageChart.prototype._processSeries = function (resource) {

        var self = this;
        var metadata = resource.metadata;
        var data = resource.data;

        var columns = metadata.dsd.columns;
        var um_index='', value_index= '', code_index = '', code_column_id, um_column_id;

        for(var i=0; i< columns.length;i++){
            if(columns[i].subject == 'um')
            {
                um_index = i;
                um_column_id = columns[i].id;
            }
            else if(columns[i].subject == 'value')
            {
                value_index = i;
            }
        }

        var umLabelIdx =  _.findIndex(columns, function (col ){
            return col.id== um_column_id +'_'+self.language;
        });

        var htmlData = [];
        if(data) {
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

    PercentageChart.prototype._dataToChartSeries = function (htmlData) {

        var atRisk = parseInt(htmlData[0].valueFormat,10);
        var notAtRisk = 100-atRisk;
        var atRiskValues = [];
        atRiskValues.push(atRisk);
        var notAtRiskValues = [];
        notAtRiskValues.push(notAtRisk);

        var series= [
            {
                name: 'At risk',
                color: 'red',
                pointWidth: 200,
                data: atRiskValues
            },{
                name: 'Not at risk',
                color: '#333333',
                pointWidth: 200,
                data: notAtRiskValues
            }]

        return series;
    };

    PercentageChart.prototype._setHTMLvariables = function (dataToChart) {
        //Progress bar
        $(this.barID).html(dataToChart[0].valueFormat + dataToChart[0].unit);
    }

    PercentageChart.prototype.dispose = function (opts) {
        this.chart.destroy();
    };

    return PercentageChart;
});