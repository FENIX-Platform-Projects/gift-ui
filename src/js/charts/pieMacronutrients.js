define([
    "underscore",
    "jquery",
    "loglevel",
    "fenix-ui-bridge",
    "highcharts"
], function (_, $, log, Bridge, Highcharts) {


    var s = {
        HEIGHT : 300,
        WIDTH : 300,
        process : [
            {
                "name": "filter",
                "sid" : [{"uid":"gift_process_total_food_consumption_000042BUR201001"}],
                "parameters": {
                    "rows": {
                        "item": {
                            "codes": [
                                {
                                    "uid": "GIFT_Items",
                                    "codes": [ "CARBOH", "PROTEIN", "FAT" ]
                                }
                            ]
                        }
                    }
                }
            },

            {
                "name": "gift_population_filter",
                "parameters": {
                    "gender": "2",
                    "special_condition": ["2"],
                    "age_year": {
                        "from": 10.5,
                        "to": 67
                    },
                    "age_month": {
                        "from": 10.5,
                        "to": 67
                    }
                }
            },

            {
                "name": "group",
                "parameters": {
                    "by": [
                        "item"
                    ],
                    "aggregations": [
                        {
                            "columns": [ "value" ],
                            "rule": "SUM"
                        }
                    ]
                }
            },

            {
                "name" : "select",
                "parameters" : {
                    "values" : {
                        "item" : null,
                        "value" : "case when item='CARBOH' then value*4 when item='PROTEIN' then value*4 when item='FAT' then value*9 end"
                    }
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
                "parameters": {
                    "column": {
                        "dataType": "code",
                        "id": "um",
                        "subject" : "um",
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

    function PieMacronutrientsChart(params) {

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

    PieMacronutrientsChart.prototype._init = function (opts) {
        this.environment = opts.environment;
        this.cache = opts.cache;

        this.uid = opts.uid;
        this.selected_items = opts.selected_items;
        this.process = s.process;
        this.elID = opts.elID;

        this.language = opts.language;
    };


    PieMacronutrientsChart.prototype._updateProcessConfig = function (process, group_code) {
        process[0].sid[0].uid = this.uid;
        if(this.selected_items){
            process[1].parameters = this.selected_items;
        }
        return process;
    }

    PieMacronutrientsChart.prototype._getProcessedResourceForChart = function (processConfig, group_code) {
        var process = this._updateProcessConfig(processConfig, group_code);

        return this.bridge.getProcessedResource({body: process, params: {language : this.language}});
    };

    PieMacronutrientsChart.prototype._onSuccess = function (resource) {
        var series = this._processSeries(resource);
        var chartConfig = this._getChartConfig(series);

        // console.log(chartConfig)

       return this._renderChart(chartConfig);
    };

    PieMacronutrientsChart.prototype._onError = function (resource) {

        log.info("_onError");
        log.error(resource)
        return;
    };

    PieMacronutrientsChart.prototype._processSeries = function (resource) {

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
            else if(columns[i].dataType == 'code'){
                code_index = i;
                code_column_id = columns[i].id;
            }
        }

        var umLabelIdx =  _.findIndex(columns, function (col ){
            return col.id== um_column_id +'_'+self.language;
        });

        var codeLabelIdx =  _.findIndex(columns, function (col ){
            return col.id== code_column_id +'_'+self.language;
        });

        var dataToChart = [];
        if(data) {
            for (var i = 0; i < data.length; i++) {
                var obj = {};

                var it = data[i];

                if (i == 0) {
                    obj.color = '#2e76b7';
                }
                else if (i == 1) {
                    obj.color = '#fcc00d';
                }
                else if (i == 2) {
                    obj.color = '#bf1818';
                }

                obj.y = it[value_index];
                obj.unit = it[umLabelIdx];
                obj.name = it[codeLabelIdx];
                obj.code = it[code_index];

                dataToChart.push(obj);
            }
        }

        return dataToChart;
    };

    PieMacronutrientsChart.prototype._getChartConfig = function (series) {


        var self = this;

        var chartConfig =  {
            chart: {
                type: 'pie',
                margin: [0, 0, 0, 0],
                spacingTop: 0,
                spacingBottom: 0,
                spacingLeft: 0,
                spacingRight: 0,
                backgroundColor:'rgba(255, 255, 255, 0)',
                events: {
                    load: function () {
                        //this.renderer.image('src/img/pie/background-alpha.svg', 0, 0, s.HEIGHT, s.WIDTH).add();
                    }
                }
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

            plotOptions: {
                pie: {
                    borderColor: '#000000',
                   // colors: ['#000000', '#fcc00d', '#bf1818'],
                    allowPointSelect: true,
                    center: ["50%", "50%"],
                    //set radius
                    size: '75%',
                    //labels inside the pie
                    dataLabels: {
                        enabled: true,
                        formatter: function () {
                            return '<span class="pie-label">' + Math.round(this.percentage * 100) / 100 + '%<span>';
                        },
                        style: {
                            textShadow: false
                        },
                        distance: -30
                    }
                }
            },

            tooltip: {
                formatter: function () {
                    return this.key + ': <b>' + this.y + '%</b>';
                }
            },

            //remove credits
            credits: {
                enabled: false
            },

            series: [{
                            name: 'Percentage',
                            data: series
                        }]

            // series: [{
            //     name: 'Percentage',
            //     data: [{
            //         name: 'Fats',
            //         color: '#2e76b7',
            //         y: 65
            //     }, {
            //         name: 'Carbohydrates',
            //         color: '#fcc00d',
            //         y: 82
            //     }, {
            //         name: 'Protein',
            //         color: '#bf1818',
            //         y: 12
            //     }]
            // }]
        };
        return chartConfig;

    };

    PieMacronutrientsChart.prototype._renderChart = function(chartConfig){

        // Make monochrome colors and set them as default for all pies
        // Highcharts.getOptions().plotOptions.pie.colors = (function () {
        //     var colors = [],
        //         base = Highcharts.getOptions().colors[0],
        //         i;
        //
        //     for (i = 0; i < 10; i += 1) {
        //         // Start out with a darkened base color (negative brighten), and end
        //         // up with a much brighter color
        //         colors.push(Highcharts.Color(base).brighten((i - 3) / 7).get());
        //     }
        //     return colors;
        // }());
        $('#' + this.elID).css({
            height: s.HEIGHT,
            width: s.WIDTH
        })
        this.chart = Highcharts.chart(this.elID, chartConfig);
    };

    PieMacronutrientsChart.prototype.dispose = function () {
        this.chart.destroy();
    };

    return PieMacronutrientsChart;
});