import React, { useState } from "react";

const Header = function ({username, exitFunc}) {


    return (
        <header className="header">
            <div className="header__container">

                <a href="#" className="header__logo">
                INSTYLE <span>REPAIR</span>
                </a>

                <div className="header__search search-header">
                    <input type="text" className="search-header__input"/>
                </div>

                <div className="header__menu menu">
                <nav className="menu__body">
                    <div className="menu__list-login">{username}</div>
                    <ul className="menu__list">
                        <li><a href="" className="menu__link">Всі ремонти</a></li>
                        <li><a href="" className="menu__link">Мої ремонти</a></li>
                        <li><a href="" className="menu__link">Статистика</a></li>
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