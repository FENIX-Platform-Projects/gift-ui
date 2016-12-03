define([
    "underscore",
    "jquery",
    "loglevel",
    "fenix-ui-bridge",
    "highcharts"
], function (_, $, log, Bridge, Highcharts) {

    var s = {
        HEIGHT : 500,
        WIDTH : 500,
        level_number: 1,
        process : {
            first_level_process :
                [
                    {
                        "name": "gift_population_filter",
                        "sid": [ { "uid": "gift_process_total_weighted_food_consumption_000042BUR201001" } ],
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
                                    "columns": [ "value" ],
                                    "rule": "SUM"
                                },
                                {
                                    "columns": [ "um" ],
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
            second_level_process : [
                {
                    "name": "gift_population_filter",
                    "sid": [ { "uid": "gift_process_total_weighted_food_consumption_000042BUR201001" } ],
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
                                        "codes": [ "IRON" ]
                                    }
                                ]
                            },
                            "group_code": {
                                "codes": [
                                    {
                                        "uid": "GIFT_FoodGroups",
                                        "codes": [ "04" ]
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
                                "columns": [ "value" ],
                                "rule": "SUM"
                            },
                            {
                                "columns": [ "um" ],
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
            third_level_process : [
                {
                    "name": "gift_population_filter",
                    "sid": [ { "uid": "gift_process_total_weighted_food_consumption_000042BUR201001" } ],
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
                                        "codes": [ "IRON" ]
                                    }
                                ]
                            },
                            "subgroup_code": {
                                "codes": [
                                    {
                                        "uid": "GIFT_FoodGroups",
                                        "codes": [ "0104" ]
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
                                "columns": [ "value" ],
                                "rule": "SUM"
                            },
                            {
                                "columns": [ "um" ],
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

    function LargeTreeMap(params) {

        // Load Exporting Module after Highcharts loaded
        require('highcharts/modules/drilldown')(Highcharts);
        require('highcharts-no-data-to-display')(Highcharts);
        require('highcharts/modules/treemap')(Highcharts);
        require('highcharts/modules/heatmap')(Highcharts);

        this._init(params);

        this.bridge = new Bridge({
            environment :  this.environment,
            cache :  this.cache
        });

        this._getProcessedResourceForChart(s.process.first_level_process).then(
            _.bind(this._onSuccess, this),
            _.bind(this._onError, this)
        );
    }

    LargeTreeMap.prototype._init = function (opts) {
        this.environment = opts.environment;
        this.cache = opts.cache;

        this.uid = opts.uid;
        this.selected_items = opts.selected_items;
        this.selected_config = opts.selected_config;
        this.elID = opts.elID;

        this.language = opts.language;
    };

    LargeTreeMap.prototype._updateProcessConfig = function (process, group_code, subgroup_code) {
        //process=s.process.first_level_process
        process[0].sid[0].uid = this.uid;
        process[0].parameters = this.selected_config;
        process[1].parameters.rows.item.codes[0].codes = this.selected_items;

        if(group_code){
            process[1].parameters.rows.group_code.codes[0].codes = group_code;
        }
        if(subgroup_code){
            process[1].parameters.rows.subgroup_code.codes[0].codes = subgroup_code;
        }

        return process;
    }

    LargeTreeMap.prototype._getProcessedResourceForChart = function (processConfig, group_code, subgroup_code) {
        var process = this._updateProcessConfig(processConfig, group_code, subgroup_code);
        //process=s.process.first_level_process
        return this.bridge.getProcessedResource({body: process, params: {language : this.language}});
    };

    LargeTreeMap.prototype._onSuccess = function (resource) {
        var series = this._processSeries(resource);
        var chartConfig = this._getChartConfig(series);
        return this._renderChart(chartConfig);
    };

    LargeTreeMap.prototype._onError = function (resource) {

        log.info("_onError");
        log.error(resource)
        return;
    };

    LargeTreeMap.prototype._processSeries = function (resource) {

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

        if(data){
            for(var i=0; i< data.length;i++) {
                var obj = {};
                var it = data[i];

                obj.y =it[value_index];
                obj.unit = it[umLabelIdx];
                obj.name = it[codeLabelIdx];
                obj.code = it[code_index];
                obj.drilldown = true;

                dataToChart.push(obj);
            }
        }

        return dataToChart;
    };

    LargeTreeMap.prototype._getProccessForOtherLevels = function(point, chart){
        var self = this;
        var group_code = '';
        var subgroup_code = '';
        var process ='';
        if(s.level_number==2){
            //Second level
            group_code = [];
            group_code.push(point.code);
            process = s.process.second_level_process;
        }
        else if(s.level_number==3){
            //Second level
            subgroup_code = [];
            subgroup_code.push(point.code);
            process = s.process.third_level_process;
        }

        self.level = s.level_number;
        this._getProcessedResourceForChart(process, group_code, subgroup_code).then(function (result) {
            if (result) {
                self._otherLevelOnSuccess(chart, point, result);
            } else {
                this._onError();
            }
        });
    }

    LargeTreeMap.prototype._otherLevelOnSuccess = function (chart, point, resource) {

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


    LargeTreeMap.prototype._getChartConfig = function (series) {

        console.log(series)
        var self = this;
       var chartConfig =  {
           chart: {
               // xAxis: {
               //     events: {
               //         setExtremes: function (e) {
               //             console.log(this, "xxxx")
               //             alert('X drill: min(' + e.min + '), max(' + e.max + ')');
               //         },
               //     }
               // },
               // yAxis: {
               //     events: {
               //         setExtremes: function (e) {
               //             console.log(this, "yyyyy")
               //             alert('Y drill: min(' + e.min + '), max(' + e.max + ')');
               //         },
               //     }
               // },
               events: {
                   redraw: function (e) {
                       console.log(e)

                       var rootNode = this.series[0].rootNode;

                       console.log(this)
                       console.log(rootNode, rootNode.split('-').length)
                       if (rootNode === '') {
                           alert(' NO DRILLED - LEVEL 0 ')
                       } else {
                           if (rootNode.split('-').length == 2) {

                               alert(' DRILLED - LEVEL 1');
                               var data2= [{
                                   name: 'I am a child 5',
                                   parent: 'id-1',
                                   value: 5
                               }, {
                                   name: 'I am a child 6',
                                   parent: 'id-1',
                                   value: 6
                               }]
                               // this.series[0].data = data2;
                               // this.options.chart.addSeries({
                               //     data: this.series[0].data
                               // });

                               var series = this.series[0],
                                   elProto = this.renderer.Element.prototype,
                                   animate;
                               // Add child data to category A
                               series.addPoint({
                                   id: "A_AA1",
                                   name: "A_AA1",
                                   parent: 'id-1',
                                   // parent: "A"
                               }, false);
                               series.addPoint({
                                   id: "A_AA1_AAA1",
                                   name: "A_AA1_AAA1",
                                   parent: 'id-1',
                                   // parent: "A_AA1",
                                   value: 30
                               });

                               animate = elProto.animate;
                               elProto.animate = elProto.attr; // Temporarily disable animation
                               series.drillToNode(series.rootNode); // It sets the axis extremes to the new values, then a redraw.
                               elProto.animate = animate;

                           } else if (rootNode.split('-').length >= 2) {
                               alert(' DRILLED - LEVEL 2');
                           }
                       }
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

               // data: [{
               //     name: 'I have children',
               //     id: 'id-1'
               // },
               //     {
               //         name: 'I dklnfgld children',
               //         parent: 'id-1',
               //         id: 'id-2'
               //     }]

               data: [{
            name: 'I have children',
            id: 'id-1',
            value : 4
        }, {
            name: 'I am a child',
            parent: 'id-1',
            value: 2
        }]
           }],
           subtitle: {
               text: 'Click points to drill down. Source: <a href="http://apps.who.int/gho/data/node.main.12?lang=en">WHO</a>.'
           },
           title: {
               text: 'Global Mortality Rate 2012, per 100 000 population'
           }
       };

        return chartConfig;
    };

    LargeTreeMap.prototype._renderChart = function(chartConfig){

        $('#' + this.elID).css({
            height: s.HEIGHT,
            width: s.WIDTH
        })

        Highcharts.setOptions({
            lang: {
                drillUpText: '<< Back to {series.name}'
            }
        });

        console.log("Before render chart")
        this.chart = Highcharts.chart(this.elID, chartConfig);
    };

    LargeTreeMap.prototype.redraw = function (animation) {
        if(animation) {
            this.chart.redraw(animation);
        }
        else{
            this.chart.redraw();
        }
    };

    LargeTreeMap.prototype.dispose = function () {
        this.chart.destroy();
    };

    // function addNewData() {
    //     var series = chart.series[0],
    //         elProto = chart.renderer.Element.prototype,
    //         animate;
    //     // Add child data to category A
    //     series.addPoint({
    //         id: "A_AA1",
    //         name: "A_AA1",
    //         parent: "A"
    //     }, false);
    //     series.addPoint({
    //         id: "A_AA1_AAA1",
    //         name: "A_AA1_AAA1",
    //         parent: "A_AA1",
    //         value: 30
    //     });
    //
    //     animate = elProto.animate;
    //     elProto.animate = elProto.attr; // Temporarily disable animation
    //     series.drillToNode(series.rootNode); // It sets the axis extremes to the new values, then a redraw.
    //     elProto.animate = animate;
    //
    // }

    return LargeTreeMap;
});