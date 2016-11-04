System.register(["@angular/core"], function(exports_1, context_1) {
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
    var core_1;
    var CollapsibleTitleDirective, CollapsibleContentDirective, CollapsibleDirective;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            CollapsibleTitleDirective = (function () {
                function CollapsibleTitleDirective(element) {
                    this.active = false;
                    this.element = element;
                }
                __decorate([
                    core_1.HostBinding("class.active"), 
                    __metadata('design:type', Boolean)
                ], CollapsibleTitleDirective.prototype, "active", void 0);
                CollapsibleTitleDirective = __decorate([
                    core_1.Directive({
                        selector: ".title"
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], CollapsibleTitleDirective);
                return CollapsibleTitleDirective;
            }());
            exports_1("CollapsibleTitleDirective", CollapsibleTitleDirective);
            CollapsibleContentDirective = (function () {
                function CollapsibleContentDirective() {
                    this.active = false;
                }
                __decorate([
                    core_1.HostBinding("class.active"), 
                    __metadata('design:type', Boolean)
                ], CollapsibleContentDirective.prototype, "active", void 0);
                CollapsibleContentDirective = __decorate([
                    core_1.Directive({
                        selector: ".content"
                    }), 
                    __metadata('design:paramtypes', [])
                ], CollapsibleContentDirective);
                return CollapsibleContentDirective;
            }());
            exports_1("CollapsibleContentDirective", CollapsibleContentDirective);
            CollapsibleDirective = (function () {
                function CollapsibleDirective(element) {
                    this.activeChange = new core_1.EventEmitter();
                    this._activeJustChanged = false;
                    this.element = element;
                }
                Object.defineProperty(CollapsibleDirective.prototype, "active", {
                    get: function () {
                        return this.content ? this.content.active : this._active;
                    },
                    set: function (active) {
                        if (active === this._active && this._activeJustChanged) {
                            this._activeJustChanged = false;
                            return;
                        }
                        this._active = active;
                        if (this.content)
                            this.content.active = active;
                        if (this.title)
                            this.title.active = active;
                        this._activeJustChanged = true;
                        this.activeChange.emit(active);
                    },
                    enumerable: true,
                    configurable: true
                });
                CollapsibleDirective.prototype.ngAfterContentInit = function () {
                    this.content.active = this._active;
                    this.title.active = this._active;
                };
                CollapsibleDirective.prototype.onClick = function (event) {
                    var titleChildren = this.title.element.nativeElement.children;
                    for (var i = 0; i <= titleChildren.length; i++) {
                        if (event.target === titleChildren[i]) {
                            this.toggleContent();
                            return;
                        }
                    }
                    if (event.target === this.element.nativeElement || event.target === this.title.element.nativeElement)
                        this.toggleContent();
                };
                CollapsibleDirective.prototype.toggleContent = function () {
                    this.active = !this.active;
                };
                __decorate([
                    core_1.ContentChild(CollapsibleContentDirective), 
                    __metadata('design:type', CollapsibleContentDirective)
                ], CollapsibleDirective.prototype, "content", void 0);
                __decorate([
                    core_1.ContentChild(CollapsibleTitleDirective), 
                    __metadata('design:type', CollapsibleTitleDirective)
                ], CollapsibleDirective.prototype, "title", void 0);
                __decorate([
                    core_1.Output("suiActiveChange"), 
                    __metadata('design:type', core_1.EventEmitter)
                ], CollapsibleDirective.prototype, "activeChange", void 0);
                __decorate([
                    core_1.Input("suiActive"), 
                    __metadata('design:type', Boolean)
                ], CollapsibleDirective.prototype, "active", null);
                __decorate([
                    core_1.HostListener("click", ["$event"]), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', [MouseEvent]), 
                    __metadata('design:returntype', void 0)
                ], CollapsibleDirective.prototype, "onClick", null);
                CollapsibleDirective = __decorate([
                    core_1.Directive({
                        selector: "[suiCollapsible]"
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], CollapsibleDirective);
                return CollapsibleDirective;
            }());
            exports_1("CollapsibleDirective", CollapsibleDirective);
            exports_1("default",CollapsibleDirective);
        }
    }
});

//# sourceMappingURL=collapsible.directive.js.map
