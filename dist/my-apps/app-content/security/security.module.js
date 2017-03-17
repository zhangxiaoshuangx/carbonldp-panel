"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
//Providers
var security_routing_1 = require("./security.routing");
// Components
var security_view_1 = require("./security.view");
var agents_view_1 = require("./agents/agents.view");
var agents_component_1 = require("./agents/agents.component");
var agents_list_view_1 = require("./agents/agents-list/agents-list.view");
var agents_list_component_1 = require("./agents/agents-list/agents-list.component");
var agent_details_view_1 = require("./agents/agent-details/agent-details.view");
var agent_details_component_1 = require("./agents/agent-details/agent-details.component");
var agents_chooser_component_1 = require("./agents/agents-chooser/agents-chooser.component");
var agent_deleter_component_1 = require("./agents/agent-deleter/agent-deleter.component");
var agent_creator_view_1 = require("./agents/agent-creator/agent-creator.view");
var agent_not_found_view_1 = require("./agents/agent-not-found/agent-not-found.view");
var roles_view_1 = require("./roles/roles.view");
var roles_browser_view_1 = require("./roles/roles-browser/roles-browser.view");
var roles_browser_component_1 = require("./roles/roles-browser/roles-browser.component");
var roles_tree_view_component_1 = require("./roles/roles-tree-view/roles-tree-view.component");
var role_details_component_1 = require("./roles/role-details/role-details.component");
var role_deleter_component_1 = require("./roles/role-deleter/role-deleter.component");
var roles_chooser_component_1 = require("./roles/roles-chooser/roles-chooser.component");
// Modules
var panel_module_1 = require("carbonldp-panel/panel.module");
var directives_module_1 = require("carbonldp-panel/directives/directives.module");
// Services
var agents_service_1 = require("./agents/agents.service");
var roles_service_1 = require("./roles/roles.service");
var agent_resolver_1 = require("./agents/agent.resolver");
var role_resolver_1 = require("./roles/role.resolver");
var SecurityModule = (function () {
    function SecurityModule() {
    }
    return SecurityModule;
}());
SecurityModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            forms_1.FormsModule,
            security_routing_1.routing,
            panel_module_1.PanelModule,
            directives_module_1.DirectivesModule,
        ],
        declarations: [
            security_view_1.SecurityView,
            agents_view_1.AgentsView,
            agents_component_1.AgentsComponent,
            agents_list_view_1.AgentsListView,
            agents_list_component_1.AgentsListComponent,
            agent_details_view_1.AgentDetailsView,
            agent_details_component_1.AgentDetailsComponent,
            agents_chooser_component_1.AgentsChooserComponent,
            agent_deleter_component_1.AgentDeleterComponent,
            agent_creator_view_1.AgentCreatorView,
            agent_not_found_view_1.AgentNotFoundView,
            roles_view_1.RolesView,
            roles_browser_view_1.RolesBrowserView,
            roles_browser_component_1.RolesBrowserComponent,
            roles_tree_view_component_1.RolesTreeViewComponent,
            role_details_component_1.RoleDetailsComponent,
            role_deleter_component_1.RoleDeleterComponent,
            roles_chooser_component_1.RolesChooserComponent,
        ],
        providers: [
            agents_service_1.AgentsService,
            roles_service_1.RolesService,
            agent_resolver_1.AgentResolver,
            role_resolver_1.RoleResolver,
        ],
    })
], SecurityModule);
exports.SecurityModule = SecurityModule;
