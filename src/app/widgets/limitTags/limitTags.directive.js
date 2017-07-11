// /**
//  * @author v.lugovksy
//  * created on 16.12.2015
//  */
// (function () {
//     'use strict';
//
//     angular.module('app.widgets')
//         .directive('limitTags', limitTags);
//
//     /** @ngInject */
//     function limitTags() {
//         return {
//             require: 'ngModel',
//             link: function(scope, elem, attrs, ngModel) {
//                 var maxTags = parseInt(attrs.maxTags, 10);
//                 ngModel.$parsers.unshift(function(value) {
//                     if (value && value.length > maxTags) {
//                         value.splice(value.length - 1, 1);
//                     }
//                     return value;
//                 });
//             }
//         };
//     }
// })();