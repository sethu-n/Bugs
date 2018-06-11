app.controller('viewIssueController', ['$scope', '$http', 'DataService','$routeParams','$timeout', function ($scope, $http, DataService,$routeParams,$timeout) {

    $scope.issue={};
    $scope.newComment={};
    $scope.newComment.editMode=true;

    function loadIssuesData(){
    DataService.getDataById('issuesList','id',$routeParams.id).then(function(data){
        $scope.issue=data;
    })
    }

    loadIssuesData();

    DataService.getData('labelsList').then(function (data) {
        $scope.labels = data;
    })

    DataService.getData('usersList').then(function (data) {
        $scope.users = data;
    })

    $scope.addComment=function(){
        var comment={};
        comment.description=$scope.newComment.data;
        comment.commentedUser= DataService.getUserName();
        comment.commentedDate = new Date().getTime();

        $scope.issue.comments.push(comment);
       $timeout(function(){
       })
    }

    $scope.closeIssue=function(){
        $scope.issue.isOpen=false;
        $scope.issue.closedBy=DataService.getUserName();;
        $scope.issue.closedDate=new Date().getTime();
        $scope.updateIssue();
    }

    $scope.updateIssue=function(){
        DataService.updateStoredData('issuesList','id',$scope.issue)
        window.location.reload();
    }
}])