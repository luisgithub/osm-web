'use strict';
var removeTemplate = '<input type="button" value="Eliminar" ng-click="removeRow($event, row.entity)" />';
angular.module('inspinia')
  .controller('SaleCtrl', function ($scope, $http, toaster, $uibModal, $log, $filter, PacienteService) {
    //console.log(PruebaService);
    var vm = this;
    var gridData = [];
    var colDef = [
      { field: 'codigo', displayName: 'Codigo', width: '10%' },
      { field: 'cantidad', displayName: 'Cantidad', width: '10%' },
      { field: 'descripcion', displayName : 'Descripcion', width: '60%'},
      { field: 'precio_venta', displayName : 'P. Unitario', cellFilter: 'currency', width: '10%'},
      { field: 'importe', displayName : 'Importe', cellFilter: 'currency', width: '10%'}

    ];

    var sale = {
      "rxAnterior" : "",
      "rxActual" : "",
      "paciente" : "",
      "conceptos" : [],
      "cliente" : "",
      "subTotal" : 0
    };

    vm.rxActual = {
      "esf_od" : null,
      "cil_od": null,
      "eje_od": null,
      add_od: null,
      dl_od: "",
      dc_od: "",
      altura_od: "",
      esf_oi: "",
      cil_oi: "",
      eje_oi: "",
      add_oi: "",
      dl_oi: "",
      dc_oi: "",
      altura_oi: "",
      tipoLente : 0,
      lente: 0,
      color: 0,
      prisma : ""
    }

    $scope.patient = {
      'id': 0,
      'nombre' : '',
      'apellido' : '',
      'correo' : '',
      'telefono' : '',
      'celular' : '',
      'nacimiento' : new Date(),
      'sexo' : 1,
      'activo' : true,
      'direccion' : null
    };


    vm.subTotal = 0;

    $scope.removeRow = function($event, entity) {
      $event.stopPropagation();
      $scope.myData.splice($scope.myData.indexOf(entity), 1);
    };



    vm.saleItem = {
      "codigo": "",
      "cantidad": 0,
      "descripcion": "",
      "precio_venta": 0,
      "importe": this.cantidad*this.precio_venta
    }


    $scope.updateSaleItem = function(item){
      vm.saleItem.codigo = item.codigo;
      vm.saleItem.descripcion = item.descripcion;
      vm.saleItem.cantidad = 1;
      vm.saleItem.precio_venta = item.precio_venta;
      vm.saleItem.importe = vm.saleItem.cantidad*vm.saleItem.precio_venta;
    };

    $scope.addData = function() {
      if(vm.saleItem.descripcion!="") {
        $scope.gridOpts.data.push(angular.copy(vm.saleItem));
        vm.calculateSubtotal();
      }
    };

    //Calculate SubTotal
    vm.calculateSubtotal = function(){
      var subTotal = 0;
      var data = $scope.gridOpts.data;
      angular.forEach(data,function(item){

        subTotal = subTotal + item.precio_venta;
      });
      vm.subTotal = subTotal;
    }

    $scope.gridOpts = {
      data: gridData,
      columnDefs: colDef
    };

    vm.proser = {};
    //Create new patient
    vm.AddPaciente = function($scope, $http){
      var dataObj = JSON.stringify($scope.paciente);
      var res = $http.post(UrlService+"/paciente", dataObj);
      //console.log(res);
      res.success(function(data, status, headers, config) {
        $scope.paciente = data;
      });
      res.error(function(data, status, headers, config) {
        alert( "failure message: "+JSON.stringify(data));
      });
    };


    //SEARCH TYPEAHEAD PATIENT
    vm.selectedPatient = undefined;
    vm.getPatients = function(val){
      return $http.get(UrlService+'/patients/query/'+val).then(function(response){
        return response.data.content;
      });
    };

    //SEARCH TYPEAHEAD SALE ITEM
    vm.selectedSaleItem = undefined;
    vm.getSaleItems = function(value){
      var tc = vm.tipoConcepto.selectedOption;
      if(angular.isUndefined(tc) || tc === null ){
        toaster.pop("warning", "Dato Requerido","Favor de seleccionar un tipo de concepto..");
      }
      switch (tc.id){
        case 1:
              break;
        case 2:
          return $http.get(UrlService+"/Armazon/byDescription/"+value).then(function(response){
            return response.data.content;
          });
          break;
        case 3:
            return $http.get(UrlService+"/CargoExtra/byDescription/"+value).then(function(response){
              return response.data.content;
            });
              break;
        case 4:
          return $http.get(UrlService+"/sale/findLente/"+value).then(function(response){
            return response.data.content;
          });
              break;
        case 5:
              break;
        case 6:
              break;
      }
    };

    //save data
    vm.save = function(){
      sale.paciente = vm.selectedPatient;
      vm.rxActual.tipoLente = vm.tipoLente.selectedOption;
      vm.rxActual.lente = vm.lente.selectedOption;
      vm.rxActual.color = vm.color.selectedOption;
      sale.rxActual = vm.rxActual;
      sale.conceptos = $scope.gridOpts.data;
      sale.subTotal = vm.subTotal;

      console.log(sale);

    }


    //Definition and load of Lentes and tipo Lentes
    vm.lente = {
      selectedOption : null,
      options : []
    }

    vm.tipoLente = {
      selectedOption : null,
      options : []
    }

    $http.get(UrlService+"/tipolente/getAll")
      .success(function(response){
        vm.tipoLente.options = response;
      });

    vm.getLentes = function() {
      $http.get(UrlService + "/lente/getLentes")
        .success(function (response) {
          vm.lente.options = response;
        });
    }

    $scope.$watch('Sale.tipoLente.selectedOption', function(newVal){
      if(newVal){
        $http.get(UrlService + "/lente/getLentesTipo/"+newVal.id)
          .success(function (response) {
            vm.lente.options = response;
          });
      }
    });

    //Definition and load of colors for armazon
    vm.color = {
      selectedOption : null,
      options : []
    }

    $http.get(UrlService+"/color/getAll")
      .success(function(response){
        vm.color.options = response;
      });

    //Definition and load of concepts to sale
    vm.tipoConcepto = {
      selectedOption : null,
      options : []
    }

    $http.get(UrlService+"/TipoConcepto/getAll").success(function(response){
        vm.tipoConcepto.options = response;
    });

    //Modal patient
    vm.open = function () {
      var modalInstance = $uibModal.open({
        templateUrl: 'app/rx/modalPatient.html',
        controller: 'ModalInstanceCtrl',
        resolve: {
          item: function () {
            return $scope.patient;
          }
        }
      });

      modalInstance.result.then(function (patient) {
        $scope.patient = patient;
        vm.savePatient();
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };

    //Save patient
    vm.savePatient = function () {

      var patient = $scope.patient;
      var MysqlDate =  $filter('date')(patient.birthdate,'yyyy-MM-dd');
      $scope.patient.birthdate = MysqlDate;
      var dataObj = JSON.stringify($scope.patient);
      var promise = null;
      if ($scope.patient.id > 1) {
        promise = PacienteService.updatePaciente(dataObj);
        //  var url = UrlService + "/patients";
      } else {
        promise = PacienteService.createPaciente(dataObj);
      }
        //var res = $http.post(url, dataObj);
      promise.then(
        function(payload) {
          $scope.patient = angular.toJson(payload.data);
          //$scope.selectedPatient = $scope.patient;
          toaster.pop("success","Informacion","Se han guardado los datos..");
        },
        function(errorPayload){
          toaster.pop("error","Error","No se pudieron guardar los datos..");
          console.log("error: ",errorPayload);
        }


      );
      //res.error(function(data, status, headers, config) {
      //  alert( "failure message: "+JSON.stringify(data));
      //  toaster.pop("error","Error","No se pudieron guardar los datos..");
      //});



    };

    //Open Modal Armazon
    vm.openModalArmazon = function(tipoConcepto){
      // var modalInstance = $uibModal.open({
      //   templateUrl :  'modalArmazon.html',
      //   controller : 'ModalInstanceCtrl',
      //   resolve : {
      //     item : function(){
      //       return $scope.armazon;
      //     }
      //   }
      // });
      //
      // modalInstance.result.then(function (armazon) {
      //     vm.createArmazon(armazon);
      // },
      //   function () {
      //     $log.info('Modal dismissed at: ' + new Date());
      // });
    }

    vm.createArmazon = function(armazon){
       // ArmazonService.createArmazon(armazon)
       //   .then(
       //     function(response){
       //       toaster.pop("success", "Information", "Se han guardado los datos..");
       //     },
       //     function (errResponse) {
       //       toaster.pop("error", "Error", "No se pudieron guardar los datos..");
       //     }
       //   );
    }


    $scope.updateSelectedPatient = function ($item, $model, $label) {
      $scope.patient  = vm.selectedPatient;
    }



  });

