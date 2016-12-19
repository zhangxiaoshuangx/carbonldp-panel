import { ElementRef, EventEmitter, AfterViewInit } from "@angular/core";
import * as App from "carbonldp/App";
import * as Agent from "carbonldp/Auth/Agent";
import { AgentsService } from "../agents.service";
import "semantic-ui/semantic";
export declare class AgentDeleterComponent implements AfterViewInit {
    private element;
    private $element;
    private agentsService;
    private $deleteAgentModal;
    private errorMessage;
    private deletingAgent;
    context: App.Context;
    agent: Agent.Class;
    onSuccess: EventEmitter<any>;
    onError: EventEmitter<any>;
    constructor(element: ElementRef, agentsService: AgentsService);
    ngAfterViewInit(): void;
    private onSubmitDeleteAgent();
    private clearErrorMessage();
    show(): void;
    hide(): void;
    private hideDeleteAgentForm();
    toggle(): void;
}
export default AgentDeleterComponent;
