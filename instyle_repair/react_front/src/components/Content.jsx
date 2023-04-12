import RepairItem from "./RepairItem";
import Repairs from "../API/Repairs";

const Content = function ({currentUser, repairs, setRepairs, getRepairs, getMastersAndShopsApi}) {

    async function applyRepair(repairId, status) {
        const response = await Repairs.applyRepair(repairId, status, currentUser)

        setRepairs(repairList => {
            const newRepList = repairList.map(repair => {
                if (repair.id === response.data.id) {
                    return response.data
                }
                return repair
            })
            return newRepList
        })

        if (response.data.status === 'accepted') {
            getMastersAndShopsApi()
        }

        if (status === 'accepted') {
            getRepairs()
            getMastersAndShopsApi()
        }
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