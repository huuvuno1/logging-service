import { Schema, model, Document } from 'mongoose';
import { any } from 'sequelize/types/lib/operators';

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
      enum: Object.values(LogLevel),
    },
    message: {
      type: Schema.Types.String,
      default: ''
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
