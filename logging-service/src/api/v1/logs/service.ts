import { dataText } from "utils/formatter";
import { LogModel } from "../../../models/log"

const queryLogs = async (keyword = '', limit = 20, page = 1, service?: any, level?: string, sort?: any) => {
  let skip = (page - 1) * limit
  let pattern = keyword.trim().split(' ').filter(item => item.trim() != '').join('|')
  let data: any = await LogModel.aggregate([
    { 
      "$facet": { 
        "totalData": [
          { 
            "$match": {
              "$and": [
                {"message": { $regex: pattern, $options: 'i' }}
              ]
            }
          }, 
          { 
            "$skip": skip
          }, 
          { 
            "$limit": +limit
          }
        ],     
        "totalResult": [ { 
          "$match": {
            "message": { $regex: pattern, $options: 'i' }
          }
        }, { "$count": "count" }]
      }
    } 
  ])
  return data
};



export { queryLogs };

/*
{
    message: { $regex: pattern, $options: 'i' }
  }
*/