System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var namespace, Class, Type, ExecutionStatus, Execution;
    return {
        setters:[],
        execute: function() {
            exports_1("namespace", namespace = "https://carbonldp.com/ns/v1/platform#");
            Class = (function () {
                function Class() {
                }
                return Class;
            }());
            exports_1("Class", Class);
            Type = (function () {
                function Type() {
                }
                Type.EXPORT_BACKUP = namespace + "ExportBackupJob";
                Type.IMPORT_BACKUP = namespace + "ImportBackupJob";
                return Type;
            }());
            exports_1("Type", Type);
            ExecutionStatus = (function () {
                function ExecutionStatus() {
                }
                ExecutionStatus.QUEUED = namespace + "Queued";
                ExecutionStatus.FINISHED = namespace + "Finished";
                ExecutionStatus.ABORTED = namespace + "Aborted";
                ExecutionStatus.ERROR = namespace + "Error";
                ExecutionStatus.RUNNING = namespace + "Running";
                ExecutionStatus.UNKNOWN = namespace + "Unknown";
                return ExecutionStatus;
            }());
            exports_1("ExecutionStatus", ExecutionStatus);
            Execution = (function () {
                function Execution() {
                }
                Execution.STATUS = namespace + "status";
                Execution.ERROR_DESCRIPTION = namespace + "errorDescription";
                return Execution;
            }());
            exports_1("Execution", Execution);
        }
    }
});

//# sourceMappingURL=job.js.map
