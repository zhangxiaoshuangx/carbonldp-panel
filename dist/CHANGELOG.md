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