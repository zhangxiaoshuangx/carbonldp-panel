System.register(["@angular/core", "carbonldp/App", "carbonldp/Auth/Agent", "carbonldp/Auth/PersistedAgent", "carbonldp/RDF", "../agents.service", "../../roles/roles.service", "carbonldp-panel/document-explorer/document-explorer-library", "carbonldp-panel/messages-area/error/error-message-generator", "./agent-details.component.html!", "./agent-details.component.css!text"], function(exports_1, context_1) {
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
    var core_1, App, Agent, PersistedAgent, RDF, agents_service_1, roles_service_1, document_explorer_library_1, error_message_generator_1, agent_details_component_html_1, agent_details_component_css_text_1;
    var AgentDetailsComponent, Modes;
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
            function (PersistedAgent_1) {
                PersistedAgent = PersistedAgent_1;
            },
            function (RDF_1) {
                RDF = RDF_1;
            },
            function (agents_service_1_1) {
                agents_service_1 = agents_service_1_1;
            },
            function (roles_service_1_1) {
                roles_service_1 = roles_service_1_1;
            },
            function (document_explorer_library_1_1) {
                document_explorer_library_1 = document_explorer_library_1_1;
            },
            function (error_message_generator_1_1) {
                error_message_generator_1 = error_message_generator_1_1;
            },
            function (agent_details_component_html_1_1) {
                agent_details_component_html_1 = agent_details_component_html_1_1;
            },
            function (agent_details_component_css_text_1_1) {
                agent_details_component_css_text_1 = agent_details_component_css_text_1_1;
            }],
        execute: function() {
            AgentDetailsComponent = (function () {
                function AgentDetailsComponent(element, agentsService, rolesService) {
                    this.Modes = Modes;
                    this.agentRoles = [];
                    this.availableRoles = [];
                    this.displaySuccessMessage = false;
                    this.mode = Modes.READ;
                    this.canClose = true;
                    this.onClose = new core_1.EventEmitter();
                    this.onSuccess = new core_1.EventEmitter();
                    this.onError = new core_1.EventEmitter();
                    this.agentFormModel = {
                        slug: "",
                        name: "",
                        email: "",
                        roles: [],
                        password: "",
                        repeatPassword: "",
                        enabled: false,
                    };
                    this.element = element;
                    this.$element = $(element.nativeElement);
                    this.agentsService = agentsService;
                    this.rolesService = rolesService;
                }
                AgentDetailsComponent.prototype.ngAfterViewInit = function () {
                    var _this = this;
                    this.getRoles(this.agent).then(function (roles) {
                        roles.forEach(function (role) {
                            _this.availableRoles.push(role.id);
                        });
                    });
                    this.$element.find(".enabled.checkbox").checkbox();
                };
                AgentDetailsComponent.prototype.ngOnChanges = function (changes) {
                    if (!!changes["agent"] && changes["agent"].currentValue !== changes["agent"].previousValue) {
                        if (this.mode === Modes.CREATE && !this.agent) {
                            this.agent = Agent.Factory.create("New Agent Name", "new-agent@mail.com", "password");
                        }
                        this.changeAgent(this.agent);
                    }
                };
                AgentDetailsComponent.prototype.changeAgent = function (newAgent) {
                    var _this = this;
                    this.agent = newAgent;
                    var agentSlug = RDF.URI.Util.getSlug(this.agent.id);
                    if (this.mode === Modes.CREATE) {
                        agentSlug = "new-agent-name";
                    }
                    this.agentFormModel.slug = this.getSanitizedSlug(agentSlug);
                    this.agentFormModel.name = this.agent.name;
                    this.agentFormModel.email = this.agent.email;
                    this.agentFormModel.roles = [];
                    this.agentFormModel.password = "";
                    this.agentFormModel.repeatPassword = "";
                    this.agentFormModel.enabled = this.mode === Modes.CREATE ? true : this.agent.enabled;
                    this.getRoles(this.agent).then(function (roles) {
                        roles.forEach(function (role) {
                            _this.agentFormModel.roles.push(role.id);
                        });
                        _this.agentRoles = roles;
                    });
                };
                AgentDetailsComponent.prototype.getRoles = function (agent) {
                    if (!agent)
                        return this.rolesService.getAll(this.appContext);
                    return this.rolesService.getAll(this.appContext).then(function (appRoles) {
                        return appRoles.filter(function (role) {
                            return !role.agents ? false : role.agents.some(function (listedAgent) { return listedAgent.id === agent.id; });
                        });
                    });
                };
                AgentDetailsComponent.prototype.changeMode = function (mode) {
                    this.mode = mode;
                };
                AgentDetailsComponent.prototype.changeRoles = function (selectedRoles) {
                    var _this = this;
                    this.agentFormModel.roles = [];
                    selectedRoles.forEach(function (selectedRole) {
                        _this.agentFormModel.roles.push(selectedRole.id);
                    });
                };
                AgentDetailsComponent.prototype.cancelForm = function () {
                    this.changeAgent(this.agent);
                    if (this.mode === Modes.CREATE) {
                        this.close();
                    }
                    else {
                        this.mode = Modes.READ;
                    }
                };
                AgentDetailsComponent.prototype.onSubmit = function (data, $event) {
                    $event.preventDefault();
                    switch (this.mode) {
                        case Modes.EDIT:
                            this.editAgent(this.agent, data);
                            break;
                        case Modes.CREATE:
                            this.createAgent(this.agent, data);
                            break;
                    }
                };
                AgentDetailsComponent.prototype.editAgent = function (agent, agentData) {
                    var _this = this;
                    agent.email = agentData.email;
                    agent.name = agentData.name;
                    agent.password = agentData.password.trim().length > 0 ? agentData.password : agent.password;
                    agent.enabled = agentData.enabled;
                    this.agentsService.saveAndRefreshAgent(this.appContext, agent).then(function (_a) {
                        var updatedAgent = _a[0], _b = _a[1], saveResponse = _b[0], refreshResponse = _b[1];
                        return _this.editAgentRoles(agent, agentData.roles);
                    }).then(function () {
                        _this.displaySuccessMessage = true;
                        _this.onSuccess.emit(true);
                        _this.cancelForm();
                    }).catch(function (error) {
                        _this.errorMessage = error_message_generator_1.ErrorMessageGenerator.getErrorMessage(error);
                        if (typeof error.name !== "undefined")
                            _this.errorMessage.title = error.name;
                        _this.onError.emit(true);
                    });
                };
                AgentDetailsComponent.prototype.createAgent = function (agent, agentData) {
                    var _this = this;
                    agent.email = agentData.email;
                    agent.name = agentData.name;
                    agent.password = agentData.password;
                    agent.enabled = agentData.enabled;
                    this.agentsService.createAgent(this.appContext, agent, agentData.slug).then(function (_a) {
                        var updatedAgent = _a[0], response = _a[1];
                        return _this.editAgentRoles(agent, agentData.roles);
                    }).then(function () {
                        _this.displaySuccessMessage = true;
                        _this.emitOnSuccessAfter(5);
                    }).catch(function (error) {
                        _this.errorMessage = error_message_generator_1.ErrorMessageGenerator.getErrorMessage(error);
                        if (typeof error.name !== "undefined")
                            _this.errorMessage.title = error.name;
                        _this.onError.emit(true);
                    });
                };
                AgentDetailsComponent.prototype.emitOnSuccessAfter = function (seconds) {
                    var _this = this;
                    this.timer = seconds;
                    var countDown = setInterval(function () {
                        _this.timer--;
                        if (_this.timer === 0) {
                            _this.onSuccess.emit(true);
                            _this.timer = null;
                            clearInterval(countDown);
                            return false;
                        }
                    }, 1000);
                };
                AgentDetailsComponent.prototype.getSanitizedSlug = function (slug) {
                    return document_explorer_library_1.DocumentExplorerLibrary.getSanitizedSlug(slug);
                };
                AgentDetailsComponent.prototype.slugLostFocus = function (evt) {
                    evt.target.value = document_explorer_library_1.DocumentExplorerLibrary.getAppendedSlashSlug(evt.target.value);
                };
                AgentDetailsComponent.prototype.editAgentRoles = function (agent, selectedRoles) {
                    var _this = this;
                    var removedRoles = this.getRemovedRoles(selectedRoles), promises = [];
                    selectedRoles.forEach(function (roleID, idx, roles) {
                        promises.push(_this.registerAgentToRole(agent.id, roleID));
                    });
                    removedRoles.forEach(function (roleID, idx, roles) {
                        promises.push(_this.removeAgentFromRole(agent.id, roleID));
                    });
                    return Promise.all(promises).catch(function (error) {
                        var generatedMessage = error_message_generator_1.ErrorMessageGenerator.getErrorMessage(error), finalError = new Error("The agent was saved but an error occurred while trying to persist its roles: " + generatedMessage.content);
                        finalError.name = "Agent Saved";
                        throw finalError;
                    });
                };
                AgentDetailsComponent.prototype.getRemovedRoles = function (selectedRoles) {
                    return this.agentRoles.filter(function (agentRole) {
                        return !selectedRoles.some(function (selectedRole) {
                            return selectedRole === agentRole.id;
                        });
                    }).map(function (removedRole) {
                        return removedRole.id;
                    });
                };
                AgentDetailsComponent.prototype.registerAgentToRole = function (agentID, roleID) {
                    return this.rolesService.registerAgent(this.appContext, agentID, roleID);
                };
                AgentDetailsComponent.prototype.removeAgentFromRole = function (agentID, roleID) {
                    return this.rolesService.removeAgent(this.appContext, agentID, roleID);
                };
                AgentDetailsComponent.prototype.close = function () {
                    this.onClose.emit(true);
                };
                AgentDetailsComponent.prototype.closeError = function () {
                    this.errorMessage = null;
                };
                AgentDetailsComponent.prototype.closeSuccessMessage = function (event, messageDiv) {
                    var _this = this;
                    $(messageDiv).transition({
                        animation: "fade",
                        onComplete: function () { _this.displaySuccessMessage = false; }
                    });
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], AgentDetailsComponent.prototype, "mode", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], AgentDetailsComponent.prototype, "agent", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', App.Context)
                ], AgentDetailsComponent.prototype, "appContext", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], AgentDetailsComponent.prototype, "canClose", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], AgentDetailsComponent.prototype, "onClose", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], AgentDetailsComponent.prototype, "onSuccess", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], AgentDetailsComponent.prototype, "onError", void 0);
                AgentDetailsComponent = __decorate([
                    core_1.Component({
                        selector: "cp-agent-details",
                        template: agent_details_component_html_1.default,
                        styles: [agent_details_component_css_text_1.default],
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef, agents_service_1.AgentsService, roles_service_1.RolesService])
                ], AgentDetailsComponent);
                return AgentDetailsComponent;
            }());
            exports_1("AgentDetailsComponent", AgentDetailsComponent);
            Modes = (function () {
                function Modes() {
                }
                Modes.READ = "READ";
                Modes.EDIT = "EDIT";
                Modes.CREATE = "CREATE";
                return Modes;
            }());
            exports_1("Modes", Modes);
            exports_1("default",AgentDetailsComponent);
        }
    }
});

//# sourceMappingURL=agent-details.component.js.map
