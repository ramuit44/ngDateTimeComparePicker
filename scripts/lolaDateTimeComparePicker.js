macApp.directive('ngDateTimeComparePicker', ['$timeout', function ($timeout) {
    //Wrapper directive around the Bootstrap 3's date-picker functionality. https://eonasdan.github.io/bootstrap-datetimepicker/#bootstrap-3-datepicker-v4-docs
    // Author: Sriram Puvvada
	 return {
         restrict: 'EA',
         require: 'ngModel',
         scope: {
                    options: '=?',
                    onChange: '&?',
                    onClick: '&?',
                    onHide: '&?',
                    options: '=?',
                    bindYearModel : '=?',
                    bindMonthModel : '=?',
                    compareWithDateModel : '=?',
                    ngModel: '='
                },
         link: function ($scope, $element, $attrs, ngModelCtrl) {
                    var dpElement = $element.parent().hasClass('input-group') ? $element.parent() : $element;

                    var isDateChangeBecauseOfDateWidgetSelection = false;
             
                    // When ever there are any changes to the configuration options for the wrapper directive immediatley reload the DateTimePicker with new data.
                    $scope.$watch('options', function (newValue) {
                        var dtp = dpElement.data('DateTimePicker');
                        $.map(newValue, function (value, key) {
                            /** THE RIDICULOUS BOOTSTRAP DATETIME PICKER IS OVERRIDING THE DEFAULT VALUE IN OPTIONS
                            IF THE MINDATE IS PRESENT SO NEED TO AGAIN MANUALLY SET THE DATE IN WATCH -sriram**/
                            if(key == 'defaultDate') {dtp.date(new Date(value));}
                            else {dtp[key](value);}
                        });
                    });



                    //When ever there are changes to the year Model update the datewidget Model
                     $scope.$watch('bindYearModel', function (newValue) {
                    // don't change  $scope.ngModel value if bindYearModel is changed because of  ngModel  change which is triggered by ng-click on widget 
                        if(newValue && !isDateChangeBecauseOfDateWidgetSelection)
                        {
                          
                              //$scope.ngModel = (moment($scope.compareWithDateModel).add(newValue,'y')).toDate();
                              var yearModel = (moment($scope.compareWithDateModel).add(newValue,'y'));
                              if($scope.bindMonthModel){
                                $scope.ngModel = (moment(yearModel).add($scope.bindMonthModel,'M'));
                              }
                              else {
                                $scope.ngModel = yearModel;
                              }

                        }

                        else if(newValue == 0 &&  $scope.bindMonthModel == 0) $scope.ngModel="";

                        isDateChangeBecauseOfDateWidgetSelection = false;
                     });


                      //When ever there are changes to the Month Model update the datewidget Model
                     $scope.$watch('bindMonthModel', function (newValue) {
                          // don't change  $scope.ngModel value if bindMonthModel is changed because of  ngModel  change which is triggered by ng-click on widget 
                        if(newValue > 11) return;
                        if(newValue && !isDateChangeBecauseOfDateWidgetSelection && ($scope.bindYearModel || $scope.bindYearModel == 0))
                        {
                           $scope.ngModel = (moment($scope.compareWithDateModel).add($scope.bindYearModel,'y').add(newValue,'M'));
                          
                        }
                        else if(newValue == 0 &&  $scope.bindYearModel == 0) $scope.ngModel="";

                        isDateChangeBecauseOfDateWidgetSelection = false;
                     });


                     // When ever there are changes to the dateWidget Model update the Year Model and Month Model
                     $scope.$watch('ngModel', function (newValue) {
                        if(newValue && $scope.compareWithDateModel){
                            $scope.bindYearModel = moment(newValue).diff(moment($scope.compareWithDateModel),'years');
                            $scope.bindMonthModel = (moment(newValue).diff(moment($scope.compareWithDateModel),'months')) % 12;
                        }

                        else if(!newValue){
                            $scope.bindYearModel = 0;
                            $scope.bindMonthModel = 0;
                        }

                     });


                    
                    //When ever there is selection of date from widget update the flag isDateChangeBecauseOfDateWidgetSelection
                     dpElement.on('dp.hide', function(e) {
                           isDateChangeBecauseOfDateWidgetSelection = true;
                           $scope.onHide();
                    });



             
                    /*NgModelController provides API for the ngModel directive. Render is one specific method of this NgModelController
                     this render method is called when The value referenced by ng-model is changed programmatically and both the $modelValue 
                     and the $viewValue are different from last time. */
             
                    /* Whenever there is change in the modal, as part of render function call back , update the DateTimePicker's  date view attribute */
                    ngModelCtrl.$render = function () {
                        // double not Coerces oObject to boolean. If it was falsey (e.g. 0, null, undefined, etc.), it will be false, otherwise, true.
                        if (!!ngModelCtrl.$viewValue) {
                            dpElement.data('DateTimePicker').date(new Date(ngModelCtrl.$viewValue));
                        } else {
                            dpElement.data('DateTimePicker').date(null);
                        }
                    };
             
                    
                     /*Event dp.change is triggered by bootstrap datepicker when ever there is change in the datepicker dom element. We need to handle this event in directive and 
                     update the model view  */
                     dpElement.on('dp.change', function (e) {
                        /* $timeout() re-queues the new JavaScript at the end of the execution queue. The solution is to "pause" the JavaScript execution to let the rendering threads catch up. And this is the effect that setTimeout() with a timeout of 0 does. It is like a thread/process yield in C. Although it seems to say "run this immediately" it actually gives the browser a chance to finish doing some non-JavaScript things that have been waiting to finish before attending to this new piece of JavaScript.*/
                        $timeout(function () {
                            if (!!e.date) {
                                // Telling Angular that you are changing ngModelCtrl and it should fire the watchers so that your changes propagate properly.
                                $scope.$apply(function () {
                                    ngModelCtrl.$setViewValue(e.date);
                                });
                                // Also call if you have defined any on change functions for this directive.
                                if (typeof $scope.onChange === "function") {
                                    $scope.onChange();
                                }
                            }
                            /* Set empty date value to the model if the not null or empty date in UI*/
                            else if (!e.date){
                                ngModelCtrl.$setViewValue("");
                            }
                        });
                    });
             
                    
                    /* Event click is triggered by bootstrap datepicker when ever there is click event in the datepicker dom element. We need to handle this event in direciive and call the onclick function of the directive */
                    dpElement.on('click', function () {
                        onclickEvent = true;
                        $timeout(function () {
                            if (typeof $scope.onClick === "function") {
                                $scope.onClick();
                            }
                        });

                    });
             
                    
             
                    /*Default run this code when ever link is called*/
                    dpElement.datetimepicker($scope.options);
                    $timeout(function () {
                        if (!!ngModelCtrl.$viewValue) {
                            if (!(ngModelCtrl.$viewValue instanceof moment)) {
                                ngModelCtrl.$setViewValue(moment($scope.date));
                            }
                            dpElement.data('DateTimePicker').date(ngModelCtrl.$viewValue);
                        }
                    });
                    
         }
             
     };
}]);
