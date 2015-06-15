/**
 * Created by Zhi_LI on 2015/5/21.
 */
(function() {
    'use strict';
    GTD.directive('onTouch',onTouch);

    function onTouch() {
        function doActive($event, rootTagName) {
            var t = $event.target;
            var rootEle = $(rootTagName);
            rootEle.find(t.nodeName).css('backgroundColor', $(t).parent().css('backgroundColor'));
            $(t).css('backgroundColor', 'red');

        }

        return {
            restrict: 'A'
            , replace: false
            , link: function (scope, elm, attrs) {
                var ontouchFn = scope(attrs.onTouch);
                console.log(attrs.onTouch);

                console.log(ontouchFn);
                elm.bind('touchstart', function (evt) {
                    scope.$apply(function () {
                        ontouchFn.call(scope, evt.which);
                    });
                });
                elm.bind('click', function (evt) {
                    scope.$apply(function () {
                        ontouchFn.call(scope, evt.which);
                    })
                });
            }
        }
    }
})();