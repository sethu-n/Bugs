app.directive('issueEditor', function($timeout) {
  return {
    restrict: 'EA',
    templateUrl: 'directives/issueEditor.html',
    transclude:{
        title: '?editorTitle'
    },
    scope:{
      editorContent : '=editorContent',
      editMode:'=edit'
    },
    link: function(scope, element, attrs) {
      if(scope.editorContent){
        element[0].querySelector('#issuesTextarea').innerHTML=scope.editorContent;
      }
      if(scope.editMode==undefined){
        scope.editMode=false;
      }
      scope.handleClick = function(action,value) {
        if(action == 'createLink'){
          value= prompt('URL')
        }
        document.execCommand(action,false,value);
      };

      scope.toggleMode=function(){
        scope.editMode =  !scope.editMode;
      }

      element.on('keyup click blur',function(){
       $timeout(function(){
        scope.editorContent=element[0].querySelector('#issuesTextarea').innerHTML;        
       })
      })
    },
  };
});
