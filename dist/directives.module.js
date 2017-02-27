"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
// Components
var highlight_directive_1 = require("./directives/highlight.directive");
var custom_validators_1 = require("./custom-validators");
var custom_validators_2 = require("./custom-validators");
var custom_validators_3 = require("./custom-validators");
var custom_validators_4 = require("./custom-validators");
var input_validation_directive_1 = require("./directives/input-validation.directive");
var grayed_out_directive_1 = require("./directives/grayed-out.directive");
//TODO: Merge directives module with panel module, after solving components collisions between WebsiteModule and PanelModule
var DirectivesModule = (function () {
    function DirectivesModule() {
    }
    return DirectivesModule;
}());
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
    })
], DirectivesModule);
exports.DirectivesModule = DirectivesModule;

//# sourceMappingURL=directives.module.js.map
