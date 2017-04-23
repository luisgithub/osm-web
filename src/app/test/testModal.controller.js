/**
 * Created by luis on 5/16/16.
 */
angular.module('inspinia')
  .controller('ModalCtrl', function ($scope, $location, $routeParams, $timeout, config, dataService, modalService) {
      var modalOptions = {
        closeButtonText : 'Cancel',
        actionButtonText : 'Delete Record',
        headerText : 'Delete',
        bodyText : 'Are you shure you want to...?'
      };

      modalService.showModal({}, modalOptions).then(function (result) {
        dataService.deleteCustomer($scope.customer.id).then(function () {
          $location.path("/rx");
        }, processError);
      })


});
