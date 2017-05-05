/**
 * @ngdoc service
 * @name app.common.filter
 * @description < description placeholder >
 */

(function(){

    'use strict';

    Date.prototype.addDays = function(days) {
        var dat = new Date(this.valueOf());
        dat.setDate(dat.getDate() + days);
        return dat;
    };

    Date.prototype.removeTime = function(){
            return moment(this).format('LL');
    };

    Date.prototype.addTimeZoneOffset = function() {
        var offset = this.getTimezoneOffset();
        var hour = offset/60;
        this.setHours(this.getHours()+hour);
        return this;
    };

    String.prototype.capitalizeFirstLetter = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }

}());

