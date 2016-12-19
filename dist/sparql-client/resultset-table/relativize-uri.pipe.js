System.register(["@angular/core", "carbonldp/RDF/URI"], function(exports_1, context_1) {
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
    var core_1, URI;
    var RelativizeURIPipe;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (URI_1) {
                URI = URI_1;
            }],
        execute: function() {
            RelativizeURIPipe = (function () {
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
                RelativizeURIPipe = __decorate([
                    core_1.Pipe({ name: "relative" }), 
                    __metadata('design:paramtypes', [])
                ], RelativizeURIPipe);
                return RelativizeURIPipe;
            }());
            exports_1("RelativizeURIPipe", RelativizeURIPipe);
            exports_1("default",RelativizeURIPipe);
        }
    }
});

//# sourceMappingURL=relativize-uri.pipe.js.map
