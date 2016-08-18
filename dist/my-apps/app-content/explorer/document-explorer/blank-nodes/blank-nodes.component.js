System.register(["@angular/core", "carbonldp/Utils", "./blank-node.component", "jquery", "semantic-ui/semantic", "./blank-nodes.component.html!", "./blank-nodes.component.css!text"], function(exports_1, context_1) {
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
    var core_1, Utils, blank_node_component_1, jquery_1, blank_nodes_component_html_1, blank_nodes_component_css_text_1;
    var BlankNodesComponent, BlankNodesRecords;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Utils_1) {
                Utils = Utils_1;
            },
            function (blank_node_component_1_1) {
                blank_node_component_1 = blank_node_component_1_1;
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
                    this.openedBlankNodes = [];
                    this.blankNodesRecords = new BlankNodesRecords();
                    this.blankNodes = [];
                    this.namedFragments = [];
                    this.documentURI = "";
                    this.onChanges = new core_1.EventEmitter();
                    this.onOpenBNode = new core_1.EventEmitter();
                    this.onOpenNamedFragment = new core_1.EventEmitter();
                    this.element = element;
                }
                BlankNodesComponent.prototype.ngAfterViewInit = function () {
                    this.$element = jquery_1.default(this.element.nativeElement);
                    this.nodesTab = this.$element.find(".tabular.blank-nodes.menu").tab();
                    this.initializeDeletionDimmer();
                };
                BlankNodesComponent.prototype.ngOnChanges = function (changes) {
                    if ((changes["blankNodes"].currentValue !== changes["blankNodes"].previousValue)) {
                        this.openedBlankNodes = [];
                        this.goToBlankNode("all");
                        this.blankNodesRecords.clear();
                    }
                };
                BlankNodesComponent.prototype.openBlankNode = function (nodeOrId) {
                    var _this = this;
                    var node;
                    if (typeof nodeOrId === "string") {
                        node = this.blankNodes.find(function (node) { return node.id === nodeOrId; });
                    }
                    else {
                        node = nodeOrId;
                    }
                    if (this.openedBlankNodes.indexOf(node) === -1)
                        this.openedBlankNodes.push(node);
                    setTimeout(function () {
                        _this.refreshTabs();
                        _this.goToBlankNode("blankNode_" + _this.escape(node.id));
                    }, 50);
                };
                BlankNodesComponent.prototype.openNamedFragment = function (id) {
                    this.onOpenNamedFragment.emit(id);
                };
                BlankNodesComponent.prototype.goToBlankNode = function (id) {
                    if (!this.nodesTab)
                        return;
                    this.nodesTab.find("> [data-tab='" + id + "']").click();
                    this.onOpenBNode.emit("bNodes");
                };
                BlankNodesComponent.prototype.closeBlankNode = function (blankNode, index) {
                    // if( blankNode.added ) {
                    // 	this.deleteBlankNode( blankNode, index );
                    // 	delete blankNode.added;
                    // } else {
                    // 	delete blankNode.modified;
                    // 	this.changeBlankNode( blankNode );
                    // }
                    this.openedBlankNodes.splice(index, 1);
                    this.goToBlankNode("all");
                };
                BlankNodesComponent.prototype.refreshTabs = function () {
                    this.nodesTab.find(">.item").tab();
                };
                BlankNodesComponent.prototype.escape = function (value) {
                    return value === "all" ? value : value.substr(value.indexOf("_:") + 2);
                };
                // Here comes the CRUD of blank nodes
                BlankNodesComponent.prototype.changeBlankNode = function (blankNodeRow, index) {
                    if (typeof this.blankNodesRecords === "undefined")
                        this.blankNodesRecords = new BlankNodesRecords();
                    if (typeof blankNodeRow.modified !== "undefined") {
                        this.blankNodesRecords.changes.set(blankNodeRow.id, blankNodeRow);
                    }
                    else if (typeof blankNodeRow.added === "undefined") {
                        this.blankNodesRecords.changes.delete(blankNodeRow.id);
                    }
                    this.onChanges.emit(this.blankNodesRecords);
                };
                BlankNodesComponent.prototype.deleteBlankNode = function (blankNodeRow, index) {
                    if (typeof this.blankNodesRecords === "undefined")
                        this.blankNodesRecords = new BlankNodesRecords();
                    if (typeof blankNodeRow.added !== "undefined") {
                        this.blankNodesRecords.additions.delete(blankNodeRow.id);
                    }
                    else if (typeof blankNodeRow.modified !== "undefined") {
                        this.blankNodesRecords.changes.delete(blankNodeRow.id);
                        this.blankNodesRecords.deletions.set(blankNodeRow.id, blankNodeRow);
                    }
                    else {
                        // this.blankNodesRecords.changes.delete( blankNodeRow.id );
                        this.blankNodesRecords.deletions.set(blankNodeRow.id, blankNodeRow);
                    }
                    index = this.blankNodes.indexOf(blankNodeRow);
                    this.blankNodes.splice(index, 1);
                    this.onChanges.emit(this.blankNodesRecords);
                };
                BlankNodesComponent.prototype.createBlankNode = function () {
                    var id = "_:" + this.generateUUID(), bNodeIdentifier = this.generateUUID();
                    var newBlankNode = {
                        id: id,
                        bNodeIdentifier: bNodeIdentifier,
                        rootNode: {
                            "@id": id,
                            "https://carbonldp.com/ns/v1/platform#bNodeIdentifier": [{ "@value": bNodeIdentifier }]
                        },
                        added: true
                    };
                    this.blankNodes.splice(0, 0, newBlankNode);
                    this.blankNodesRecords.additions.set(id, newBlankNode);
                    this.onChanges.emit(this.blankNodesRecords);
                    this.openBlankNode(id);
                };
                BlankNodesComponent.prototype.generateUUID = function () {
                    return Utils.UUID.generate();
                };
                BlankNodesComponent.prototype.initializeDeletionDimmer = function () {
                    this.$element.find(".confirm-deletion.dimmer").dimmer({ closable: false });
                };
                BlankNodesComponent.prototype.askToConfirmDeletion = function (clickEvent, blankNode) {
                    clickEvent.stopPropagation();
                    this.askingDeletionBlankNode = blankNode;
                    this.$element.find(".confirm-deletion.dimmer").dimmer("show");
                };
                BlankNodesComponent.prototype.confirmDeletion = function () {
                    this.deleteBlankNode(this.askingDeletionBlankNode);
                    this.$element.find(".confirm-deletion.dimmer").dimmer("hide");
                };
                BlankNodesComponent.prototype.cancelDeletion = function () {
                    this.askingDeletionBlankNode = null;
                    this.$element.find(".confirm-deletion.dimmer").dimmer("hide");
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], BlankNodesComponent.prototype, "blankNodes", void 0);
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
                        directives: [blank_node_component_1.BlankNodeComponent],
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], BlankNodesComponent);
                return BlankNodesComponent;
            }());
            exports_1("BlankNodesComponent", BlankNodesComponent);
            BlankNodesRecords = (function () {
                function BlankNodesRecords() {
                    this.changes = new Map();
                    this.deletions = new Map();
                    this.additions = new Map();
                }
                BlankNodesRecords.prototype.clear = function () {
                    this.changes.clear();
                    this.deletions.clear();
                    this.additions.clear();
                };
                return BlankNodesRecords;
            }());
            exports_1("BlankNodesRecords", BlankNodesRecords);
            exports_1("default",BlankNodesComponent);
        }
    }
});

//# sourceMappingURL=blank-nodes.component.js.map
