/**
 * Created by Zhi_LI on 2015/5/18.
 */
(function () {
    'use strict';
    GTD
        .directive('tdNav', ['$swipe', 'GTDservice',tdNav])
    ;

    function tdNav($swipe, GTDservice) {
        function confirm($event, scope, element) {
            var time = scope.time;
            var detail = scope.detail;
            var title = scope.title;

            GTDservice.tdChange(title, time, detail, scope.td, "confirm");
            edit($event, scope, element, false);
        }
        function cancel($event, scope, element) {
            scope.time = scope.td.time;
            scope.detail = scope.td.info.detail;
            scope.title = scope.td.info.title;
            scope.$apply();

            edit($event, scope, element, false);
        }
        function edit($event, scope, element, mode) {
            $(element).find('div[contenteditable]').attr('contenteditable',mode);
        }

        function mark($event, scope, element) {
            var time = scope.time;
            var detail = scope.detail;
            var title = scope.title;
            if (scope.td.info.status == false) {
                GTDservice.tdChange(title, time, detail, scope.td, "mark");

            }
        }

        return {
            restrict: 'E'
            , scope: {
                td: "="
                ,show: "="
            }
            , template:
                '<div ng-show="show">' +
                    '<div class="nav-title">TD</div>' +

                    '<div class="nav-td-title clearfix">' +
                        '<div contenteditable="false" ng-model="title" ct="{{td.info.title}}">{{title}}</div>' +
                        '<div contenteditable="false" ng-model="time" ct="{{td.time}}">{{time}}</div>' +
                        '<button id="edit-btn">edit</button>' +
                        '<button id="mark-btn" ng-hide="td.info.status">mark</button>' +
                    '</div>' +

                    '<div class="nav-td-body" contenteditable="false" ng-model="detail" ct="{{td.info.detail}}">{{detail}}</div>' +
                    '<button  id="confirm-btn">confirm</button>' +
                    '<button  id="cancel-btn">cancel</button>' +
                '</div>'


            , replace: false
            , link: function (scope, element, attr) {

                var cfmBtn = $(element).find('#confirm-btn');
                var cclBtn = $(element).find('#cancel-btn');
                var editBtn = $(element).find('#edit-btn');
                var markBtn = $(element).find('#mark-btn');


                cfmBtn.bind('click', function ($event) {
                    confirm($event, scope, element);
                });
                cclBtn.bind('click', function ($event) {
                    cancel($event, scope, element);
                });
                editBtn.bind('click', function ($event) {
                    edit($event, scope, element, true);
                });
                markBtn.bind('click', function ($event) {
                    mark($event, scope, element, true);
                });

                var startX, pointX, delta;
                var sdBody = $('div#td-side');
                //console.log(mainBody);
                $swipe.bind(sdBody, {
                    'start': function (coords) {
                        startX = coords.x;
                        pointX = coords.y;
                    }
                    ,'move': function (coords) {
                        delta =coords.x - startX;
                        var sideBar = $('div.side-nav');
                        var mainBody = $('div.main-nav');
                        console.log(delta)
                        mainBody.css({position: "absolute",'left':delta});

                        sideBar.width(delta + 'px')
                    }
                    ,'end': function () {
                        if (delta > 0) {
                            console.log('td1')

                            window.history.back();

                        }


                    }
                });

            }

        };
    }


})();