import React, { useState, useEffect } from "react";
import Repairs from "../API/Repairs";
import SidebarButton from "./UI/buttons/SidebarButton";
import SwitchButton from "./UI/buttons/SwitchButton";


const Sidebar = function ({ activeMasters, activeShops, setActiveMasters, setActiveShops, setSidebarResult, repairs, mastersAndShops, userLast, isCheked, handleCheckboxChange }) {

    const [repairsCount, setRepairsCount] = useState({})
    async function getRepairsCount() {
        const response = await Repairs.getCountRepairs(userLast.userId, activeMasters)
        setRepairsCount({
            'all': response.data.all,
            'closed': response.data.closed,
            'warranty': response.data.warranty,
            'new': response.data.new,
            'inprogress': response.data.inprogress,
        })
    }

    useEffect(() => {
        getRepairsCount()
    }, [repairs])


    // Сайдбар з одиничним вибором
    const listSB = [
        { id: 1, name: 'Всі', active: true, nameStatus: 'all', visible: true },
        { id: 5, name: 'В роботі', active: false, nameStatus: 'inprogress', visible: true },
        { id: 2, name: 'Виконані', active: false, nameStatus: 'closed', visible: true },
        { id: 3, name: 'Гарантійні', active: false, nameStatus: 'warranty', visible: true },
        { id: 4, name: 'Не прийняті', active: false, nameStatus: 'new', visible: false },
    ]

    function changeVisibleSidebarMenu(listSB) {
        if (activeMasters === null) {
            const newList = []
            for (let item of listSB) {
                if (item.visible === true) {
                    newList.push(item)
                }
            }
            return newList
        } else return listSB
    }

    const [listSideBar, setListSideBar] = useState(changeVisibleSidebarMenu(listSB))
    const sidebarItemChange = (sidebarItem) => {
        setListSideBar(listSideBar =>
            listSideBar.map(item =>
                item.id === sidebarItem.id
                    ? { ...item, active: true }
                    : { ...item, active: false })
        )
        setSidebarResult(sidebarItem.nameStatus)
    }


    return (
        <div className="page__sidebar sidebar">
            <div className="sidebar__container">
                <div className="sidebar__all">

                    <div className="sidebar__repairs repairs-sidebar">
                        <h3 className="repairs-sidebar__title title">Ремонти</h3>
                        {listSideBar.map((sidebarItem, index) =>
                            <div key={index} className="repairs-sidebar__item ">
                                <span
                                    className={sidebarItem.active ? "repairs-sidebar__link done" : "repairs-sidebar__link"}
                                    onClick={() => sidebarItemChange(sidebarItem)}
                                >
                                    {sidebarItem.name} [{repairsCount[sidebarItem.nameStatus]}]
                                </span>
                                <div>
                                    {sidebarItem.id === 1
                                        ? < SwitchButton
                                            isCheked={isCheked}
                                            handleCheckboxChange={handleCheckboxChange}
                                        />
                                        : null
                                    }
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="sidebar__shops shops-sidebar">
                        <h3 className="shops-sidebar__title title">Магазини</h3>
                        <div className="shops-sidebar__buttons">
                            {mastersAndShops.shops.map((shop) =>
                                <SidebarButton key={shop.id}
                                    activeItem={activeShops}
                                    setActiveItem={setActiveShops}
                                    target={shop}
                                    activeCount={shop.count_active}
                                />
                            )}
                        </div>
                    </div>

                    {activeMasters
                        ? <div className="sidebar__workers workers-sidebar">
                            <h3 className="workers-sidebar__title title">Майстри</h3>
                            <div className="workers-sidebar__buttons">
                                {mastersAndShops.masters.map((master) =>
                                    <SidebarButton key={master.id}
                                        activeItem={activeMasters}
                                        setActiveItem={setActiveMasters}
                                        target={master}
                                        activeCount={master.count_active}
                                    />
                                )}
                            </div>
                        </div>
                        : <div></div>
                    }

                </div>
            </div>
        </div>
    )
}

export default Sidebar;