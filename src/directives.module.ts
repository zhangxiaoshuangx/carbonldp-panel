import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { HighlightDirective } from "./directives/highlight.directive";
import { EmailValidator, MatchValidator } from "./custom-validators";
import { SlugValidator, DomainValidator } from "./custom-validators";
import { URIValidator, FragmentValidator, URIFragmentValidator } from "./custom-validators";
import { RequiredIfValidator } from "./custom-validators";
import { InputValidationDirective } from "./directives/input-validation.directive";

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
		FragmentValidator,
		URIFragmentValidator,
		HighlightDirective,
		InputValidationDirective,
		RequiredIfValidator,
	],
	exports: [
		EmailValidator,
		MatchValidator,
		DomainValidator,
		SlugValidator,
		URIValidator,
		FragmentValidator,
		URIFragmentValidator,
		HighlightDirective,
		InputValidationDirective,
		RequiredIfValidator,
	],
	providers: []
} )

export class DirectivesModule {
}