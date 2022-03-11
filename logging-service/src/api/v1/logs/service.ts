import { dataText } from "utils/formatter";
import Log, { LogModel } from "../../../models/log"

const queryLogs = async (data: any) => {
  let {q: keyword = '', limit = 20, page = 1, service = '', level = '', time_start = '', time_end = ''} = data
  let skip = (+page - 1) * +limit

  // keyword: 'not found exception' -> pattern regex: 'not|found|exception'
  let pattern = keyword.trim().split(' ').filter((item: string) => item.trim() != '').join('|')

  let match = {
    "$and": [
      {"message": { $regex: pattern, $options: 'gi' }},
      {"service": { $regex: service, $options: 'gi' }},
      {"level": { $regex: level, $options: 'gi' }}
    ]
  } as any

  if (time_start) {
    match.$and.push({"timestamp":{$gte: new Date(time_start), $lte: new Date(time_end)}})
  }

  let result: any = await LogModel.aggregate([
    { 
      "$facet": { 
        "totalData": [
          { 
            "$match": match
          }, 
          { 
            "$skip": +skip
          }, 
          { 
            "$limit": +limit
          }
        ],     
        "totalResult": [ { 
          "$match": match
        }, { "$count": "count" }]
      }
    } 
  ])
  return result
};


const saveLog = ({message, timestamp}: any) => {
  LogModel.create({
    message,
    timestamp,
    createdAt: new Date(),
    level: 'INFO'
  })
}


export { queryLogs, saveLog };
