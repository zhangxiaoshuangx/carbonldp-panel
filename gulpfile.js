"use strict";

const fs = require( "fs" );
const del = require( "del" );

const gulp = require( "gulp" );
const util = require( "gulp-util" );
const runSequence = require( "run-sequence" );

const sass = require( "gulp-sass" );
const autoprefixer = require( "gulp-autoprefixer" );

const sourcemaps = require( "gulp-sourcemaps" );
const ts = require( "gulp-typescript" );

const jeditor = require( "gulp-json-editor" );

const tslint = require( "gulp-tslint" );

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
		tsOutput: "dist",
		all: "dist/**/*",
	}
};

gulp.task( "build", [ "clean:dist" ], ( done ) => {
	runSequence(
		"clean:dist",
		[ "compile:typescript", "compile:templates", "compile:styles", "prepare-npm-package" ],
		done
	);
} );

gulp.task( "clean:dist", ( done ) => {
	return del( config.dist.all, done );
} );

gulp.task( "compile:styles", () => {
	return gulp.src( config.source.styles )
		.pipe( sourcemaps.init() )
		.pipe( sass().on( "error", sass.logError ) )
		.pipe( autoprefixer( {
			browsers: [ "last 2 versions" ]
		} ) )
		.pipe( sourcemaps.write( "." ) )
		.pipe( gulp.dest( "dist" ) )
		;
} );

gulp.task( "compile:templates", () => {
	// TODO: Minify
	return gulp.src( config.source.templates )
		.pipe( gulp.dest( "dist" ) );
} );


gulp.task( "compile:typescript", () => {
	let tsProject = ts.createProject( "tsconfig.json", {
		"declaration": true
	} );

	let tsResults = gulp.src( config.source.typescript )
		.pipe( sourcemaps.init() )
		.pipe( ts( tsProject ) );

	tsResults.dts
		.pipe( gulp.dest( config.dist.tsOutput ) )
	;

	return tsResults.js
		.pipe( sourcemaps.write( "." ) )
		.pipe( gulp.dest( config.dist.tsOutput ) )
		;
} );

gulp.task( "lint", [ "ts-lint" ] );

gulp.task( "prepare-npm-package", ( done ) => {
	runSequence(
		[ "prepare-npm-package:copy-docs", "prepare-npm-package:copy-package-json" ],
		done
	);
} );

gulp.task( "prepare-npm-package:copy-docs", () => {
	return gulp.src( [
		"README.md",
		"CHANGELOG.md",
		"LICENSE",
	] ).pipe( gulp.dest( config.dist.tsOutput ) );
} );

gulp.task( "prepare-npm-package:copy-package-json", () => {
	return gulp.src( "package.json" )
		.pipe( jeditor( ( json ) => {
			delete json.private;
			delete json.scripts;
			delete json.devDependencies;

			json.main = json.main.replace( "dist/", "" );
			json.typings = json.typings.replace( "dist/", "" );

			return json;
		} ) )
		.pipe( gulp.dest( config.dist.tsOutput ) );
} );

gulp.task( "ts-lint", () => {
	return gulp.src( config.source.typescript )
		.pipe( tslint( {
			tslint: require( "tslint" )
		} ) )
		.pipe( tslint.report( "prose" ) )
		;
} );

gulp.task( "watch", [ "watch:styles", "watch:templates", "watch:typescript" ] );

gulp.task( "watch:styles", () => {
	return gulp.watch( config.source.styles, [ "compile:styles" ] );
} );

gulp.task( "watch:templates", () => {
	return gulp.watch( config.source.templates, [ "compile:templates" ] );
} );

gulp.task( "watch:typescript", () => {
	return gulp.watch( config.source.typescript, [ "compile:typescript" ] );
} );
