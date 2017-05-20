(function () {
    'use strict';
    angular.module('app.dashboard.documentCreator')
        .controller('DocumentCreator', DocumentCreator);

    function DocumentCreator(documentExporter) {
        var vm = this;
        _init();

        function _init(){
            vm.documentContent = '';
            vm.exportDocumentToPDF = exportDocumentToPDF;
            vm.createA4Document = createA4Document;
        }

        function createA4Document(content){
            documentExporter.createA4Document();
        }

        function exportDocumentToPDF(){
            var doc = document.getElementById('document')
            html2canvas(doc, {
                onrendered: function (canvas) {
                    console.log(canvas);
                    var data = canvas.toDataURL();
                    var docDefinition = {
                        content: [{
                            image: data,
                            width: 500,
                        }]
                    };
                    pdfMake.createPdf(docDefinition).download("Score_Details.pdf");
                }
            });
        }
    }

})();
