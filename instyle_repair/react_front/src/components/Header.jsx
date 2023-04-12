import React from "react";
import { Link } from "react-router-dom";


const Header = function ({username, exitFunc, searchValue, setSearchValue}) {

    return (
        <header className="header">
            <div className="header__container">

                <a href="#" className="header__logo">
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
                    <div className="menu__list-login">{username}</div>
                    <ul className="menu__list">
                        <li><Link to="/all" className="menu__link">Всі ремонти</Link></li>
                        <li><Link to="/my" className="menu__link">Мої ремонти</Link></li>
                        <li><Link to="/statistic" className="menu__link">Статистика</Link></li>
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