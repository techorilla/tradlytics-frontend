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
        .filter('latLong', function(){
            return function(input){
                input = input.split(' ');
                var value = parseFloat(input[0]);
                var multiplier = 1;
                if (input[1] == 'S' || input[1] =='W'){
                    multiplier = -1;
                }
                return value*multiplier
            }
        })
        .filter('plusOrMinus', function(){
            return function(input){
                input = input ? input : 0;
                return input > 0 ? input : '-'+input
            }
        })
        .filter('usd', function(){
            return function(input){
                return 'US$ ' + input.toString();
            }
        })

        .filter('digitInString', function(){
            return function(input, key, reverse){
                var sorted =  _.sortBy(input, function(row){
                    var index = row[key].search('[a-zA-Z]');
                    var fileNo = (index == -1) ? row[key] : row[key].slice(0, index);
                    console.log(row[key],fileNo,index);
                    return parseInt(fileNo);
                });



                return (reverse) ? _.reverse(sorted) : sorted;

            }
        })

        .filter('weight', function() {
            return function(weight, precision) {
                if(weight===0){
                    return '0.0 <span class="titled">Kgs</span>'
                }
                if (isNaN(parseFloat(weight)) || !isFinite(weight)) return '-';
                if (typeof precision === 'undefined') precision = 1;
                var units = ['Kgs', 'MT', 'KMT'],
                    number = Math.floor(Math.log(weight) / Math.log(1000));

                number = (number < units.length) ? number : (units.length-1);
                return (weight / Math.pow(1000, Math.floor(number))).toFixed(precision) +  ' <span class="titled">' + units[number] + '</span>';
            }
        })
        .filter('percentage', ['$filter', function ($filter) {
            return function (input, decimals) {
                var number = (input > 1) ? input : input*100;
                return $filter('number')(number, decimals) + '%';
            };
        }])

        .filter('positive', function() {
            return function(input) {
                if (!input) {
                    return 0;
                }

                return Math.abs(input);
            };
        });



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
            console.log(search, items, bind);
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
