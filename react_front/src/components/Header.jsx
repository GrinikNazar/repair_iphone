import React, { useEffect, useState} from "react";
import { Link } from "react-router-dom";


const Header = function ({username, exitFunc, searchValue, setSearchValue, headerLinks}) {

    const listHeader = [
        {id: 1, name: 'Всі ремонти', active: false, link: '/all'},
        {id: 2, name: 'Мої ремонти', active: false, link: '/my'},
        {id: 3, name: 'Статистика', active: false, link: '/statistic'},
    ]

    const [listHeaderMenu, setListHeaderMenu] = useState(listHeader)

    const headerMenuChange = (headerItem) => {
        setListHeaderMenu(listHeaderMenu =>
            listHeaderMenu.map(item =>
                item.link === headerItem
                ? {...item, active: true}
                : {...item, active: false})
        )
    }

    useEffect( () => {
        headerMenuChange(headerLinks)
    }, [headerLinks])

    return (
        <header className="header">
            <div className="header__container">

                <a href="/all" className="header__logo">
                INSTYLE <span>REPAIR</span>
                </a>

                <div className="header__search search-header">
                    <input 
                        type="text"
                        className="search-header__input"
                        value={searchValue}
                        onChange={event => setSearchValue(event.target.value)}
                    />
                    <button type="submit" className="search-icon search-icon-image"></button>
                </div>

                <div className="header__menu menu">
                <nav className="menu__body">
                    <div className="menu__list-login">{username.name}</div>
                    <ul className="menu__list">
                        {listHeaderMenu.map( (headerMenuItem, index) => 
                            <li key={index}>
                                <Link
                                    to={headerMenuItem.link} 
                                    className={headerMenuItem.active ? "menu__link active" : "menu__link"}
                                >
                                    {headerMenuItem.name}
                                </Link>
                            </li>
                        )}
                    </ul>
                    <a href="" className="menu__list-exit" onClick={() => exitFunc()}>Вихід</a>
                </nav>

                <div className="menu__icon icon-menu">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                </div>
            </div>
        </header>
    )
}

export default Header;