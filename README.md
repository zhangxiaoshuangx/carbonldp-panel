# carbonldp-panel

[![npm version](https://badge.fury.io/js/carbonldp-panel.svg)](https://badge.fury.io/js/carbonldp-panel)

[![Build Status](https://travis-ci.org/CarbonLDP/carbonldp-panel.svg)](https://travis-ci.org/CarbonLDP/carbonldp-panel)

Common components, services and utilities shared between different panel projects

## Development

### Setup

1. Install dependencies:
    - [node.js](https://nodejs.org/en/)
    - gulp: `npm install gulp -g`
    - typings: `npm install -g typings`
2. `cd` into the project's root folder
3. Run `npm install`

### File Structure

- `dist`: Package's source files. Ready to be packages or published
- `node_modules`: npm dependencies (don't touch them)
- `src`: All source files
- `typings`: TypeScript description files (partly managed by [typings](https://github.com/typings/typings))
    - `custom`: Directory to store custom description files
    - `typings.d.ts`: Main description file. Aggregates all other description files
- `.gitignore`: Ignore file for git
- `CHANGELOG.md`: File to track package changes
- `gulpfile.js`: Gulp configuration file
- `npm-shrinkwrap.json`: File used to force `gulp-typescript` to use `typescript@1.9.0-dev.20160624-1.0`
- `package.json`: npm configuration file
- `README.md`: === this
- `tsconfig.json`: TypeScript compiler configuration file
- `typings.json`: [typings](https://github.com/typings/typings) configuration file

### Gulp Tasks

- `build`: Builds the dist version of the project
- `build:prepare-npm-package`: Prepares publishable npm package inside of the `dist` directory
- `build:prepare-npm-package:copy:docs`: Copies documentation files for the publishable npm package
- `build:prepare-npm-package:copy:package-json`: Copies and prepares the `package.json` file for the publishable npm package
- `clean:dist`: Cleans the `dist` directory
- `compile:styles`: Compiles style files (sass/scss) and copies them to the `dist` directory
- `compile:templates`: Compiles template files (html) and copies them to the `dist` directory
- `compile:typescript`: Compiles typescript files and copies them to the `dist` directory
- `copy:styles`: Copies style files (scss) and copies them to the `dist` directory
- `copy:templates`: Copies template files (html) to the `dist` directory
- `copy:typescript`: Copies typescript files (ts) to the `dist` directory
- `lint`: Lints the project
- `lint:typescript`: Lints typescript files
- `watch`: Sets up a service to watch for any change to any source file and run the associated tasks to them. Really useful for development
- `watch:styles`: Watches for changes in style files (sass/scss)
- `watch:templates`: Watches for changes in template files (html)
- `watch:typescript`: Watches for changes in typescript files (ts)

### Publishing the project

TODO

## TODO

- Linting
- Testing

## LICENSE

    Copyright (c) 2015-present, Base22 Technology Group, LLC.
    All rights reserved.
    
    This source code is licensed under the BSD-style license found in the
    LICENSE file in the root directory of this source tree.