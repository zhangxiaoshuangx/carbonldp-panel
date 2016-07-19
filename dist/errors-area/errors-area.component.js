System.register(["@angular/core", "./errors-area.service", "./error-message.component", "semantic-ui/semantic", "./errors-area.component.html!", "./errors-area.component.css!text"], function(exports_1, context_1) {
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
    var core_1, errors_area_service_1, error_message_component_1, errors_area_component_html_1, errors_area_component_css_text_1;
    var ErrorsAreaComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (errors_area_service_1_1) {
                errors_area_service_1 = errors_area_service_1_1;
            },
            function (error_message_component_1_1) {
                error_message_component_1 = error_message_component_1_1;
            },
            function (_1) {},
            function (errors_area_component_html_1_1) {
                errors_area_component_html_1 = errors_area_component_html_1_1;
            },
            function (errors_area_component_css_text_1_1) {
                errors_area_component_css_text_1 = errors_area_component_css_text_1_1;
            }],
        execute: function() {
            ErrorsAreaComponent = (function () {
                function ErrorsAreaComponent(errorsAreaService) {
                    this.messages = [];
                    this.errorsAreaService = errorsAreaService;
                }
                ErrorsAreaComponent.prototype.ngAfterViewInit = function () {
                    var _this = this;
                    this.errorsAreaService.addErrorEmitter.subscribe(function (message) {
                        _this.messages.push(message);
                    });
                };
                ErrorsAreaComponent.prototype.removeMessage = function (event, message, index) {
                    this.messages.splice(index, 1);
                };
                ErrorsAreaComponent = __decorate([
                    core_1.Component({
                        selector: "cp-errors-area",
                        template: errors_area_component_html_1.default,
                        styles: [errors_area_component_css_text_1.default],
                        directives: [error_message_component_1.ErrorMessageComponent],
                    }), 
                    __metadata('design:paramtypes', [errors_area_service_1.ErrorsAreaService])
                ], ErrorsAreaComponent);
                return ErrorsAreaComponent;
            }());
            exports_1("ErrorsAreaComponent", ErrorsAreaComponent);
            exports_1("default",ErrorsAreaComponent);
        }
    }
});

//# sourceMappingURL=errors-area.component.js.map
