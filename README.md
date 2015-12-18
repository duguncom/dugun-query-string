# dugun-query-string
Controls query string and hash easily.

## Installation
Install the package using bower:

    bower install --asve dg-query-string
    
The include it as a dependency in your project:
    
    angular.module('app', [
        'dugun.queryString'
    ];

## Usage

To make it available in your controllers, just use it as any other service:

    angular.module('app').controller('MyController', ['dgQueryString', MyController]);
    
    function MyController(dgQueryString) {
        $scope.filters = dgQueryString.getFilters();
        
        $scope.setFilters = function() {
            dgQueryString.setFilters(angular.copy($scope.filters);
        }
    }
