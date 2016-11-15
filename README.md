# ngDateTimeComparePicker
Angular DateTime Wrapper directive with multiple callbacks exposed Over Bootstrap3.0 DateTime Picker

# Usage
```html
<div ng-date-time-compare-picker ng-model="vm.modalData.paymentEndDate" options="vm.options" on-click="vm.onMFDateWidgetClick()" bind-year-model="vm.modalData.termYears" bind-month-model="vm.modalData.termMonths" compare-with-date-model="vm.modalData.maturityDate">
```

Where <br>
--ng-model is the model for holding the datepicker value. <br>
--options is the json config attribute object for the the Bootstrap's datetime picker.<br>
--bind-year-model is the model year( input text)  that changes when ng-model value changes and vice versa.<br>
--month-model is the model month (input month)  that changes when ng-model value changes and vice versa.<br>
--compare-with-date-model is the model date that we are comparing with and populate the bind-year-model and bind-month-model accordingly.<br>


![ScreenShot](https://github.com/ramuit44/ngDateTimeComparePicker/blob/master/screenshot1.png)
<br>
![ScreenShot](https://github.com/ramuit44/ngDateTimeComparePicker/blob/master/screenshot2.png)


