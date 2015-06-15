/**
 * Created by Zhi_LI on 2015/5/15.
 */
(function() {
    'use strict';
    GTD.controller(
        'ctgCtr',['$scope', 'GTDservice', ctgCtr]
    );
    function ctgCtr(scope, GTDservice) {
        var vm = this;
        //for pc

        //scope.$on( 'dataChanged', function( event ) {
        //    vm.d = GTDservice.d;
        //    scope.$apply();
        //    console.log(vm.d)
        //});


        vm.d = GTDservice.d;

        //alert(GTDservice.d);
        //console.log(GTDservice.data);

    }
})();

