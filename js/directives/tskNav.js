/**
 * Created by Zhi_LI on 2015/5/16.
 */
(function() {
    'use strict';
    GTD
        .directive('tskNav', ['$swipe', 'GTDservice', tskNav])
        .directive('todo', ['GTDservice', todo])
        ;

    function tskNav($swipe, GTDservice) {

        function addTd ($event, scope) {
            var tdName = prompt("tdName");
            if (tdName) {
                console.log(tdName);
                //scope.data.push();
                //console.log(scope.data);
                GTDservice.addTd(tdName);


            }
        }

        return {
            restrict: 'E'
            ,scope: {
                task: "="
                ,show: "="
                //,eleName: "@"
            }
            ,template:
                '<div ng-show="show">' +
                    '<div class="nav-title">TSK</div>' +
                    '<button class="filter" id="all-btn">all</button>' +
                    '<button class="filter" id="todo-btn">todo</button>' +
                    '<button class="filter" id="done-btn">done</button>' +
                    '<ul>' +
                        '<li ng-repeat="ele in task.content">' +
                            //'<h1>{{task.name}}</h1>' +
                            '<todo tsk-ele="ele" status-filter="status"/>' +
                        '</li>' +
                    '</ul>' +
                    '<button class="add">addTd</button>' +

                '</div>'

            ,replace: false
            ,link: function (scope, element, attr) {
                //console.log(scope.show);
                var child = $(element).find('button.add');

                var startX, pointX, delta;
                //console.log(child);
                child.bind('click touchstart', function ($event) {
                    addTd($event, scope)
                });

                var sdBody = $('div#tsk-side');
                //console.log(mainBody);
                $swipe.bind(sdBody, {
                    'start': function (coords) {
                        startX = coords.x;
                        pointX = coords.y;
                        //console.log(startX)
                    }
                    ,'move': function (coords) {
                        delta =coords.x - startX;
                        var sideBar = $('div.side-nav');
                        var mainBody = $('div.main-nav');

                        mainBody.css({position: "absolute",'left':delta});

                        sideBar.width(delta + 'px')
                    }
                    ,'end': function () {
                        if (delta > 0 ){
                            console.log('tsk1')
                            window.history.back();
                        }


                    }
                });


                scope.status = $;

                $(element).find('#all-btn').bind('click', function ($event) {
                    scope.status = $;
                    scope.$apply();
                });
                $(element).find('#todo-btn').bind('click', function ($event) {
                    scope.status = false;
                    scope.$apply();
                });
                $(element).find('#done-btn').bind('click', function ($event) {
                    scope.status = true;
                    scope.$apply();
                });


            }

        };
    }

    function todo(GTDservice) {
        var tdClicked = function ($event, scope) {
            var t = $event.target;
            var tdTitle;
            //console.log(t)
            if (t.nodeName.toUpperCase() == "A") {
                console.log(t.innerHTML);
                tdTitle = t.innerHTML;

            }
            //console.log(scope.tskEle);
            //scope.tskEle.time = "2015-04-30";
            //scope.$apply();
            GTDservice.tdClicked(scope.tskEle, tdTitle);

        };

        
        return {
            restrict: 'E'
            ,scope: {
                tskEle: "="
                ,statusFilter: "="
                //,eleName: "@"
            }
            ,template:

            '<h1>' +
                '{{tskEle.time}}' +
            '</h1>' +
            '<ul>' +
                "<li ng-repeat='tdEle in tskEle.todo|filter:{status: statusFilter}' click-active='tsk-nav'>"+
                    '<h2 class="td-status-{{tdEle.status}}"><a href="#/td/{{$index}}">{{tdEle.title}}</a></h2>' +
                '</li>' +
            '</ul>'
            ,replace: false
            ,link: function (scope, element, attr) {
                //console.log(scope.statusFilter);
                element.bind('click', function ($event) {
                    tdClicked($event, scope);
                });
            }

        };
    }


})();