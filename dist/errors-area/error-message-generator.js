System.register(["carbonldp/HTTP", "carbonldp/JSONLD/Parser"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var HTTP, JSONLDParser;
    var ErrorMessageGenerator;
    return {
        setters:[
            function (HTTP_1) {
                HTTP = HTTP_1;
            },
            function (JSONLDParser_1) {
                JSONLDParser = JSONLDParser_1;
            }],
        execute: function() {
            ErrorMessageGenerator = (function () {
                function ErrorMessageGenerator() {
                }
                ErrorMessageGenerator.getErrorMessage = function (error) {
                    var errorMessage = {
                        title: "",
                        content: "",
                        statusCode: "",
                        statusMessage: "",
                        endpoint: ""
                    };
                    errorMessage.title = error.hasOwnProperty("name") ? error.name : "";
                    errorMessage.content = error.hasOwnProperty("message") ? error.message : "";
                    // If it's a HTTP error
                    if (error.hasOwnProperty("statusCode")) {
                        errorMessage.content = errorMessage.content === "" ? this.getFriendlyHTTPMessage(error) : errorMessage.content;
                        errorMessage.statusCode = error.hasOwnProperty("message") ? "" + error.statusCode : "";
                        errorMessage.statusMessage = error.response.request.statusText;
                        errorMessage.title = errorMessage.statusMessage;
                        errorMessage.endpoint = error.response.request.responseURL;
                        if (!!error.response.data)
                            this.getErrors(error).then(function (errors) { errorMessage["errors"] = errors; });
                    }
                    else if (error.hasOwnProperty("stack")) {
                        // If it's an uncaught exception
                        errorMessage.title = error.message;
                        errorMessage.stack = error.stack;
                    }
                    return errorMessage;
                };
                ErrorMessageGenerator.getErrors = function (error) {
                    var parser = new JSONLDParser.Class();
                    var mainError = {};
                    var errors = [];
                    return parser.parse(error.response.data).then(function (mainErrors) {
                        mainError = mainErrors.find(function (error) { return error["@type"].indexOf("https://carbonldp.com/ns/v1/platform#ErrorResponse") !== -1; });
                        errors = mainErrors.filter(function (error) { return error["@type"].indexOf("https://carbonldp.com/ns/v1/platform#Error") !== -1; });
                        return errors;
                    });
                };
                ErrorMessageGenerator.getFriendlyHTTPMessage = function (error) {
                    var tempMessage = "";
                    switch (true) {
                        case error instanceof HTTP.Errors.ForbiddenError:
                            tempMessage = "Forbidden Action.";
                            break;
                        case error instanceof HTTP.Errors.NotFoundError:
                            tempMessage = "Couldn't found the requested resource.";
                            break;
                        case error instanceof HTTP.Errors.UnauthorizedError:
                            tempMessage = "Unauthorized operation.";
                            break;
                        case error instanceof HTTP.Errors.InternalServerErrorError:
                            tempMessage = "An internal error occurred while trying to fetch the resource. Please try again later. Error: " + error.response.status;
                            break;
                        case error instanceof HTTP.Errors.ServiceUnavailableError:
                            tempMessage = "Service currently unavailable.";
                            break;
                        case error instanceof HTTP.Errors.UnknownError:
                            // TODO: Check if the UnknownError is due to a bad CORS configuration.
                            tempMessage = "An error occurred while trying to fetch the resource content. This could be caused by a missing allowed domain for your App. Please, make sure this is not the case and try again later.";
                            break;
                        default:
                            tempMessage = "There was a problem processing the request. Error: " + error.response.status;
                            break;
                    }
                    return tempMessage;
                };
                return ErrorMessageGenerator;
            }());
            exports_1("ErrorMessageGenerator", ErrorMessageGenerator);
            exports_1("default",ErrorMessageGenerator);
        }
    }
});

//# sourceMappingURL=error-message-generator.js.map