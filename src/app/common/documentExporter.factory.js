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
  function documentExporter($filter, appFormats){
    return {
      getTableInExcelSheet: getTableInExcelSheet
    };

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
    function getTableInExcelSheet(headings, dataObject, association, fileName){
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

      // Check if Internet Explorer.
      var isIE = false;
      if (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > 0) {
        isIE = true;
      }

      if (isIE) {
        var blob = new Blob([CSV]);
        window.navigator.msSaveBlob(blob, fileName);
      } else {
        //Initialize file format you want csv or xls
        var uri = 'data:text/csv;charset=utf-8,' + encodeURI(CSV);

        //this trick will generate a temp <a /> tag
        var link = document.createElement('a');
        link.href = uri;

        //link.style = "visibility:hidden";
        link.download = fileName;

        //this part will append the anchor tag and remove it after automatic click
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }

}());
