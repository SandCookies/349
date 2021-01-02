(function (window) {
  'use strict';
  var FORM_SELECTOR = '[data-payment-form="form"]';

  var App = window.App;

  var PaymentFormHandler = App.PaymentFormHandler;

  var paymentFormHandler = new PaymentFormHandler(FORM_SELECTOR);

  paymentFormHandler.addPaymentSubmitHandler();
})(window);