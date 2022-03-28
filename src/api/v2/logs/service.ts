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
                fuzziness: "AUTO"
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
  const data: any = await LogModel.esSearch({
    size: 0,
    aggs: {
      overview: {
        terms: {
          field: "level.keyword"
        }
      }
    }
  })

  return [ ...data.body.aggregations.overview.buckets ]
}

const logTracking = async (params: any) => {
  let { time_start = (new Date().getTime() - 50000), time_end = new Date().getTime() } = params
  time_start = +time_start
  time_end = +time_end

  const genQuery = (gte: number, lte: number) => {
    return {
      "size": 0,
      "query": {
        "bool": {
          "must": [
            {
              "range": {
                "timestamp": {
                  "gte": gte,
                  "lte": lte
                }
              }
            }
          ]
        }
      },
      "aggs": {
        "tracking": {
          "terms": {
            "field": "level.keyword"
          }
        }
      }
    }
  }

  const time_distance = Math.floor((time_end - time_start) / 7)

  const data: any = await Promise.all(
    Array.from({ length: 7 })
      .map((v, index) => LogModel.esSearch(genQuery(time_start + (time_distance * (index - 1)), time_start + (time_distance * index))))
  )

  const result = data.map((value: any) => value.body.aggregations.tracking.buckets)
  return result
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

export { queryLogs, getOverview, getListServices, logTracking };

// query: keyword,
// fuzziness: 'auto'