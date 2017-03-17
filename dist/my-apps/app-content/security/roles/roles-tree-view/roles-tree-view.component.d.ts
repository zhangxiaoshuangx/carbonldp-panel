import { ElementRef, AfterViewInit, OnInit, EventEmitter } from "@angular/core";
import * as App from "carbonldp/App";
import * as HTTP from "carbonldp/HTTP";
import { RolesService } from "../roles.service";
import "jstree/dist/jstree.min";
export declare class RolesTreeViewComponent implements AfterViewInit, OnInit {
    private element;
    private $element;
    private jsTree;
    private $tree;
    private rolesService;
    private _selectedRole;
    selectedURI: string;
    appContext: App.Context;
    refreshNode: EventEmitter<string>;
    openNode: EventEmitter<string>;
    deletedNode: EventEmitter<string>;
    onError: EventEmitter<HTTP.Errors.Error>;
    onLoading: EventEmitter<boolean>;
    onSelectRole: EventEmitter<string>;
    onDoubleClickRole: EventEmitter<string>;
    onShowCreateRoleForm: EventEmitter<boolean>;
    onShowDeleteRoleForm: EventEmitter<boolean>;
    constructor(element: ElementRef, rolesService: RolesService);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    private getTree();
    private getChildren(roleID?);
    private buildNode(uri, text, nodeType?, hasChildren?);
    private renderTree(nodes);
    private loadNode(obj);
    private onBeforeOpenNode(parentId, parentNode, position);
    private onChange(parentId, node, position);
    private addChild(parentId, node, position);
    private emptyNode(nodeId);
    showCreateRoleForm(): void;
    showDeleteRoleForm(): void;
}
export interface JSTreeNode {
    id: string;
    text: any;
    state: any;
    children: any;
    data: any;
    type?: any;
}
