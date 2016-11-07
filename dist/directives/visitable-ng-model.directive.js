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
    var InputValidation;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            }],
        execute: function() {
            InputValidation = (function () {
                function InputValidation(ngModel) {
                    this.ngModel = ngModel;
                    this.hasFocus = false;
                    this.wasFocused = false;
                    console.log(ngModel);
                }
                Object.defineProperty(InputValidation.prototype, "control", {
                    get: function () {
                        if (!this.ngModel)
                            return null;
                        return this.ngModel.control;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(InputValidation.prototype, "valid", {
                    get: function () {
                        if (!this.ngModel)
                            return true;
                        return this.hasFocus || !this.wasFocused || this.ngModel.valid;
                    },
                    enumerable: true,
                    configurable: true
                });
                InputValidation.prototype.onFocus = function () {
                    this.hasFocus = true;
                    this.wasFocused = true;
                };
                InputValidation.prototype.onBlur = function () {
                    this.hasFocus = false;
                };
                __decorate([
                    core_1.Input("cpValidation"), 
                    __metadata('design:type', Object)
                ], InputValidation.prototype, "input", void 0);
                __decorate([
                    core_1.HostListener("focus", ["$event"]), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', []), 
                    __metadata('design:returntype', void 0)
                ], InputValidation.prototype, "onFocus", null);
                __decorate([
                    core_1.HostListener("blur", ["$event"]), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', []), 
                    __metadata('design:returntype', void 0)
                ], InputValidation.prototype, "onBlur", null);
                InputValidation = __decorate([
                    core_1.Directive({
                        selector: "input[cpValidation], textarea[cpValidation]",
                        exportAs: "cpValidation",
                    }),
                    __param(0, core_1.Optional()),
                    __param(0, core_1.Host()), 
                    __metadata('design:paramtypes', [forms_1.NgModel])
                ], InputValidation);
                return InputValidation;
            }());
            exports_1("InputValidation", InputValidation);
            exports_1("default",InputValidation);
        }
    }
});

//# sourceMappingURL=visitable-ng-model.directive.js.map
