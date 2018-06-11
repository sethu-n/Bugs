app.controller('issuesListController', ['$scope', '$http', 'DataService', function ($scope, $http, DataService) {

    DataService.getData('issuesList').then(function (data) {
        $scope.issues = data;
    })

    DataService.getData('labelsList').then(function (data) {
        $scope.labels = data;
    })

    DataService.getData('usersList').then(function (data) {
        $scope.users = data;
    })

    $scope.filter = {};
    $scope.statusOptions = [{
        'name': 'open',
        'isOpen': true
    }, {
        'name': 'closed',
        'isOpen': false
    }]

    $scope.sortOptions=[
        {
            "name" :"Newest",
            "value" : "-openedDate"
        },
        {
            "name" :"Oldest",
            "value" : "openedDate"
        },
        {
            "name" :"Issue Id",
            "value" : "id"
        },
        {
            "name" :"Reverse Issue Id",
            "value" : "-id"
        }
    ]

    $scope.filterOnLabel = function (filter) {
        return function (list) {
            if (!filter || angular.equals(filter,{})) {
                return true
            }
            var index = list.label.findIndex(function (each) {
                return each.name == filter.name;
            });
            return index>=0 ?true : false;
        }
    }

    $scope.filterOnAssignee=function(filter){
        return function (list) {
            if (!filter || angular.equals(filter,{})) {
                return true
            }
            return filter.userName == list.assignedTo.userName;
        }
    }
    $scope.clearFilters=function(){
        $scope.filter={};
    }

    $scope.openIssue=function(id){
        window.location.hash = '#!/issue/'+id;
    }
}])