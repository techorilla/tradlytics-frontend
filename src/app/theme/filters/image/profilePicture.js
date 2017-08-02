/**
 * @author v.lugovsky
 * created on 17.12.2015
 */
(function () {
  'use strict';

  angular.module('app.theme')
      .filter('profilePicture', profilePicture)
      .filter('productPicture', productPicture)
      .filter('itemImage', itemImage)
      .filter('businessLogo', businessLogo)
      .filter('countryLogo', countryLogo)
      .filter('shippingLineLogo', shippingLineLogo);

  function itemImage(layoutPaths){
    return function(input, ext) {
      return (input) ? input : layoutPaths.images.root+'/theme/no-picture.png'
    };
  }

  /** @ngInject */
  function shippingLineLogo(layoutPaths) {
    return function(input, ext) {
      return (input) ? input : layoutPaths.images.root+'/theme/no-shipping-logo.png'
    };
  }

  /** @ngInject */
  function profilePicture(layoutPaths) {
    return function(input, ext) {
      return (input) ? input : layoutPaths.images.root+'/theme/no-photo.png'
    };
  }

  function countryLogo(layoutPaths){
    return function(input, ext) {
      return (input) ? input : layoutPaths.images.root+'/theme/no-business.png'
    };
  }

  function businessLogo(layoutPaths){
    return function(input, ext) {
      return (input) ? input : layoutPaths.images.root+'/theme/no-business.png'
    };
  }

  function productPicture(layoutPaths){
    return function(input, ext){
      return (input) ? input : layoutPaths.images.root+'/theme/no-product.png'
    }
  }

})();
