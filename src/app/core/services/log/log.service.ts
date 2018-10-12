import { Injectable } from "@angular/core";
import { ILogService } from "./ilog.service";
import { LogMessage, LogTypes } from "../../models/log.message";

/**
 * Log Service
 */
@Injectable()
export class LogService implements ILogService {
    log(msg: LogMessage) {
       // if(msg.LogType == LogTypes.Error)
           // console.error(msg);
//else
           // console.log(msg);
    }
    logAction(action: string, tag: string) {
        console.log(action + ' ' + tag);
    }
    logError(error: string, tag: string) {
        console.error(error + ' ' + tag);
    }
}