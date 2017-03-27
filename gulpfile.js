"use strict";

const del = require( "del" );
const gulp = require( "gulp" );
const runSequence = require( "run-sequence" );
const jeditor = require( "gulp-json-editor" );
const merge = require( "merge2" );
const ts = require( "gulp-typescript" );
const sourcemaps = require( "gulp-sourcemaps" );

let config = {
	source: {
		assets: [ "src/assets/**/*" ],
		styles: [ "src/**/*.scss", "src/**/*.sass" ],
		templates: "src/**/*.html",
		typescript: [
			"src/**/*.ts",
			"!src/**/*.spec.ts",
			"typings/typings.d.ts",
		],
	},
	dist: {
		tsCompiled: "compiled",
		tsOutput: "dist",
		all: "dist/**/*",
		typescript: "dist/**/*.ts",
	}
};

gulp.task( "default", [ "build" ] );

gulp.task( "build", [ "clean:dist" ], ( done ) => {
	runSequence(
		"clean:dist",
		[ "copy:typescript", "copy:templates", "copy:styles", "build:prepare-npm-package" ],
		done
	);
} );

gulp.task( "build:prepare-npm-package", ( done ) => {
	runSequence(
		[ "build:prepare-npm-package|copy:docs", "build:prepare-npm-package|copy:package-json" ],
		done
	);
} );

gulp.task( "build:prepare-npm-package|copy:docs", () => {
	return gulp.src( [
		"README.md",
		"CHANGELOG.md",
		"LICENSE",
	] ).pipe( gulp.dest( config.dist.tsOutput ) );
} );

gulp.task( "build:prepare-npm-package|copy:package-json", () => {
	return gulp.src( "package.json" )
		.pipe( jeditor( ( json ) => {
			delete json.private;
			delete json.scripts;
			delete json.devDependencies;

			return json;
		} ) )
		.pipe( gulp.dest( config.dist.tsOutput ) );
} );

gulp.task( "clean:dist", ( done ) => {
	return del( config.dist.all, done );
} );

gulp.task( "copy:styles", () => {
	return gulp.src( "src/**/*.scss", {
		base: "src"
	} ).pipe( gulp.dest( "dist" ) );
} );

gulp.task( "copy:templates", () => {
	return gulp.src( "src/**/*.html", {
		base: "src"
	} ).pipe( gulp.dest( "dist" ) );
} );

gulp.task( "copy:typescript", () => {
	return gulp.src( "src/**/*.ts", {
		base: "src"
	} ).pipe( gulp.dest( "dist" ) );
} );

gulp.task( "compile:typescript", () => {
	let tsProject = ts.createProject( "tsconfig.json", {
		"declaration": true
	} );

	let tsResults = gulp.src( config.source.typescript )
		.pipe( sourcemaps.init() )
		.pipe( tsProject() );

	return merge( [
		tsResults.dts
			.pipe( gulp.dest( config.dist.tsCompiled ) )
		,
		tsResults.js
			.pipe( sourcemaps.write( "." ) )
			.pipe( gulp.dest( config.dist.tsCompiled ) )
	] );
} );

gulp.task( "watch", ( done ) => {
	runSequence(
		[ "copy:styles", "copy:templates", "copy:typescript" ],
		[ "watch:styles", "watch:templates", "watch:typescript" ],
		done
	);
} );

gulp.task( "watch:styles", () => {
	return gulp.watch( config.source.styles, [ "copy:styles" ] );
} );

gulp.task( "watch:templates", () => {
	return gulp.watch( config.source.templates, [ "copy:templates" ] );
} );

gulp.task( "watch:typescript", () => {
	return gulp.watch( config.source.typescript, [ "copy:typescript" ] );
} );
