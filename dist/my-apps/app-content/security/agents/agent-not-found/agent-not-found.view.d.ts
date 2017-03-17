import { OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { Router } from "@angular/router";
export declare class AgentNotFoundView implements OnInit {
    private location;
    timer: number;
    private router;
    constructor(router: Router, location: Location);
    ngOnInit(): void;
}
