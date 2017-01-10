System.register(["@angular/core", '@angular/common', "@angular/forms", "./security.routing", "./security.view", "./agents/agents.view", "./agents/agents.component", "./agents/agents-list/agents-list.view", "./agents/agents-list/agents-list.component", "./agents/agent-details/agent-details.view", "./agents/agent-details/agent-details.component", "./agents/agents-chooser/agents-chooser.component", "./agents/agent-deleter/agent-deleter.component", "./agents/agent-creator/agent-creator.view", "./agents/agent-not-found/agent-not-found.view", "./roles/roles.view", "./roles/roles-browser/roles-browser.view", "./roles/roles-browser/roles-browser.component", "./roles/roles-tree-view/roles-tree-view.component", "./roles/role-details/role-details.component", "./roles/role-creator/role-creator.component", "./roles/role-deleter/role-deleter.component", "./roles/roles-chooser/roles-chooser.component", "carbonldp-panel/panel.module", "carbonldp-panel/directives.module", "./agents/agents.service", "./roles/roles.service", "./agents/agent.resolver", "./roles/role.resolver"], function(exports_1, context_1) {
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
    var core_1, common_1, forms_1, security_routing_1, security_view_1, agents_view_1, agents_component_1, agents_list_view_1, agents_list_component_1, agent_details_view_1, agent_details_component_1, agents_chooser_component_1, agent_deleter_component_1, agent_creator_view_1, agent_not_found_view_1, roles_view_1, roles_browser_view_1, roles_browser_component_1, roles_tree_view_component_1, role_details_component_1, role_creator_component_1, role_deleter_component_1, roles_chooser_component_1, panel_module_1, directives_module_1, agents_service_1, roles_service_1, agent_resolver_1, role_resolver_1;
    var SecurityModule;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (security_routing_1_1) {
                security_routing_1 = security_routing_1_1;
            },
            function (security_view_1_1) {
                security_view_1 = security_view_1_1;
            },
            function (agents_view_1_1) {
                agents_view_1 = agents_view_1_1;
            },
            function (agents_component_1_1) {
                agents_component_1 = agents_component_1_1;
            },
            function (agents_list_view_1_1) {
                agents_list_view_1 = agents_list_view_1_1;
            },
            function (agents_list_component_1_1) {
                agents_list_component_1 = agents_list_component_1_1;
            },
            function (agent_details_view_1_1) {
                agent_details_view_1 = agent_details_view_1_1;
            },
            function (agent_details_component_1_1) {
                agent_details_component_1 = agent_details_component_1_1;
            },
            function (agents_chooser_component_1_1) {
                agents_chooser_component_1 = agents_chooser_component_1_1;
            },
            function (agent_deleter_component_1_1) {
                agent_deleter_component_1 = agent_deleter_component_1_1;
            },
            function (agent_creator_view_1_1) {
                agent_creator_view_1 = agent_creator_view_1_1;
            },
            function (agent_not_found_view_1_1) {
                agent_not_found_view_1 = agent_not_found_view_1_1;
            },
            function (roles_view_1_1) {
                roles_view_1 = roles_view_1_1;
            },
            function (roles_browser_view_1_1) {
                roles_browser_view_1 = roles_browser_view_1_1;
            },
            function (roles_browser_component_1_1) {
                roles_browser_component_1 = roles_browser_component_1_1;
            },
            function (roles_tree_view_component_1_1) {
                roles_tree_view_component_1 = roles_tree_view_component_1_1;
            },
            function (role_details_component_1_1) {
                role_details_component_1 = role_details_component_1_1;
            },
            function (role_creator_component_1_1) {
                role_creator_component_1 = role_creator_component_1_1;
            },
            function (role_deleter_component_1_1) {
                role_deleter_component_1 = role_deleter_component_1_1;
            },
            function (roles_chooser_component_1_1) {
                roles_chooser_component_1 = roles_chooser_component_1_1;
            },
            function (panel_module_1_1) {
                panel_module_1 = panel_module_1_1;
            },
            function (directives_module_1_1) {
                directives_module_1 = directives_module_1_1;
            },
            function (agents_service_1_1) {
                agents_service_1 = agents_service_1_1;
            },
            function (roles_service_1_1) {
                roles_service_1 = roles_service_1_1;
            },
            function (agent_resolver_1_1) {
                agent_resolver_1 = agent_resolver_1_1;
            },
            function (role_resolver_1_1) {
                role_resolver_1 = role_resolver_1_1;
            }],
        execute: function() {
            SecurityModule = (function () {
                function SecurityModule() {
                }
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
                            role_creator_component_1.RoleCreatorComponent,
                            roles_chooser_component_1.RolesChooserComponent,
                        ],
                        providers: [
                            agents_service_1.AgentsService,
                            roles_service_1.RolesService,
                            agent_resolver_1.AgentResolver,
                            role_resolver_1.RoleResolver,
                        ],
                    }), 
                    __metadata('design:paramtypes', [])
                ], SecurityModule);
                return SecurityModule;
            }());
            exports_1("SecurityModule", SecurityModule);
            exports_1("default",SecurityModule);
        }
    }
});

//# sourceMappingURL=security.module.js.map
