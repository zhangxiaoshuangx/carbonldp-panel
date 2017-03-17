"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.namespace = "https://carbonldp.com/ns/v1/platform#";
var Class = (function () {
    function Class() {
    }
    return Class;
}());
exports.Class = Class;
var Type = (function () {
    function Type() {
    }
    return Type;
}());
Type.EXPORT_BACKUP = exports.namespace + "ExportBackupJob";
Type.IMPORT_BACKUP = exports.namespace + "ImportBackupJob";
exports.Type = Type;
var ExecutionStatus = (function () {
    function ExecutionStatus() {
    }
    return ExecutionStatus;
}());
ExecutionStatus.QUEUED = exports.namespace + "Queued";
ExecutionStatus.FINISHED = exports.namespace + "Finished";
ExecutionStatus.ABORTED = exports.namespace + "Aborted";
ExecutionStatus.ERROR = exports.namespace + "Error";
ExecutionStatus.RUNNING = exports.namespace + "Running";
ExecutionStatus.UNKNOWN = exports.namespace + "Unknown";
exports.ExecutionStatus = ExecutionStatus;
var Execution = (function () {
    function Execution() {
    }
    return Execution;
}());
Execution.STATUS = exports.namespace + "status";
Execution.ERROR_DESCRIPTION = exports.namespace + "errorDescription";
exports.Execution = Execution;
