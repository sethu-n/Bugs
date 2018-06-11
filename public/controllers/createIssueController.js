app.controller('createIssueController', ['$scope', '$http', 'DataService', function ($scope, $http, DataService) {

    $scope.issue = {};
    $scope.newComment={};
    $scope.editMode=true;
    DataService.getData('labelsList').then(function (data) {
        $scope.labels = data;
    })

    DataService.getData('usersList').then(function (data) {
        $scope.users = data;
    })

    $scope.createNewIssue = function () {
        $scope.issue.createdBy = DataService.getUserName();
        $scope.issue.openedDate = new Date().getTime();
        $scope.issue.isOpen = true;
        $scope.issue.comments = [];
        $scope.newComment.commentedDate = new Date().getTime();
        $scope.newComment.commentedUser = DataService.getUserName();
        $scope.issue.comments.push($scope.newComment);
        DataService.addNew('issuesList', angular.toJson($scope.issue)).then(function (data) {
            window.location.hash = '#!/list';
        })
    }
}])