import axios from "axios";

export default class SendMessageBot {
    static async sendMessage(number, price) {
        const response = await axios.post('https://api.telegram.org/bot6166447970:AAGXtRoaNVgE_oy2NiyATPYEkQvD1qLCmo4/sendMessage', {
        'chat_id': -1001355858016,
        'text': `${number}***${price}`
        })
        return response
    }

}