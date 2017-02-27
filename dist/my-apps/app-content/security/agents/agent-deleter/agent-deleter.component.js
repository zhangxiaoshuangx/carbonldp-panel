System.register(["@angular/core", "carbonldp/App", "carbonldp/Auth/Agent", "carbonldp-panel/messages-area/error/error-message-generator", "../agents.service", "semantic-ui/semantic", "./agent-deleter.component.html!", "./agent-deleter.component.css!text"], function(exports_1, context_1) {
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
    var core_1, App, Agent, error_message_generator_1, agents_service_1, agent_deleter_component_html_1, agent_deleter_component_css_text_1;
    var AgentDeleterComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (App_1) {
                App = App_1;
            },
            function (Agent_1) {
                Agent = Agent_1;
            },
            function (error_message_generator_1_1) {
                error_message_generator_1 = error_message_generator_1_1;
            },
            function (agents_service_1_1) {
                agents_service_1 = agents_service_1_1;
            },
            function (_1) {},
            function (agent_deleter_component_html_1_1) {
                agent_deleter_component_html_1 = agent_deleter_component_html_1_1;
            },
            function (agent_deleter_component_css_text_1_1) {
                agent_deleter_component_css_text_1 = agent_deleter_component_css_text_1_1;
            }],
        execute: function() {
            AgentDeleterComponent = (function () {
                function AgentDeleterComponent(element, agentsService) {
                    this.deletingAgent = false;
                    this.onSuccess = new core_1.EventEmitter();
                    this.onError = new core_1.EventEmitter();
                    this.element = element;
                    this.agentsService = agentsService;
                }
                AgentDeleterComponent.prototype.ngAfterViewInit = function () {
                    this.$element = $(this.element.nativeElement);
                    this.$deleteAgentModal = this.$element.find(".delete.agent.modal").modal({
                        closable: false,
                        blurring: true,
                        onApprove: function () { return false; },
                    });
                };
                AgentDeleterComponent.prototype.onSubmitDeleteAgent = function () {
                    var _this = this;
                    this.deletingAgent = true;
                    this.agentsService.deleteAgent(this.context, this.agent).then(function (result) {
                        _this.onSuccess.emit(_this.deletingAgent);
                        _this.hide();
                    }).catch(function (error) {
                        _this.onError.emit(error);
                        _this.errorMessage = error_message_generator_1.ErrorMessageGenerator.getErrorMessage(error);
                    }).then(function () {
                        _this.deletingAgent = false;
                    });
                };
                AgentDeleterComponent.prototype.clearErrorMessage = function () {
                    this.errorMessage = null;
                };
                AgentDeleterComponent.prototype.show = function () {
                    this.$deleteAgentModal.modal("show");
                };
                AgentDeleterComponent.prototype.hide = function () {
                    this.hideDeleteAgentForm();
                };
                AgentDeleterComponent.prototype.hideDeleteAgentForm = function () {
                    this.$deleteAgentModal.modal("hide");
                    this.clearErrorMessage();
                };
                AgentDeleterComponent.prototype.toggle = function () {
                    this.$deleteAgentModal.modal("toggle");
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', App.Context)
                ], AgentDeleterComponent.prototype, "context", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], AgentDeleterComponent.prototype, "agent", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], AgentDeleterComponent.prototype, "onSuccess", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], AgentDeleterComponent.prototype, "onError", void 0);
                AgentDeleterComponent = __decorate([
                    core_1.Component({
                        selector: "cp-agent-deleter",
                        template: agent_deleter_component_html_1.default,
                        styles: [agent_deleter_component_css_text_1.default],
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef, agents_service_1.AgentsService])
                ], AgentDeleterComponent);
                return AgentDeleterComponent;
            }());
            exports_1("AgentDeleterComponent", AgentDeleterComponent);
            exports_1("default",AgentDeleterComponent);
        }
    }
});

//# sourceMappingURL=agent-deleter.component.js.map
