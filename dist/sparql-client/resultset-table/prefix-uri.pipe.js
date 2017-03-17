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
var PrefixURIPipe = (function () {
    function PrefixURIPipe() {
    }
    PrefixURIPipe.prototype.transform = function (value, args) {
        if (args.length === 0)
            throw new Error("The relative pipe requires an argument");
        var prefixes = args[0];
        for (var prefix in prefixes) {
            if (!prefixes.hasOwnProperty(prefix))
                continue;
            var prefixURI = prefixes[prefix];
            if (!URI.Util.isBaseOf(prefixURI, value))
                continue;
            return URI.Util.prefix(value, prefix, prefixURI);
        }
        return "<" + value + ">";
    };
    return PrefixURIPipe;
}());
PrefixURIPipe = __decorate([
    core_1.Pipe({ name: "prefix" })
], PrefixURIPipe);
exports.PrefixURIPipe = PrefixURIPipe;
