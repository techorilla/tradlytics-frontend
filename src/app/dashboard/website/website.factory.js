/**
 * @ngdoc service
 * @name app.dashboard.tradeBook.tradeBook
 * @description < description placeholder >
 */

(function(){

    'use strict';

    angular
        .module('app.dashboard.website')
        .factory('website', website);

    /* @ngInject */
    function website(Restangular, apiEndPoints, utilities){

        var websiteAPI = Restangular.all(apiEndPoints.website.basic);

        return {
            getResearchList: getResearchList,
            getResearchObj: getResearchObj,
            updateResearch: updateResearch,
            addResearch: addResearch,
            deleteResearch: deleteResearch,
            displayResearchOnWebsite: displayResearchOnWebsite,
            getNewResearchObj: getNewResearchObj,
            getResearchTags: getResearchTags,
            getCompleteResearch: getCompleteResearch,
            getWebsiteDashboard: getWebsiteDashboard
        };

        function getWebsiteDashboard(){
            return websiteAPI.customGET(apiEndPoints.website.dashboard);
        }

        function getNewResearchObj(){
            return {
                title: '',
                slug: '',
                tags: [],
                image: null,
                height: 400,
                width: 400,
                content: ''
            }
        }

        function getCompleteResearch(researchId){
            return websiteAPI.customGET(apiEndPoints.website.research, {'researchId': researchId});
        }

        function getResearchTags(query){
            return websiteAPI.customGET(apiEndPoints.website.researchTags, {'query': query});
        }

        function getResearchList(){
            return websiteAPI.customGET(apiEndPoints.website.research);
        }

        function getResearchObj(){
            return websiteAPI.customGET(apiEndPoints.website.research);
        }

        function prepareResearchObj(researchObj, imagesData){
            var body = new FormData();
            if(imagesData){
                var file = new File([imagesData.resultBlob], researchObj.slug+'.png');
                body.append('image', file);
            }
            body.append('research', JSON.stringify(researchObj));
            return body
        }

        function updateResearch(researchObj, imagesData){
            return websiteAPI.withHttpConfig({
                transformRequest: angular.identity
            }).customPUT(
                prepareResearchObj(researchObj, imagesData),
                apiEndPoints.website.research,
                undefined, {
                    'Content-Type': undefined
                }
            );
        }

        function addResearch(researchObj, imagesData){
            return websiteAPI.withHttpConfig({
                transformRequest: angular.identity
            }).customPOST(
                prepareResearchObj(researchObj, imagesData),
                apiEndPoints.website.research,
                undefined, {
                    'Content-Type': undefined
                }
            );
        }

        function deleteResearch(researchId){
            return websiteAPI.customDELETE(apiEndPoints.website.research+'/'+researchId);
        }

        function displayResearchOnWebsite(researchId){
            return websiteAPI.customPOST({
                'researchId': researchId
            }, apiEndPoints.website.research+'/display');
        }

    }

}());

