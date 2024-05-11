import axios from "axios";
import iP from './ForTestIP.js';


export default class Repairs {

    static async ipTestAdress() {
        let ipTest

        if (iP) {
            ipTest = iP
        } 
        else {
            ipTest = NaN
        }
        return ipTest
    }

    static async getRepairs(sidebarResult, activeMasters, activeShops, isCheked) {
        const response = await axios.get(ipTestAdress() + 'service/api/v2/get_rep/', {
            params: {
              'sidebar': sidebarResult,
              'masters': activeMasters.join(','),
              'shops': activeShops.join(','),
              'checked': isCheked,
            }
        })
        return response
    }

    static async getCountRepairs(master, activeMasters, isCheked) {
        if (activeMasters === null){
            const response = await axios.get('http://127.0.0.1:8000/service/api/v2/count_repairs/', {
                params: {
                    master: master,
                    checked: isCheked
                }
            })
            return response
        } else {
            const response = await axios.get('http://127.0.0.1:8000/service/api/v2/count_repairs/', {
                params: {
                    master: null,
                    checked: isCheked
                }
                })
            return response
        }

    }

    static async applyRepair(repairId, status, currentUser) {
        const response = await axios.post('http://127.0.0.1:8000/service/api/v2/apply_master/', {
            'repair_id': repairId,
            'master_id': currentUser.userId,
            'status': status
        })
        return response
    }

    static async deleteMaster(repairId, masterId, status) {
        const response = await axios.put('http://127.0.0.1:8000/service/api/v2/apply_master/', {
            'repair_id': repairId,
            'master_id': masterId,
            'status': status
        })
        return response
    }

}
