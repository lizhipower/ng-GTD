/**
 * Created by Zhi_LI on 2015/5/18.
 */
(function() {
    'use strict';
    GTD
        .directive('contenteditable',contenteditable);

        function contenteditable(){
            return {
                restrict:'A'
                //,scope: {
                //    ct: "@"
                //}
                ,require:'?^ngModel'
                ,link: function(scope, elm, attrs, ngModel) {
                    // view -> model

                    //console.log(ngModel);

                    if(!ngModel){
                        return
                    }

                    //ngModel.$setViewValue(attrs.content);
                    //console.log(attrs["ct"]);
                    attrs.$observe('ct', function(value) {
                        //console.log(key)
                        //console.log( value);
                        ngModel.$setViewValue(value);


                    });
                    //ngModel.$setViewValue(elm.html());

                    elm.on('blur click', function() {
                        scope.$apply(function() {
                            //console.log(elm.html())
                            ngModel.$setViewValue(elm.html());
                        });
                    });

                    // model -> view
                    ngModel.$render = function() {
                        elm.html(ngModel.$viewValue);
                    };

                    // load init value from DOM
                    ngModel.$setViewValue(elm.html());
                }
            }
    };


})();
