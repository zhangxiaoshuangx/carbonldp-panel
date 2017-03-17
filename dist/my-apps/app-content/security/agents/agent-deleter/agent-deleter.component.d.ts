import { ElementRef, EventEmitter, AfterViewInit } from "@angular/core";
import * as App from "carbonldp/App";
import * as Agent from "carbonldp/Auth/Agent";
import { Message } from "carbonldp-panel/messages-area/message.component";
import { AgentsService } from "../agents.service";
import "semantic-ui/semantic";
export declare class AgentDeleterComponent implements AfterViewInit {
    private element;
    private $element;
    private agentsService;
    private $deleteAgentModal;
    errorMessage: Message;
    deletingAgent: boolean;
    context: App.Context;
    agent: Agent.Class;
    onSuccess: EventEmitter<any>;
    onError: EventEmitter<any>;
    constructor(element: ElementRef, agentsService: AgentsService);
    ngAfterViewInit(): void;
    onSubmitDeleteAgent(): void;
    private clearErrorMessage();
    show(): void;
    hide(): void;
    hideDeleteAgentForm(): void;
    toggle(): void;
}
