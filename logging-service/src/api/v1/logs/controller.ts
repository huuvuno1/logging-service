import { Request, NextFunction, Response } from 'express';
import RequestWithUser from 'utils/rest/request';
import fmt from 'utils/formatter';
import * as service from './service'

const getLogs = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const {q: keyword = '', limit = 20, page = 1, service_id = null, sort = null, level = null}: any = request.query

  console.log(request.query)

  const logs = await service.queryLogs(keyword, limit, page, service_id, level, sort);
  response
    .status(200)
    .send(fmt.formatResponse(logs, Date.now() - request.startTime, 'OK', 1));
};

export { getLogs };
