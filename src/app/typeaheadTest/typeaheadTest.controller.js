angular.module('inspinia')
  .controller('TypeaheadCtrl', function($scope, $http) {

  $scope.selected = undefined;
  $scope.getPatients = function(val){
    return $http.get(UrlService+'/patients/find/'+val).then(function(response){
      return response.data;
    });
  };

});

angular.module('inspinia')
.controller('TypeaheadDemoCtrl', function($scope, $http){
  $scope.selectedPaciente = "";
  $scope.getPatients2 = function(viewValue){
    return $http.get(UrlService+'/patients/find/'+viewValue).then(function(response){
      return response.data;
    });
  };
});
