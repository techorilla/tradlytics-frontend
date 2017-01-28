/**
 * @ngdoc service
 * @name app.common.dropDownConfig
 * @description < description placeholder >
 */

(function(){

  'use strict';

  angular
      .module('app.common')
      .factory('dropDownConfig', dropDownConfig);

  /* @ngInject */
  function dropDownConfig(authentication, businessPartner, utilities, settings, apiEndPoints, crud, read){
    return {
      contactTypeConfig: contactTypeConfig,
      getProductConfig: getProductConfig,
      getBpConfig: getBpConfig,
      getPackingConfig: getPackingConfig,
      getCommissionTypeConfig: getCommissionTypeConfig,
      getBpLocationConfig: getBpLocationConfig,
      prepareBusinessLocationsDropDown: prepareBusinessLocationsDropDown,
      prepareDesignationDropDown: prepareDesignationDropDown
    };

    function getCommissionTypeConfig(){
      return {
        options: [],
        create: true,
        sortField: 'text',
        valueField: 'text',
        labelField: 'text',
        maxItems:1
      };
    }

    function getPackingConfig(){
      return {
        options: [
          {text: 'Bulk'}, {text:'Bagged'}
        ],
        create: true,
        sortField: 'text',
        valueField: 'text',
        labelField: 'text',
        maxItems:1
      };
    }

    function getBasicDropDownConfig(){
      return {
        valueField: 'id',
        sortField: 'name',
        searchField: ['name'],
        maxItems:1,
        create: false,
        persist: false,
        render: {
          item: function(item, escape) {
            var name = item.name;
            return '<div>' +
                '<span class="dropdownLabel">' + name + '</span>' +
                '</div>';
          },
          option: function(item, escape) {
            var name = item.name;
            return '<div class="item">' +
                '<span class="dropdownLabel">' + name + '</span>' +
                '</div>';
          }
        }
      };
    }

    function getBpConfig(){
      return {
        plugins: {
          'no-delete': {}
        },
        valueField: 'bp_ID',
        sortField: 'bp_Name',
        searchField: ['bp_Name','bp_Cont_fullName', 'bp_country'],
        maxItems:1,
        create: false,
        persist: false,
        render: {
          item: function(item, escape) {
            var label = item.bp_Name;
            var caption = item.bp_country;
            var pContact = (item.bp_Cont_fullName === null)? 'No Primary Contact' : item.bp_Cont_fullName;
            return '<div>' +
                '<span class="dropdownLabel">' + label + '</span>' +
                '<span class="dropdownCaption">' + ' | '+ caption + '</span>' +
                '<span class="dropdownCaption">' + ' | '+ pContact + '</span>' +
                '</div>';
          },
          option: function(item, escape) {
            var label = item.bp_Name;
            var caption = item.bp_country;
            var pContact = (item.bp_Cont_fullName === null)? 'No Primary Contact' : item.bp_Cont_fullName;
            return '<div>' +
                '<span class="dropdownLabel">' + label + '</span>' +
                '<span class="dropdownCaption">' + ' | '+ caption + '</span>' +
                '<span class="dropdownCaption">' + ' | '+ pContact + '</span>' +
                '</div>';
          }
        }
      };
    }

    function getProductConfig(){
      return {
        plugins: {
          'no-delete': {}
        },
        valueField: 'id',
        sortField: 'name',
        searchField: ['name','origin', 'quality'],
        maxItems:1,
        create: false,
        persist: false,
        render: {
          item: function(item, escape) {
            var label = item.name;
            var caption = item.origin;
            var pContact = (item.quality === null)? 'No Quality Tags' : item.quality;
            return '<div>' +
                '<span class="dropdownLabel">' + label + '</span>' +
                '<span class="dropdownCaption">' + ' | '+ caption + '</span>' +
                '<span class="dropdownCaption">' + ' | '+ pContact + '</span>' +
                '</div>';
          },
          option: function(item, escape) {
            var label = item.name;
            var caption = item.origin;
            var pContact = (item.quality === null)? 'No Quality Tags' : item.quality;
            return '<div>' +
                '<span class="dropdownLabel">' + label + '</span>' +
                '<span class="dropdownCaption">' + ' | '+ caption + '</span>' +
                '<span class="dropdownCaption">' + ' | '+ pContact + '</span>' +
                '</div>';
          }
        }
      };
    }

    function getBpLocationConfig(){
      var config = {
        valueField: 'id',
        sortField: 'name',
        searchField: ['address','city', 'state', 'country'],
        maxItems:1,
        create: false,
        persist: false,
        render: {
          item: function(item, escape) {
            var address = item.address;
            var city = item.city;
            var country = item.country;
            var state = item.state;
            return '<div>' +
                '<span class="dropdownLabel">' + address + '</span>' +
                '<span class="dropdownCaption">' + ' | '+ city + '</span>' +
                '<span class="dropdownCaption">' + ' | '+ country + '</span>' +
                '</div>';
          },
          option: function(item, escape) {
            var address = item.address;
            var city = item.city;
            var country = item.country;
            var state = item.state;
            return '<div class="item">' +
                '<span class="dropdownLabel">' + address + '</span>' +
                '<span class="dropdownCaption">' + ' | '+ city + '</span>' +
                '<span class="dropdownCaption">' + ' | '+ country + '</span>' +
                '</div>';
          }
        }
      };
      return config;
    }

    function prepareBusinessLocationsDropDown(locationConfig, locationOptions){
      utilities.cloneIntoEmptyObject(locationConfig, getBpLocationConfig());
      businessPartner.getBusinessPartnerLocation(authentication.getUserBusinessId(), 'drop_down')
          .then(function(response){
            utilities.cloneIntoEmptyObject(locationOptions,response.locations)
          });
    }


    function prepareDesignationDropDown(designationConfig, designationOptions){
      utilities.cloneIntoEmptyObject(designationConfig, getBasicDropDownConfig());
      settings.dropDown[crud.READ](apiEndPoints.dropDown.designation, read.DROP_DOWN)
          .then(function(response){
            return utilities.cloneIntoEmptyObject(designationOptions, response.list);
          });
    }

    function contactTypeConfig(){
      return {
        plugins: {
          'no-delete': {}
        },
        valueField: 'text',
        labelField: 'text',
        options: [
          {
            "id":1,
            "text":"Fax Numbers"
          },
          {
            "id":2,
            "text": "Mobile"
          },
          {
            "id":3,
            "text": "Office"
          },
          {
            "id":4,
            "text": "Residential"
          }
        ],
        sortField: 'text',
        maxItems: 1
      };
    }
  }

}());
