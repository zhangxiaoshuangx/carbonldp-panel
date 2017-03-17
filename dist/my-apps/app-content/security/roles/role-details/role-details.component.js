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
var Role = require("carbonldp/App/Role");
var PersistedRole = require("carbonldp/App/PersistedRole");
var NS = require("carbonldp/NS");
var roles_service_1 = require("./../roles.service");
var document_explorer_library_1 = require("carbonldp-panel/document-explorer/document-explorer-library");
var message_component_1 = require("carbonldp-panel/messages-area/message.component");
var error_message_generator_1 = require("carbonldp-panel/messages-area/error/error-message-generator");
var messages_area_service_1 = require("carbonldp-panel/messages-area/messages-area.service");
var RoleDetailsComponent = (function () {
    function RoleDetailsComponent(element, rolesService, messagesAreaService) {
        this.roleAgents = [];
        this.Modes = Modes;
        this.roleFormModel = {
            slug: "",
            name: "",
            description: "",
            parentRole: "",
            agents: [],
        };
        this.activeTab = "details";
        this.displaySuccessMessage = false;
        this.mustAddParent = false;
        this.embedded = true;
        this.mode = Modes.READ;
        this.role = Role.Factory.create("New Role");
        this.onClose = new core_1.EventEmitter();
        this.onSuccess = new core_1.EventEmitter();
        this.onError = new core_1.EventEmitter();
        this.element = element;
        this.$element = $(this.element.nativeElement);
        this.rolesService = rolesService;
        this.messagesAreaService = messagesAreaService;
    }
    RoleDetailsComponent.prototype.ngAfterViewInit = function () { };
    RoleDetailsComponent.prototype.ngOnChanges = function (changes) {
        if (changes["role"] && !!changes["role"].currentValue && changes["role"].currentValue !== changes["role"].previousValue) {
            this.changeRole(this.role);
        }
    };
    RoleDetailsComponent.prototype.changeRole = function (role) {
        var _this = this;
        this.mode = Modes.READ;
        this.displaySuccessMessage = false;
        this.errorMessage = null;
        this.roleFormModel.slug = this.getSanitizedSlug(role.id);
        this.roleFormModel.name = role.name;
        this.roleFormModel.description = role[NS.CS.Predicate.description];
        this.roleFormModel.parentRole = !!role.parentRole ? role.parentRole.id : null;
        this.mustAddParent = (!this.role.id.endsWith("roles/app-admin/") && !this.role.parentRole);
        this.getAgents(this.role).then(function (agents) {
            _this.roleAgents = [];
            _this.roleAgents = agents;
            _this.roleFormModel.agents = agents.slice();
        });
        if (!!this.role.parentRole) {
            this.getRole(this.role.parentRole.id).then(function (parentRole) {
                _this.parentRole = parentRole;
            });
        }
    };
    RoleDetailsComponent.prototype.changeMode = function (mode) {
        this.mode = mode;
    };
    RoleDetailsComponent.prototype.onSubmit = function (data, $event) {
        $event.preventDefault();
        switch (this.mode) {
            case Modes.EDIT:
                this.editRole(this.role, data);
                break;
            case Modes.CREATE:
                this.createRole(this.role, data);
                break;
        }
    };
    RoleDetailsComponent.prototype.editRole = function (role, roleData) {
        var _this = this;
        role.name = roleData.name;
        role[NS.CS.Predicate.description] = roleData.description;
        this.rolesService.saveAndRefresh(this.appContext, role).then(function (_a) {
            var updatedRole = _a[0], _b = _a[1], saveResponse = _b[0], refreshResponse = _b[1];
            return _this.editRoleAgents(role, roleData.agents);
        }).then(function () {
            return !role.parentRole ? _this.parentRole.addMember(role) : new Promise(function (resolve, reject) { resolve(_this.parentRole); });
        }).then(function () {
            return role.refresh();
        }).then(function () {
            _this.onSuccess.emit(_this.role.id);
            _this.cancelForm();
            _this.displaySuccessMessage = true;
        }).catch(function (error) {
            _this.errorMessage = error_message_generator_1.ErrorMessageGenerator.getErrorMessage(error);
            if (typeof error.name !== "undefined")
                _this.errorMessage.title = error.name;
            _this.onError.emit(true);
        });
    };
    RoleDetailsComponent.prototype.createRole = function (role, roleData) {
        var _this = this;
        role.name = roleData.name;
        role[NS.CS.Predicate.description] = roleData.description;
        this.rolesService.create(this.appContext, this.selectedRole, this.role, roleData.slug).then(function (persistedRole) {
            return _this.editRoleAgents(persistedRole, roleData.agents);
        }).then(function (persistedRole) {
            _this.onSuccess.emit(_this.role.id);
            _this.cancelForm();
            var successMessage = {
                title: "The role was created correctly.",
                content: "The role was create correctly.",
                type: message_component_1.Types.SUCCESS,
                duration: 4000,
            };
            _this.messagesAreaService.addMessage(successMessage);
        }).catch(function (error) {
            _this.errorMessage = error_message_generator_1.ErrorMessageGenerator.getErrorMessage(error);
            if (typeof error.name !== "undefined")
                _this.errorMessage.title = error.name;
            _this.onError.emit(true);
        });
    };
    RoleDetailsComponent.prototype.getAgents = function (role) {
        var _this = this;
        var promises = [], agents = [];
        if (typeof role.agents === "undefined")
            return Promise.resolve(agents);
        role.agents.forEach(function (agentPointer) {
            promises.push(agentPointer.resolve());
        });
        return Promise.all(promises).then(function (resolvedAgents) {
            resolvedAgents.forEach(function (_a) {
                var resolvedAgent = _a[0], response = _a[1];
                if (resolvedAgent.id.indexOf(_this.appContext.getBaseURI()) !== -1)
                    agents.push(resolvedAgent);
            });
            return agents;
        });
    };
    RoleDetailsComponent.prototype.getRole = function (roleID) {
        return this.rolesService.get(roleID, this.appContext);
    };
    RoleDetailsComponent.prototype.editRoleAgents = function (role, selectedAgents) {
        var _this = this;
        var promises = [], removedAgents = this.getRemovedAgents(selectedAgents);
        selectedAgents.forEach(function (agent) {
            promises.push(_this.registerAgentToRole(agent.id, role.id));
        });
        removedAgents.forEach(function (agent) {
            promises.push(_this.removeAgentFromRole(agent.id, role.id));
        });
        return Promise.all(promises).catch(function (error) {
            var generatedMessage = error_message_generator_1.ErrorMessageGenerator.getErrorMessage(error), finalError = new Error("The role details were saved but an error occurred while trying to persist the agents: " + generatedMessage.content);
            finalError.name = "Agent Saved";
            throw finalError;
        });
    };
    RoleDetailsComponent.prototype.getRemovedAgents = function (selectedAgents) {
        return this.roleAgents.filter(function (roleAgent) {
            return !selectedAgents.some(function (selectedAgent) { return selectedAgent.id === roleAgent.id; });
        }).map(function (removedAgent) {
            return removedAgent;
        });
    };
    RoleDetailsComponent.prototype.registerAgentToRole = function (agentID, roleID) {
        return this.rolesService.registerAgent(this.appContext, agentID, roleID);
    };
    RoleDetailsComponent.prototype.removeAgentFromRole = function (agentID, roleID) {
        return this.rolesService.removeAgent(this.appContext, agentID, roleID);
    };
    RoleDetailsComponent.prototype.getSanitizedSlug = function (slug) {
        return document_explorer_library_1.DocumentExplorerLibrary.getSanitizedSlug(slug);
    };
    RoleDetailsComponent.prototype.slugLostFocus = function (evt) {
        evt.target.value = document_explorer_library_1.DocumentExplorerLibrary.getAppendedSlashSlug(evt.target.value);
    };
    RoleDetailsComponent.prototype.changeAgents = function (selectedAgents) {
        this.roleFormModel.agents = selectedAgents;
    };
    RoleDetailsComponent.prototype.changeParentRole = function (parentRoles) {
        var parentRole = parentRoles.length > 0 ? parentRoles[0] : null;
        this.roleFormModel.parentRole = !!parentRole ? parentRole.id : null;
        this.parentRole = parentRole;
    };
    RoleDetailsComponent.prototype.cancelForm = function () {
        if (this.mode === Modes.CREATE) {
            this.close();
        }
        else {
            this.mode = Modes.READ;
        }
        this.changeRole(this.role);
    };
    RoleDetailsComponent.prototype.close = function () {
        this.onClose.emit(true);
    };
    RoleDetailsComponent.prototype.closeError = function () {
        this.errorMessage = null;
    };
    return RoleDetailsComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], RoleDetailsComponent.prototype, "embedded", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], RoleDetailsComponent.prototype, "mode", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], RoleDetailsComponent.prototype, "role", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", App.Context)
], RoleDetailsComponent.prototype, "appContext", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], RoleDetailsComponent.prototype, "selectedRole", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], RoleDetailsComponent.prototype, "onClose", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], RoleDetailsComponent.prototype, "onSuccess", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], RoleDetailsComponent.prototype, "onError", void 0);
RoleDetailsComponent = __decorate([
    core_1.Component({
        selector: "cp-role-details",
        templateUrl: "./role-details.component.html",
        styleUrls: ["./role-details.component.scss"],
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, roles_service_1.RolesService, messages_area_service_1.MessagesAreaService])
], RoleDetailsComponent);
exports.RoleDetailsComponent = RoleDetailsComponent;
var Modes = (function () {
    function Modes() {
    }
    return Modes;
}());
Modes.READ = "READ";
Modes.EDIT = "EDIT";
Modes.CREATE = "CREATE";
exports.Modes = Modes;
