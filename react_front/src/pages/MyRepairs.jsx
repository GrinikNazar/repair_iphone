import React, { useEffect, useState } from "react";
import Repairs from "../API/Repairs";
import Content from "../components/Content";
import Sidebar from "../components/Sidebar";
import jwt_decode from 'jwt-decode';

const MyRepairs = function ({repairs, setRepairs, searchedRepair, mastersAndShops, getMastersAndShopsApi, setHeaderLinks}) {

    const [activeMasters, setActiveMasters] = useState([])
    const [activeShops, setActiveShops] = useState([])
    const [sidebarResult, setSidebarResult] = useState('all')
    const [user, setUser] = useState({ 'name': '', 'id': '' })
    
    // Стан чекбоксу
    const [isCheked, setIsCheked] = useState(false)
    const handleCheckboxChange = (event) => {
        setIsCheked(event.target.checked)
    }

    async function getRepairs() {
        const token = localStorage.getItem('token')
        const decodeToken = jwt_decode(token)
        const response = await Repairs.getRepairs(sidebarResult, [decodeToken.user_id], activeShops, isCheked)
        getMastersAndShopsApi(decodeToken.user_id)
        setRepairs(response.data)
        setUser({'name': decodeToken.name, 'userId': decodeToken.user_id})
    }

    useEffect( () => {
        setHeaderLinks('/my')
        getRepairs()

        const interval = setInterval(() => {
            getRepairs()
          }, 5000);
          return () => clearInterval(interval)
    
    }, [activeMasters, activeShops, sidebarResult, isCheked])


    return (
        <div>
            <Sidebar
                activeMasters={null}
                activeShops={activeShops}
                setActiveShops={setActiveShops}
                setSidebarResult={setSidebarResult}
                isCheked={isCheked}
                handleCheckboxChange={handleCheckboxChange}
                repairs={repairs}
                mastersAndShops={mastersAndShops}
                userLast={user}
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