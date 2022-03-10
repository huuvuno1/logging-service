import { Schema, model, Document } from 'mongoose';
import { any } from 'sequelize/types/lib/operators';

export const DOCUMENT_NAME = 'Log';
export const COLLECTION_NAME = 'logs';

export const enum LogLevel {
  INFO = 'INFO',
  FATAL = 'FATAL',
  ERROR = 'ERROR',
  WARN = 'WARN',
  DEBUG = 'DEBUG',
  TRACE = 'TRACE'
}

export default interface Log extends Document {
  level: string;
  message: string;
  meta: any,
  timestamp?: Date;
  createdAt?: Date;
}

const schema = new Schema(
  {
    level: {
      type: Schema.Types.String,
      required: true,
      enum: [LogLevel.DEBUG, LogLevel.ERROR, LogLevel.FATAL, LogLevel.INFO, LogLevel.TRACE, LogLevel.WARN],
    },
    message: {
      type: Schema.Types.String,
      default: true
    },
    createdAt: {
      type: Date,
      required: true,
      select: false,
    },
    timestamp: {
      type: Date,
      required: true,
      select: false,
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

export const LogModel = model<Log>(DOCUMENT_NAME, schema, COLLECTION_NAME);
