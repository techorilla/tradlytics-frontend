(function() {

    'use strict';

    angular
        .module('app.dashboard.tradeBook')
        .controller('TradeDashboard', TradeDashboard);

    /* @ngInject */
    function TradeDashboard(tradeBook, dashboardData, baConfig, $timeout, $filter, loaderModal) {
        var vm = this;
        _init();

        function _init(){
            vm.dashboardData = dashboardData;
            vm.dashboardColors = baConfig;

            $timeout(function () {
                loadPieCharts();
            }, 100);
        }

        function loadPieCharts() {
            $('.chart').each(function () {
                var chart = $(this);
                chart.easyPieChart({
                    easing: 'easeOutBounce',
                    onStep: function (from, to, percent) {
                        $(this.el).find('.percent').text(Math.round(percent));
                    },
                    barColor: chart.attr('rel'),
                    trackColor: 'rgba(0,0,0,0)',
                    size: 84,
                    scaleLength: 0,
                    animation: 2000,
                    lineWidth: 9,
                    lineCap: 'round'
                });
            });
        }

    }
})();