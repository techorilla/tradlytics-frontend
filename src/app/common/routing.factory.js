/**
 * @ngdoc service
 * @name app.common.routing
 * @description < description placeholder >
 */

(function(){

  'use strict';

	angular
		.module('app.common')
		.factory('routing', routing);

  /* @ngInject */
  function routing(localStorageService,$state){

        var recentItems = [];
        getRecentItemsFromLocalStorage();
        return {
            recentItems: recentItems,
            getRecentlyViewedItems: getRecentlyViewedItems,
            addRecentlyViewItems: addRecentlyViewItems,
            saveRecentItemsToLocalStorage: saveRecentItemsToLocalStorage,
            getRecentItemsFromLocalStorage: getRecentItemsFromLocalStorage,
            clearRecentItems:clearRecentItems
		};

        function getRecentlyViewedItems(){
            return recentItems;
        }

        function clearRecentItems(){
            recentItems.splice(0,recentItems.length);
            saveRecentItemsToLocalStorage();
        }

        function saveRecentItemsToLocalStorage(){
            localStorageService.set('recentItems',  _.uniqBy(recentItems, 'pageTitle' ));
        }

        function getRecentItemsFromLocalStorage(){
            var temp = localStorageService.get('recentItems');
            clearRecentItems();
            if(temp){
                angular.forEach(temp,function(val){
                    recentItems.push(val);
                });
            }
        }

        function addRecentlyViewItems(pageTitle){
            recentItems.push({
               pageTitle:pageTitle,
               pageStateName:  $state.current.name,
               pageStateParams: $state.params,
               time: new Date()
            });
            saveRecentItemsToLocalStorage();
        }


	}

}());
