# carbonldp-panel

[![npm version](https://badge.fury.io/js/carbonldp-panel.svg)](https://badge.fury.io/js/carbonldp-panel)

[![Build Status](https://travis-ci.org/CarbonLDP/carbonldp-panel.svg)](https://travis-ci.org/CarbonLDP/carbonldp-panel)

Common components, services and utilities shared between different panel projects

## Development

### Setup

1. Install dependencies:
    - [node.js](https://nodejs.org/en/)
    - gulp: `npm install gulp -g`
2. `cd` into the project's root folder
3. Run `npm install`

### File Structure

    .
    ├── dist                                # Package's source files ready to be packaged or published
    ├── src                                 # Source files (directives, componentes, services and modules)
    ├── typings                             # Typescript description files
    │   ├── customs                         # Directory to store custom description files
    │   │   ├── codemirror
    │   │   │   └── index.d.ts              # Codemirror's description file
    │   │   ├── highlightjs
    │   │   │   └── index.d.ts              # HighlightJS's description file
    │   │   ├── jstree
    │   │   │   └── index.d.ts              # JSTree's description file
    │   │   └── semantic-ui
    │   │       └── index.d.ts              # Semantic-UI's description file
    │   └── typings.d.ts                    # Main typings file referencing all index.d.ts custom files
    ├── .gitignore                          # Ignore file for git
    ├── .gitmodules                         # Submodules file for git
    ├── .travis.yml                         # Travis configuration file
    ├── CHANGELOG                           # File to track package changes
    ├── gulpfile.js                         # Gulp's configuration file
    ├── LICENSE
    ├── package.json                        # npm configuration file
    ├── README.md                           # this
    └── tsconfig.json                       # Typescript compiler configuration file

### Gulp Tasks

- `build`: Builds the dist version of the project
- `build:prepare-npm-package`: Prepares publishable npm package inside of the `dist` directory
- `build:prepare-npm-package:copy:docs`: Copies documentation files for the publishable npm package
- `build:prepare-npm-package:copy:package-json`: Copies and prepares the `package.json` file for the publishable npm package
- `clean:dist`: Cleans the `dist` directory
- `copy:styles`: Copies style files (scss) and copies them into the `dist` directory
- `copy:templates`: Copies template files (html) to the `dist` directory
- `copy:typescript`: Copies typescript files (ts) to the `dist` directory
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