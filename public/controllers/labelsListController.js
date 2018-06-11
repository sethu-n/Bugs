app.controller('labelsListController', ['$scope', '$http', 'DataService', function ($scope, $http, DataService) {

    DataService.getData('labelsList').then(function (data) {
        $scope.labels = data;
    })

    $scope.filter = {};

    $scope.sortOptions=[
        {
            "name" :"Alphabetically",
            "value" : "name"
        },
        {
            "name" :"Reverse Alphabetically",
            "value" : "-name"
        }
    ]

    $scope.clearFilters=function(){
        $scope.filter={};
    }
}])