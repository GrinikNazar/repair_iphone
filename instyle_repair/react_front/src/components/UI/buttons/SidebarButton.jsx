const SidebarButton = function ({activeItem, target, setActiveItem}) {

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
            {target.name}
        </button>
    )
}

export default SidebarButton;