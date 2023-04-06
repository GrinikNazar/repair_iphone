import React, { useState, useEffect } from "react";
import axios from "axios";

const Sidebar = function ({activeMasters, activeShops, setActiveMasters, setActiveShops, setSidebarResult, repairs}) {

    // Список майстрів і магазинів які отримуються з запиту
    const [mastersAndShops, setMastersAndShops] = useState({'shops': [], 'masters': []})
    async function getMastersAndShopsApi() {
        const response = await axios.get('http://127.0.0.1:8000/service/api/v2/get_shops_and_masters/')
        setMastersAndShops({'shops': response.data.shops, 'masters': response.data.masters})
    }

    const [repairsCount, setRepairsCount] = useState({})
    async function getRepairsCount() {
        const response = await axios.get('http://127.0.0.1:8000/service/api/v2/count_repairs/')
        setRepairsCount({
            'all': response.data.all,
            'closed': response.data.closed,
            'warranty': response.data.warranty,
            'new': response.data.new,
        })
    }

    useEffect( () => {
        getMastersAndShopsApi()
      }, [])


    useEffect( () => {
        getRepairsCount()
    }, [repairs])


    // Активні кнопки майстрів або магазинів
    const changeAvtiveMastersOrShops = (id, setState) => {
        setState(state => 
            state.some(i => i === id)
            ? [...state.filter(m => m !== id)]
            : [...state, id]
        )
    }

    // Сайдбар з одиничним вибором
    const listSB = [
        {id: 1, name: 'Всі', active: true, nameStatus: 'all'},
        {id: 2, name: 'Виконані', active: false, nameStatus: 'closed',},
        {id: 3, name: 'Гарантійні', active: false, nameStatus: 'warranty',},
        {id: 4, name: 'Не прийняті', active: false, nameStatus: 'new',},
    ]
    const [listSideBar, setListSideBar] = useState(listSB)
    const sidebarItemChange = (sidebarItem) => {
        setListSideBar(listSideBar =>
            listSideBar.map(item =>
                item.id === sidebarItem.id
                ? {...item, active: true}
                : {...item, active: false})
        )
        setSidebarResult(sidebarItem.nameStatus)
    }


    return (
        <div className="page__sidebar sidebar">
            <div className="sidebar__container">
                <div className="sidebar__all">

                    <div className="sidebar__repairs repairs-sidebar">
                        <h3 className="repairs-sidebar__title title">Ремонти</h3>
                        {listSideBar.map( (sidebarItem, index) =>
                            <div key={index} className="repairs-sidebar__item ">
                                <a  style={{cursor: 'pointer'}}
                                    className={sidebarItem.active ?"repairs-sidebar__link done" : "repairs-sidebar__link"}
                                    onClick={() => sidebarItemChange(sidebarItem)} 
                                >
                                    {sidebarItem.name} [{repairsCount[sidebarItem.nameStatus]}]
                                </a>
                            </div>
                        )}
                    </div>


                    <div className="sidebar__shops shops-sidebar">
                        <h3 className="shops-sidebar__title title">Магазини</h3>

                        <div className="shops-sidebar__buttons">
                            {mastersAndShops.shops.map( (shop) =>
                                    <button
                                        key={shop.id}
                                        type="button" 
                                        onClick={() => changeAvtiveMastersOrShops(shop.id, setActiveShops)}
                                        className={activeShops.some(i => shop.id === i) ? "shops-sidebar__button button-sidebar _active-button" : "shops-sidebar__button button-sidebar"}
                                    >
                                        
                                        {shop.name}
                                    </button>

                            )}
                        </div>
                    </div>

                    <div className="sidebar__workers workers-sidebar">
                        <h3 className="workers-sidebar__title title">Майстри</h3>

                        <div className="workers-sidebar__buttons">
                           {mastersAndShops.masters.map( (master) =>
                                <button
                                    key={master.id}
                                    type="button" 
                                    onClick={() => changeAvtiveMastersOrShops(master.id, setActiveMasters)}
                                    className={activeMasters.some(i => master.id === i) ? "shops-sidebar__button button-sidebar _active-button" : "shops-sidebar__button button-sidebar"}
                                >
                                    
                                    {master.name}
                                </button>
                           )}
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default Sidebar;