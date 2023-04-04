import axios from "axios";
import RepairItem from "./RepairItem";

const Content = function ({currentUser, repairs, setRepairs}) {

    async function applyRepair(repairId, status) {
        const response = await axios.post('http://127.0.0.1:8000/service/api/v2/apply_master/', {
            'repair_id': repairId,
            'master_id': currentUser.userId,
            'status': status
        })

        setRepairs(repairList => {
            const newRepList = repairList.map(repair => {
                if (repair.id === response.data.id) {
                    return response.data
                }
                return repair
            })
            return newRepList
        })
    }

    return (
        <div className="page__main main-content">

            <div className="main-content__items">
                {repairs.map( (repair) =>
                    <RepairItem key={repair.id} repair={repair} applyRepair={applyRepair}/>
                )}
            </div>

        
        </div>

    )
}

export default Content;