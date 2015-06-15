/**
 * Created by Zhi_LI on 2015/5/15.
 */
(function() {
    'use strict';
    GTD
        .directive('ctgNav',['GTDservice', ctgNav])
        .directive('ctgLists',ctgLists)
        .directive('tskLists',['GTDservice', tskLists]);

    function ctgNav(GTDservice) {
        var addTsk = function ($event, scope) {
            var t = $event.target;
            //console.log(t);
            var tskName = prompt("tskName");
            if (tskName) {
                //console.log(tskName);
                //scope.data.push();
                //console.log(scope.data);
                GTDservice.addTask(tskName);


            }

        };
        return {
            restrict: 'E'
            ,scope: {
                d: "="
                //,eleName: "@"
            }
            ,template:
                '<div>' +
                    '<div class="nav-title">CTG</div>' +
                    '<ctg-lists d="d"></ctg-lists>' +
                    '<button class="add">addTsk</button>' +
                '</div>'

            ,replace: false
            ,link: function (scope, element, attr) {
                var child = $(element).find('button.add');
                //console.log(child);
                child.bind('click', function ($event) {
                    addTsk($event, scope)
                });
            }

        };
    }

    function ctgLists(GTDservice) {

        return {
            restrict: 'E'
            ,scope: {
                d: "="
            }
            ,template:
                '<ul >' +

                '<li ng-repeat="ele in d">' +
                        '<h1>{{ele.ctg}}</h1>' +
                        '<tsk-lists tsk="ele.task"></tsk-lists>' +
                    '</li>' +
                '</ul>'
            ,replace: true
        };
    }

    function tskLists(GTDservice) {
        var checkTskName = function(t) {
            var tskName = t.innerHTML;
            //console.log(tskName);
            return tskName;

        };
        var checkCtgName = function(t) {
            var tPar = $(t).closest('ul');
            var ctgName = $(tPar).prev().html();
            //console.log(ctgName);
            return ctgName;
        };

        var tskClicked = function ($event) {
            var t = $event.target;
            var tskName, ctgName;
            //console.log(t);
            if (t.nodeName.toUpperCase() == 'A') {
                tskName = checkTskName(t);
                ctgName = checkCtgName(t);
                GTDservice.tskClicked(ctgName, tskName);
            }


        };

        return {
            restrict: 'E'
            ,scope: {
                tsk: "="
            }
            ,template:
                '<ul >' +
                    '<li ng-repeat="ele in tsk" click-active="ctg-nav">' +
                        '<h2><a href="#/task/{{$index}}" >{{ele.name}}</a></h2>' +
                    '</li>' +
                '</ul>'
            ,replace: true
            ,link: function(scope, element, attr){
                element.bind('click', tskClicked);
                //element.bind('touchstart', tskClicked);


            }


        };
    }
})();