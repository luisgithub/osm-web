'use strict';

angular.module('inspinia')
  .controller('testUiComponents', function ($scope, $http) {

    var vm = this;
    vm.greeting = null;
    //vm.content = null;

    //var headers = {'content-type' : 'Application/Json' ,'Authorization' : 'Basic YWRtaW46YWRtaW4='}
    //vm.callRest = function() {
     // $http({method: 'GET', url: 'http://localhost:8080/api/greeting', headers: {'Authorization' : 'Basic YWRtaW46YWRtaW4='}});
        //.success(function ( data) {
        //  vm.id = data.id;
        //  vm.content = data.content;
        //})
        //.error(function (data) {
        //  alert("Authentication Failed.."+data);
        //});
    //  var url = 'http://localhost:8080/api/greeting/luis';
    //  $http({
    //        'url' : url,
    //        'method' : 'GET',
    //        'headers' : {'X-Requested-With' : 'XMLHttpRequest'}
    //  })
    //.success(function(response){
    //  vm.greeting = response.data;
    //})
    //  .error(function(response){
    //    alert("Error"+response)
    //  });


  });
