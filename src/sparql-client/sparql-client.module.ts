import { NgModule } from '@angular/core';
import { CommonModule, DeprecatedFormsModule } from '@angular/common';

import { ResponseComponent } from "./response/response.component";
import * as CodeMirrorComponent from "carbon-panel/code-mirror/code-mirror.component";

import { RelativizeURIPipe } from "./resultset-table/relativize-uri.pipe";
import { PrefixURIPipe } from "./resultset-table/prefix-uri.pipe";

import { ResultsetTableComponent } from "./resultset-table/resultset-table.component";



@NgModule( {
	imports: [
		CommonModule,
	DeprecatedFormsModule
	],
	declarations: [
		ResponseComponent,
		ResultsetTableComponent,
		CodeMirrorComponent.Class,
		RelativizeURIPipe,
		PrefixURIPipe,
		PrefixURIPipe
	],
	exports: [

	],
} )

export class SPARQLClientModule {

}