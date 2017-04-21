(function () {
    'use strict';
    angular.module('app.dashboard.website')
        .controller('Blog', blog);

    function blog(deModal, website, loaderModal, $filter, $scope, toastr, utilities){
        var vm = this;
        _init();
        function _init(){

            vm.researchList = [];
            vm.addNewResearch = addNewResearch;
            vm.uploadResearchImage = uploadResearchImage;
            vm.removeResearchImage = removeResearchImage;
            vm.saveResearch = saveResearch;
            vm.editResearch = editResearch;
            vm.deleteResearch = deleteResearch;
            vm.displayResearchOnWeb = displayResearchOnWeb;
            vm.getFile = getFile;
            vm.loadTags = loadTags;
            vm.researchObj = website.getNewResearchObj();
            vm.blogImage = $filter('itemImage')(vm.researchObj.image);
            vm.cancel = cancel;
            getAllResearch();

        }

        function loadTags(query){
            return website.getResearchTags(query)
        }

        function uploadResearchImage(){
            var fileInput = document.getElementById('uploadResearchFile');
            fileInput.click();
        }

        function getFile(picture){
            deModal.getFile(picture, $scope, 1.5, [{w: 800,h: 400}], {width:800, height:400}, function(imagesData){
                vm.blogImage = imagesData.croppedImage;
                vm.imagesData = imagesData;
                vm.noPicture = false;
            });
        }

        function removeResearchImage(){
            vm.noPicture = true;
            vm.researchObj.image = null;
            vm.blogImage = $filter('itemImage')(vm.researchObj.image);
        }

        function saveResearch(form, researchObj, images, draft){
            if(form.$valid){
                loaderModal.open();
                researchObj.isDraft = draft;
                if(researchObj.id){
                    return website.updateResearch(researchObj, images).then(function(res){
                        if(res.success){
                            var research = findResearchInResearchList(vm.researchList, researchObj.id);
                            var index = vm.researchList.indexOf(research);
                            vm.researchList[index] = res.researchObj;
                            toastr.success(res.message);
                            cancel(form);
                        }
                        else{
                            toastr.error(res.message);
                        }
                        loaderModal.close();
                    });
                }
                else{
                    return website.addResearch(researchObj, images).then(function(res){
                        if(res.success){
                            vm.researchList.push(res.researchObj);
                            toastr.success(res.message);
                            cancel(form);
                        }
                        else{
                            toastr.error(res.message);
                        }
                        loaderModal.close();
                    });
                }
            }
            else{
                toastr.error('Please enter missing fields');
            }

        }

        function editResearch(researchId){
            loaderModal.open();
            website.getCompleteResearch(researchId).then(function(res){
                vm.researchObj = res.researchObj;
                vm.blogImage = vm.researchObj.image;
                vm.noPicture = false;
                loaderModal.close();
                vm.showForm = true;
            });
        }

        function findResearchInResearchList(researchList, researchId){
            return _.find(researchList, function(research) { return research.id ==  researchId; });
        }

        function displayResearchOnWeb(researchId){
            loaderModal.open();
            website.displayResearchOnWebsite(researchId).then(function(res){
                if(res.success){
                    var research = findResearchInResearchList(vm.researchList, researchId);
                    var index = vm.researchList.indexOf(research);
                    vm.researchList[index] = res.researchObj;
                    toastr.success(res.message);
                }
                else{
                    toastr.error(res.message);
                }
                loaderModal.close();
            });
        }

        function deleteResearch(researchId){
            loaderModal.open();
            website.deleteResearch(researchId).then(function(res){
                if(res.success){
                    toastr.success(res.message);
                    var research = findResearchInResearchList(vm.researchList, researchId);
                    var index = vm.researchList.indexOf(research);
                    vm.researchList.splice(index, 1)
                }
                else{
                    toastr.error(res.message);
                }
                loaderModal.close();
            });
        }

        function addNewResearch(){
            vm.showForm = true;
            vm.researchObj = website.getNewResearchObj();
        }

        function cancel(form){
            vm.showForm=false;
            vm.researchObj = website.getNewResearchObj();
            utilities.resetFormValidation(form);
        }






        function getAllResearch(){
            loaderModal.open();
            website.getResearchList().then(function(res){
                vm.researchList = res.researchList;
                loaderModal.close();
            })
        }
    }
})();