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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var App = require("carbonldp/App");
var URI = require("carbonldp/RDF/URI");
var roles_service_1 = require("../roles.service");
require("jstree/dist/jstree.min");
var RolesTreeViewComponent = (function () {
    function RolesTreeViewComponent(element, rolesService) {
        this._selectedRole = "";
        this.refreshNode = new core_1.EventEmitter();
        this.openNode = new core_1.EventEmitter();
        this.deletedNode = new core_1.EventEmitter();
        this.onError = new core_1.EventEmitter();
        this.onLoading = new core_1.EventEmitter();
        this.onSelectRole = new core_1.EventEmitter();
        this.onDoubleClickRole = new core_1.EventEmitter();
        this.onShowCreateRoleForm = new core_1.EventEmitter();
        this.onShowDeleteRoleForm = new core_1.EventEmitter();
        this.element = element;
        this.rolesService = rolesService;
    }
    Object.defineProperty(RolesTreeViewComponent.prototype, "selectedURI", {
        get: function () {
            return this._selectedRole;
        },
        set: function (value) {
            this._selectedRole = value;
            this.onSelectRole.emit(this.selectedURI);
        },
        enumerable: true,
        configurable: true
    });
    RolesTreeViewComponent.prototype.ngOnInit = function () {
        var head, link = document.createElement("link"), alreadyImported = document.querySelectorAll("head [href='assets/node_modules/jstree/dist/themes/default/style.min.css']").length > 0;
        if (alreadyImported)
            return;
        link.rel = "stylesheet";
        link.href = "assets/node_modules/jstree/dist/themes/default/style.min.css";
        head = document.querySelector("head");
        head.appendChild(link);
    };
    RolesTreeViewComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.$element = $(this.element.nativeElement);
        this.$tree = this.$element.find(".tree.content");
        this.onLoading.emit(true);
        this.getTree().then(function () {
            _this.onLoading.emit(false);
        });
        this.refreshNode.subscribe(function (nodeId) {
            var node = _this.jsTree.get_node(nodeId);
            if (node["parent"] === "#")
                _this.jsTree.move_node(node, _this.appContext.getBaseURI() + "roles/app-admin/");
            _this.jsTree.close_node(node["parent"]);
            _this.jsTree.open_node(node["parent"]);
            _this.loadNode(node);
            _this.jsTree.select_node(node.id);
        });
        this.openNode.subscribe(function (nodeId) {
            _this.jsTree.select_node(nodeId);
        });
        this.deletedNode.subscribe(function (nodeId) {
            var node = _this.jsTree.get_node(nodeId);
            nodeId = node["parent"];
            _this.jsTree.select_node(nodeId);
            _this.loadNode(nodeId);
        });
    };
    RolesTreeViewComponent.prototype.getTree = function () {
        var _this = this;
        return this.getChildren().then(function (nodes) {
            _this.renderTree(nodes);
            return nodes;
        }).catch(function (error) {
            console.error(error);
            _this.onError.emit(error);
        });
    };
    RolesTreeViewComponent.prototype.getChildren = function (roleID) {
        var _this = this;
        var nodes = [];
        !!roleID && URI.Util.isAbsolute(roleID) ? roleID = roleID : roleID = null;
        return this.rolesService.getChildren(this.appContext, roleID).then(function (roles) {
            roles.forEach(function (role) {
                var node = _this.buildNode(role.id, role.name, null, role["hasChildren"]);
                nodes.push(node);
            });
            return nodes;
        });
    };
    RolesTreeViewComponent.prototype.buildNode = function (uri, text, nodeType, hasChildren) {
        var node = {
            id: uri,
            text: text,
            state: { "opened": false },
            children: [],
            data: {},
        };
        if (hasChildren)
            node.children.push({ "text": "Loading...", });
        return node;
    };
    RolesTreeViewComponent.prototype.renderTree = function (nodes) {
        var _this = this;
        this.jsTree = this.$tree.jstree({
            "core": {
                "data": nodes,
                "check_callback": true,
                "multiple": false,
            },
            "types": {
                "default": {
                    "icon": "file outline icon",
                },
                "loading": {
                    "icon": "spinner loading icon",
                }
            },
            "plugins": ["types", "wholerow"],
        }).jstree(true);
        this.$tree.on("before_open.jstree", function (e, data) {
            var parentId = data.node.id, parentNode = data.node, position = "last";
            _this.onBeforeOpenNode(parentId, parentNode, position);
        });
        this.$tree.on("select_node.jstree", function (e, data) {
            var node = data.node;
            _this.selectedURI = node.id;
        });
        this.$tree.on("deselect_node.jstree", function (e, data) {
            _this.selectedURI = null;
        });
        this.$tree.on("loaded.jstree", function () {
            _this.jsTree.select_node(nodes[0].id);
            _this.jsTree.open_node(nodes[0].id);
            if (!!nodes && nodes.length > 0) {
                _this.onDoubleClickRole.emit(nodes[0].id);
            }
        });
        this.$tree.on("after_close.jstree", function (e, data) {
            var node = data.node, selectedNodes = _this.jsTree.get_selected(node), selectedNode = selectedNodes.length > 0 ? selectedNodes[0].id : null;
            if (node.children.findIndex(function (nodeId) { return nodeId === selectedNode; }) !== -1) {
                _this.jsTree.deselect_all();
                _this.jsTree.select_node(node);
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
    RolesTreeViewComponent.prototype.loadNode = function (obj) {
        var node = this.jsTree.get_node(obj), parentId = node.id, parentNode = node, position = "last";
        this.onChange(parentId, parentNode, position);
    };
    RolesTreeViewComponent.prototype.onBeforeOpenNode = function (parentId, parentNode, position) {
        var _this = this;
        var originalIcon = !!this.jsTree.settings.types[parentNode.type] ? this.jsTree.settings.types[parentNode.type].icon : "help icon";
        this.jsTree.set_icon(parentNode, this.jsTree.settings.types.loading.icon);
        return this.getChildren(parentNode.id).then(function (children) {
            _this.emptyNode(parentId);
            if (children.length > 0) {
                children.forEach(function (childNode) { return _this.addChild(parentId, childNode, position); });
            }
        }).catch(function (error) {
            console.error(error);
            _this.onError.emit(error);
        }).then(function () {
            _this.jsTree.set_icon(parentNode, originalIcon);
        });
    };
    RolesTreeViewComponent.prototype.onChange = function (parentId, node, position) {
        var _this = this;
        this.onBeforeOpenNode(parentId, node, position).then(function () {
            if (!!node.id && !URI.Util.isAbsolute(node.id))
                node = _this.jsTree.get_node(node.children[0]);
            if (!_this.jsTree.is_open(node)) {
                _this.jsTree.open_node(node);
            }
            _this.onDoubleClickRole.emit(node.id);
        });
    };
    RolesTreeViewComponent.prototype.addChild = function (parentId, node, position) {
        this.jsTree.create_node(parentId, node, position);
    };
    RolesTreeViewComponent.prototype.emptyNode = function (nodeId) {
        var $children = this.jsTree.get_children_dom(nodeId), childElements = jQuery.makeArray($children);
        while (childElements.length > 0) {
            this.jsTree.delete_node(childElements[0]);
            childElements.splice(0, 1);
        }
    };
    RolesTreeViewComponent.prototype.showCreateRoleForm = function () {
        this.onShowCreateRoleForm.emit(true);
    };
    RolesTreeViewComponent.prototype.showDeleteRoleForm = function () {
        this.onShowDeleteRoleForm.emit(true);
    };
    return RolesTreeViewComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", App.Context)
], RolesTreeViewComponent.prototype, "appContext", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", core_1.EventEmitter)
], RolesTreeViewComponent.prototype, "refreshNode", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", core_1.EventEmitter)
], RolesTreeViewComponent.prototype, "openNode", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", core_1.EventEmitter)
], RolesTreeViewComponent.prototype, "deletedNode", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], RolesTreeViewComponent.prototype, "onError", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], RolesTreeViewComponent.prototype, "onLoading", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], RolesTreeViewComponent.prototype, "onSelectRole", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], RolesTreeViewComponent.prototype, "onDoubleClickRole", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], RolesTreeViewComponent.prototype, "onShowCreateRoleForm", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], RolesTreeViewComponent.prototype, "onShowDeleteRoleForm", void 0);
RolesTreeViewComponent = __decorate([
    core_1.Component({
        selector: "cp-roles-tree-view",
        templateUrl: "./roles-tree-view.component.html",
        styleUrls: ["./roles-tree-view.component.scss"],
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, roles_service_1.RolesService])
], RolesTreeViewComponent);
exports.RolesTreeViewComponent = RolesTreeViewComponent;
