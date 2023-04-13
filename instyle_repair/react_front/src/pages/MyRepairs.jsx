import React, { useEffect, useState } from "react";
import Repairs from "../API/Repairs";
import Content from "../components/Content";
import Sidebar from "../components/Sidebar";

const MyRepairs = function ({repairs, setRepairs, searchedRepair, currentUser, mastersAndShops, getMastersAndShopsApi}) {

    const [activeMasters, setActiveMasters] = useState([])
    const [activeShops, setActiveShops] = useState([])
    const [sidebarResult, setSidebarResult] = useState('all')
  
    async function getRepairs() {
        // const currentUser = [currentUser.userId]
        const response = await Repairs.getRepairs(sidebarResult, [currentUser.userId], activeShops)
        setRepairs(response.data)
    }

    useEffect( () => {
        getRepairs()
        getMastersAndShopsApi()

        // const interval = setInterval(() => {
        //   getRepairs()
        //   getMastersAndShopsApi()
        // }, 5000);
        // return () => clearInterval(interval)
    
      }, [activeMasters, activeShops, sidebarResult])

    // useEffect(() => {
    //     getRepairs()
    //     getMastersAndShopsApi()
    // }, [])

    return (
        <div>
            <Sidebar
                activeMasters={activeMasters}
                activeShops={activeShops}
                setActiveShops={setActiveShops}
                setSidebarResult={setSidebarResult}
                repairs={repairs}
                mastersAndShops={mastersAndShops}
            />
            <Content 
                currentUser={currentUser} 
                repairs={searchedRepair} 
                setRepairs={setRepairs}
                getRepairs={getRepairs}
                getMastersAndShopsApi={getMastersAndShopsApi}
            />
        </div>

    )
}

export default MyRepairs;