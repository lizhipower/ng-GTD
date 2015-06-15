/**
 * Created by Zhi_LI on 2015/5/16.
 */
(function() {
    'use strict';
    GTD.controller(
        'tskCtr',['$scope', '$routeParams','GTDservice', tskCtr]
    );
    function tskCtr($scope, $routeParams, GTDservice) {
        var vm = this;
        var ctgNum = GTDservice.ctgNum;
        var tskNum = GTDservice.tskNum;

        vm.tskshow = GTDservice.tskShow;

        vm.tskId = $routeParams.taskId;

        vm.goBack = function () {
            window.history.back();
        };
        //for pc

        //$scope.$on( 'tskClicked', function( event ) {
        //    ctgNum = GTDservice.ctgNum;
        //    tskNum = GTDservice.tskNum;
        //    vm.task = (GTDservice.d[ctgNum].task)[tskNum];
        //    vm.tskshow = GTDservice.tskShow;
        //    console.log(GTDservice.tskShow,vm.tskshow);
        //
        //    scope.$apply();
        //
        //});
        //$scope.$on( 'dataChanged', function( event ) {
        //    ctgNum = GTDservice.ctgNum;
        //    tskNum = GTDservice.tskNum;
        //    vm.task = (GTDservice.d[ctgNum].task)[tskNum];
        //
        //    scope.$apply();
        //    //console.log(vm.task);
        //
        //});

        //默认显示
        vm.task = (GTDservice.d[ctgNum].task)[tskNum];


    }

})();