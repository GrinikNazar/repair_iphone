import React, { useEffect, useMemo, useState } from "react";
import Content from "./components/Content";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import "./styles/App.css"
import LoginForm from "./components/LoginForm";
import jwt_decode from 'jwt-decode';
import MasterApi from "./API/MastersAndShops";
import Login from "./API/Login";
import Repairs from "./API/Repairs";


function App() {

  // Шапка
  const [userLast, setUserLast] = useState({'name': '', 'userId': null})
  async function getName () {
    const token = localStorage.getItem('token')
    const decodeToken = jwt_decode(token)
    const responseData = await MasterApi.getNameMaster(decodeToken.user_id)
    setUserLast({'name': responseData.name, 'userId': decodeToken.user_id})
  }


  // Логін
  async function handleLogin (username, password) {
    const response = await Login.login(username, password)
    if (response.status === 200) {
      const token = response.data.access
      localStorage.setItem('token', token);
      window.location.reload(); // Поки що просто релоад сторінки після запису даних
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token'); 
  }

  const isToken = () => {
    // Переробити потім на трай кетч
    const token = localStorage.getItem('token')
    if (token) {
      return true
    } 
    else {
      return false
    }
  }

  
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
  const [repairs, setRepairs] = useState([])

  async function getRepairs() {
      const response = await Repairs.getRepairs(sidebarResult, activeMasters, activeShops)
      setRepairs(response.data)
  }

  useEffect( () => {
    getName()
    getRepairs()
    getMastersAndShopsApi() 

    const interval = setInterval(() => {
      getRepairs()
      getMastersAndShopsApi()
    }, 5000);
    return () => clearInterval(interval)

  }, [activeMasters, activeShops, sidebarResult])


  const [searchValue, setSearchValue] = useState('')
  const searchedRepair = useMemo( () => {
    const imeiRepairs = repairs.filter(repair => repair.imei.includes(searchValue.toLowerCase()) || repair.number.includes(searchValue))
    return imeiRepairs
  }, [searchValue, repairs])

 
  return (
    <div>
      {isToken() ? (
        <div className="wrapper">

          <Header 
            username={userLast.name} 
            exitFunc={handleLogout} 
            searchValue={searchValue} 
            setSearchValue={setSearchValue}
          />

          <main className="page">
            <div className="page__container">
              
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
              />

            </div>
          </main>
        </div>

      ) : (
        <div>
          <LoginForm handleLogin={handleLogin}/>
        </div>
      )}
    </div>

  );
}

export default App;
