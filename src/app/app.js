'use strict';
var UrlService = "http://localhost:8080/api";
angular.module('inspinia', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngResource', 'ui.router','toaster', 'ui.bootstrap','datePicker','ui.grid', 'ui.utils.masks'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

        .state('index', {
            abstract: true,
            url: "/index",
            templateUrl: "components/common/content.html",
        })
        .state('index.main', {
            url: "/main",
            templateUrl: "app/main/main.html",
            data: { pageTitle: 'Example view' }
        })
        .state('index.minor', {
            url: "/minor",
            templateUrl: "app/minor/minor.html",
            data: { pageTitle: 'Example view' }
        })
        .state('index.test', {
            url : "/test",
            templateUrl: 'app/test/test.html',
            data: { pageTitle : "IU Component Testing" }
        }).state('index.rx', {
            url: "/rx",
            templateUrl: "app/rx/rx.html",
            data: {pageTitle: 'Rx'}
        }).state('index.typeaheadTest',{
            url: "/test",
            templateUrl: "app/typeaheadTest/typeaheadTest.html",
            data : {pageTitle : 'Tyapeahead'}
        }).state('index.pacientes',{
          url: "/pacientes",
          templateUrl: "app/pacientes/pacientes.html",
          data : {pageTitle : 'Pacientes'}
      })
      .state('index.modalTest',{
        url: "/modalTest",
        templateUrl: "app/modalTest/modalTest.html",
        data : {pageTitle : 'Modal Test'}
      });



    $urlRouterProvider.otherwise('/index/main');

  })
;
