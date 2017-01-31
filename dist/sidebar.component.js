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
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var jquery_1 = require("jquery");
require("semantic-ui/semantic");
var sidebar_service_1 = require("carbonldp-panel/sidebar.service");
var sidebar_component_html_1 = require("./sidebar.component.html!");
var sidebar_component_css_text_1 = require("./sidebar.component.css!text");
var SidebarComponent = (function () {
    function SidebarComponent(router, element, location, sidebarService) {
        var _this = this;
        this.element = element;
        this.router = router;
        this.location = location;
        this.sidebarService = sidebarService;
        this.sidebarService.toggleEmitter.subscribe(function (event) {
            _this.toggle();
        });
        this.sidebarService.toggledEmitter.emit(true);
    }
    SidebarComponent.prototype.ngAfterViewInit = function () {
        this.$element = jquery_1.default(this.element.nativeElement);
        this.refreshAccordion();
    };
    SidebarComponent.prototype.toggle = function () {
        var _this = this;
        if (this.$element.is(":visible")) {
            this.$element.animate({ "width": "0" }, 400, function () {
                _this.$element.hide();
                _this.sidebarService.toggledEmitter.emit(false);
            });
        }
        else {
            this.$element.show();
            this.$element.animate({ "width": "300px" }, 400);
            this.sidebarService.toggledEmitter.emit(true);
        }
    };
    SidebarComponent.prototype.refreshAccordion = function () {
        this.$element.accordion({
            selector: {
                trigger: ".item.app, .item.app .title",
                title: ".title",
            },
            exclusive: false
        });
    };
    SidebarComponent = __decorate([
        core_1.Component({
            selector: "cp-sidebar",
            template: sidebar_component_html_1.default,
            styles: [sidebar_component_css_text_1.default],
            host: {
                class: "ui inverted vertical menu accordion"
            }
        }), 
        __metadata('design:paramtypes', [router_1.Router, core_1.ElementRef, common_1.Location, sidebar_service_1.SidebarService])
    ], SidebarComponent);
    return SidebarComponent;
}());
exports.SidebarComponent = SidebarComponent;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SidebarComponent;

//# sourceMappingURL=sidebar.component.js.map
