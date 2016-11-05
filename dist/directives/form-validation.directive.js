System.register(["@angular/core", "@angular/forms", "./input-validation.directive"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, forms_1, input_validation_directive_1;
    var FormValidationDirective;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (input_validation_directive_1_1) {
                input_validation_directive_1 = input_validation_directive_1_1;
            }],
        execute: function() {
            FormValidationDirective = (function () {
                function FormValidationDirective(ngForm) {
                    this.ngForm = ngForm;
                }
                Object.defineProperty(FormValidationDirective.prototype, "valid", {
                    get: function () {
                        if (!this.ngForm)
                            return true;
                        var validations = [];
                        for (var controlName in this.ngForm.controls) {
                            if (!this.ngForm.controls.hasOwnProperty(controlName))
                                continue;
                            validations.push(this.ngForm.controls[controlName]);
                        }
                        if (this.inputValidations) {
                            this.inputValidations.forEach(function (validation) {
                                var index = validations.indexOf(validation.control);
                                if (index === -1)
                                    return;
                                validations.splice(index, 1, validation);
                            });
                        }
                        var failedValidation = validations.find(function (validation) {
                            return !validation.valid;
                        });
                        return typeof failedValidation === "undefined";
                    },
                    enumerable: true,
                    configurable: true
                });
                __decorate([
                    core_1.ContentChildren(input_validation_directive_1.InputValidationDirective), 
                    __metadata('design:type', core_1.QueryList)
                ], FormValidationDirective.prototype, "inputValidations", void 0);
                FormValidationDirective = __decorate([
                    core_1.Directive({
                        selector: "form[cpValidation]",
                        exportAs: "cpValidation",
                    }),
                    __param(0, core_1.Optional()),
                    __param(0, core_1.Host()), 
                    __metadata('design:paramtypes', [forms_1.NgForm])
                ], FormValidationDirective);
                return FormValidationDirective;
            }());
            exports_1("FormValidationDirective", FormValidationDirective);
            exports_1("default",FormValidationDirective);
        }
    }
});

//# sourceMappingURL=form-validation.directive.js.map
