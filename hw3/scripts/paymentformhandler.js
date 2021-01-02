(function (window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    class PaymentFormHandler {
        constructor(selector) {
            if (!selector) {
                throw new Error('No selector provided');
            }

            this.$formElement = $(selector);
            if (this.$formElement.length === 0) {
                throw new Error('Could not find element with selector: ' + selector);
            }
        }
        addPaymentSubmitHandler() {
            console.log('Setting submit handler for form');
            this.$formElement.on('submit', function (event) {
                event.preventDefault();
                var data = {};
                $(this).serializeArray().forEach(function (item) {
                    data[item.name] = item.value;
                    console.log(item.name + ' is ' + item.value);
                });
                console.log(data);
                var modalPayment = "Thank you, " + data.title + " " + data.username;
                $("#ex1 p").text(modalPayment);
                $("#ex1").modal("show");
                this.reset();
                this.elements[0].focus();
            });
        }
    }
    App.PaymentFormHandler = PaymentFormHandler;
    window.App = App;
})(window);