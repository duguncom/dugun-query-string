# dugun-query-string
Controls query string and hash easily.

## Installation
Install the package using bower:

    bower install --save dg-query-string
    
The include it as a dependency in your project:
    
    angular.module('app', [
        'dugun.queryString'
    ];

## Usage

To make it available in your controllers, just use it as any other service:

    angular.module('app').controller('MyController', ['queryString', MyController]);
    
    function MyController(queryString) {
        $scope.filters = queryString.getFilters();
        
        $scope.setFilters = function() {
            queryString.setFilters(angular.copy($scope.filters);
        }
    }
