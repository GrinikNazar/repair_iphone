import React, { useEffect, useRef, useState } from "react";
import Content from "./components/Content";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import "./styles/App.css"
import axios from "axios";
import LoginForm from "./components/LoginForm";
import jwt_decode from 'jwt-decode';

function App() {

  const [userLast, setUserLast] = useState({'name': '', 'userId': null})

  async function handleLogin (username, password) {
    const response = await axios.post('http://127.0.0.1:8000/api/token/', {
      username: username,
      password: password
    })

    if (response.status === 200) {
      const token = response.data.access
      localStorage.setItem('token', token);
      window.location.reload(); // Поки що просто релоад сторінки після запису даних
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token'); 
  }

  async function getName () {
    const token = localStorage.getItem('token')
    const decodeToken = jwt_decode(token)
    const response = await axios.post('http://127.0.0.1:8000/service/api/v2/get_current_user/', {
      user: decodeToken.user_id
    })
    setUserLast({'name': response.data.name, 'userId': decodeToken.user_id})
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

  //Частина з ремонтами
  const [activeMasters, setActiveMasters] = useState([])
  const [activeShops, setActiveShops] = useState([])
  const [sidebarResult, setSidebarResult] = useState('all')
  const [repairs, setRepairs] = useState([])

  async function getRepairs() {
      const response = await axios.get('http://127.0.0.1:8000/service/api/v2/get_rep/', {
        params: {
          'sidebar': sidebarResult,
          'masters': activeMasters.join(','),
          'shops': activeShops.join(','),
        }
      })
      setRepairs(response.data)
  }


  useEffect( () => {

    getRepairs()
    
  }, [sidebarResult, activeMasters, activeShops])


  useEffect( () => {
    getName()

    const interval = setInterval(() => {
      getRepairs()
    }, 5000);
    return () => clearInterval(interval)

  }, [activeMasters, activeShops, sidebarResult])

 
  return (
    <div>
      {isToken() ? (
        <div className="wrapper">

          <Header username={userLast.name} exitFunc={handleLogout}/>

          <main className="page">
            <div className="page__container">
              
              <Sidebar
                activeMasters={activeMasters}
                activeShops={activeShops}
                setActiveMasters={setActiveMasters}
                setActiveShops={setActiveShops}
                setSidebarResult={setSidebarResult}
              />
              
              <Content 
                currentUser={userLast} 
                repairs={repairs} 
                setRepairs={setRepairs}
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
