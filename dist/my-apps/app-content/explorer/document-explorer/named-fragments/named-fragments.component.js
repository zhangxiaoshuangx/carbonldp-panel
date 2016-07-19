System.register(["@angular/core", "carbonldp/RDF/URI", "./named-fragment.component", "./../property/property.component", "jquery", "semantic-ui/semantic", "./named-fragments.component.html!", "./named-fragments.component.css!text"], function(exports_1, context_1) {
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
    var core_1, URI, named_fragment_component_1, property_component_1, jquery_1, named_fragments_component_html_1, named_fragments_component_css_text_1;
    var NamedFragmentsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (URI_1) {
                URI = URI_1;
            },
            function (named_fragment_component_1_1) {
                named_fragment_component_1 = named_fragment_component_1_1;
            },
            function (property_component_1_1) {
                property_component_1 = property_component_1_1;
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
                    this.namedFragmentsChanges = new Map();
                    this.bNodes = [];
                    this.namedFragments = [];
                    this.documentURI = "";
                    this.onChanges = new core_1.EventEmitter();
                    this.onOpenBNode = new core_1.EventEmitter();
                    this.onOpenNamedFragment = new core_1.EventEmitter();
                    this.element = element;
                }
                NamedFragmentsComponent.prototype.ngAfterContentInit = function () {
                    this.$element = jquery_1.default(this.element.nativeElement);
                    this.nodesTab = this.$element.find(".tabular.namedfragments.menu").tab();
                };
                NamedFragmentsComponent.prototype.ngOnChanges = function (changes) {
                    if ((changes["namedFragments"].currentValue !== changes["namedFragments"].previousValue)) {
                        this.openedNamedFragments = [];
                        this.goToNamedFragment("all-namedFragments");
                    }
                };
                NamedFragmentsComponent.prototype.getPropertiesName = function (property) {
                    return Object.keys(property);
                };
                NamedFragmentsComponent.prototype.notifyNamedFragmentHasChanged = function (records, namedFragment) {
                    if (typeof records === "undefined" || records === null) {
                        this.namedFragmentsChanges.delete(namedFragment["@id"]);
                        this.onChanges.emit(this.namedFragmentsChanges);
                        return;
                    }
                    if (records.changes.size > 0 || records.additions.size > 0 || records.deletions.size > 0) {
                        this.namedFragmentsChanges.set(namedFragment["@id"], records);
                    }
                    else {
                        this.namedFragmentsChanges.delete(namedFragment["@id"]);
                    }
                    this.onChanges.emit(this.namedFragmentsChanges);
                };
                NamedFragmentsComponent.prototype.openNamedFragment = function (nodeOrId) {
                    var _this = this;
                    var node;
                    if (typeof nodeOrId === "string") {
                        node = this.namedFragments.find(function (node) { return node["@id"] === nodeOrId; });
                    }
                    else {
                        node = nodeOrId;
                    }
                    if (this.openedNamedFragments.indexOf(node) === -1)
                        this.openedNamedFragments.push(node);
                    setTimeout(function () {
                        _this.refreshTabs();
                        _this.goToNamedFragment("namedfragment_" + _this.getNormalizedUri(node["@id"]));
                    }, 50);
                };
                NamedFragmentsComponent.prototype.openBNode = function (id) {
                    this.onOpenBNode.emit(id);
                };
                NamedFragmentsComponent.prototype.goToNamedFragment = function (id) {
                    if (!this.nodesTab)
                        return;
                    this.nodesTab.find("> [data-tab='" + id + "']").click();
                    this.onOpenNamedFragment.emit("namedFragments");
                };
                NamedFragmentsComponent.prototype.closeNamedFragment = function (namedFragment) {
                    var idx = this.openedNamedFragments.indexOf(namedFragment);
                    this.openedNamedFragments.splice(idx, 1);
                    this.goToNamedFragment("all-namedFragments");
                    if (this.namedFragmentsChanges.has(namedFragment["@id"]))
                        this.notifyNamedFragmentHasChanged(null, namedFragment);
                };
                NamedFragmentsComponent.prototype.refreshTabs = function () {
                    this.nodesTab.find(">.item").tab();
                };
                NamedFragmentsComponent.prototype.getNormalizedUri = function (uri) {
                    return uri.replace(/[^\w\s]/gi, "");
                };
                NamedFragmentsComponent.prototype.getSlug = function (uri) {
                    return URI.Util.getSlug(uri);
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], NamedFragmentsComponent.prototype, "bNodes", void 0);
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
                ], NamedFragmentsComponent.prototype, "onOpenBNode", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], NamedFragmentsComponent.prototype, "onOpenNamedFragment", void 0);
                NamedFragmentsComponent = __decorate([
                    core_1.Component({
                        selector: "cp-named-fragments",
                        template: named_fragments_component_html_1.default,
                        styles: [named_fragments_component_css_text_1.default],
                        directives: [property_component_1.PropertyComponent, named_fragment_component_1.NamedFragmentComponent],
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], NamedFragmentsComponent);
                return NamedFragmentsComponent;
            }());
            exports_1("NamedFragmentsComponent", NamedFragmentsComponent);
            exports_1("default",NamedFragmentsComponent);
        }
    }
});

//# sourceMappingURL=named-fragments.component.js.map
