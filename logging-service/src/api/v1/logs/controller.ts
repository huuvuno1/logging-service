import { Request, NextFunction, Response } from 'express';
import RequestWithUser from '../../../utils/rest/request';
import fmt from '../../../utils/formatter';
import * as LogService from "./service"
import { HttpException } from 'exceptions';

const getLogs = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  try {
    const logs = await LogService.queryLogs(request.query);
    response
    .status(200)
    .send(fmt.formatResponse(logs, Date.now() - request.startTime, 'OK', 1));
  }
  catch(err) {
    throw new HttpException(500, err.message, "")
  }
};

export { getLogs };