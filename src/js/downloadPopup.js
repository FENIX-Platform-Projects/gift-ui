define([
    "jquery",
    "loglevel",
    "fenix-ui-uploader",
    "fenix-ui-catalog",
    "../config/config",
    "../config/mde/catalog",
    "quill"

], function ($, log, Uploader, Catalog, C, CataConf, Quill) {

    "use strict";

    var s = {
        CATALOG: "#catalog-container",
        DATA_CONTAINER: "#datauploader-container",
        DATA_UPLOADER: "#dataUploader",
        BACKBUTTON: "#fxDUpBack"
    };

    function DataUploader() {
        console.clear();
        log.setLevel("silent");
        //log.setLevel("trace");
        this._bindListener();
        this._importThirdPartyCss();
        $(s.DATA_CONTAINER).hide();
        this._renderCatalog();
    }

    DataUploader.prototype._bindListener = function() {
        var self = this;
        $(s.BACKBUTTON).on('click', function(){
            self._restoreCatalog()
        });
    };

    DataUploader.prototype._restoreCatalog = function() {
        $(s.CATALOG).show();
        $(s.DATA_CONTAINER).hide();
        $(s.BACKBUTTON).prop( "disabled", true );
    };

    DataUploader.prototype._disableCatalog = function() {
        $(s.CATALOG).hide();
        $(s.DATA_CONTAINER).show();
        $(s.BACKBUTTON).prop( "disabled" , false );
    };

    DataUploader.prototype._renderCatalog = function () {

        var self = this;

        this.catalog = new Catalog($.extend({
            el: s.CATALOG,
            environment: C.environment,
            cache: C.cache,
            lang: C.lang,
            hideCloseButton: true

        },CataConf));

        this.catalog.on("select", function(selection){
            //self._renderUploader(selection)
            self._openQuillEditor(selection)
        });


    };

    DataUploader.prototype._openQuillEditor = function (data) {

        var self = this;
        this._disableCatalog();
        var toolbarOptions = [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block'],

            [{ 'header': 1 }, { 'header': 2 }],               // custom button values
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
            [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
            [{ 'direction': 'rtl' }],                         // text direction

            [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

            [{ 'color': ['red', 'black'] }, { 'background': [] }],          // dropdown with defaults from theme
            [{ 'font': [] }],
            [{ 'align': [] }]

            // ['clean']                                         // remove formatting button
        ];
        $( "#editor" ).empty();
        // $(".ql-toolbar" ).empty();
        $(".ql-toolbar" ).remove();
        $("#quillButton").off('click')
        var editor = new Quill('#editor', {
            //modules: { toolbar: '#toolbar-container' },
            placeholder: 'Compose an epic...',
            modules: { toolbar: toolbarOptions },
            theme: 'snow'
        });

        $("#quillButton").val("Save")
        $("#quillButton").css("display", "block");
        $("#quillButton").click(function() {

            var content3 = editor.container.innerHTML;
            var c = $('#editor').find(".ql-editor");
            var htmlTemp =  $('#editor').find(".ql-editor").html();

            var dataToSend = {};
            dataToSend.uid = data.model.uid;
            dataToSend.text = ''+htmlTemp;
            dataToSend.lang = 'en';

            $.ajax({
                type: 'POST',
                dataType: 'text',
                url:'http://hqlprfenixapp2.hq.un.fao.org:9080/gift/v1/disclaimer',
                contentType: "application/json",
                data : JSON.stringify(dataToSend),
                success: function(content) {
                    $('#disclaimerCreated').modal('show');
                },
                error: function (err) {
                    alert('error!!!')
                    console.log(err)
                }
            });
        });
    };

    DataUploader.prototype.quillGetHTML = function(inputDelta) {
        var tempCont = document.createElement("div");
        (new Quill(tempCont)).setContents(inputDelta);
        return tempCont.getElementsByClassName("ql-editor")[0].innerHTML;
    };

    DataUploader.prototype._renderUploader = function (selection) {

        this._disableCatalog();
        this.uploader = new Uploader();

        this.uploader.render({
            container : s.DATA_UPLOADER,
            context: 'gift.bulk',
            server_url : "http://fenixservices.fao.org/gift",
            body_post_process: {
                source : selection.model.uid
            }
        });

        this.uploader.on('fx.upload.finish', function(){
            $(s.BACKBUTTON).prop( "disabled", false );
        });

        this.uploader.on('fx.upload.start', function(){
            $(s.BACKBUTTON).prop( "disabled", true );
        });
    };

    DataUploader.prototype._importThirdPartyCss = function () {

        //SANDBOXED BOOTSTRAP
        require("../css/sandboxed-bootstrap.css");
        //dropdown selector
        require("../../node_modules/selectize/dist/css/selectize.bootstrap3.css");
        require("../../node_modules/bootstrap-table/dist/bootstrap-table.min.css");
        //tree selector
        require("../../node_modules/jstree/dist/themes/default/style.min.css");
        //range selector
        require("../../node_modules/ion-rangeslider/css/ion.rangeSlider.css");
        require("../../node_modules/ion-rangeslider/css/ion.rangeSlider.skinHTML5.css");
        //time selector
        require("../../node_modules/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css");
        // fenix filter
        require("../../node_modules/fenix-ui-filter/dist/fenix-ui-filter.min.css");
        require("../../node_modules/fenix-ui-catalog/dist/fenix-ui-catalog.min.css");
        require("../../node_modules/fenix-ui-metadata-editor/dist/fenix-ui-metadata-editor.min.css");
        require("../../node_modules/fenix-ui-dropdown/dist/fenix-ui-dropdown.min.css");
        require("../../node_modules/fenix-ui-DataEditor/dist/fenix-ui-DataEditor.min.css");
        require("../../node_modules/fenix-ui-DSDEditor/dist/fenix-ui-DSDEditor.min.css");
        require("../../node_modules/fenix-ui-data-management/dist/fenix-ui-data-management.min.css");
        require("../../node_modules/fenix-ui-uploader/dist/fenix-ui-uploader.min.css");
        require("../../node_modules/toastr/build/toastr.min.css");
        //host override
        require('../css/gift.css');

    };

    return new DataUploader();
});