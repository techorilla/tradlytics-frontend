/**
 * @ngdoc service
 * @name app.common.documentExporter
 * @description < description placeholder >
 */

(function(){

  'use strict';

  angular
      .module('app.common')
      .factory('documentExporter', documentExporter);

  /* @ngInject */
  function documentExporter($filter, $timeout, appFormats, images){
    return {
      getTableInExcelSheet: getTableInExcelSheet,
      printPDF: printPDF,
      createA4Document: createA4Document
    };

    function getA4PDFSheet(content){
      var docDefinition = {

        pageSize: 'A4',

        header: {
          margin: [20, 10, 30, 0],
          columns: [
            {

              table: {
                widths: ['70%','35%'],

                body: [
                  [
                    { image: images.LOGO,

                      width: 180, height: 90,

                    },

                    {
                      alignment: 'right',
                      table: {

                        body: [
                          [{text:'Phone', border: [false, false, false, false], style: 'boldHeader'},
                            {text:'+92-21-32430152-5 (4 Lines)',  style: 'boldSubHeader', border: [false, false, false, false]}],

                          [{text:'Fax', border: [false, false, false, false], style: 'boldHeader'},
                            {text:'+92-21-3243213-32431366',  style: 'boldSubHeader', border: [false, false, false, false]}],
                          [{text:'Email', border: [false, false, false, false], style: 'boldHeader'},
                            {text:'info@doniGroup.com',  style: 'boldSubHeader', border: [false, false, false, false]}],
                          [{text:'Website', border: [false, false, false, false], style: 'boldHeader'},
                            {text:'www.doniGroup.com',  style: 'boldSubHeader', border: [false, false, false, false]}]
                        ]
                      }
                    }
                  ]
                ]
              },
              layout: 'noBorders'
            }

          ]
        },

        footer: {
          margin:[0,10,0,0],
          columns: [

            {
              table:{
                widths: ['10%', '30%', '60%'],
                body:[
                  [
                    {text:'', fillColor:'#3C3837', border: [false, false, false, false]},
                    {text:'', fillColor: '#E10915', border: [false, false, false, false], style:'redBox'},
                    {text:'', fillColor:'#3C3837', border: [false, false, false, false]}
                  ]

                ]
              }
            }
          ]
        },

        content: content,
        pageMargins: [40, 180, 20, 15],

        styles: {
          boldHeader: {
            fontSize: 10,
            alignment: 'left',
            bold: true
          },

          boldSubHeader:{
            fontSize: 10
          },

          redBox:{
          },

          subheader: {
            fontSize: 15,
            bold: true
          },
          quote: {
            italics: true
          },
          small: {
            fontSize: 8
          }
        }
      }

      return docDefinition;

    }


    function createA4Document(content){
      var a4Sheet = getA4PDFSheet([]);
      var doc = a4Sheet;
      pdfMake.createPdf(doc).open();
    }

    function printPDF(columnHeader, columnKeys, itemList){
      var tableRows = [columnHeader];
      var regexExp=/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;
      angular.forEach(itemList, function(item,key){
        var row = [];
        angular.forEach(columnKeys, function(keyName,key){
          if(regexExp.test(item[keyName])){
            row.push($filter('date')(new Date(item[keyName]), appFormats.Date));
          }
          else{
            row.push(item[keyName]);
          }

        });
        tableRows.push(row)
      });
      var docDefinition = {
        pageSize: 'LEGAL',
        pageOrientation: 'landscape',
        pageMargins: [40, 80, 40, 60],
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            margin: [0, 0, 0, 10],
            textAlign: 'center'
          },
          content:{
            fontSize: 12
          }
        },
        footer: function(currentPage, pageCount) {
          return currentPage.toString() + ' of ' + pageCount;
        },
        header: function(currentPage, pageCount) {
          // you can apply any logic and return any valid pdfmake element

          return {
            margin: 8,
            columns: [
              {
                table: {
                  widths: ['*', 'auto'],
                  headerRows: 1,
                  body: [
                    [
                      {
                        image: images.LOGO,
                        width: 120, height: 60,
                        border: [false, true, true, true],
                        style: 'header'
                      },
                    ]
                  ]
                },
                layout: 'noBorders'
              }

            ],

            alignment: (currentPage % 2) ? 'left' : 'right'
          };
        },
        content: {
          style: 'content',
          table: {
            body: tableRows
          }
        },
      };
      pdfMake.createPdf(docDefinition).open();
    }

    ////////////////////

    /**
     * @ngdoc
     * @name app.common.documentExporter#testFunction
     * @methodOf app.common.documentExporter
     *
     * @description < description placeholder >
     * @example
     * <pre>
     * documentExporter.testFunction(id);
     * </pre>
     * @param {int} entity id
     */
    function getTableInExcelSheet(headings, association, dataObject, fileName){
      var authData = dataObject;
      var headingObj = {};
      for(var heading in headings){
        headingObj[headings[heading]] = null;
      }
      var regexExp=/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;
      var csvData = [];
      angular.forEach(dataObject, function (dataSet, key) {
        var tempHeading = angular.copy(headingObj);
        angular.forEach(association,function(ass,asskey){
          if(regexExp.test(dataSet[ass])){
            dataSet[ass] = $filter('date')(new Date(dataSet[ass]), appFormats.Date);
          }
          tempHeading[headings[asskey]] = dataSet[ass];
        });
        csvData.push(tempHeading);

      });
      exportCsv(csvData, true, fileName);
    }


    function exportCsv(JSONData, ShowLabel, csvFileName) {
      // console.log(ShowLabel, csvFileName);
      //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
      var arrData = typeof JSONData !== 'object' ? JSON.parse(JSONData) : JSONData;

      var CSV = '';

      //This condition will generate the Label/Header
      if (ShowLabel) {
        var labelRow = '';

        //This loop will extract the label from 1st index of on array
        for (var labelIndex in arrData[0]) {

          //Now convert each value to string and comma-seprated
          labelRow += labelIndex + ',';
        }

        labelRow = labelRow.slice(0, -1);

        //append Label row with line break
        CSV += labelRow + '\r\n';
      }

      //1st loop is to extract each row
      for (var i = 0; i < arrData.length; i++) {
        var row = '';

        //2nd loop will extract each column and convert it in string comma-seprated
        for (var index in arrData[i]) {

          // To handle empty value undefined was showing.
          var columnValue = arrData[i][index] ? arrData[i][index] : '';
          row += '"' + columnValue + '",';
        }

        row.slice(0, row.length - 1);

        //add a line break after each row
        CSV += row + '\r\n';
      }

      if (CSV === '') {
        return;
      }
      //Generate a file name
      var fileName = csvFileName + '.csv';
      //this will remove the blank-spaces from the title and replace it with an underscore
      //fileName += ReportTitle.replace(/ /g,"_");

      var blob = new Blob([CSV]);
      if (window.navigator.msSaveOrOpenBlob)  // IE hack; see http://msdn.microsoft.com/en-us/library/ie/hh779016.aspx
        window.navigator.msSaveBlob(blob, fileName);
      else
      {
        var a = window.document.createElement("a");
        a.href = window.URL.createObjectURL(blob, {type: "text/plain"});
        a.download = fileName;
        document.body.appendChild(a);
        $timeout(function(){
          a.click();
        }); // IE: "Access is denied"; see: https://connect.microsoft.com/IE/feedback/details/797361/ie-10-treats-blob-url-as-cross-origin-and-denies-access
        document.body.removeChild(a);
      }
    }
  }

}());
