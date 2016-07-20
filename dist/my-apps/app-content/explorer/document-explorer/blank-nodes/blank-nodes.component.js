System.register(["@angular/core", "./blank-node.component", "./../property/property.component", "jquery", "semantic-ui/semantic", "./blank-nodes.component.html!", "./blank-nodes.component.css!text"], function(exports_1, context_1) {
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
    var core_1, blank_node_component_1, property_component_1, jquery_1, blank_nodes_component_html_1, blank_nodes_component_css_text_1;
    var BlankNodesComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (blank_node_component_1_1) {
                blank_node_component_1 = blank_node_component_1_1;
            },
            function (property_component_1_1) {
                property_component_1 = property_component_1_1;
            },
            function (jquery_1_1) {
                jquery_1 = jquery_1_1;
            },
            function (_1) {},
            function (blank_nodes_component_html_1_1) {
                blank_nodes_component_html_1 = blank_nodes_component_html_1_1;
            },
            function (blank_nodes_component_css_text_1_1) {
                blank_nodes_component_css_text_1 = blank_nodes_component_css_text_1_1;
            }],
        execute: function() {
            BlankNodesComponent = (function () {
                function BlankNodesComponent(element) {
                    this.openedBNodes = [];
                    this.bNodesChanges = new Map();
                    this.bNodes = [];
                    this.namedFragments = [];
                    this.documentURI = "";
                    this.onChanges = new core_1.EventEmitter();
                    this.onOpenBNode = new core_1.EventEmitter();
                    this.onOpenNamedFragment = new core_1.EventEmitter();
                    this.element = element;
                }
                BlankNodesComponent.prototype.ngAfterViewInit = function () {
                    this.$element = jquery_1.default(this.element.nativeElement);
                    this.nodesTab = this.$element.find(".tabular.bnodes.menu").tab();
                };
                BlankNodesComponent.prototype.ngOnChanges = function (changes) {
                    if ((changes["bNodes"].currentValue !== changes["bNodes"].previousValue)) {
                        this.openedBNodes = [];
                        this.goToBNode("all");
                        this.bNodesChanges.clear();
                    }
                };
                BlankNodesComponent.prototype.getPropertiesName = function (property) {
                    return Object.keys(property);
                };
                BlankNodesComponent.prototype.notifyDocumentBNodeHasChanged = function (records, bNode) {
                    if (typeof records === "undefined" || records === null) {
                        this.bNodesChanges.delete(bNode["@id"]);
                        this.onChanges.emit(this.bNodesChanges);
                        return;
                    }
                    if (records.changes.size > 0 || records.additions.size > 0 || records.deletions.size > 0) {
                        this.bNodesChanges.set(bNode["@id"], records);
                    }
                    else {
                        this.bNodesChanges.delete(bNode["@id"]);
                    }
                    this.onChanges.emit(this.bNodesChanges);
                };
                BlankNodesComponent.prototype.openBNode = function (nodeOrId) {
                    var _this = this;
                    var node;
                    if (typeof nodeOrId === "string") {
                        node = this.bNodes.find(function (node) { return node["@id"] === nodeOrId; });
                    }
                    else {
                        node = nodeOrId;
                    }
                    if (this.openedBNodes.indexOf(node) === -1)
                        this.openedBNodes.push(node);
                    setTimeout(function () {
                        _this.refreshTabs();
                        _this.goToBNode("bnode" + node["@id"]);
                    }, 50);
                };
                BlankNodesComponent.prototype.openNamedFragment = function (id) {
                    this.onOpenNamedFragment.emit(id);
                };
                BlankNodesComponent.prototype.goToBNode = function (id) {
                    if (!this.nodesTab)
                        return;
                    this.nodesTab.find("> [data-tab='" + id + "']").click();
                    this.onOpenBNode.emit("bNodes");
                };
                BlankNodesComponent.prototype.closeBNode = function (bNode) {
                    var idx = this.openedBNodes.indexOf(bNode);
                    this.openedBNodes.splice(idx, 1);
                    this.goToBNode("all");
                    if (this.bNodesChanges.has(bNode["@id"]))
                        this.notifyDocumentBNodeHasChanged(null, bNode);
                };
                BlankNodesComponent.prototype.refreshTabs = function () {
                    this.nodesTab.find(">.item").tab();
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], BlankNodesComponent.prototype, "bNodes", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], BlankNodesComponent.prototype, "namedFragments", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], BlankNodesComponent.prototype, "documentURI", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], BlankNodesComponent.prototype, "onChanges", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], BlankNodesComponent.prototype, "onOpenBNode", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], BlankNodesComponent.prototype, "onOpenNamedFragment", void 0);
                BlankNodesComponent = __decorate([
                    core_1.Component({
                        selector: "cp-blank-nodes",
                        template: blank_nodes_component_html_1.default,
                        styles: [blank_nodes_component_css_text_1.default],
                        directives: [property_component_1.PropertyComponent, blank_node_component_1.BlankNodeComponent],
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], BlankNodesComponent);
                return BlankNodesComponent;
            }());
            exports_1("BlankNodesComponent", BlankNodesComponent);
            exports_1("default",BlankNodesComponent);
        }
    }
});

//# sourceMappingURL=blank-nodes.component.js.map
