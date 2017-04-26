/**
 * @ngdoc overview
 * @name app.core
 * @description Filters for the Applications
 */

(function () {

    'use strict';

    angular.module('app.core')
        .config(textAngularDecorator)
        .directive('dropdownToggle', ['$document', '$location', function ($document, $location) {
            var openElement = null,
                closeMenu = angular.noop;
            return {
                restrict: 'CA',
                link: function (scope, element, attrs) {
                    scope.$watch('$location.path', function () { closeMenu(); });
                    element.parent().bind('click', function () { closeMenu(); });
                    element.bind('click', function (event) {

                        var elementWasOpen = (element === openElement);

                        event.preventDefault();
                        event.stopPropagation();

                        if (!!openElement) {
                            closeMenu();
                        }

                        if (!elementWasOpen && !element.hasClass('disabled') && !element.prop('disabled')) {
                            element.parent().addClass('open');
                            openElement = element;
                            closeMenu = function (event) {
                                if (event) {
                                    event.preventDefault();
                                    event.stopPropagation();
                                }
                                $document.unbind('click', closeMenu);
                                element.parent().removeClass('open');
                                closeMenu = angular.noop;
                                openElement = null;
                            };
                            $document.bind('click', closeMenu);
                        }
                    });
                }
            };
        }]);


    function textAngularDecorator($provide){
        $provide.decorator('taOptions', ['taRegisterTool', '$delegate', function(taRegisterTool, taOptions){
            // $delegate is the taOptions we are decorating
            // register the tool with textAngular

            taRegisterTool('backgroundColor', {
                display: "<div class='color-picker' spectrum-colorpicker ng-model='color' on-change='!!color && action(color)' format='\"hex\"' options='options'></div>",
                action: function (color) {
                    var me = this;
                    if (!this.$editor().wrapSelection) {
                        setTimeout(function () {
                            me.action(color);
                        }, 100)
                    } else {
                        return this.$editor().wrapSelection('backColor', color);
                    }
                },
                options: {
                    replacerClassName: 'fa fa-paint-brush', showButtons: false
                },
                color: "#fff"
            });
            taRegisterTool('fontColor', {
                display:"<spectrum-colorpicker class='color-picker' trigger-id='{{trigger}}' ng-model='color' on-change='!!color && action(color)' format='\"hex\"' options='options'></spectrum-colorpicker>",
                action: function (color) {
                    var me = this;
                    if (!this.$editor().wrapSelection) {
                        setTimeout(function () {
                            me.action(color);
                        }, 100)
                    } else {
                        return this.$editor().wrapSelection('foreColor', color);
                    }
                },
                options: {
                    replacerClassName: 'fa fa-font', showButtons: false
                },
                color: "#000"
            });





            // add the button to the default toolbar definition
            taOptions.toolbar[1].push('backgroundColor','fontColor');
            return taOptions;
        }]);
    }





}());
