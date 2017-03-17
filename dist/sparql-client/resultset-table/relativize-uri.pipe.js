"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var URI = require("carbonldp/RDF/URI");
var RelativizeURIPipe = (function () {
    function RelativizeURIPipe() {
    }
    RelativizeURIPipe.prototype.transform = function (value, args) {
        if (args.length === 0)
            throw new Error("The relative pipe requires an argument");
        var baseURI = "";
        if (typeof args !== "string")
            baseURI = args[0];
        if (!value.startsWith(baseURI))
            return value;
        return URI.Util.getRelativeURI(value, baseURI);
    };
    return RelativizeURIPipe;
}());
RelativizeURIPipe = __decorate([
    core_1.Pipe({ name: "relative" })
], RelativizeURIPipe);
exports.RelativizeURIPipe = RelativizeURIPipe;
