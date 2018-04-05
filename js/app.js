/*global angular*/
var app = angular.module('owlApp', ['ngRoute']);
app.API_URL_BASE = "http://localhost:8080/owlback/";


/*
Si la petición retorna 201, falta autenticar. Si retorna status < 0, se muestra página de error*/
app.service('authInterceptor', function ($q, $window, $log) {
    var service = this;
    service.responseError = function (response) {
        if (response.status == 401) {
            $window.location.href = "#/login";
        } else if (response.status == 403) {
            $window.location.href = "#/acceso-denegado";
        } else if (response.status < 0) {
            $log.error(response);
            $window.location.href = "#/error";
        }
        return $q.reject(response);
    };
});

app.config(function ($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
    $httpProvider.interceptors.push('authInterceptor');
});


app.config(function ($routeProvider, $locationProvider) {

    //evitar '!' en la url
    $locationProvider.hashPrefix('');
    $routeProvider
        .when('/login', {
            templateUrl: 'partials/login.html'
        })
        .when('/', {
            templateUrl: 'partials/tarea/tareas_pendientes.html'
        })
        .when('/acceso-denegado', {
            templateUrl: 'partials/acceso_denegado.html'
        })
        .when('/solicitantes', {
            templateUrl: 'partials/solicitante/solicitante_index.html'
        })
        .when('/cargos', {
            templateUrl: 'partials/cargo/cargo_index.html'
        })
        .when('/departamentos', {
            templateUrl: 'partials/departamento/departamento_index.html'
        })
        .when('/tareas-pendientes', {
            templateUrl: 'partials/tarea/tareas_pendientes.html'
        })
        .when('/tareas-finalizadas', {
            templateUrl: 'partials/tarea/tareas_finalizadas.html'
        });
});
