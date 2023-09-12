import axios from "axios";

export default class SendMessageBot {
    static async sendMessage(number, price) {
        const response = await axios.post('https://api.telegram.org/bot6076395112:AAEdPr_UP2lHMNfXHwSclPqNFPnaR1iIkSs/sendMessage', {
        'chat_id': -1001355858016,
        'text': `${number}***${price}`
        })
        return response
    }

}