'use strict';


// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.

angular.module('inspinia').controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, item) {

  $scope.item = item;

  $scope.save = function () {
    $uibModalInstance.close($scope.item);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
