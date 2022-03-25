import { Connection, Channel, connect, Message } from "amqplib";
import config from "../config";
import { createLog } from 'api/v1/logs/service'

async function configRabbitMQ() {
    const uri = `${config.rabbitMQ.protocol}://guest:guest@${config.rabbitMQ.host}` 
    console.log('uri', uri)
    const conn = await connect(uri)
    const channel: Channel = await conn.createChannel()

    channel.assertQueue('logs', {
        durable: false,
        arguments: {
            "x-message-ttl": 0
        }
    })
    
    channel.consume('logs', msg => {
        const data = JSON.parse(JSON.parse(msg.content.toString()))
        const log =  {...data, timestamp: new Date(data.timestamp)}
        console.log('receive log: ', log)
        createLog(log)
    })
}

export default configRabbitMQ