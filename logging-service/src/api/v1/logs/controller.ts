import { Request, NextFunction, Response } from 'express';
import RequestWithUser from '../../../utils/rest/request';
import fmt from '../../../utils/formatter';
import * as LogService from "./service"

const getLogs = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const logs = await LogService.queryLogs(request.query);
  response
    .status(200)
    .send(fmt.formatResponse(logs, Date.now() - request.startTime, 'OK', 1));
};

const testSave = async (request: any, response: any) => {
  const { timestamp } = request.body 
  LogService.saveLog({message: 'save', timestamp: timestamp} as any)
  response.send('oke')
}

export { getLogs, testSave };
