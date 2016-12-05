define([
    "underscore",
    "jquery",
    "loglevel",
    "fenix-ui-bridge",
    "highcharts"
], function (_, $, log, Bridge, Highcharts) {

    var s = {
        first_level_process :
            [
                {
                    "name": "gift_average_percentile",

                    "sid" : [{"uid":"gift_process_total_food_consumption_000042BUR201001"}],

                    "parameters": {

                        "percentileSize" : 5,

                        "item" : "FOOD_AMOUNT_PROC",

                        "group" : "01",

                        "subgroup" : null,

                        "food" : null
                    }
                }
            ]
    };

    function ColumnChart(params) {

        this._init(params);

        this.bridge = new Bridge({
            environment :  this.environment,
            cache :  this.cache
        });

        this._getProcessedResourceForChart(s.first_level_process).then(
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
        this.selected_subgroup = opts.selected_subgroup;
        this.selected_food = opts.selected_food;
        this.first_level_process = s.first_level_process;
        this.elID = opts.elID;

        this.height = opts.height;
        this.width = opts.width;
        this.language = opts.language;

        //pub/sub
        this.channels = {};
    };


    ColumnChart.prototype._updateProcessConfig = function (process) {
        process[0].sid[0].uid = this.uid;

        if(this.selected_items){
            process[0].parameters.item = this.selected_items;
        }

        if(this.selected_group){
            process[0].parameters.group = this.selected_group;
        }

        if(this.selected_subgroup){
            process[0].parameters.subgroup = this.selected_subgroup;
        }

        if(this.selected_food){
            process[0].parameters.food = this.selected_food;
        }

        return process;
    }

    ColumnChart.prototype._getProcessedResourceForChart = function (processConfig) {
        var process = this._updateProcessConfig(processConfig);

        return this.bridge.getProcessedResource({body: process, params: {language : this.language}});
    };

    ColumnChart.prototype._onSuccess = function (resource) {
        console.log(resource)
        var series = this._processSeries(resource);
        var chartConfig = this._getChartConfig(series);
        return this._renderChart(chartConfig);
    };

    ColumnChart.prototype._onError = function (resource) {

        log.info("_onError");
        log.error(resource)
        return;
    };

    ColumnChart.prototype._processSeries = function (resource) {

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
            else if(columns[i].subject == 'item'){
                code_index = i;
                code_column_id = columns[i].id;
            }
        }
        console.log(code_column_id, um_column_id)


        var umLabelIdx =  _.findIndex(columns, function (col ){
            return col.id== um_column_id +'_'+self.language.toUpperCase();
        });

        var codeLabelIdx =  _.findIndex(columns, function (col ){
            return col.id== code_column_id +'_'+self.language.toUpperCase();
        });

        //console.log(data)
        var dataToChart = [];
        var categoriesToChart = [];
        if(data) {
            for (var i = 1; i < data.length; i++) {
                // var obj = {};

                var it = data[i];
                console.log(it)

                // obj.y =it[value_index];
                // obj.unit = it[umLabelIdx];
                // obj.name = it[codeLabelIdx];
                // obj.code = it[code_index];
                // obj.drilldown = true;

                //dataToChart.push(it[value_index]);
                //categoriesToChart.push(it[codeLabelIdx]);

                dataToChart.push(it[value_index]);
                console.log(value_index)
                console.log(code_index)
                categoriesToChart.push(it[code_index]);
            }
        }
        console.log({series: dataToChart, categories: categoriesToChart})

        //Progress bar
        $('#columns-progress-bar').css({
            width: data[0][value_index]+'%'
        });

        return {series: dataToChart, categories: categoriesToChart};
    };

    ColumnChart.prototype._getProccessForSecondLevel = function(point, chart){
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


    ColumnChart.prototype._getChartConfig = function (chartData) {

        //chartData = {series: dataToChart, categories: categoriesToChart}

        var self = this;
        var chartConfig =  {
            chart: {
                type: 'column',
                margin: [10, 10, 10, 10],
                spacingTop: 0,
                spacingBottom: 0,
                spacingLeft: 0,
                spacingRight: 0,
                events: {
                    load: function(event) {
                        self._trigger("ready");
                    }
                }
            },

            //hide xAxis
            xAxis: {
                categories: chartData.categories,
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
                data: chartData.series,
                //pointWidth: 80,
                // color: {
                //     // pattern: '../img/columns/pattern.svg',
                //     pattern: '../src/img/columns/pattern.svg',
                //     width: 20,
                //     height: 20
                // }
            }]
        };
        console.log(chartConfig)

        return chartConfig;
    };

    ColumnChart.prototype._renderChart = function(chartConfig){
        this.chart = Highcharts.chart(this.elID, chartConfig);
    };

    ColumnChart.prototype.redraw = function (animation) {
        if(animation) {
            this.chart.redraw(animation);
        }
        else{
            this.chart.redraw();
        }
    };

    ColumnChart.prototype.dispose = function (opts) {
        this.chart.destroy();
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

    /**
     * pub/sub
     * @return {Object} component instance
     */
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