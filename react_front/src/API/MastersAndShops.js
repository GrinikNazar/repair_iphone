import axios from "axios";

export default class MasterApi {
    static async getAllMAndShops(master=null) {
        if (master === null){
            const response = await axios.get('http://127.0.0.1:8000/service/api/v2/get_shops_and_masters/', {
                params: {
                    master: master
                }
            })
            return response
        } else {
            const response = await axios.get('http://127.0.0.1:8000/service/api/v2/get_shops_and_masters/', {
                params: {
                    master: master
                }
            })
            return response
        }

        }

    static async getNameMaster(token) {
        const response = await axios.get('http://127.0.0.1:8000/service/api/v2/get_current_user/', {
            params: {
              user: token
            }
        })
        return response.data
    }
}