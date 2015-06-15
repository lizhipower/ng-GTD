/**
 * Created by Zhi_LI on 2015/5/18.
 */
(function() {
    'use strict';
    GTD.controller(
        'tdCtr',['$scope', 'GTDservice', tdCtr]
    );
    function tdCtr(scope, GTDservice) {
        var vm = this;

        vm.td = getTd(GTDservice);
        vm.tdshow = GTDservice.tdShow;
        vm.show = GTDservice.tdShow;

        vm.goBack = function () {
            window.history.back();
        };

        scope.$on( 'tdClicked', function( event ) {
            vm.td = getTd(GTDservice);
            vm.tdshow = GTDservice.tdShow;

            scope.$apply();
        });
        scope.$on( 'tskClicked', function( event ) {
            vm.tdshow = GTDservice.tdShow;
            scope.$apply();
        });

        scope.$on( 'dataChanged', function( event ) {
            vm.td = getTd(GTDservice);
            scope.$apply();
        });


    }

    function getTd(GTDservice) {
        var td = {};
        var ctg,tsk,ctt;

        ctg = (GTDservice.d)[GTDservice.ctgNum];
        tsk = ctg.task[GTDservice.tskNum];
        ctt = tsk.content;

        td.info = (ctt[GTDservice.cttNum].todo)[GTDservice.tdNum];
        td.time = ctt[GTDservice.cttNum].time;
        return td;
    }
})();