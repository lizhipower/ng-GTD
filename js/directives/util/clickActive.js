/**
 * Created by Zhi_LI on 2015/5/18.
 */
(function() {
    'use strict';
    GTD
        .directive('clickActive',clickActive);

    function clickActive() {
        function doActive($event, rootTagName) {
            var t = $event.target;
            var rootEle = $(rootTagName);
            rootEle.find(t.nodeName).css('backgroundColor', $(t).parent().css('backgroundColor'));
            $(t).css('backgroundColor','red');

        }
        return {
            restrict: 'A'
            ,replace: false
            ,link: function (scope, element, attrs) {
                element.bind('click', function ($event) {
                    doActive($event, attrs.clickActive);
                });
                //console.log(attrs.clickActive);
            }

        };

    }
})();