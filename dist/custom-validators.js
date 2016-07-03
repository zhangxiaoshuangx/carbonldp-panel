System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var EmailValidator, PasswordValidator;
    return {
        setters:[],
        execute: function() {
            exports_1("EmailValidator", EmailValidator = function EmailValidator(control) {
                // RFC 2822 compliant regex
                if (control.value.match(/[a-z0-9!#$%&"*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&"*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
                    return null;
                }
                else {
                    return { "invalidEmailAddress": true };
                }
            });
            exports_1("PasswordValidator", PasswordValidator = function PasswordValidator(control) {
                // {6,100}           - Assert password is between 6 and 100 characters
                // (?=.*[0-9])       - Assert a string has at least one number
                if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
                    return null;
                }
                else {
                    return { "invalidPassword": true };
                }
            });
        }
    }
});

//# sourceMappingURL=custom-validators.js.map
