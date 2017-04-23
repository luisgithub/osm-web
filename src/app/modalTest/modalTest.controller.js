'use strict';

angular.module('inspinia').controller('ModalDemoCtrl', function ($scope, $uibModal, $log) {

  $scope.patient = {
    "id": null,
    "first_name" : "ca",
    "last_name" : "bo",
    "email" : "",
    "phone" : "",
    "mobile" : "",
    "birthdate" : new Date(),
    "gender" : 1,
    "active" : true
  };

   $scope.open = function () {

    var modalInstance = $uibModal.open({
      // animation: $scope.animationsEnabled,
      templateUrl: 'app/modalTest/modal.html',
      controller: 'ModalInstanceTestCtrl',
      resolve: {
        patient: function () {
          return $scope.patient;
        }
      }
    });

    modalInstance.result.then(function (patient) {

      $scope.patient = patient;
      console.log("guandondo los datos: "+angular.toJson(patient));
      test(patient.first_name);
    }, function () {
      console.log("Datos capturados: "+angular.toJson($scope.patient));

      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  var test = function(first_name){
    console.log("hola "+first_name);
  };

});

// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.

angular.module('inspinia').controller('ModalInstanceTestCtrl', function ($scope, $uibModalInstance, patient) {

  $scope.patient = patient;

  $scope.save = function () {
    $uibModalInstance.close($scope.patient);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
