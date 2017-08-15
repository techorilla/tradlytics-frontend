/**
 * @ngdoc service
 * @name app.common.navigation
 * @description < description placeholder >
 */

(function(){

    'use strict';

    angular
        .module('app.common')
        .factory('utilities', utilities);

    /* @ngInject */
    function utilities($state, toastr, moment, appFormats, $filter, crud){
        var months = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug','Sep','Oct', 'Nov', 'Dec'
        ];

        var colors = [
            "#f47414", "#1691AC", "#A53860", "#4C3B4D",
            "#ADA8B6", "#36C4BB", "#7EAAAF", "#A5C5C9", "#B4E6ED", "#E88D67",
            "#BAA298", "#C1A397", "#DD977A", "#E5CABE", "#424B54", "#79ACE0",
            "#B2CEEA", "#AEB9C4"
        ];

        return {
            chartColors: chartColors,
            getCurrentUser: getCurrentUser,
            getTime: getTime,
            internalServerError: internalServerError,
            successMessage: successMessage,
            initialDateRange: initialDateRange,
            todayDateRange: todayDateRange,
            getDateRangeArray: getDateRangeArray,
            getYearsInDateRange: getYearsInDateRange,
            getMonthsInDateRange: getMonthsInDateRange,
            getWeeksInDateRange: getWeeksInDateRange,
            getMonthTitle: getMonthTitle,
            getWeekTitle: getWeekTitle,
            filterDate: filterDate,
            lastThirtyDaysDateRange: lastThirtyDaysDateRange,
            resetFormValidation: resetFormValidation,
            colors: colors,
            dashboardDateRange: dashboardDateRange,
            getChildStates: getChildStates,
            getStatesForAccordian: getStatesForAccordian,
            setupCRUD: setupCRUD,
            cloneIntoEmptyObject: cloneIntoEmptyObject,
            cloneObjectInToObject: cloneObjectInToObject,
            convertMomentDateRange: convertMomentDateRange,
            goBackState: goBackState,
            prepareGraphData: prepareGraphData,
            manageTextOverFlow: manageTextOverFlow,
            evalMathExpressionInString: evalMathExpressionInString,

            sortTableBySortType: sortTableBySortType,
            stripHtml: stripHtml
        };

        function stripHtml(html){
            // Create a new div element
            var temporalDivElement = document.createElement("div");
            // Set the HTML content with the providen
            temporalDivElement.innerHTML = html;
            // Retrieve the text property of the element (cross-browser support)
            return temporalDivElement.textContent || temporalDivElement.innerText || "";
        }

        function evalMathExpressionInString(str){
            var expression = str.replace(/[^0-9.*+-]/g, "")
            return eval(expression)
        }

        function sortTableBySortType(tableData, type, reverse){
            var digitInString = ['fileNo'];
            var filter_type = (_.indexOf(digitInString,type) > -1) ? 'digitInString': 'orderBy';
            return $filter(filter_type)(tableData, type, reverse);
        }

        function manageTextOverFlow(string, size){
            if (string.length > size)
                return string.substring(0,size)+'...';
            else
                return string;
        }

        function prepareGraphData(graphData){
            _.forEach(graphData, function(value, key){
                value['date'] = new Date(value['date']);
            });
            return $filter('orderBy')(graphData, 'date')
        }

        function goBackState(){
            if($state.current.prevState){
                $state.go($state.current.prevState,$state.current.prevParam);
            }
            else{
                try{
                    $state.go('^');
                }
                catch(err){
                    $state.go('dashboard.main');
                }

            }
        };

        function cloneObjectInToObject(clone, sample){
            for(var key in clone){
                delete clone[key]
            }
            for(var key in sample){
                clone[key] = sample[key]
            }
            return clone;
        }

        function cloneIntoEmptyObject(emptyObj, sample){
            if(sample instanceof Array){
                emptyObj['list'] = sample;
            }
            else{
                for(var key in sample)
                    emptyObj[key] = sample[key];
            }
            return emptyObj;
        }

        function setupCRUD(create, read, update, del){
            var crudObj = {};
            crudObj[crud.CREATE] = create;
            crudObj[crud.UPDATE] = update;
            crudObj[crud.DELETE] = del;
            crudObj[crud.READ] = read;
            return crudObj;
        }

        function getCurrentUser(){
            return currentUser;
        }

        function getTime(){
            return (new Date()).getTime();
        }

        function filterDate(datetime){
            return $filter('date')(datetime, appFormats.Date);
        }

        function getChildStates(state){
            var routeName=state.name;
            var secondRouteOnlyRegex = new RegExp(routeName + "\.[a-z]+$", "i");
            var states = $state.get();
            var navLinks = _.filter(states, function(state){
                return secondRouteOnlyRegex.test(state.name) && !state.abstract;
            });
            return navLinks;
        }

        function getStatesForAccordian(state){
            var allStates = getChildStates(state);
            _.filter(allStates, function(state){
                if(state.hasAccordianDropDown){
                    state.children = getChildStates(state);
                }
            });
            return allStates
        }





        function chartColors(){
            return this.colors;
        }

        function internalServerError(data,text){
            toastr.error(data,text);
        }

        function todayDateRange(){
            var datePicker = {};
            datePicker.startDate = moment().startOf('day');
            datePicker.endDate = moment().endOf('day');
            return datePicker;
        }

        function lastThirtyDaysDateRange(){
            var datePicker = {};
            datePicker.startDate = moment().subtract(30,'days').startOf('day');
            datePicker.endDate = moment().endOf('day');
            return datePicker;
        }

        function initialDateRange(days){
            days = (days) ? days : 14;
            var datePicker = {};
            datePicker.startDate = moment().subtract(days,'days').startOf('day');
            datePicker.endDate = moment().endOf('day');
            return datePicker;
        }

        function dashboardDateRange(){
            var datePicker = {};
            datePicker.startDate = moment().subtract(30,'days').startOf('day');
            datePicker.endDate = moment().add(14,'days').endOf('day');
            return datePicker;
        }


        function successMessage(msg,title){
            toastr.success(msg,title);
        }

        function getYearsInDateRange(startDate,endDate){
            var currentYear = parseInt(new Date(startDate).getFullYear());
            var endYear = parseInt(new Date(endDate).getFullYear());
            var years = [];
            while(currentYear <= endYear){
                years.push(currentYear);
                currentYear++;
            }
            return years;
        }

        function getMonthTitle(date){
            return months[date.getMonth()]+', '+date.getFullYear();
        }

        function getWeeksInDateRange(startDate,endDate){
            var sDate = new Date(startDate);
            var eDate = new Date(endDate);
            sDate = new Date( sDate.getFullYear()+'-'+ (sDate.getMonth()+1)+'-'+sDate.getDate());
            eDate = new Date( eDate.getFullYear()+'-'+(eDate.getMonth()+1)+'-'+eDate.getDate());
            var weekList = [];
            while(sDate<eDate){
                var temp = new Date(sDate);
                weekList.push(temp);
                var dayToAdd = (sDate.getDay() === 0) ? 7 : sDate.getDay()+1;
                sDate.setDate(sDate.getDate()+dayToAdd);
            }
            weekList.push(eDate);
            return weekList;

        }

        function getWeekTitle(weekStart, weekEnd){
            return  weekStart.getDate()+' '+months[weekStart.getMonth()]+', '+weekStart.getFullYear() + ' - '+ weekEnd.getDate()+' '+months[weekEnd.getMonth()]+', '+weekEnd.getFullYear();
        }



        function getMonthsInDateRange(startDate,endDate){
            var sDate = new Date(startDate);
            var eDate = new Date(endDate);
            sDate = new Date( sDate.getFullYear()+'-'+ (sDate.getMonth()+1));
            eDate = new Date( eDate.getFullYear()+'-'+(eDate.getMonth()+1));
            var monthList = [];
            if(sDate.toString() === eDate.toString()){
                var temp = new Date(sDate);
                monthList.push(temp);
                eDate = new Date(sDate.setMonth(sDate.getMonth()+1));
                monthList.push(eDate);
            }
            else{
                while(sDate<=eDate){
                    var temp = new Date(sDate);
                    monthList.push(temp);
                    sDate = new Date(sDate.setMonth(sDate.getMonth()+1));
                }
                sDate = new Date(sDate.setMonth(sDate.getMonth()+1));
                monthList.push(sDate);
            }
            return monthList;
        }

        function getDateRangeArray(startDate, endDate){
            var dateArray = new Array();
            var currentDate = new Date(startDate);
            endDate = new Date (endDate);
            while (currentDate <= endDate) {
                dateArray.push(currentDate);
                currentDate = currentDate.addDays(1);
            }
            return dateArray;
        }

        function convertMomentDateRange(dateRange){
            var range = angular.copy(dateRange);
            range.startDate = range.startDate._d;
            range.endDate = range.endDate._d;
            return range;
        }

        function resetFormValidation(formObj){
            for (var att in formObj.$error) {
                if (formObj.$error.hasOwnProperty(att)) {
                    formObj.$setValidity(att, true);
                }
            }
            formObj.$setSubmitted(false);
            formObj.$setPristine(true);
        }
    }

}());
