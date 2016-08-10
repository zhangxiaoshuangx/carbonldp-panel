System.register(["@angular/core", "carbonldp/RDF/URI", "carbonldp/SDKContext", "jquery", "semantic-ui/semantic", "jstree/dist/jstree.min", "jstree/dist/themes/default/style.min.css!", "./document-tree-view.component.html!", "./document-tree-view.component.css!text"], function(exports_1, context_1) {
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
    var core_1, URI, SDKContext, jquery_1, document_tree_view_component_html_1, document_tree_view_component_css_text_1;
    var DocumentTreeViewComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (URI_1) {
                URI = URI_1;
            },
            function (SDKContext_1) {
                SDKContext = SDKContext_1;
            },
            function (jquery_1_1) {
                jquery_1 = jquery_1_1;
            },
            function (_1) {},
            function (_2) {},
            function (_3) {},
            function (document_tree_view_component_html_1_1) {
                document_tree_view_component_html_1 = document_tree_view_component_html_1_1;
            },
            function (document_tree_view_component_css_text_1_1) {
                document_tree_view_component_css_text_1 = document_tree_view_component_css_text_1_1;
            }],
        execute: function() {
            DocumentTreeViewComponent = (function () {
                function DocumentTreeViewComponent(element) {
                    this.nodeChildren = [];
                    this.onResolveUri = new core_1.EventEmitter();
                    this.onError = new core_1.EventEmitter();
                    this.onLoadingDocument = new core_1.EventEmitter();
                    this.element = element;
                }
                DocumentTreeViewComponent.prototype.ngAfterViewInit = function () {
                    var _this = this;
                    this.$element = jquery_1.default(this.element.nativeElement);
                    this.documentTree = this.$element.find(".document.treeview");
                    this.onLoadingDocument.emit(true);
                    this.getDocumentTree().then(function () {
                        _this.onLoadingDocument.emit(false);
                    });
                };
                DocumentTreeViewComponent.prototype.getDocumentTree = function () {
                    var _this = this;
                    return this.documentContext.documents.get("").then(function (_a) {
                        var resolvedRoot = _a[0], response = _a[1];
                        return resolvedRoot.refresh();
                    }).then(function (_a) {
                        var updatedRoot = _a[0], updatedResponse = _a[1];
                        _this.nodeChildren.push(_this.buildNode(_this.documentContext.getBaseURI()));
                        _this.renderTree();
                    }).catch(function (error) {
                        console.error(error);
                        _this.onError.emit(error);
                    });
                };
                DocumentTreeViewComponent.prototype.buildNode = function (uri) {
                    return {
                        "text": this.getSlug(uri),
                        "state": { "opened": false },
                        "children": [
                            {
                                "text": "Loading...",
                            },
                        ],
                        "data": {
                            "pointer": {
                                "id": uri,
                            },
                        },
                    };
                };
                DocumentTreeViewComponent.prototype.renderTree = function () {
                    var _this = this;
                    this.documentTree.jstree({
                        "core": {
                            "data": this.nodeChildren,
                            "check_callback": true,
                        },
                        "types": {
                            "default": {
                                "icon": "file outline icon",
                            },
                            "loading": {
                                "icon": "spinner loading icon",
                            },
                        },
                        "plugins": ["types", "wholerow"],
                    });
                    this.documentTree.jstree();
                    this.documentTree.on("create_node.jstree", function (e, data) { });
                    this.documentTree.on("before_open.jstree", function (e, data) {
                        var parentId = data.node.id;
                        var parentNode = data.node;
                        var position = "last";
                        _this.onBeforeOpenNode(parentId, parentNode, position);
                    });
                    this.documentTree.on("changed.jstree", function (e, data) {
                        var parentId = data.node.id;
                        var parentNode = data.node;
                        var position = "last";
                        _this.onClickNode(parentId, parentNode, position);
                    });
                    this.documentTree.on("loaded.jstree", function () {
                        _this.documentTree.jstree("open_all");
                        if (_this.nodeChildren && _this.nodeChildren.length > 0) {
                            _this.onResolveUri.emit(_this.nodeChildren[0].data.pointer.id);
                        }
                    });
                };
                DocumentTreeViewComponent.prototype.emptyNode = function (nodeId) {
                    var $children = this.documentTree.jstree(true).get_children_dom(nodeId);
                    var childElements = jQuery.makeArray($children);
                    while (childElements.length > 0) {
                        this.documentTree.jstree(true).delete_node(childElements[0]);
                        childElements.splice(0, 1);
                    }
                };
                DocumentTreeViewComponent.prototype.onBeforeOpenNode = function (parentId, parentNode, position) {
                    var _this = this;
                    var oldIcon = parentNode.icon;
                    var $documentTree = this.documentTree.jstree(true);
                    $documentTree.set_icon(parentNode, $documentTree.settings.types.loading.icon);
                    this.getNodeChildren(parentNode.data.pointer.id).then(function (children) {
                        _this.emptyNode(parentId);
                        if (children.length > 0) {
                            children.forEach(function (childNode) { return _this.addChild(parentId, childNode, position); });
                        }
                    }).then(function () {
                        $documentTree.set_icon(parentNode, oldIcon);
                    });
                };
                DocumentTreeViewComponent.prototype.onClickNode = function (parentId, node, position) {
                    var tree = this.documentTree.jstree(true);
                    if (tree.is_open(node)) {
                        this.onBeforeOpenNode(parentId, node, position);
                    }
                    else {
                        tree.open_node(node);
                    }
                    this.onResolveUri.emit(node.data.pointer.id);
                };
                DocumentTreeViewComponent.prototype.addChild = function (parentId, node, position) {
                    this.documentTree.jstree(true).create_node(parentId, node, position);
                };
                DocumentTreeViewComponent.prototype.getNodeChildren = function (uri) {
                    var _this = this;
                    return this.documentContext.documents.get(uri).then(function (_a) {
                        var resolvedRoot = _a[0], response = _a[1];
                        return resolvedRoot.refresh().then(function (_a) {
                            var refreshedRoot = _a[0], response = _a[1];
                            if (!resolvedRoot.contains)
                                return [];
                            return resolvedRoot.contains.map(function (pointer) {
                                return _this.buildNode(pointer.id);
                            });
                        });
                    }).catch(function (error) {
                        console.error(error);
                        return [];
                    });
                };
                DocumentTreeViewComponent.prototype.getSlug = function (pointer) {
                    if (typeof pointer !== "string")
                        return pointer.id;
                    return URI.Util.getSlug(pointer);
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', SDKContext.Class)
                ], DocumentTreeViewComponent.prototype, "documentContext", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], DocumentTreeViewComponent.prototype, "onResolveUri", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], DocumentTreeViewComponent.prototype, "onError", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], DocumentTreeViewComponent.prototype, "onLoadingDocument", void 0);
                DocumentTreeViewComponent = __decorate([
                    core_1.Component({
                        selector: "cp-document-treeview",
                        template: document_tree_view_component_html_1.default,
                        styles: [document_tree_view_component_css_text_1.default],
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], DocumentTreeViewComponent);
                return DocumentTreeViewComponent;
            }());
            exports_1("DocumentTreeViewComponent", DocumentTreeViewComponent);
            exports_1("default",DocumentTreeViewComponent);
        }
    }
});

//# sourceMappingURL=document-tree-view.component.js.map
