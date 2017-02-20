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
require("semantic-ui/semantic");
var CreateAppView = (function () {
    function CreateAppView() {
    }
    CreateAppView = __decorate([
        core_1.Component({
            selector: "cp-create-app-view",
            templateUrl: "./create-app.view.html",
            styles: [":host { display: block; }"],
        }), 
        __metadata('design:paramtypes', [])
    ], CreateAppView);
    return CreateAppView;
}());
exports.CreateAppView = CreateAppView;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CreateAppView;

//# sourceMappingURL=create-app.view.js.map
