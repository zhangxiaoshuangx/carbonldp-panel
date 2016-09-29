import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { HighlightDirective } from "./directives/highlight.directive";
import { EmailValidator } from "./custom-validators";
import { PasswordValidator } from "./custom-validators";
import { MatchValidator } from "./custom-validators";
import { SlugValidator } from "./custom-validators";
import { DomainValidator } from "./custom-validators";

//TODO: Merge directives module with panel module, after solving components collisions between WebsiteModule and PanelModule

@NgModule( {
	imports: [
		CommonModule,
	],
	declarations: [
		EmailValidator,
		PasswordValidator,
		MatchValidator,
		SlugValidator,
		DomainValidator,
		HighlightDirective
	],
	exports: [
		EmailValidator,
		PasswordValidator,
		MatchValidator,
		DomainValidator,
		SlugValidator,
		HighlightDirective,
	],
	providers: []
} )

export class DirectivesModule {
}