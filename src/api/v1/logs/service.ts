import Log, { LogModel } from "../../../models/log";
import { DocumentDefinition } from "mongoose";

const queryLogs = async (data: any) => {
  let {q: keyword = '', limit = 20, page = 1, service = '', level = '', time_start, time_end} = data

  let skip = (+page - 1) * +limit

  keyword = keyword.split(' ').filter((item: string) => item.trim() != '').join('|')

  let match = {
    "$and": []
  } as any

  keyword && match.$and.push({"message": { $regex: keyword, $options: 'gi' }})
  service && match.$and.push({"service": { $regex: service, $options: 'gi' }})
  level && match.$and.push({"level": { $regex: level, $options: 'gi' }})

  const timestamp = {} as any
  time_end && (timestamp.$lte = new Date(+time_end))
  time_start && (timestamp.$gte = new Date(+time_start))
  Object.keys(timestamp).length && match.$and.push({ timestamp })

  match.$and.length || (delete match.$and)
  
  const [result, count] = await Promise.all([
    LogModel.find(match).skip(+skip).limit(+limit),
    LogModel.countDocuments(match)
  ])

  return {
    totalResult: result,
    totalCount: count
  } as any
};

//WRITE LOGS
export async function createLog(input: DocumentDefinition<Log>) {
  try {
    return await LogModel.create(input);
  } catch (error) {
    throw new Error(error);
  }
}


export { queryLogs };
