define([
    "underscore",
    "jquery",
    "loglevel",
    "fenix-ui-bridge",
    "highcharts"
], function (_, $, log, Bridge, Highcharts) {

    var s = {
        DAY : "/day",
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

        console.clear();

        log.setLevel("trace");

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
        this.amountID = opts.amountID;
        this.barID = opts.barID;
        this.percentageID = opts.percentageID;

        this.language = opts.language;
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
        var data = this._processSeries(resource);
        this._setHTMLvariables(data);
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

        var umLabelIdx =  _.findIndex(columns, function (col ){
            return col.id== um_column_id +'_'+self.language;
        });

        var htmlData = [];
        for(var i=0; i< data.length;i++) {
            var obj = {};

            var it = data[i];
             obj.valueFormat = it[value_index].toFixed(2);
             obj.value = it[value_index];
             obj.unit = it[umLabelIdx];

            htmlData.push(obj);
        }

        return htmlData;
    };

    ColumnChart.prototype._setHTMLvariables = function (dataToChart) {
        //Progress bar
        $(this.barID).css({
            width: dataToChart[0].value+ dataToChart[0].unit
        });
        $(this.percentageID).html(dataToChart[0].value + dataToChart[0].unit);
        $(this.amountID.low).html(dataToChart[1].valueFormat + " "+ dataToChart[1].unit+ s.DAY);
        $(this.amountID.middle).html(dataToChart[2].valueFormat + " "+ dataToChart[2].unit+ s.DAY);
        $(this.amountID.high).html(dataToChart[3].valueFormat + " "+ dataToChart[3].unit+ s.DAY);
    }

    ColumnChart.prototype.dispose = function (opts) {

    };

    return ColumnChart;
});