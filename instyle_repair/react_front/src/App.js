import React, { useEffect, useMemo, useState} from "react";
import "./styles/App.css"
import { Route, Routes, Navigate } from "react-router-dom";
import AllRepairs from "./pages/AllRepairs";
import MyRepairs from "./pages/MyRepairs";
import Header from "./components/Header";
import LoginForm from "./components/LoginForm";
import jwt_decode from 'jwt-decode';
import MasterApi from "./API/MastersAndShops";
import Login from "./API/Login";
import Statistic from "./pages/Statistic";


function App() {

  // Шапка
  const [headerLinks, setHeaderLinks] = useState()
  const changeHeaderLinks = (value) => {
    setHeaderLinks(value)
  }

  const [userLast, setUserLast] = useState({'name': '', 'userId': null})
  async function getName () {
    const token = localStorage.getItem('token')
    const decodeToken = jwt_decode(token)
    setUserLast({'name': decodeToken.name, 'userId': decodeToken.user_id})
  }

  useEffect( () => {
    getName()
  }, [])

  // Список майстрів і магазинів які отримуються з запиту
  const [mastersAndShops, setMastersAndShops] = useState({'shops': [], 'masters': []})
  async function getMastersAndShopsApi(master=null) {
      const response = await MasterApi.getAllMAndShops(master)
      setMastersAndShops({'shops': response.data.shops, 'masters': response.data.masters})
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

  // список ремонтів
  const [repairs, setRepairs] = useState([])

  // пошук
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
            username={userLast} 
            exitFunc={handleLogout} 
            searchValue={searchValue} 
            setSearchValue={setSearchValue}
            headerLinks={headerLinks}
          />

          <main className="page">
            <div className="page__container">

              <Routes>
                <Route path="/all" element={
                  <AllRepairs 
                    repairs={repairs} 
                    setRepairs={setRepairs}
                    searchedRepair={searchedRepair}
                    userLast={userLast}
                    mastersAndShops={mastersAndShops}
                    getMastersAndShopsApi={getMastersAndShopsApi}
                    setHeaderLinks={changeHeaderLinks}
                  />}
                />

                <Route path="/my" element={
                  <MyRepairs
                    repairs={repairs}
                    setRepairs={setRepairs}
                    searchedRepair={searchedRepair}
                    mastersAndShops={mastersAndShops}
                    getMastersAndShopsApi={getMastersAndShopsApi}
                    setHeaderLinks={changeHeaderLinks}
                  />}
                />

                <Route 
                  path="/statistic" element={
                    <Statistic
                      setHeaderLinks={setHeaderLinks}
                    />
                  }
                />
                
                <Route
                    path="*"
                    element={<Navigate to="/all" replace />}
                />

              </Routes>

            </div>
          </main>

        </div>

        ) : (

          <div>
            <LoginForm handleLogin={handleLogin}/>
          </div>

        )}
    </div>
    
 

  )
}

export default App;
