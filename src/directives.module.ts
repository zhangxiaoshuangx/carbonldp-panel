import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { HighlightDirective } from "./directives/highlight.directive";
import { EmailValidator, MatchValidator } from "./custom-validators";
import { SlugValidator, DomainValidator } from "./custom-validators";
import { URIValidator } from "./custom-validators";
// import { IdValidator, NameExplorerValidator } from "./custom-validators";
// import { ValueValidator } from "./custom-validators";
// import { IdPointerValidator} from "./custom-validators";

//TODO: Merge directives module with panel module, after solving components collisions between WebsiteModule and PanelModule

@NgModule( {
	imports: [
		CommonModule,
	],
	declarations: [
		EmailValidator,
		// PasswordValidator,
		MatchValidator,
		SlugValidator,
		DomainValidator,
		URIValidator,
		// ExistingBackupValidator,
		// BackupFileValidator,
		// OneControlValidValidator,
		// IdValidator,
		// NameExplorerValidator,
		// ValueValidator,
		// IdPointerValidator,
		HighlightDirective
	],
	exports: [
		EmailValidator,
		// PasswordValidator,
		MatchValidator,
		DomainValidator,
		SlugValidator,
		URIValidator,
		// ValueValidator,
		// ExistingBackupValidator,
		// BackupFileValidator,
		// OneControlValidValidator,
		// IdValidator,
		// NameExplorerValidator,
		// ValueValidator,
		// IdPointerValidator,
		HighlightDirective,
	],
	providers: []
} )

export class DirectivesModule {
}