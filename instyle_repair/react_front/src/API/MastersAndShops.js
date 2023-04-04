import axios from "axios";

export default class MastersAndShops {
    static async getAllMAndShops() {
        const response = await axios.get('http://127.0.0.1:8000/service/api/v2/get_shops_and_masters/')
        return response
        }
    }