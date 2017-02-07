"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var header_service_1 = require("carbonldp-panel/header.service");
var jquery_1 = require("jquery");
require("semantic-ui/semantic");
var HeaderComponent = (function () {
    function HeaderComponent(element, headerService) {
        this.element = element;
        this.headerService = headerService;
    }
    HeaderComponent.prototype.ngAfterContentInit = function () {
        this.$element = jquery_1.default(this.element.nativeElement);
        this.createCollapsableMenus();
    };
    HeaderComponent.prototype.createCollapsableMenus = function () {
        var verticalMenu = this.$element.find(".ui.vertical.menu");
        this.$element.find(".item.open").on("click", function (e) {
            e.preventDefault();
            verticalMenu.toggle();
        });
        verticalMenu.toggle();
    };
    HeaderComponent = __decorate([
        core_1.Component({
            selector: "cp-header",
            template: require("./header.component.html"),
            styles: [require("./header.component.css")],
            host: {
                class: "ui navigation inverted menu"
            }
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, header_service_1.HeaderService])
    ], HeaderComponent);
    return HeaderComponent;
}());
exports.HeaderComponent = HeaderComponent;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = HeaderComponent;

//# sourceMappingURL=header.component.js.map
