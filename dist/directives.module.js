System.register(['@angular/core', '@angular/common', "./directives/highlight.directive", "./custom-validators", "./directives/input-validation.directive", "./directives/grayed-out.directive"], function(exports_1, context_1) {
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
    var core_1, common_1, highlight_directive_1, custom_validators_1, custom_validators_2, custom_validators_3, custom_validators_4, input_validation_directive_1, grayed_out_directive_1;
    var DirectivesModule;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (highlight_directive_1_1) {
                highlight_directive_1 = highlight_directive_1_1;
            },
            function (custom_validators_1_1) {
                custom_validators_1 = custom_validators_1_1;
                custom_validators_2 = custom_validators_1_1;
                custom_validators_3 = custom_validators_1_1;
                custom_validators_4 = custom_validators_1_1;
            },
            function (input_validation_directive_1_1) {
                input_validation_directive_1 = input_validation_directive_1_1;
            },
            function (grayed_out_directive_1_1) {
                grayed_out_directive_1 = grayed_out_directive_1_1;
            }],
        execute: function() {
            //TODO: Merge directives module with panel module, after solving components collisions between WebsiteModule and PanelModule
            DirectivesModule = (function () {
                function DirectivesModule() {
                }
                DirectivesModule = __decorate([
                    core_1.NgModule({
                        imports: [
                            common_1.CommonModule,
                        ],
                        declarations: [
                            custom_validators_1.EmailValidator,
                            custom_validators_1.MatchValidator,
                            custom_validators_2.SlugValidator,
                            custom_validators_2.DomainValidator,
                            custom_validators_3.URIValidator,
                            custom_validators_3.FragmentValidator,
                            custom_validators_3.URIFragmentValidator,
                            highlight_directive_1.HighlightDirective,
                            input_validation_directive_1.InputValidationDirective,
                            custom_validators_4.RequiredIfValidator,
                            grayed_out_directive_1.GrayedOutDirective,
                        ],
                        exports: [
                            custom_validators_1.EmailValidator,
                            custom_validators_1.MatchValidator,
                            custom_validators_2.DomainValidator,
                            custom_validators_2.SlugValidator,
                            custom_validators_3.URIValidator,
                            custom_validators_3.FragmentValidator,
                            custom_validators_3.URIFragmentValidator,
                            highlight_directive_1.HighlightDirective,
                            input_validation_directive_1.InputValidationDirective,
                            custom_validators_4.RequiredIfValidator,
                            grayed_out_directive_1.GrayedOutDirective,
                        ],
                        providers: []
                    }), 
                    __metadata('design:paramtypes', [])
                ], DirectivesModule);
                return DirectivesModule;
            }());
            exports_1("DirectivesModule", DirectivesModule);
        }
    }
});

//# sourceMappingURL=directives.module.js.map
