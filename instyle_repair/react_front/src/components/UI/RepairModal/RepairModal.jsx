import React, { useState } from "react";
import './RepairModal.css';
import DetailsBlock from "../DetailsBlock/DetailsBlock";


const RepairModal = function ({visible, setVisible, repair}) {
    
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

                    <div>
                        <DetailsBlock mutable={true} detail={repair.imei}>IMEI</DetailsBlock>
                        <DetailsBlock mutable={true} detail={repair.model}>Модель</DetailsBlock>
                        <DetailsBlock mutable={true}>Пароль</DetailsBlock>
                    </div>
                    <div>
                        <DetailsBlock mutable={true}>Клієнт</DetailsBlock>
                        <DetailsBlock mutable={true}>Номер телефону</DetailsBlock>
                        <DetailsBlock mutable={true}>Час завершення</DetailsBlock>
                    </div>
                    <div>
                        <DetailsBlock mutable={false} detail={repair.status}>Статус</DetailsBlock>
                        <DetailsBlock mutable={false}>Майстер</DetailsBlock> 
                        <DetailsBlock mutable={false}>Менеджер</DetailsBlock>
                    </div>

                </div>
                <div className="popUp__malfunction malfunction-popUp">
                    <div className="malfunction-popUp__title">Несправність</div>
                    <div className="malfunction-popUp__text">Кусок сраного гімна ніхуя не включається і їбе мені мозок. Ще блять ніц не тримав батарейку, лиш встигав секунди парнуху глипну і пездонс. Зробіт  бо віддав  грошуй а воно не їбашит ніхуя! Повідомив клієнт!</div>
                </div>
                <div className="popUp__notes notes-popUp">
                    <div className="notes-popUp__title">Відписати за ремонт</div>
                    <div className="notes-popUp__text">
                        Ви вхуйкали свій тріпак до такої степені шо тепе це ріщє зможе лиш стіл підпирати. Можете забрати його собі і запхати собі в окуляр, кончений вилупок. Треба  з телефоном поводитись а нє як оце от...
                    </div>
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

