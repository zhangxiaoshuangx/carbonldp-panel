# 0.6.0 (2016/12/19)

- Completed #38 - Add screen to manage agents of an app
- Added the new module, `SecurityModule`, with the following items:
    - Navigation routes:
        - Agents list
        - Agent details
    - Services
        - Agents service
        - Roles service
    - Components
        - Agents list
        - Agent creator
        - Agent deleter
        - Agent details
        - Agent not found
        - Roles chooser
    - Views
        - Security view
        - Agents view
    - Resolvers
        - Agents resolver
- Added a new paginator component (`PaginatorComponent`) to `PanelModule`
- After creating an application the workbench will take the user to the app's dashboard

- Fixed #30 - Create App form is not displaying error messages

# 0.5.0 (2016/11/09)

- Completed #11 - Display twisty icons on TreeView only if a node has children
- Completed #29 - Create access points in the Document Explorer
- Completed #13 - Create and delete documents in the Document Explorer
- Completed #31 - Modify tabs.component to change from tab to dropdown in mobile view
- Completed #24 - Modify collapsible.directive to make elements inside title clickable
- Added `cpValidation` directive to ease input validation and error feedback
- Added shake to form when submit fails
- Changed remember me checkbox to make it clickable including its text label instead of just the checkbox
- Fixed #15 - activeApp of AppComponent is not being updated on child components
- Fixed #25 - Login component not showing SDK errors

# 0.4.0 (2016/10/12)

- Upgraded to angular 2.0.2
- Updated forms to use the new `@angular/forms` module
- Added new validators in custom-validators
- Added directives.module to hold customize validators and directives
- Added @lists support to DocumentExplorer
    - View the contents of a list
    - Edit the contents of a list
    - Create a new list
    - Delete a list
- Changed MyApps "Created on" and "Last Modify" labels to just "Created" and "Modified"
- Fixed typo of DocumentExplorer stating "Select a document from the three..." to tree
- Fixed date outputs to show year instead of the 'yyy' typo
- Fixed date outputs of AppTileComponent and MyAppsCatalog to display date in a more friendly way e.g."Oct 07, 2016 - 11:03 AM"
- Completed #18 - Added support for AccessPoints by listing them when navigating the tree of the Document Explorer. 

# 0.3.1 (2016/09/02)

- Rename imports to "carbonldp-panel...

# 0.3.0 (2016/09/02)

- Migrate code to @angular RC5.
    - Modularized Panel into PanelModule.
    - Modularized MyApps into MyAppsModule.
    - Modularized AppContent into AppContentModule.
    - Modularized SPARQLComponent into SPARQLModule.
    - Modularized Semantic components into SemanticModule.
    - Modularized DocumentExplorerComponent into SemanticModule.
- Update **router-deprecated** to the new **@angular router**.
- Add **AppNotFoundView** to MyApps to display it whenever the AppContent resolver couldn't find the requested app.
- Add tooltip to SPARQL response buttons.
- Add tooltip to app action buttons of  my apps view.
- Fix bug of DocumentExplorer caused by an update to the working document even if the update was not successful.
- Add LICENSE file

# 0.2.1 (2016/08/10)

- Fix JSTree missing icons

# 0.2.0 (2016/08/09)

- Add `sui-tabs`
- Add `sui-tab`
- Add `sui-collapsible`
- Add `sui-accordion`
- Add property cs:allowedOrigin cs:allOrigin when creating App
- Fix UI glitch on SPARQL (too much blank space at bottom of component)
- Add message when changes have been saved
- Remove validation of hashtag (#) on document properties and add validations to properties with slash (/) endings
- Remove infinite calls every 15 seconds on App Configuration if you exit page
- Fix UI glitch on App Configuration. (overlapped divider)
- Add Application as the first open node of the explorer TreeView
- Add message to confirm the backup contains an Agent with an App-Admin
- Refresh an AppContext after modifying an App
- Get document children when a document is opened in the Document Explorer (avoiding an unnecessary request)
- Remove message of missing values in Document Explorer
- Add READ permission to anonymous agents by default when creating an Application

# 0.1.0 (2016/07/19)

- Initial commit
- Mirror `app-dev` functionality