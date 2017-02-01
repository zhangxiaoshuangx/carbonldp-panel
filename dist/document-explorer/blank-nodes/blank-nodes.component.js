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
var Utils = require("carbonldp/Utils");
var jquery_1 = require("jquery");
require("semantic-ui/semantic");
var BlankNodesComponent = (function () {
    function BlankNodesComponent(element) {
        this.openedBlankNodes = [];
        this.blankNodesRecords = new BlankNodesRecords();
        this.blankNodes = [];
        this.namedFragments = [];
        this.documentURI = "";
        this.onChanges = new core_1.EventEmitter();
        this.onOpenBlankNode = new core_1.EventEmitter();
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
        this.onOpenBlankNode.emit("bNodes");
    };
    BlankNodesComponent.prototype.closeBlankNode = function (blankNode, index) {
        this.openedBlankNodes.splice(index, 1);
        this.goToBlankNode("all");
    };
    BlankNodesComponent.prototype.getShortId = function (id) {
        if (!id)
            return;
        return id.substr(0, id.indexOf("-")) + "...";
    };
    BlankNodesComponent.prototype.refreshTabs = function () {
        this.nodesTab.find(">.item").tab();
    };
    BlankNodesComponent.prototype.escape = function (value) {
        return value === "all" ? value : value.substr(value.indexOf("_:") + 2);
    };
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
        index = this.openedBlankNodes.indexOf(blankNodeRow);
        this.openedBlankNodes.splice(index, 1);
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
            copy: {
                "@id": id,
                "https://carbonldp.com/ns/v1/platform#bNodeIdentifier": [{ "@value": bNodeIdentifier }]
            }
        };
        newBlankNode.added = newBlankNode.copy;
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
    ], BlankNodesComponent.prototype, "onOpenBlankNode", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], BlankNodesComponent.prototype, "onOpenNamedFragment", void 0);
    BlankNodesComponent = __decorate([
        core_1.Component({
            selector: "cp-blank-nodes",
            templateUrl: "./blank-nodes.component.html",
            styleUrls: ["./blank-nodes.component.scss"],
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], BlankNodesComponent);
    return BlankNodesComponent;
}());
exports.BlankNodesComponent = BlankNodesComponent;
var BlankNodesRecords = (function () {
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
exports.BlankNodesRecords = BlankNodesRecords;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BlankNodesComponent;

//# sourceMappingURL=blank-nodes.component.js.map
