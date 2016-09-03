System.register(["@angular/core", "semantic-ui/semantic", "carbonldp/RDF/URI", "./list-viewer.component.html!"], function(exports_1, context_1) {
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
    var core_1, URI, list_viewer_component_html_1;
    var ListViewerComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (_1) {},
            function (URI_1) {
                URI = URI_1;
            },
            function (list_viewer_component_html_1_1) {
                list_viewer_component_html_1 = list_viewer_component_html_1_1;
            }],
        execute: function() {
            ListViewerComponent = (function () {
                function ListViewerComponent(element) {
                    this.onGoToBNode = new core_1.EventEmitter();
                    this.headers = [];
                    this.element = element;
                }
                ListViewerComponent.prototype.ngOnInit = function () {
                    this.headers = this.getHeaders();
                };
                ListViewerComponent.prototype.hasCommonHeaders = function () {
                    return this.headers.indexOf("@id") > -1 ? true : this.headers.indexOf("@type") > -1 ? true : this.headers.indexOf("@value") > -1 ? true : false;
                };
                ListViewerComponent.prototype.hasHeader = function (value) {
                    return this.headers.indexOf(value) > -1 ? true : false;
                };
                ListViewerComponent.prototype.getHeaders = function () {
                    var temp = [];
                    this.list.forEach(function (item) {
                        temp = temp.concat(Object.keys(item));
                    });
                    return temp.filter(function (item, pos) {
                        return temp.indexOf(item) === pos;
                    });
                };
                ListViewerComponent.prototype.goToBNode = function (id) {
                    this.onGoToBNode.emit(id);
                };
                ListViewerComponent.prototype.isBNode = function (uri) {
                    return !!uri ? URI.Util.isBNodeID(uri) : false;
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], ListViewerComponent.prototype, "list", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], ListViewerComponent.prototype, "onGoToBNode", void 0);
                ListViewerComponent = __decorate([
                    core_1.Component({
                        selector: "cp-property-list",
                        template: list_viewer_component_html_1.default,
                        styles: [":host { display:block; }"],
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], ListViewerComponent);
                return ListViewerComponent;
            }());
            exports_1("ListViewerComponent", ListViewerComponent);
            exports_1("default",ListViewerComponent);
        }
    }
});

//# sourceMappingURL=list-viewer.component.js.map
