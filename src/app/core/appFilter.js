/**
 * @ngdoc overview
 * @name app.core
 * @description Filters for the Applications
 */

(function () {

    'use strict';

    angular.module('app.core')
        .filter('selectFilter', selectFilter)
        .filter('selectFilterDropDown', selectFilterDropDown)
        .filter('selectedRows', selectedRows)
        .filter('uniqueByAttribute', uniqueByAttribute)
        .filter('range', range)
        .filter('secondsToDateTime', secondsToDateTime)
        .filter('utcToLocal', utcToLocal)
        .filter('percentage', ['$filter', function ($filter) {
            return function (input, decimals) {
                var number = (input > 1) ? input : input*100;
                return $filter('number')(number, decimals) + '%';
            };
        }]);



    function utcToLocal($filter) {
        return function (utcDateString, format) {
            console.log('hello', utcDateString);
            if (!utcDateString) {
                return;
            }

            // append 'Z' to the date string to indicate UTC time if the timezone isn't already specified
            if (utcDateString.indexOf('Z') === -1 && utcDateString.indexOf('+') === -1) {
                utcDateString += 'Z';
            }

            return $filter('date')(utcDateString, format);
        };
    }

    function secondsToDateTime() {
        return function(seconds) {
            return new Date(1970, 0, 1).setSeconds(seconds);
        };
    }

    function selectFilter(){
        return function(items, search, bind) {
            if (!search) {
                return items;
            }
            return items.filter(function(element, index, array) {
                if(element[bind]){
                    return element[bind].toLowerCase().indexOf(search.toLowerCase())===0;
                }
            });

        };
    }

    function selectFilterDropDown(){
        return function(items, search, bind) {
            if (!search) {
                return items;
            }
            return items.filter(function(element, index, array) {
                if(element[bind]){
                    return element[bind].toLowerCase().indexOf(search.toLowerCase())===0;
                }
            });

        };
    }

    function uniqueByAttribute(){
        return function(items,attribute){
            return _.uniqBy(items, attribute );
        }
    }

    function selectedRows(){
        return function(rows,rowsToRemove,bind){
            if(!rowsToRemove || rowsToRemove.length === 0){
                return rows;
            }
            return rows.filter(function(element,index,array){
                if(element[bind]){
                    //return true;
                    return ((rowsToRemove.indexOf(element[bind])) <= -1)
                }
            });
        }
    }

    function range(){
        return function(input, total) {
            total = parseInt(total);
            for (var i=0; i<total; i++)
                input.push(i);
            return input;
        };
    }

}());
