import { Connection, Channel, connect, Message } from "amqplib";
import config from "../config";
import { createLog } from 'api/v1/logs/service'

async function configRabbitMQ() {
    const uri = `${config.rabbitMQ.protocol}://${config.rabbitMQ.username}:${config.rabbitMQ.password}@${config.rabbitMQ.host}` 
    console.log('uri', uri)
    const conn = await connect(uri)
    const channel: Channel = await conn.createChannel()

    channel.assertQueue('logs', {
        durable: true,
        arguments: {
            "x-message-ttl": 60000
        }
    })
    
    channel.consume('logs', msg => {
        const data = JSON.parse(JSON.parse(msg.content.toString()))
        const log =  {...data, timestamp: new Date(data.timestamp)}
        console.log('log received: ', log)
        createLog(log)
    })
}

export default configRabbitMQ