import React from 'react';
import "../buttons/SidebarButton.css"

const SidebarButton = function ({activeItem, target, setActiveItem, activeCount}) {

    // Активні кнопки майстрів або магазинів
    const changeAvtiveMastersOrShops = (id, setState) => {
        setState(state => 
            state.some(i => i === id)
            ? [...state.filter(m => m !== id)]
            : [...state, id]
        )
    }

    return (
        <button
            type="button" 
            onClick={() => changeAvtiveMastersOrShops(target.id, setActiveItem)}
            className={`shops-sidebar__button button-sidebar ${activeItem.some(i => target.id === i) ? "_active-button" : ""}`}
        >
            <div className='content-button'>
                <div className="button-item">{target.name}</div>
                <span className="button-count">{activeCount}</span>
            </div>
        </button>
    )
}

export default SidebarButton;