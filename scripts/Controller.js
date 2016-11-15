
macApp.controller('ControllerOne', ['$scope',

    function($scope) {
        var vm = this;

       
        vm.init = function() {
            vm.options = {
                format: "DD/MM/YYYY",
                widgetPositioning: {
                    horizontal: 'right',
                    vertical: 'bottom'
                },
                defaultDate:  vm.getDefaultOnOpenWidgetDate(true)
            };
            vm.initalizeTermFields();
        };

        //Inialize term years, term months and payment enddate as empty
        vm.initalizeTermFields = function(){
           vm.modalData.termYears = '';
           vm.modalData.termMonths = '';
           vm.modalData.paymentEndDate = ''; 
        }

        vm.onMFDateWidgetClick = function(){
            /** FOR SOME BLOODY ANGULAR REASON UNTIL I REINTIALIZE THE OPTIONS AGAIN THE WATCH IS NOT WORKING ON OPTIONS IN THE DIRECTIVE --NEED TO LOOK TODO SRIRAM*/
            vm.options = {
                format: "DD/MM/YYYY",
                minDate: vm.getMinEligibleDate(),
                useCurrent: false,
                defaultDate:  vm.getDefaultOnOpenWidgetDate(),
                maxDate : vm.getMaxEligibleDate(),
                widgetPositioning: {
                    horizontal: 'right',
                    vertical: 'bottom'
                }
            };
        }

        vm.getMaxEligibleDate = function(){
            var maturingOrExpiredDate = moment(vm.modalData.maturityDate);
            return maturingOrExpiredDate.add(5, 'y');
        }

        vm.getMinEligibleDate = function(){
             var maturingOrExpiredDate = moment(vm.modalData.maturityDate);
             return maturingOrExpiredDate.add(31, 'd');
        }

        vm.updatetermchange = function(){
            vm.modalData.productDto.repaymentList[0].paymentEndDate = vm.getDefaultOnOpenWidgetDate().toDate();
        }

       
        vm.getDefaultOnOpenWidgetDate = function(init){

                var maturingOrExpiredDate = moment(vm.modalData.maturityDate);
                var enteredTermYears = (!vm.modalData.termYears) ? 0 : vm.modalData.termYears;
                var enteredTermMonths = (!vm.modalData.termMonths)? 0 : vm.modalData.termMonths;

                if(enteredTermYears ==0 && enteredTermMonths ==0) {
                    /**IN CASE OF INTIAL VIEW DON'T DISPLAY THE DATE FIELD IN THE WIDGET IF BOTH MONTHS ARE ZERO**/
                    if(init) {

                        return "";
                    }
                    return vm.getMinEligibleDate();
                }
                else {
                    return maturingOrExpiredDate.add(enteredTermYears,'y').add(enteredTermMonths,'M');
                }
        }

         vm.isValidMFTermYear = function(year,months){
            if ((year || year ===0)  && (year >= Constants.rolloverFTFacilityTermLimits.MIN_TERM_YEARS_LIMIT) &&  (year <= Constants.rolloverFTFacilityTermLimits.MAX_TERM_YEARS_LIMIT)){
                if(year == Constants.rolloverFTFacilityTermLimits.MAX_TERM_YEARS_LIMIT && (months && (months > Constants.rolloverFTFacilityTermLimits.MIN_TERM_MONTHS_LIMIT))) 
                    {
                        return false;
                    }
                return true;
            }

            return false;
        }
        
        vm.isValidMFTermMonth = function(months){
            return ((months || months ===0) && (months >= Constants.rolloverFTFacilityTermLimits.MIN_TERM_MONTHS_LIMIT) &&  (months <= Constants.rolloverFTFacilityTermLimits.MAX_TERM_MONTHS_LIMIT));
        }
    }
]);
