import React, { useEffect, useState } from "react";
import Content from "../components/Content";
import Sidebar from "../components/Sidebar";
import MasterApi from "../API/MastersAndShops";
import Repairs from "../API/Repairs";


function AllRepairs({repairs, setRepairs, searchedRepair, userLast}) {
  
  // Список майстрів і магазинів які отримуються з запиту
  const [mastersAndShops, setMastersAndShops] = useState({'shops': [], 'masters': []})
  async function getMastersAndShopsApi() {
      const response = await MasterApi.getAllMAndShops()
      setMastersAndShops({'shops': response.data.shops, 'masters': response.data.masters})
  }


  //Частина з ремонтами
  const [activeMasters, setActiveMasters] = useState([])
  const [activeShops, setActiveShops] = useState([])
  const [sidebarResult, setSidebarResult] = useState('all')

  async function getRepairs() {
      const response = await Repairs.getRepairs(sidebarResult, activeMasters, activeShops)
      setRepairs(response.data)
  }

  useEffect( () => {
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
