import axios from "axios";

export default class Repairs {
    static async getRepairs(sidebarResult, activeMasters, activeShops) {
        const response = await axios.get('http://127.0.0.1:8000/service/api/v2/get_rep/', {
            params: {
              'sidebar': sidebarResult,
              'masters': activeMasters.join(','),
              'shops': activeShops.join(','),
            }
        })
        return response
    }

    static async getCountRepairs(master, activeMasters) {
        if (activeMasters === null){
            const response = await axios.get('http://127.0.0.1:8000/service/api/v2/count_repairs/', {
                params: {
                    master: master
                }
            })
            return response
        } else {
            const response = await axios.get('http://127.0.0.1:8000/service/api/v2/count_repairs/', {
                params: {
                    master: null
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
