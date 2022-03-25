import { Schema, model, Document } from 'mongoose';
import { any } from 'sequelize/types/lib/operators';
import mongoosastic, { MongoosasticModel, MongoosasticDocument } from 'mongoosastic'


export const DOCUMENT_NAME = 'Log';
export const COLLECTION_NAME = 'logs';

export enum LogLevel {
  INFO = 'INFO',
  FATAL = 'FATAL',
  ERROR = 'ERROR',
  WARN = 'WARN',
  DEBUG = 'DEBUG',
  TRACE = 'TRACE'
}

export default interface Log extends Document, MongoosasticDocument {
  level: string;
  message: string;
  service: string;
  meta: any,
  timestamp?: Date;
}

const schema = new Schema(
  {
    level: {
      type: Schema.Types.String,
      required: true,
      enum: Object.values(LogLevel),
      es_indexed: true
    },
    message: {
      type: Schema.Types.String,
      default: '',
      es_indexed: true
    },
    service: {
      type: Schema.Types.String,
      default: '',
      es_indexed: true
    },
    timestamp: {
      type: Date,
      required: true,
      es_indexed: true
    },
    meta: {
      type: Schema.Types.Mixed,
        required: false
    }
  },
  {
    versionKey: false,
  },
);

schema.index({
  message: 'text'
}, {
  name: 'log_message_index'
})

schema.plugin(mongoosastic)

export const LogModel = model<Log, MongoosasticModel<Log>>(DOCUMENT_NAME, schema, COLLECTION_NAME)

/* 
 ___Run only once when you want to sync old data___

var stream = LogModel.synchronize();
var count = 0;
var time = new Date()

stream.on('data', (err, doc) => {
  console.log(doc)
  count++;
});
stream.on('close', () => console.log('indexed ' + count + ' documents!', 'time: ', time.toLocaleTimeString(), new Date().toLocaleTimeString()));
stream.on('error', (err) => console.log(err));

*/