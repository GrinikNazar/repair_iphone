import RepairItem from "./RepairItem";
import Repairs from "../API/Repairs";
// import { CSSTransition, TransitionGroup } from "react-transition-group";

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
            {/* <TransitionGroup className="main-content__items"> */}
                {repairs.map( (repair) =>
                    // <CSSTransition
                    //     key={repair.id}
                    //     timeout={400}
                    //     classNames="repairphone"
                    // >
                        <RepairItem key={repair.id} repair={repair} applyRepair={applyRepair}/>
                    // </CSSTransition>
                )}
            {/* </TransitionGroup> */}
            </div>
        </div>

    )
}

export default Content;