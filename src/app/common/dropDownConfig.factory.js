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
  function dropDownConfig(Restangular, businessPartner, utilities, settings, apiEndPoints, crud, read, appConstants){
    return {

      getBasicDropDownConfig: getBasicDropDownConfig,

      contactTypeConfig: contactTypeConfig,
      prepareProductItemDropDown: prepareProductItemDropDown,
      prepareBusinessDropDown: prepareBusinessDropDown,
      getPackingConfig: getPackingConfig,
      getCommissionTypeConfig: getCommissionTypeConfig,
      getBpLocationConfig: getBpLocationConfig,
      prepareBusinessLocationsDropDown: prepareBusinessLocationsDropDown,
      prepareDesignationDropDown: prepareDesignationDropDown,
      prepareProductCategoryDropDown: prepareProductCategoryDropDown,
      prepareCountryDropDown: prepareCountryDropDown,
      prepareKeywordDropDown: prepareKeywordDropDown,
      prepareProductDropDown: prepareProductDropDown,
      prepareProductOriginDropDown: prepareProductOriginDropDown,
      prepareCurrencyDropDown: prepareCurrencyDropDown,
      preparePriceMarketDropDown: preparePriceMarketDropDown,
      prepareShipmentMonthDropDown: prepareShipmentMonthDropDown,
      preparePriceMetricConfig: preparePriceMetricConfig,
      prepareRegionDropDown: prepareRegionDropDown,
      prepareCityDropDown: prepareCityDropDown,
      prepareByTypesDropDown: prepareByTypesDropDown,
      prepareContactNumberTypeDropDown: prepareContactNumberTypeDropDown,
      preparePackagingConfig: preparePackagingConfig,
      prepareCommissionTypeConfig: prepareCommissionTypeConfig,

      prepareShippingLineConfig: prepareShippingLineConfig,
      prepareShippingPortConfig: prepareShippingPortConfig,
      prepareShippingVesselConfig: prepareShippingVesselConfig,
      prepareWarehouseDropDown: prepareWarehouseDropDown,
      prepareInternationalFileIdAutoComplete: prepareInternationalFileIdAutoComplete,
      prepareLocalTradeConfig: prepareLocalTradeConfig,

      prepareTimeDrillOptions: prepareTimeDrillOptions

    };

    function prepareTimeDrillOptions(timeDrillConfig, timeDrillOptions){
      function getTimeDrillOptions(){
        return [
          {text:'By Day', value: 'day', order:1},
          {text:'By Week', value:'week', order:2},
          {text:'By Month', value:'month', order:3},
          {text:'By Year', value:'year', order:4}
        ];
      }
      utilities.cloneIntoEmptyObject(timeDrillConfig, getBasicDropDownConfig());
      timeDrillOptions['onItemRemove'] = function(value, obj){
        var selectizeDropDown = this;
        var removedOption = _.find(timeDrillOptions, function(opt) { return opt.value == value; });
        timeDrillOptions.list.push(removedOption);
        selectizeDropDown.refreshItems();
      };
      utilities.cloneIntoEmptyObject(timeDrillOptions, getTimeDrillOptions());
    }

    function prepareInternationalFileIdAutoComplete(fileIdConfig, fileIdOptions, multiple){

      function fileItem(item, escape) {
        return '<div>' +
            '<span class="dropdownLabel">' + item.fileId + '</span>' +
            '<span class="dropdownCaption">' + ' | '+ (item.contractId ? item.contractId : 'NA') + '</span>' +
            '<span class="dropdownCaption">' + ' | '+ item.buyerName + '</span>' +
            '<span class="dropdownCaption">' + ' | '+ item.sellerName + '</span>' +
            '<span class="dropdownCaption">' + ' | '+ (item.blNo ? item.blNo : 'NA') + '</span>' +
            '</div>';
      }

      var config = {
        valueField: 'fileId',
        sortField: 'fileId',
        searchField: ['fileId', 'contractId', 'blNo', 'buyerName', 'sellerName'],
        render: {
          item: fileItem,
          option: fileItem
        },
        onItemRemove: function(value, obj){
          var selectizeDropDown = this;
          var removedOption = _.find(fileIdOptions.list, function(line) { return line.fileId == value; });
          fileIdOptions.list.push(removedOption);
          selectizeDropDown.refreshItems();
        }
      };
      if(!multiple){
        config['maxItems'] = 1
      }
      utilities.cloneIntoEmptyObject(fileIdConfig, config);
      settings.dropDownAPI.customGET(apiEndPoints.dropDown.transaction).then(function (response){
        return utilities.cloneIntoEmptyObject(fileIdOptions, response.transactionList);
      });
    }

    function prepareLocalTradeConfig(localTradeConfig, localTradeOptions, multiple){
      function fileItem(item, escape) {
        return '<div>' +
            '<span class="dropdownLabel">' + item.fileId + '</span>' +
            '<span class="dropdownCaption" ng-if="item.contractId">' + ' | '+ item.contractId + '</span>' +
            '<span class="dropdownCaption">' + ' | '+ item.buyerName + '</span>' +
            '<span class="dropdownCaption">' + ' | '+ item.sellerName + '</span>' +
            '</div>';
      }
      var config = {
        valueField: 'fileId',
        sortField: 'fileId',
        searchField: ['fileId', 'contractId', 'blNo'],
        render: {
          item: fileItem,
          option: fileItem
        },
        onItemRemove: function(value, obj){
          var selectizeDropDown = this;
          var removedOption = _.find(fileIdOptions.list, function(line) { return line.fileId == value; });
          fileIdOptions.list.push(removedOption);
          selectizeDropDown.refreshItems();
        }

      };
      if(!multiple){
        config['maxItems'] = 1
      }
      utilities.cloneIntoEmptyObject(localTradeConfig, config);
      settings.dropDownAPI.customGET(apiEndPoints.dropDown.localTrade).then(function (response){
        return utilities.cloneIntoEmptyObject(localTradeOptions, response.transactionList);
      });
    }


    function prepareShippingVesselConfig(){

    }

    function prepareShippingPortConfig(shippingPortConfig, shippingPortOptions){

      function shippingPortItem(item, escape){
        return '<div>' +
            '<span class="dropdownLabel">' + item.name + '</span>' +
            '<span class="dropdownCaption">' + ' | '+ item.loCode  + '</span>' +
            '<span class="dropdownCaption">' + ' | '+ item.country + '</span>' +
            '</div>';
      }

      var dropDown = {
        onItemRemove: function(value, obj){
          var selectizeDropDown = this;
          var removedOption = _.find(shippingPortOptions.list, function(port) { return port.id == value; });
          shippingPortOptions.list.push(removedOption);
          selectizeDropDown.refreshItems();
        },
        valueField: 'id',
        sortField: 'name',
        searchField: ['name', 'loCode', 'country'],
        maxItems:1,
        create: false,
        persist: false,
        render: {
          item: shippingPortItem,
          option: shippingPortItem
        }
      };
      utilities.cloneIntoEmptyObject(shippingPortConfig, dropDown);
      return settings.dropDown[crud.READ](apiEndPoints.dropDown.ports).then(function (response){
        return utilities.cloneIntoEmptyObject(shippingPortOptions, response.list);
      });
    }


    function prepareShippingLineConfig(shippingLineConfig, shippingLineOptions){

      function shippingLineItem(item, escape){
        return '<div>' +
            '<span class="dropdownLabel">' + item.name + '</span>' +
            '<span class="dropdownCaption">' + ' | '+ item.codeName  + '</span>'
        '</div>';
      }

      var dropDown = {
        onItemRemove: function(value, obj){
          var selectizeDropDown = this;
          var removedOption = _.find(shippingLineOptions.list, function(line) { return line.id == value; });
          shippingLineOptions.list.push(removedOption);
          selectizeDropDown.refreshItems();
        },
        valueField: 'id',
        sortField: 'name',
        searchField: ['name', 'codeName'],
        maxItems:1,
        create: false,
        persist: false,
        render: {
          item: shippingLineItem,
          option: shippingLineItem
        }
      };
      utilities.cloneIntoEmptyObject(shippingLineConfig, dropDown);
      return settings.dropDown[crud.READ](apiEndPoints.dropDown.shippingLine).then(function (response){
        return utilities.cloneIntoEmptyObject(shippingLineOptions, response.list);
      });
    }


    function preparePackagingConfig(packagingConfig, packagingOption){
      utilities.cloneIntoEmptyObject(packagingConfig, getBasicDropDownConfig());
      settings.dropDown[crud.READ](apiEndPoints.dropDown.packaging, read.DROP_DOWN)
          .then(function(response){
            return utilities.cloneIntoEmptyObject(packagingOption, response.list);
          });
    }

    function prepareCommissionTypeConfig(commissionTypeConfig, commissionTypeOptions){
      utilities.cloneIntoEmptyObject(commissionTypeConfig, getBasicDropDownConfig());
      settings.dropDown[crud.READ](apiEndPoints.dropDown.commissionType, read.DROP_DOWN)
          .then(function(response){
            return utilities.cloneIntoEmptyObject(commissionTypeOptions, response.list);
          });
    }

    function shipementMonthconfig(item, escape){
      return '<div>' +
          '<span class="dropdownLabel">' + item.month + '</span>' +
          '<span class="dropdownCaption">' + ' | '+ item.year + '</span>' +
          '</div>';
    }

    function prepareContactNumberTypeDropDown(contactTypeConfig, contactTypeOptions){
      utilities.cloneIntoEmptyObject(contactTypeConfig, getBasicDropDownConfig());
      contactTypeConfig['onItemRemove'] = function(value, obj){
        var selectizeDropDown = this;
        var removedOption = _.find(contactTypeOptions.list, function(opt) { return opt.id == value; });
        contactTypeOptions.list.push(removedOption);
        selectizeDropDown.refreshItems();
      };
      settings.dropDown[crud.READ](apiEndPoints.dropDown.contactType, read.DROP_DOWN)
          .then(function(response){
            return utilities.cloneIntoEmptyObject(contactTypeOptions, response.list);
          });
    }

    function getBusinessItem(item, escape){
      var country = (!item.country) ? 'No Origin' : item.country;
      var pContact = (item.contactPerson === null)? 'No Primary Contact' : item.contactPerson;
      return '<div>' +
          '<span class="dropdownLabel">' + utilities.manageTextOverFlow(item.name, 20) + '</span>' +
          '<span class="dropdownCaption">' + ' | '+ country + '</span>' +
          '<span class="dropdownCaption">' + ' | '+ pContact + '</span>' +
          '</div>';

    }

    function getBusinessOption(item, escape){
      var country = (!item.country) ? 'No Origin' : item.country;
      var pContact = (item.contactPerson === null)? 'No Primary Contact' : item.contactPerson;
      return '<div>' +
          '<span class="dropdownLabel">' + item.name + '</span>' +
          '<span class="dropdownCaption">' + ' | '+ country + '</span>' +
          '<span class="dropdownCaption">' + ' | '+ pContact + '</span>' +
          '</div>';

    }

    function prepareBusinessDropDown(businessConfig, businessOptions, businessType){
      var config = {
        onItemRemove: function(value, obj){
          var selectizeDropDown = this;
          var removedOption = _.find(businessOptions.list, function(business) { return business.id == value; });
          businessOptions.list.push(removedOption);
          selectizeDropDown.refreshItems();
        },
        valueField: 'id',
        sortField: 'name',
        searchField: ['name','contactPerson','country'],
        maxItems:1,
        create: false,
        persist: false,
        render: {
          item: getBusinessItem,
          option: getBusinessOption
        }
      };
      utilities.cloneIntoEmptyObject(businessConfig, config);
      settings.dropDown[crud.READ](apiEndPoints.dropDown.business, {'type': businessType})
          .then(function(response){
            return utilities.cloneIntoEmptyObject(businessOptions, response.list);
          });
    }

    function prepareByTypesDropDown(bpTypeConfig, bpTypeOptions){
      utilities.cloneIntoEmptyObject(bpTypeConfig, getBasicDropDownConfig(true, bpTypeOptions));
      settings.dropDown[crud.READ](apiEndPoints.dropDown.bpType, read.DROP_DOWN)
          .then(function(response){
            return utilities.cloneIntoEmptyObject(bpTypeOptions, response.list);
          });
    }

    function prepareWarehouseDropDown(warehouseConfig, warehouseOptions){
      utilities.cloneIntoEmptyObject(warehouseConfig, getBasicDropDownConfig(false, warehouseOptions));
      settings.dropDown[crud.READ](apiEndPoints.dropDown.warehouses, read.DROP_DOWN)
          .then(function(response){
            return utilities.cloneIntoEmptyObject(warehouseOptions, response.list);
          });
    }



    function prepareShipmentMonthDropDown(monthConfig, monthOptions, priceDate){
      var dropDown = {
        onItemRemove: function(value, obj){
          var selectizeDropDown = this;
          var removedOption = _.find(monthOptions.list, function(month) { return month.startMonth == value; });
          monthOptions.list.push(removedOption);
          selectizeDropDown.refreshItems();
        },
        valueField: 'startMonth',
        sortField: 'startMonth',
        searchField: ['month', 'year'],
        create: false,
        persist: false,
        render:{
          item: shipementMonthconfig,
          option: shipementMonthconfig
        }
      };
      utilities.cloneIntoEmptyObject(monthConfig, dropDown);
      return settings.dropDown[crud.READ](apiEndPoints.dropDown.shipmentMonth, priceDate).then(function (response){
        return utilities.cloneIntoEmptyObject(monthOptions, response.list);
      });
    }


    function priceMarketOption(item, escape){
      return '<div>' +
          '<span class="dropdownLabel">' + item.origin + '</span>' +
          '<span class="dropdownCaption">' + ' | '+ item.currency + '</span>' +
          '</div>';
    }


    function preparePriceMarketDropDown(priceMarketConfig, priceMarketOptions, onPriceMarketChange){
      var dropDown = {
        onItemRemove: function(value, obj){
          var selectizeDropDown = this;
          var removedOption = _.find(priceMarketOptions.list, function(market) { return market.id == value; });
          priceMarketOptions.list.push(removedOption);
          selectizeDropDown.refreshItems();
        },
        valueField: 'id',
        sortField: 'origin',
        searchField: ['origin', 'currency'],
        maxItems:1,
        create: false,
        persist: false,
        render: {
          item: priceMarketOption,
          option: priceMarketOption
        }
      };
      if(onPriceMarketChange){
        dropDown['onChange'] = onPriceMarketChange;
      }
      utilities.cloneIntoEmptyObject(priceMarketConfig, dropDown);
      return settings.dropDown[crud.READ](apiEndPoints.dropDown.priceMarket).then(function (response){
        return utilities.cloneIntoEmptyObject(priceMarketOptions, response.list);
      });
    }



    function productItemItem(item, escape) {
      var keywords = (item.keywords === '')? 'No Keywords' : item.keywords;
      return '<div>' +
          '<span class="dropdownLabel">' + utilities.manageTextOverFlow(item.name, 20) + '</span>' +
          '<span class="dropdownCaption">' + ' | '+ item.origin + '</span>' +
          '<span class="dropdownCaption" style="max-width: 80px;text-overflow: ellipsis">' + ' | '+utilities.manageTextOverFlow(keywords, 15)  + '</span>' +
          '</div>';
    }

    function productItemOption(item, escape) {
      var keywords = (item.keywords === '')? 'No Keywords' : item.keywords;
      return '<div>' +
          '<span class="dropdownLabel">' + item.name + '</span>' +
          '<span class="dropdownCaption">' + ' | '+ item.origin + '</span>' +
          '<span class="dropdownCaption" style="max-width: 80px;text-overflow: ellipsis">' + ' | '+ keywords + '</span>' +
          '</div>';
    }


    function prepareProductItemDropDown(productItemConfig, productItemOptions, pricingOnWebsiteOnly){
      pricingOnWebsiteOnly = pricingOnWebsiteOnly ? pricingOnWebsiteOnly : false;
      var dropDown = {
        onItemRemove: function(value, obj){
          var selectizeDropDown = this;
          var removedOption = _.find(productItemOptions.list, function(prod) { return prod.id == value; });
          productItemOptions.list.push(removedOption);
          selectizeDropDown.refreshItems();
        },
        valueField: 'id',
        sortField: 'name',
        searchField: ['name', 'origin', 'keywords'],
        maxItems:1,
        create: false,
        persist: false,
        render: {
          item: productItemItem,
          option: productItemOption
        }
      };
      utilities.cloneIntoEmptyObject(productItemConfig, dropDown);
      return settings.dropDown[crud.READ](apiEndPoints.dropDown.productItem, {'pricingOnWebsiteOnly': pricingOnWebsiteOnly})
          .then(function (response){
            return utilities.cloneIntoEmptyObject(productItemOptions, response.list);
          });
    }



    function currencyItem(item, escape) {
      var name = item.name;
      return '<div>' +
          '<span class="dropdownLabel">' + name + '</span>' +
          '<span class="dropdownCaption">' + ' | '+ item.code + '</span>' +
          '</div>';
    }

    function prepareCurrencyDropDown(currencyConfig, currencyOptions){
      var dropDown = {
        onItemRemove: function(value, obj){
          var selectizeDropDown = this;
          var removedOption = _.find(currencyOptions.list, function(opt) { return opt.code == value; });
          productOptions.list.push(removedOption);
          selectizeDropDown.refreshItems();
        },
        valueField: 'code',
        sortField: 'name',
        searchField: ['name'],
        maxItems:1,
        create: false,
        persist: false,
        render: {
          item: currencyItem,
          option: currencyItem
        }
      };
      utilities.cloneIntoEmptyObject(currencyConfig, dropDown);
      return settings.dropDown[crud.READ](apiEndPoints.dropDown.currency).then(function (response){
        return utilities.cloneIntoEmptyObject(currencyOptions, response.list);
      });
    }

    function prepareKeywordDropDown(keywordConfig, keywordOptions, productId, callback){
      var options = {};
      utilities.cloneIntoEmptyObject(keywordConfig, getBasicDropDownConfig(true, keywordOptions, 'id', 'name'));
      if(!productId) return;
      return settings.dropDown[crud.READ](apiEndPoints.dropDown.productKeywords, productId).then(function (response) {
        utilities.cloneIntoEmptyObject(options, response.list);
        if(callback){
          callback();
        }
        return utilities.cloneIntoEmptyObject(keywordOptions, response.list);
      });
    }

    function prepareProductDropDown(productConfig, productOptions, productOriginConfig, productOriginOptions,
                                    keywordConfig, keywordOptions, onChangeCallBack){
      var dropDown = {
        onItemRemove: function(value, obj){
          var selectizeDropDown = this;
          var removedOption = _.find(productOptions.list, function(opt) { return opt.id == value; });
          productOptions.list.push(removedOption);
          selectizeDropDown.refreshItems();
        },
        valueField: 'id',
        sortField: 'name',
        searchField: ['name'],
        maxItems:1,
        create: false,
        persist: false,
        render: {
          item: productOption,
          option: productOption
        }
      };
      if(productOriginConfig){
        dropDown['onChange'] = function (value){
          onChangeCallBack(productOriginConfig, productOriginOptions, keywordConfig, keywordOptions, value);
        };
      }
      utilities.cloneIntoEmptyObject(productConfig, dropDown);
      return settings.dropDown[crud.READ](apiEndPoints.dropDown.product).then(function (response){
        return utilities.cloneIntoEmptyObject(productOptions, response.list);
      });
    }

    function productOption(item, escape) {
      var name = item.name;
      return '<div>' +
          '<span class="dropdownLabel">' + name + '</span>' +
          '<span class="dropdownCaption">' + ' | '+ item.category + '</span>' +
          '</div>';
    }


    function prepareProductOriginDropDown(productOriginConfig, productOriginOptions, productId, callback){
      var options = {};
      var dropDown = {
        onItemRemove: function(value){
          var removedItem = _.find(options.list, function(opt) { return opt.code == value; });
          productOriginOptions.list.push(removedItem);
          var selectizeDropDown = this;
          selectizeDropDown.refreshItems();
        },
        maxItems: 1,
        valueField: 'code',
        sortField: 'name',
        searchField: ['name'],
        openOnFocus: true,
        closeOnSelect: true,
        create: false,
        persist: false,
        render: {
          item: countryItem,
          option: countryItem
        }
      };
      utilities.cloneIntoEmptyObject(productOriginConfig, dropDown);
      if(!productId) return;
      return settings.dropDown[crud.READ](apiEndPoints.dropDown.productOrigin, productId).then(function (response){
        utilities.cloneIntoEmptyObject(options, response.list);
        utilities.cloneIntoEmptyObject(productOriginOptions, response.list);
        if(callback){
          callback();
        }
        return;

      });
    }

    function prepareRegionDropDown(regionConfig, regionOptions, countryCode, onChangeCallBack){
      if(regionConfig) {
        utilities.cloneIntoEmptyObject(regionConfig, getBasicDropDownConfig());
        if(onChangeCallBack){
          regionConfig['onChange'] = function (value){
            console.log(value);
            onChangeCallBack(value);
          };
        }
      }
      if(countryCode){
        settings.dropDown[crud.READ](apiEndPoints.dropDown.region, countryCode)
            .then(function(response){
              return utilities.cloneIntoEmptyObject(regionOptions, response.list);
            });
      }
    }

    function prepareCityDropDown(cityConfig, cityOptions, countryCode, regionCode){
      if(cityConfig){
        utilities.cloneIntoEmptyObject(cityConfig, getBasicDropDownConfig());
      }
      if(countryCode){
        settings.dropDown[crud.READ](apiEndPoints.dropDown.city, {'countryCode': countryCode, 'region': regionCode})
            .then(function(response){
              return utilities.cloneIntoEmptyObject(cityOptions, response.list);
            });
      }
    }

    function countryItem(item, escape) {
      var label = item.name;
      return '<div>' +
          '<img width="18" src="'+appConstants.STATIC_URL + item.image+'"/>'+
          '<span class="dropdownLabel">&nbsp;&nbsp;&nbsp;' + label + '</span>' +
          '</div>';
    }


    function prepareCountryDropDown(countryConfig, countryOption, onChangeCallBack, maxItems){
      var options = {};
      var config =  {
        onItemRemove: function(value){
          var removedItem = _.find(options.list, function(opt) { return opt.code == value; });
          countryOption.list.push(removedItem);
          var selectizeDropDown = this;
          selectizeDropDown.refreshItems();
        },
        valueField: 'code',
        sortField: 'name',
        searchField: ['name'],
        openOnFocus: true,
        closeOnSelect: true,
        create: false,
        persist: false,
        render: {
          item: countryItem,
          option: countryItem
        }
      };
      if(maxItems) config['maxItems'] = maxItems;
      if(onChangeCallBack){
        config['onChange'] = function (value, a, b, c){
          onChangeCallBack(value);
        };
      }
      utilities.cloneIntoEmptyObject(countryConfig, config);
      settings.dropDown[crud.READ](apiEndPoints.dropDown.country, read.DROP_DOWN)
          .then(function(response){
            utilities.cloneIntoEmptyObject(options, response.list);
            return utilities.cloneIntoEmptyObject(countryOption, response.list);
          });
    }

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

    // multiple : boolean if you want a multi select
    function getBasicDropDownConfig(multiple, dropOptions, atrValue, atrLabel){
      var dropDown = {
        plugins: {
          'no-delete': {}
        },
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
            return '<div>' +
                '<span class="dropdownLabel">' + name + '</span>' +
                '</div>';
          }
        }
      };
      atrValue = (atrValue) ? atrValue : 'id';
      atrLabel = (atrLabel) ? atrLabel : 'name';

      if(multiple){
        delete dropDown['maxItems'];
        delete dropDown['plugins'];
        dropDown['onItemRemove'] = function(value, obj){
          var selectizeDropDown = this;
          var removedOption = {};
          removedOption[atrValue] = value;
          removedOption[atrLabel] = obj[0].innerText;
          if(dropOptions){
            dropOptions.list.push(removedOption);
          }
          selectizeDropDown.refreshItems();
        };

      }
      return dropDown;
    }





    function getBpLocationConfig(){
      var config = {
        plugins: {
          'no-delete': {}
        },
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
      businessPartner.getBusinessPartnerLocation('drop_down')
          .then(function(response){
            utilities.cloneIntoEmptyObject(locationOptions,response.locations)
          });
    }

    function prepareProductCategoryDropDown(catConfig, catOptions){
      utilities.cloneIntoEmptyObject(catConfig, getBasicDropDownConfig());
      return settings.dropDown[crud.READ](apiEndPoints.dropDown.productCategory).then(function (response) {
        return utilities.cloneIntoEmptyObject(catOptions, response.list);
      });
    }


    function preparePriceMetricConfig(priceMetricConfig, priceMetricOptions){
      utilities.cloneIntoEmptyObject(priceMetricConfig, getBasicDropDownConfig(false, priceMetricOptions));
      settings.dropDown[crud.READ](apiEndPoints.dropDown.priceMetric, read.DROP_DOWN)
          .then(function(response){
            return utilities.cloneIntoEmptyObject(priceMetricOptions, response.list);
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
