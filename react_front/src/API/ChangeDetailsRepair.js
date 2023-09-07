import axios from "axios";

export default class DetailsRepair {
    static async detailsRepair(nameId, repairId, value, moment) {
        const response = await axios.put('service/api/v2/change_details/', {
            'name': nameId,
            'id': repairId,
            'value': value,
            'moment': moment,
        })
        return response
    }

}