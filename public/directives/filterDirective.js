app.directive('filterElement', function() {
    return {
      restrict: 'EA',
      templateUrl: 'directives/filterTemplate.html',
      transclude: {
        'heading': '?filterHeading',
        'description': '?filterDesc'
      },
      scope:{
        filterOptions : '=filterOptions',
        bindKey:'@bindKey',
        selectedOption :"=selectedOption"
      },
      link: function(scope, element, attrs) {
        scope.isOpen=false;

        scope.toggleFilter=function(){
            scope.isOpen= !scope.isOpen;
        }

        scope.selectOption=function(option,index){
          if(attrs.multiselect){
            if(scope.selectedOption && Array.isArray(scope.selectedOption)){
              scope.selectedOption.findIndex(function(each){ return each[scope.bindKey] == option[scope.bindKey]}) >=0 ? 
              scope.selectedOption.splice(scope.selectedOption.findIndex(function(each){ return each[scope.bindKey] == option[scope.bindKey]}),1) :
              scope.selectedOption.push(option)
            }
            else{
              scope.selectedOption=[];
              scope.selectedOption.push(option)
            }
          }
          else{
            scope.selectedOption = (scope.selectedOption && scope.selectedOption[scope.bindKey] == option[scope.bindKey]) ? {} : option;
            //scope.isOpen= !scope.isOpen;            
          }
        }

        scope.checkSelected=function(option){
          if(attrs.multiselect){
            return scope.selectedOption && scope.selectedOption.findIndex(function(each){ return each[scope.bindKey] == option[scope.bindKey]}) >=0 ;
          }
          else{
           
            return scope.selectedOption && option[scope.bindKey] == scope.selectedOption[scope.bindKey]
          } ;
        }
      },
    };
  });