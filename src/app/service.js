'use strict';

angular.module('inspinia').factory('ArmazonService', '$q',  function ($http, $q) {
  return{
      createArmazon : function(armazon){
        return $http.post(UrlService+'/armazon')
          .then(
            function(response){
              return response.data;
            },
            function(errResponse){
              console.log('Error: '+errResponse);
              return $q.reject(errResponse);
            }
          );
      },
      updateArmazon : function(armazon){
        return http.put(UrlService + '/armazon')
          .then(
            function(response){
              return response.data;
            },
            function (errResponse) {
              console.log('Error: '+errResponse);
              return $q.reject(errResponse);
            }
          );
      }
  }


});

angular.module('inspinia').factory('PacienteService', function($http, $q){
  return{
    createPaciente : function(paciente){
      return $http.post(UrlService+ '/paciente')
        .then(
          function(response){
            return $q.resolve(response.data);
          },
          function(errResponse){
            console.log('Error: '+errResponse);
            return $q.reject(errResponse);
          }
        );
    },
    updatePaciente : function(paciente){
      return $http.post(UrlService+ '/paciente')
        .then(
          function(response){
            return $q.resolve(response.data);
          },
          function(errResponse){
            console.log('Error: '+errResponse);
            return $q.reject(errResponse);
          }
        );
    }
  }
});

angular.module('inspinia').factory('PruebaService',function(){
  return {
    test : function() {
      console.log('hoo raay, it works!!!');
    }
  }
});

