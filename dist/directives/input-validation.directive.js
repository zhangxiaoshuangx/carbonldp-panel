System.register(["@angular/core", "@angular/forms"], function(exports_1, context_1) {
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
    var core_1, forms_1;
    var InputValidationDirective;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            }],
        execute: function() {
            /**
             * This directive gives you a valid state that takes into consideration the user's interaction with the control.
             * The "valid" state will be true on the following conditions:
             * <ul>
             *     <li>If the user hasn't focused the control</li>
             *     <li>If the control has focus</li>
             *     <li>If the control is valid (based on ngModel validations)</li>
             * </ul>
             * The intention is to simplify error conditions that would require too much logic instead.
             *
             * @example
             * <input [ngModel]="email" cpValidation #email="cpValidation" [class.error]="! email.valid">
             *
             * <div class="error-message" *ngIf="! email.valid">
             *     <ul>
             *         <li *ngIf="email.control.hasError( 'required' )">Please provide an email address</li>
             *         <li *ngIf="email.control.hasError( 'email' )">Please provide a valid email address</li>
             *     </ul>
             * </div>
             */
            InputValidationDirective = (function () {
                function InputValidationDirective(ngModel) {
                    this.ngModel = ngModel;
                    this.hasFocus = false;
                    this.wasFocused = false;
                }
                Object.defineProperty(InputValidationDirective.prototype, "control", {
                    get: function () {
                        if (!this.ngModel)
                            return null;
                        return this.ngModel.control;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(InputValidationDirective.prototype, "valid", {
                    get: function () {
                        if (!this.ngModel)
                            return true;
                        return this.hasFocus || !this.wasFocused || this.ngModel.valid;
                    },
                    enumerable: true,
                    configurable: true
                });
                InputValidationDirective.prototype.onFocus = function () {
                    this.hasFocus = true;
                    this.wasFocused = true;
                };
                InputValidationDirective.prototype.onBlur = function () {
                    this.hasFocus = false;
                };
                __decorate([
                    core_1.HostListener("focus", ["$event"]), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', []), 
                    __metadata('design:returntype', void 0)
                ], InputValidationDirective.prototype, "onFocus", null);
                __decorate([
                    core_1.HostListener("blur", ["$event"]), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', []), 
                    __metadata('design:returntype', void 0)
                ], InputValidationDirective.prototype, "onBlur", null);
                InputValidationDirective = __decorate([
                    core_1.Directive({
                        selector: "[cpValidation][ngModel]",
                        exportAs: "cpValidation",
                    }),
                    __param(0, core_1.Optional()),
                    __param(0, core_1.Host()), 
                    __metadata('design:paramtypes', [forms_1.NgModel])
                ], InputValidationDirective);
                return InputValidationDirective;
            }());
            exports_1("InputValidationDirective", InputValidationDirective);
            exports_1("default",InputValidationDirective);
        }
    }
});

//# sourceMappingURL=input-validation.directive.js.map