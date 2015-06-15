/**
 * Created by Zhi_LI on 2015/5/15.
 */


//var GTD = angular.module('GTD',['angular-lazyload', 'ngRoute']);

//GTD.run(['$lazyload', function($lazyload){
//    //Step5: init lazyload & hold refs
//    $lazyload.init(GTD);
//    GTD.register = $lazyload.register;
//}]);
var GTD = angular.module('GTD',[ 'ngRoute']);


GTD.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: './partials/ctg.html'
            ,controller: 'ctgCtr as ctg'
            //,controllerUrl:

        })
        .when('/task/:taskId', {
            templateUrl: './partials/task.html',
            controller: 'tskCtr as tsk'
        })
        .when('/td/:tdId', {
            templateUrl: './partials/td.html',
            controller: 'tdCtr as td'
        })
        .otherwise({redirectTo: '/'})

}]);
