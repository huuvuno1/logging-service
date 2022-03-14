import Log, { LogModel } from "../../../models/log"

const queryLogs = async (data: any) => {
  let {q: keyword = '', limit = 20, page = 1, service = '', level = '', time_start = '', time_end = ''} = data
  let skip = (+page - 1) * +limit

  // keyword: 'not found exception' -> pattern regex: 'not|found|exception'
  let pattern = keyword.split(' ').filter((item: string) => item.trim() != '').join('|')

  let match = {
    "$and": [
      {"message": { $regex: pattern, $options: 'gi' }},
      {"service": { $regex: service, $options: 'gi' }},
      {"level": { $regex: level, $options: 'gi' }}
    ]
  } as any

  time_end = time_end ? new Date(decodeURIComponent(time_end)) : new Date()
  const timestamp = {
    $lte: time_end
  } as any

  if (time_start) {
    timestamp.$gte = new Date(decodeURIComponent(time_start))
  }
  
  match.$and.push(timestamp)
  
  try {
    const [data, count] = await Promise.all([
      LogModel.find(match).skip(+skip).limit(+limit),
      LogModel.countDocuments(match)
    ])

    return {
      totalResult: data,
      totalCount: count
    } as any
  } catch(err) {
    throw new Error(err.message)
  }
};


export { queryLogs };
