import React, { useEffect, useState } from "react";
import Repairs from "../API/Repairs";
import Content from "../components/Content";
import Sidebar from "../components/Sidebar";
import jwt_decode from 'jwt-decode';

const MyRepairs = function ({repairs, setRepairs, searchedRepair, mastersAndShops, getMastersAndShopsApi}) {

    const [activeMasters, setActiveMasters] = useState([])
    const [activeShops, setActiveShops] = useState([])
    const [sidebarResult, setSidebarResult] = useState('all')
    const [user, setUser] = useState({'name': '', 'id': ''})

  
    async function getRepairs() {
        const token = localStorage.getItem('token')
        const decodeToken = jwt_decode(token)
        const response = await Repairs.getRepairs(sidebarResult, [decodeToken.user_id], activeShops)
        setRepairs(response.data)
        setUser({'name': decodeToken.name, 'userId': decodeToken.user_id})
    }


    useEffect( () => {
        getRepairs()
        getMastersAndShopsApi()
    
    }, [activeMasters, activeShops, sidebarResult])


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
                currentUser={user} 
                repairs={searchedRepair} 
                setRepairs={setRepairs}
                getRepairs={getRepairs}
                getMastersAndShopsApi={getMastersAndShopsApi}
            />
        </div>

    )
}

export default MyRepairs;