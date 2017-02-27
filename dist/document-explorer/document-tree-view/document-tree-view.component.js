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
var URI = require("carbonldp/RDF/URI");
var SDKContext = require("carbonldp/SDKContext");
var $ = require("jquery");
require("semantic-ui/semantic");
require("jstree/dist/jstree.min");
var DocumentTreeViewComponent = (function () {
    function DocumentTreeViewComponent(element) {
        this.nodeChildren = [];
        this._selectedURI = "";
        this.refreshNode = new core_1.EventEmitter();
        this.openNode = new core_1.EventEmitter();
        this.onResolveUri = new core_1.EventEmitter();
        this.onError = new core_1.EventEmitter();
        this.onLoadingDocument = new core_1.EventEmitter();
        this.onShowCreateChildForm = new core_1.EventEmitter();
        this.onShowDeleteChildForm = new core_1.EventEmitter();
        this.onShowCreateAccessPointForm = new core_1.EventEmitter();
        this.onSelectDocument = new core_1.EventEmitter();
        this.element = element;
    }
    Object.defineProperty(DocumentTreeViewComponent.prototype, "selectedURI", {
        get: function () {
            return this._selectedURI;
        },
        set: function (value) {
            this._selectedURI = value;
            this.onSelectDocument.emit(this.selectedURI);
        },
        enumerable: true,
        configurable: true
    });
    DocumentTreeViewComponent.prototype.ngOnInit = function () {
        var alreadyImported = document.querySelectorAll("head [href='assets/node_modules/jstree/dist/themes/default/style.min.css']").length > 0;
        if (alreadyImported)
            return;
        var link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "assets/node_modules/jstree/dist/themes/default/style.min.css";
        var head = document.querySelector("head");
        head.appendChild(link);
    };
    DocumentTreeViewComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.$element = $(this.element.nativeElement);
        this.$tree = this.$element.find(".treeview.content");
        this.$element.find(".treeview.options .dropdown.button").dropdown({ action: "hide" });
        this.onLoadingDocument.emit(true);
        this.getDocumentTree().then(function () {
            _this.onLoadingDocument.emit(false);
        });
        this.refreshNode.subscribe(function (nodeId) {
            _this.jsTree.select_node(nodeId);
            _this.loadNode(nodeId);
        });
        this.openNode.subscribe(function (nodeId) {
            _this.jsTree.select_node(nodeId);
        });
    };
    DocumentTreeViewComponent.prototype.getDocumentTree = function () {
        var _this = this;
        return this.documentContext.documents.get("").then(function (_a) {
            var resolvedRoot = _a[0], response = _a[1];
            return resolvedRoot.refresh();
        }).then(function (_a) {
            var updatedRoot = _a[0], updatedResponse = _a[1];
            _this.nodeChildren.push(_this.buildNode(_this.documentContext.getBaseURI(), "default", true));
            _this.renderTree();
            return updatedRoot;
        }).catch(function (error) {
            console.error(error);
            _this.onError.emit(error);
        });
    };
    DocumentTreeViewComponent.prototype.buildNode = function (uri, nodeType, hasChildren) {
        var node = {
            id: uri,
            text: this.getSlug(uri),
            state: { "opened": false },
            children: [],
            data: {},
        };
        if (nodeType === "accesspoint")
            node.type = "accesspoint";
        if (hasChildren)
            node.children.push({ "text": "Loading...", });
        return node;
    };
    DocumentTreeViewComponent.prototype.renderTree = function () {
        var _this = this;
        this.jsTree = this.$tree.jstree({
            "core": {
                "data": this.nodeChildren,
                "check_callback": true,
                "multiple": false,
            },
            "types": {
                "default": {
                    "icon": "file outline icon",
                },
                "loading": {
                    "icon": "spinner loading icon",
                },
                "accesspoint": {
                    "icon": "selected radio icon",
                    "a_attr": {
                        "class": "accesspoint",
                        "title": "The element is an AccessPoint, not a direct child of the selected document."
                    }
                }
            },
            "plugins": ["types", "wholerow"],
        }).jstree(true);
        this.$tree.on("before_open.jstree", function (e, data) {
            var parentId = data.node.id;
            var parentNode = data.node;
            var position = "last";
            _this.onBeforeOpenNode(parentId, parentNode, position);
        });
        this.$tree.on("select_node.jstree", function (e, data) {
            var node = data.node;
            _this.selectedURI = node.id;
        });
        this.$tree.on("loaded.jstree", function () {
            _this.jsTree.select_node(_this.nodeChildren[0].id);
            _this.jsTree.open_node(_this.nodeChildren[0].id);
            if (_this.nodeChildren && _this.nodeChildren.length > 0) {
                _this.onResolveUri.emit(_this.nodeChildren[0].id);
            }
        });
        this.$tree.on("dblclick.jstree", ".jstree-anchor", function (e) {
            _this.loadNode(e.target);
        });
        this.$tree.on("dblclick.jstree", ".jstree-wholerow", function (e) {
            e.stopImmediatePropagation();
            var tmpEvt = $.Event("dblclick");
            $(e.currentTarget).closest(".jstree-node").children(".jstree-anchor").first().trigger(tmpEvt).focus();
        });
    };
    DocumentTreeViewComponent.prototype.loadNode = function (obj) {
        var node = this.jsTree.get_node(obj);
        var parentId = node.id;
        var parentNode = node;
        var position = "last";
        this.onChange(parentId, parentNode, position);
    };
    DocumentTreeViewComponent.prototype.onBeforeOpenNode = function (parentId, parentNode, position) {
        var _this = this;
        var originalIcon = !!this.jsTree.settings.types[parentNode.type] ? this.jsTree.settings.types[parentNode.type].icon : "help icon";
        this.jsTree.set_icon(parentNode, this.jsTree.settings.types.loading.icon);
        return this.getNodeChildren(parentNode.id).then(function (children) {
            _this.emptyNode(parentId);
            if (children.length > 0) {
                children.forEach(function (childNode) { return _this.addChild(parentId, childNode, position); });
            }
        }).then(function () {
            _this.jsTree.set_icon(parentNode, originalIcon);
        });
    };
    DocumentTreeViewComponent.prototype.onChange = function (parentId, node, position) {
        var _this = this;
        this.onBeforeOpenNode(parentId, node, position).then(function () {
            if (!_this.jsTree.is_open(node)) {
                _this.jsTree.open_node(node);
            }
            _this.onResolveUri.emit(node.id);
        });
    };
    DocumentTreeViewComponent.prototype.addChild = function (parentId, node, position) {
        this.jsTree.create_node(parentId, node, position);
    };
    DocumentTreeViewComponent.prototype.emptyNode = function (nodeId) {
        var $children = this.jsTree.get_children_dom(nodeId);
        var childElements = jQuery.makeArray($children);
        while (childElements.length > 0) {
            this.jsTree.delete_node(childElements[0]);
            childElements.splice(0, 1);
        }
    };
    DocumentTreeViewComponent.prototype.getNodeChildren = function (uri) {
        var _this = this;
        var query = "SELECT ?p ?o ?p2 ?o2 \n\t\t\tWHERE{\n\t\t\t\t<__URI__> ?p ?o VALUES (?p) \n\t\t\t\t{\n\t\t\t\t\t(<http://www.w3.org/ns/ldp#contains>)\n\t\t\t\t\t(<https://carbonldp.com/ns/v1/platform#accessPoint>)\n\t\t\t\t}\n\t\t\t\tOPTIONAL {\n\t\t\t\t\t?o ?p2 ?o2\tVALUES (?p2) \n\t\t\t\t\t{\t\t\n\t\t\t\t\t\t(<http://www.w3.org/ns/ldp#contains>)\t\n\t\t\t\t\t\t(<https://carbonldp.com/ns/v1/platform#accessPoint>)\t\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}";
        query = query.replace("__URI__", uri);
        return this.documentContext.documents.executeSELECTQuery(uri, query).then(function (_a) {
            var results = _a[0], response = _a[1];
            var accessPoints = new Map(), children = new Map(), nodes = [];
            results.bindings.forEach(function (binding) {
                if (binding.p.id !== "http://www.w3.org/ns/ldp#contains" || (!!binding.o2 && binding.o2.id.indexOf("/agents/me/") !== -1))
                    return;
                children.set(binding.o.id, children.get(binding.o.id) ? true : !!binding.p2);
            });
            results.bindings.forEach(function (binding) {
                if (binding.p.id !== "https://carbonldp.com/ns/v1/platform#accessPoint")
                    return;
                accessPoints.set(binding.o.id, accessPoints.get(binding.o.id) ? true : !!binding.p2);
            });
            children.forEach(function (hasChildren, id, children) {
                nodes.push(_this.buildNode(id, "default", hasChildren));
            });
            accessPoints.forEach(function (hasChildren, id, children) {
                nodes.push(_this.buildNode(id, "accesspoint", hasChildren));
            });
            return nodes;
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
    DocumentTreeViewComponent.prototype.showCreateChildForm = function () {
        this.onShowCreateChildForm.emit(true);
    };
    DocumentTreeViewComponent.prototype.showCreateAccessPointForm = function () {
        this.onShowCreateAccessPointForm.emit(true);
    };
    DocumentTreeViewComponent.prototype.showDeleteChildForm = function () {
        this.onShowDeleteChildForm.emit(true);
    };
    return DocumentTreeViewComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", SDKContext.Class)
], DocumentTreeViewComponent.prototype, "documentContext", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", core_1.EventEmitter)
], DocumentTreeViewComponent.prototype, "refreshNode", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", core_1.EventEmitter)
], DocumentTreeViewComponent.prototype, "openNode", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DocumentTreeViewComponent.prototype, "onResolveUri", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DocumentTreeViewComponent.prototype, "onError", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DocumentTreeViewComponent.prototype, "onLoadingDocument", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DocumentTreeViewComponent.prototype, "onShowCreateChildForm", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DocumentTreeViewComponent.prototype, "onShowDeleteChildForm", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DocumentTreeViewComponent.prototype, "onShowCreateAccessPointForm", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DocumentTreeViewComponent.prototype, "onSelectDocument", void 0);
DocumentTreeViewComponent = __decorate([
    core_1.Component({
        selector: "cp-document-treeview",
        templateUrl: "./document-tree-view.component.html",
        styleUrls: ["./document-tree-view.component.scss"],
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], DocumentTreeViewComponent);
exports.DocumentTreeViewComponent = DocumentTreeViewComponent;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DocumentTreeViewComponent;

//# sourceMappingURL=document-tree-view.component.js.map
