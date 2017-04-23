/**
 * Created by luis on 10/13/16.
 */
'use strict';
angular.module('inspinia')
  .controller('pacientesCtrl', function () {
    var vm = this;
    var paciente = {
      'email' : null,
      'first_name' : null,
      'last_name' : null,
      'phone' : null,
      'mobile' : null,
      'birth_date' : new Date(),
      'active' : false
    }

  });
