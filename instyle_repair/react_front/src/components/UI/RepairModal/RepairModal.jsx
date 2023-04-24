import React, { useState } from "react";
import './RepairModal.css';


const RepairModal = function ({visible, setVisible}) {
    
    const rootClasses = ['RepairModal']

    if (visible) {
        rootClasses.push('active')
    }

    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className="popUp__window" onClick={(e) => e.stopPropagation()}>

                <div className="popUp__header header-popUp">
                    <div className="header-popUp__worrantyDate">
                        <div className="header-popUp__worranty">Гарантійний</div>
                        <div className="header-popUp__date">21.03.2021</div>
                    </div>
                    <div className="header-popUp__number">№93799</div>
                    <div className="header-popUp__shop">InStyle </div>
                </div>
                <div className="popUp__body body-popUp">
                    <div className="body-popUp__properties properties"> 
                        <div className="properties__status">Статус</div>
                        <div className="properties__timeOfReceiving">Час прийняття</div>
                        <div className="properties__timeOfFinishing">Завершення</div>
                        <div className="properties__model">Модель</div>
                        <div className="properties__password">Пароль</div>
                        <div className="properties__IMEI">IMEI</div>
                        <div className="properties__manager manager-properties">
                            <div className="manager-properties__title">Менеджер</div>
                            <div className="manager-properties__name">Дмитро</div>
                        </div>
                        <div className="properties__client client-properties">
                            <div className="client-properties__title">Клієнт</div>
                            <div className="client-properties__name">Якийсь Вася</div>
                        </div>
                    </div>
                    <div className="body-popUp__values values ">
                        <div className="values__status">Статус</div>
                        <div className="values__timeOfReceiving timeOfReceiving">
                            <div className="timeOfReceiving__time">17:15</div>
                            <div className="timeOfReceiving__date">25.08.2023</div>
                        </div>
                        <div className="values__timeOfFinishing timeOfFinishing">
                            <div className="timeOfFinishing__time">20:00</div>
                            <div className="timeOfFinishing__date">26.08.2023</div>
                        </div>
                        <div className="values__model">iPhone 11ProMax Gold</div>
                        <div className="values__password">888888</div>
                        <div className="values__IMEI">358426879461235</div>
                        <div className="values__master master-value">
                            <div className="master-value__title">Майстер</div>
                            <div className="master-value__name">Саша</div>
                        </div>
                        <div className="values__telnumber telnumber-value">
                            <div className="telnumber-value__title">№ телефону</div>
                            <div className="telnumber-value__number">93799922</div>
                        </div>
                    </div>
                </div>
                <div className="popUp__malfunction malfunction-popUp">
                    <div className="malfunction-popUp__title">Несправність</div>
                    <div className="malfunction-popUp__text">Кусок сраного гімна ніхуя не включається і їбе мені мозок. Ще блять ніц не тримав батарейку, лиш встигав секунди парнуху глипну і пездонс. Зробіт  бо віддав  грошуй а воно не їбашит ніхуя! Повідомив клієнт!</div>
                </div>
                <div className="popUp__notes notes-popUp">
                    <div className="notes-popUp__title">Відписати за ремонт</div>
                    <div className="notes-popUp__text">Ви вхуйкали свій тріпак до такої степені шо тепе це ріщє зможе лиш стіл підпирати. Можете забрати його собі і запхати собі в окуляр, кончений вилупок. Треба  з телефоном поводитись а нє як оце от...</div>
                </div>
                <div className="popUp__actions action-popUp">
                    <a href="#" className="action-popUp__close">Закрити</a>
                    <a href="#" className="action-popUp__history">Історія</a>
                    <a href="#" className="action-popUp__answer">Відповісти</a>
                </div>

            </div>
        </div>
    )
}

export default RepairModal;

