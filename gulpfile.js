"use strict";

const fs = require( "fs" );
const del = require( "del" );

const gulp = require( "gulp" );
const util = require( "gulp-util" );
const runSequence = require( "run-sequence" );
const merge = require( "merge2" );

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

			json.main = json.main.replace( "dist/", "" );
			json.typings = json.typings.replace( "dist/", "" );

			return json;
		} ) )
		.pipe( gulp.dest( config.dist.tsOutput ) );
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
		.pipe( tsProject() );

	return merge( [
		tsResults.dts
			.pipe( gulp.dest( config.dist.tsOutput ) )
		,
		tsResults.js
			.pipe( sourcemaps.write( "." ) )
			.pipe( gulp.dest( config.dist.tsOutput ) )
	] );
} );

gulp.task( "copy:typescript", () => {
	return gulp.src( "src/**/*.ts", {
		base: "src"
	} ).pipe( gulp.dest( "dist" ) );
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

gulp.task( "lint", [ "lint:typescript" ] );

gulp.task( "lint:typescript", () => {
	return gulp.src( config.source.typescript )
		.pipe( tslint( {
			tslint: require( "tslint" )
		} ) )
		.pipe( tslint.report( "prose" ) )
		;
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
