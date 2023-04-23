import React, { useEffect, useState } from "react";
import Content from "../components/Content";
import Sidebar from "../components/Sidebar";
import Repairs from "../API/Repairs";


function AllRepairs({repairs, setRepairs, searchedRepair, userLast, mastersAndShops, getMastersAndShopsApi, setHeaderLinks}) {

  //Частина з ремонтами
  const [activeMasters, setActiveMasters] = useState([])
  const [activeShops, setActiveShops] = useState([])
  const [sidebarResult, setSidebarResult] = useState('all')

  async function getRepairs() {
      const response = await Repairs.getRepairs(sidebarResult, activeMasters, activeShops)
      setRepairs(response.data)
  }

  useEffect( () => {
    setHeaderLinks('/all')
    getRepairs()
    getMastersAndShopsApi() 

    const interval = setInterval(() => {
      getRepairs()
      getMastersAndShopsApi()
    }, 5000);
    return () => clearInterval(interval)

  }, [activeMasters, activeShops, sidebarResult])

 
  return (
    <div>
        <Sidebar
            activeMasters={activeMasters}
            activeShops={activeShops}
            setActiveMasters={setActiveMasters}
            setActiveShops={setActiveShops}
            setSidebarResult={setSidebarResult}
            repairs={repairs}
            mastersAndShops={mastersAndShops}
            userLast={userLast}
        />
        
        <Content 
            currentUser={userLast} 
            repairs={searchedRepair} 
            setRepairs={setRepairs}
            getRepairs={getRepairs}
            getMastersAndShopsApi={getMastersAndShopsApi}
        />
    </div>

  );
}

export default AllRepairs;
