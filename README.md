# ngDateTimeComparePicker
Angular DateTime Wrapper directive with multiple callbacks exposed Over Bootstrap3.0 DateTime Picker

# Usage
```html
<div lola-datetimepicker ng-model="vm.modalData.paymentEndDate" options="vm.options" on-click="vm.onMFDateWidgetClick()" bind-year-model="vm.modalData.termYears" bind-month-model="vm.modalData.termMonths" compare-with-date-model="vm.modalData.maturityDate">
```

Where 
ng-model is the model for holding the datepicker value. 
options is the json config attribute object for the the Bootstrap's datetime picker.
bind-year-model is the model year( input text)  that changes when ng-model value changes and vice versa.
bind-month-model is the model month (input month)  that changes when ng-model value changes and vice versa.
compare-with-date-model is the model date that we are comparing with and populate the bind-year-model and bind-month-model accordingly.
