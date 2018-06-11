var app = angular.module('bugsApp', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider.when('/', { templateUrl: 'templates/issuesList.html', controller: 'issuesListController' })
        .when('/list', { templateUrl: 'templates/issuesList.html', controller: 'issuesListController' })
        .when('/issue/:id', { templateUrl: 'templates/viewIssue.html', controller: 'viewIssueController' })
        .when('/label', { templateUrl: 'templates/labelsList.html', controller: 'labelsListController' })
        .when('/create', { templateUrl: 'templates/createIssue.html', controller: 'createIssueController' })
        .otherwise({ redirectTo: '/' });
});


app.controller('modalController',function(DataService,$scope){
    $scope.user={};
    if(!DataService.getUserName()){
        $('#userModal').modal({
            backdrop: 'static',
            keyboard: false
        })
    }
    $scope.storeUserName=function(){
        DataService.setUserName($scope.user.userName);
        $('#userModal').modal('hide');
        window.location.reload();
    }
})

app.controller('headerController',function(DataService,$scope){
    $scope.userName=DataService.getUserName();
})