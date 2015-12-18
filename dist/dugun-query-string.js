angular.module('dugun.queryString', [
    'angularMoment', // momentjs wrapper for angular
]);

/*
 * http://www.metaltoad.com/blog/managing-querystring-angular-location
 */

function DugunQueryString($location, moment) {
    this.filters = null;

    this.getFilters = function(filterObj) {
        var qs = $location.search();

        if(!filterObj) {
            this.filters = convertArrays(convertNumbers(qs));
        } else {
            for(var param in filterObj) {
                if(param in qs) {
                    filterObj[param] = qs[param];
                }
            }
            this.filters = convertArrays(convertNumbers(filterObj));
        }

        return this.filters;
    };

    this.setFilters = function(filterObj) {
        filterObj = convertBooleanToString(filterObj);
        $location.search(filterObj);
    };

    this.getHash = function() {
        return $location.hash();
    };

    this.setHash = function(hash) {
        $location.hash(hash);
    };

    this.getDatesFromFilters = function(filterName, defaultStart, defaultEnd) {
        var dates = {
            startDate: null,
            endDate: null
        };

        var filters = this.filters;

        if(!this.filters) this.getFilters();
        filters = {};

        if(filters[filterName + 'Start']) {
            dates.startDate = moment(filters[filterName + 'Start']);
        } else {
            if(defaultStart) {
                if(!defaultStart._isAMomentObject) {
                    defaultStart = moment(defaultStart);
                }
                dates.startDate = defaultStart;
            }
        }

        if(filters[filterName + 'End']) {
            dates.endDate = moment(filters[filterName + 'End']);
        } else {
            if(defaultEnd) {
                if(!defaultEnd._isAMomentObject) {
                    defaultEnd = moment(defaultEnd);
                }
                dates.endDate = defaultEnd;
            }
        }

        return dates;
    };

    // Query string is always string so we convert numbers to float
    function convertNumbers(object) {
        for(var i in object) {
            if(typeof object[i] === 'object') {
                object[i] = convertNumbers(object[i]);
            } else if(object[i] === 'true' || object[i] === 'false') {
                object[i] = object[i] === 'true' ? true : false;
            } else if(!isNaN(object[i]) && object[i] !== '' && typeof object[i] !== 'boolean') {
                object[i] = parseFloat(object[i]);
            }
        }
        return object;
    }

    // Arrays with one element are not converted to array. Let's fix it.
    function convertArrays(object) {
        for(var i in object) {
            if(typeof object[i] === 'object') {
                object[i] = convertArrays(object[i]);
            } else if(i.indexOf('[]') !== -1) {
                object[i] = [object[i]];
            }
        }
        return object;
    }

    function convertBooleanToString(object) {
        for(var i in object) {
            if(typeof object[i] === 'object') {
                object[i] = convertBooleanToString(object[i]);
            } else if(typeof object[i] === 'boolean') {
                object[i] = object[i] ? 'true' : 'false';
            } else if(typeof object[i] === 'string' && object[i] === '') {
                delete object[i];
            }
        }
        return object;
    }
}

DugunQueryString.$inject = [
    '$location',
    'moment'
];

angular.module('dugun.queryString')
    .service('queryString', DugunQueryString);
