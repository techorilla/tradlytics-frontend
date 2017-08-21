(function() {

    'use strict';

    angular
        .module('app.dashboard.tradeBook')
        .controller('TradeDashboard', TradeDashboard);

    /* @ngInject */
    function TradeDashboard(tradeBook, dashboardData, baConfig, $timeout, $filter, authentication) {
        var vm = this;
        _init();

        function _init(){
            vm.dashboardData = dashboardData;
            vm.dashboardColors = baConfig;
            vm.hasBusinessAnalytics =
            vm.multiBarData = {
                labels: ['1 Year', '6 Months', '30 Days', '7 Days'],
                series: [
                    { "name": "New Trades", "data": vm.dashboardData.multiBar.newTrades },
                    { "name": "Completed", "data": vm.dashboardData.multiBar.completeTrades },
                    { "name": "Washout", "data": vm.dashboardData.multiBar.washoutTrades },
                    { "name": "Buyer Contract", "data": vm.dashboardData.multiBar.buyerContractTrades },
                    { "name": "Arrived Not Completed", "data": vm.dashboardData.multiBar.arrivedTrades }
                ]
            };

            vm.multiBarOptions = {
                fullWidth: true,
                plugins: [
                    Chartist.plugins.legend()
                ],
                height: "400px",
                stackBars: true,
                axisX: {
                    labelInterpolationFnc: function (value) {
                        return value.split(/\s+/).map(function (word) {
                            return word[0];
                        }).join('');
                    }
                }
            };

            vm.multiBarResponsive = [
                // Options override for media > 400px
                ['screen and (min-width: 400px)', {
                    reverseData: true,
                    horizontalBars: true,
                    axisX: {
                        labelInterpolationFnc: Chartist.noop
                    }
                }],
                // Options override for media > 800px
                ['screen and (min-width: 800px)', {
                    stackBars: false,
                    seriesBarDistance: 10
                }],
                // Options override for media > 1000px
                ['screen and (min-width: 1000px)', {
                    reverseData: false,
                    horizontalBars: false,
                    seriesBarDistance: 15
                }]
            ];

            $timeout(function () {
                loadPieCharts();
                new Chartist.Bar('#multi-bar', vm.multiBarData, vm.multiBarOptions, vm.multiBarResponsive)
            }, 100);

            vm.showTrades = showTrades

        }

        function showTrades(pageType, heading){
            tradeBook.openTradeBookModal(pageType, heading);
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