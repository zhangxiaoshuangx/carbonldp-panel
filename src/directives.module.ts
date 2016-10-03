import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { HighlightDirective } from "./directives/highlight.directive";
import { EmailValidator } from "./custom-validators";
import { PasswordValidator } from "./custom-validators";
import { MatchValidator } from "./custom-validators";
import { SlugValidator } from "./custom-validators";
import { DomainValidator } from "./custom-validators";
import { URIValidator } from "./custom-validators";
import { ExistingBackupValidator } from "./custom-validators";
import { BackupFileValidator } from "./custom-validators";
import { OneControlValidValidator } from "./custom-validators";

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
		URIValidator,
		ExistingBackupValidator,
		BackupFileValidator,
		OneControlValidValidator,
		HighlightDirective
	],
	exports: [
		EmailValidator,
		PasswordValidator,
		MatchValidator,
		DomainValidator,
		SlugValidator,
		URIValidator,
		ExistingBackupValidator,
		BackupFileValidator,
		OneControlValidValidator,
		HighlightDirective,
	],
	providers: []
} )

export class DirectivesModule {
}