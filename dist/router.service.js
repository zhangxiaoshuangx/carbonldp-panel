System.register(["@angular/router-deprecated/src/facade/collection", "@angular/router-deprecated/src/facade/lang"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var collection_1, lang_1;
    var RouterService;
    return {
        setters:[
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
        execute: function() {
            /**
             * Service that wraps router related functionality. This service must not be automatically injected,
             * because we need a different instance each time we inject it into a component (not a singleton).
             * Instead use a factory like:
             * <pre><code>
             *      provide( RouterService, {
             *          useFactory: ( router:Router ):RouterService => {
             *              return new RouterService( router );
             *          },
             *          deps: [ Router ]
             *      })
             * </pre></code>
             */
            RouterService = (function () {
                function RouterService(router, location) {
                    this.router = router;
                    this.location = location;
                }
                RouterService.prototype.isActive = function (route) {
                    if (route.length === 0)
                        return false;
                    var routeIsRelative = route[0].startsWith("./");
                    var instruction = this.router.generate(route);
                    var router = this.router;
                    var currentInstruction = routeIsRelative ? router.currentInstruction : this.getRootRouter(router).currentInstruction;
                    if (lang_1.isBlank(currentInstruction))
                        return false;
                    var currentInstructionBranch = this.buildInstructionBranch(currentInstruction);
                    var instructionBranch = this.buildInstructionBranch(instruction);
                    if (instructionBranch.length > currentInstructionBranch.length)
                        return false;
                    for (var i = 0, length_1 = instructionBranch.length; i < length_1; i++) {
                        var instructionA = instructionBranch[i];
                        var instructionB = currentInstructionBranch[i];
                        if (instructionA.component.routeName !== instructionB.component.routeName)
                            return false;
                        if (!this.compareInstructionParameters(instructionA, instructionB))
                            return false;
                    }
                    return true;
                };
                RouterService.prototype.getRootRouter = function (router) {
                    while (lang_1.isPresent(router.parent)) {
                        router = router.parent;
                    }
                    return router;
                };
                RouterService.prototype.buildInstructionBranch = function (instruction) {
                    var instructionBranch = [];
                    var currentInstruction = instruction;
                    while (lang_1.isPresent(currentInstruction)) {
                        instructionBranch.push(currentInstruction);
                        currentInstruction = currentInstruction.child;
                    }
                    instructionBranch.reverse();
                    return instructionBranch;
                };
                RouterService.prototype.compareInstructionParameters = function (instructionA, instructionB) {
                    if (!lang_1.isPresent(instructionA.component.params) && !lang_1.isPresent(instructionB.component.params))
                        return true;
                    if (!lang_1.isPresent(instructionA.component.params) || !lang_1.isPresent(instructionB.component.params))
                        return true;
                    var parametersAreEqual = true;
                    collection_1.StringMapWrapper.forEach(instructionA.component.params, function (value, key) {
                        if (instructionB.component.params[key] !== value)
                            parametersAreEqual = false;
                    });
                    return parametersAreEqual;
                };
                return RouterService;
            }());
            exports_1("RouterService", RouterService);
            exports_1("default",RouterService);
        }
    }
});

//# sourceMappingURL=router.service.js.map
