import { Message } from "../message.component";
import { Error as HTTPError } from "carbonldp/HTTP/Errors";
export declare class ErrorMessageGenerator {
    static getErrorMessage(error: HTTPError): Message;
    private static getErrors(error);
    private static getFriendlyHTTPMessage(error);
}
