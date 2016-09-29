System.register(["@angular/core", "carbonldp/RDF/URI", "jquery", "semantic-ui/semantic", "./named-fragments.component.html!", "./named-fragments.component.css!text"], function(exports_1, context_1) {
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
    var core_1, URI, jquery_1, named_fragments_component_html_1, named_fragments_component_css_text_1;
    var NamedFragmentsComponent, NamedFragmentsRecords;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (URI_1) {
                URI = URI_1;
            },
            function (jquery_1_1) {
                jquery_1 = jquery_1_1;
            },
            function (_1) {},
            function (named_fragments_component_html_1_1) {
                named_fragments_component_html_1 = named_fragments_component_html_1_1;
            },
            function (named_fragments_component_css_text_1_1) {
                named_fragments_component_css_text_1 = named_fragments_component_css_text_1_1;
            }],
        execute: function() {
            NamedFragmentsComponent = (function () {
                function NamedFragmentsComponent(element) {
                    this.openedNamedFragments = [];
                    this.namedFragmentsRecords = new NamedFragmentsRecords();
                    this.blankNodes = [];
                    this.namedFragments = [];
                    this.documentURI = "";
                    this.onChanges = new core_1.EventEmitter();
                    this.onOpenBlankNode = new core_1.EventEmitter();
                    this.onOpenNamedFragment = new core_1.EventEmitter();
                    this.element = element;
                }
                NamedFragmentsComponent.prototype.ngAfterViewInit = function () {
                    this.$element = jquery_1.default(this.element.nativeElement);
                    this.nodesTab = this.$element.find(".tabular.named-fragments.menu");
                    this.initializeDeletionDimmer();
                };
                NamedFragmentsComponent.prototype.ngOnChanges = function (changes) {
                    if ((changes["namedFragments"].currentValue !== changes["namedFragments"].previousValue)) {
                        this.openedNamedFragments = [];
                        this.goToNamedFragment("all-namedFragments");
                        this.namedFragmentsRecords.clear();
                    }
                };
                NamedFragmentsComponent.prototype.openNamedFragment = function (nodeOrId) {
                    var _this = this;
                    var node;
                    if (typeof nodeOrId === "string") {
                        node = this.namedFragments.find(function (node) { return node.name === nodeOrId; });
                    }
                    else {
                        node = nodeOrId;
                    }
                    if (this.openedNamedFragments.indexOf(node) === -1)
                        this.openedNamedFragments.push(node);
                    setTimeout(function () {
                        _this.refreshTabs();
                        _this.goToNamedFragment("named-fragment_" + _this.getNormalizedUri(node.name));
                    }, 50);
                };
                NamedFragmentsComponent.prototype.openBlankNode = function (id) {
                    this.onOpenBlankNode.emit(id);
                };
                NamedFragmentsComponent.prototype.goToNamedFragment = function (id) {
                    if (!this.nodesTab)
                        return;
                    this.nodesTab.find("> [data-tab='" + id + "']").click();
                    this.onOpenNamedFragment.emit("namedFragments");
                };
                NamedFragmentsComponent.prototype.closeNamedFragment = function (namedFragment, index) {
                    this.openedNamedFragments.splice(index, 1);
                    this.goToNamedFragment("all-namedFragments");
                };
                NamedFragmentsComponent.prototype.refreshTabs = function () {
                    var items = this.nodesTab.find(">.item");
                    items.removeData();
                    // The destroy is because JQuery uses a cache version of all data attributes. So we need to clear the data attributes to get the new tabs ids.
                    items.tab("destroy");
                    items.tab();
                };
                NamedFragmentsComponent.prototype.getNormalizedUri = function (uri) {
                    return uri.replace(/[^\w\s]/gi, "");
                };
                NamedFragmentsComponent.prototype.getSlug = function (uri) {
                    return URI.Util.getSlug(uri);
                };
                NamedFragmentsComponent.prototype.changeNamedFragment = function (namedFragmentRow, index) {
                    if (typeof this.namedFragmentsRecords === "undefined")
                        this.namedFragmentsRecords = new NamedFragmentsRecords();
                    if (typeof namedFragmentRow.modified !== "undefined") {
                        this.namedFragmentsRecords.changes.set(namedFragmentRow.id, namedFragmentRow);
                    }
                    else if (typeof namedFragmentRow.added === "undefined") {
                        this.namedFragmentsRecords.changes.delete(namedFragmentRow.id);
                    }
                    this.refreshTabs();
                    this.onChanges.emit(this.namedFragmentsRecords);
                };
                NamedFragmentsComponent.prototype.deleteNamedFragment = function (namedFragmentRow, index) {
                    index = this.openedNamedFragments.indexOf(namedFragmentRow);
                    this.openedNamedFragments.splice(index, 1);
                    if (typeof this.namedFragmentsRecords === "undefined")
                        this.namedFragmentsRecords = new NamedFragmentsRecords();
                    if (typeof namedFragmentRow.added !== "undefined") {
                        this.namedFragmentsRecords.additions.delete(namedFragmentRow.id);
                    }
                    else if (typeof namedFragmentRow.modified !== "undefined") {
                        this.namedFragmentsRecords.changes.delete(namedFragmentRow.id);
                        this.namedFragmentsRecords.deletions.set(namedFragmentRow.id, namedFragmentRow);
                    }
                    else {
                        this.namedFragmentsRecords.deletions.set(namedFragmentRow.id, namedFragmentRow);
                    }
                    index = this.namedFragments.indexOf(namedFragmentRow);
                    this.namedFragments.splice(index, 1);
                    this.refreshTabs();
                    this.onChanges.emit(this.namedFragmentsRecords);
                };
                NamedFragmentsComponent.prototype.createNamedFragment = function () {
                    var newName = this.documentURI + "#New-Fragment-Name-";
                    var newFragments = this.namedFragments.filter(function (namedFragment) { return namedFragment.name.startsWith(newName); });
                    var id = newName + (newFragments.length + 1);
                    var newNamedFragment = {
                        id: id,
                        name: id,
                        copy: {
                            "@id": id
                        }
                    };
                    newNamedFragment.added = newNamedFragment.copy;
                    this.namedFragments.splice(0, 0, newNamedFragment);
                    this.namedFragmentsRecords.additions.set(id, newNamedFragment);
                    this.refreshTabs();
                    this.onChanges.emit(this.namedFragmentsRecords);
                    this.openNamedFragment(id);
                };
                NamedFragmentsComponent.prototype.initializeDeletionDimmer = function () {
                    this.$element.find(".confirm-deletion.dimmer").dimmer({ closable: false });
                };
                NamedFragmentsComponent.prototype.askToConfirmDeletion = function (clickEvent, blankNode) {
                    clickEvent.stopPropagation();
                    this.askingDeletionNamedFragment = blankNode;
                    this.$element.find(".confirm-deletion.dimmer").dimmer("show");
                };
                NamedFragmentsComponent.prototype.confirmDeletion = function () {
                    this.deleteNamedFragment(this.askingDeletionNamedFragment);
                    this.$element.find(".confirm-deletion.dimmer").dimmer("hide");
                };
                NamedFragmentsComponent.prototype.cancelDeletion = function () {
                    this.askingDeletionNamedFragment = null;
                    this.$element.find(".confirm-deletion.dimmer").dimmer("hide");
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], NamedFragmentsComponent.prototype, "blankNodes", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], NamedFragmentsComponent.prototype, "namedFragments", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], NamedFragmentsComponent.prototype, "documentURI", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], NamedFragmentsComponent.prototype, "onChanges", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], NamedFragmentsComponent.prototype, "onOpenBlankNode", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], NamedFragmentsComponent.prototype, "onOpenNamedFragment", void 0);
                NamedFragmentsComponent = __decorate([
                    core_1.Component({
                        selector: "cp-named-fragments",
                        template: named_fragments_component_html_1.default,
                        styles: [named_fragments_component_css_text_1.default],
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], NamedFragmentsComponent);
                return NamedFragmentsComponent;
            }());
            exports_1("NamedFragmentsComponent", NamedFragmentsComponent);
            NamedFragmentsRecords = (function () {
                function NamedFragmentsRecords() {
                    this.changes = new Map();
                    this.deletions = new Map();
                    this.additions = new Map();
                }
                NamedFragmentsRecords.prototype.clear = function () {
                    this.changes.clear();
                    this.deletions.clear();
                    this.additions.clear();
                };
                return NamedFragmentsRecords;
            }());
            exports_1("NamedFragmentsRecords", NamedFragmentsRecords);
            exports_1("default",NamedFragmentsComponent);
        }
    }
});

//# sourceMappingURL=named-fragments.component.js.map