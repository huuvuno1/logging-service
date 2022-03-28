import { Schema, model, Document, startSession } from 'mongoose';
import { any } from 'sequelize/types/lib/operators';
import mongoosastic, { MongoosasticModel, MongoosasticDocument } from 'mongoosastic'
import { Client } from '@elastic/elasticsearch'


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
        required: false,
        es_indexed: false,
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

const esClient = new Client({ node: 'http://localhost:9200' })

schema.plugin(mongoosastic, { esClient })

export const LogModel = model<Log, MongoosasticModel<Log>>(DOCUMENT_NAME, schema, COLLECTION_NAME)
