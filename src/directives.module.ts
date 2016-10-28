import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { HighlightDirective } from "./directives/highlight.directive";
import { EmailValidator, MatchValidator } from "./custom-validators";
import { SlugValidator, DomainValidator } from "./custom-validators";
import { URIValidator, URIFragmentValidator } from "./custom-validators";

//TODO: Merge directives module with panel module, after solving components collisions between WebsiteModule and PanelModule

@NgModule( {
	imports: [
		CommonModule,
	],
	declarations: [
		EmailValidator,
		MatchValidator,
		SlugValidator,
		DomainValidator,
		URIValidator,
		URIFragmentValidator,
		HighlightDirective
	],
	exports: [
		EmailValidator,
		MatchValidator,
		DomainValidator,
		SlugValidator,
		URIValidator,
		URIFragmentValidator,
		HighlightDirective,
	],
	providers: []
} )

export class DirectivesModule {
}