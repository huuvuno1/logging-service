import Log, { LogModel } from "../../../models/log";
import { DocumentDefinition } from "mongoose";

const queryLogs = async (data: any) => {
  let {q: keyword = '', limit = 20, page = 1, service = '', level = '', time_start, time_end} = data

  let skip = (+page - 1) * +limit
  skip < 0 && (skip = 0)

  const filter = [
    {
      "range": {
        "timestamp": {
          "gte": time_start,
          "lte": time_end
        }
      }
    }
  ]

  let condition = {
      bool: {
        must: [
          { 
            match: { 
              message: {
                query: keyword,
                fuzziness: "auto"
              }
            }
          },
          {
            match: {
              service: {
                query: service
              }
            }
          },
          {
            match: {
              level: {
                query: level
              }
            }
          }
        ],
        filter: [
          {
            "range": {
              "timestamp": {
                "gte": new Date(+time_start),
                "lte": new Date(+time_end)
              }
            }
          }
        ]
      }
    
  }

  condition.bool.must = condition.bool.must.filter(value => (value.match.level || value.match.service || value.match.message).query !== '')

  const result = await LogModel.search(condition as any, {
    from: skip,
    size: limit
  } as any)

  return result as any
};

const getQueryLevel = (level: string) => ({
  regexp: {
    level: {
      value: level,
      flags: "ALL",
      case_insensitive: true
    }  
  }
})

const getOverview = async () => {
  const [totalRecord, info, error, warn] = await Promise.all([
    LogModel.esCount(),
    LogModel.esCount(getQueryLevel("INFO|DEBUG|TRACE")),
    LogModel.esCount(getQueryLevel("FATAL|ERROR")),
    LogModel.esCount(getQueryLevel("WARN")),
  ])

  return { totalRecord: totalRecord.body.count, info: info.body.count, error: error.body.count, warn: warn.body.count }
}


const getListServices = async () => {
  const data = await LogModel.esSearch({
    aggs: {
      unique_names: {
        terms: {
          field: 'service'
        }
      }
    }
  })

  return data
}

export { queryLogs, getOverview, getListServices };

// query: keyword,
// fuzziness: 'auto'