import React, { useState } from "react";
import './RepairModal.css';
import DetailsBlock from "../DetailsBlock/DetailsBlock";
import moment from 'moment';
import TextArea from "./TextArea";


const RepairModal = function ({visible, setVisible, repair, setTmWork}) {

    const [answerInput, setAnswerInput] = useState('')
    
    const rootClasses = ['RepairModal']

    if (visible) {
        rootClasses.push('active')
    }

    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className="popUp__window" onClick={(e) => e.stopPropagation()}>

                <div className="popUp__header header-popUp">
                    <div className="header-popUp__worrantyDate">
                        <div className="header-popUp__number"><strong>Ремонт</strong>: №{repair.number}</div>
                        <div className="header-popUp__worranty">{repair.warranty ? 'Гарантійний' : ''}</div>
                    </div>
                    <div className="header-popUp__date"><strong>Проданий</strong>: 21.03.2021</div>
                    <div>
                        <div className="header-popUp__shop"><strong>Магазин</strong>: {repair.shop}</div>
                        <div className="header-popUp__date-create"><strong>Прийнятий</strong>: {moment(repair.time_create.time_work).format('D.MM.YYYY')}</div>
                    </div>
                </div>
                <div className="popUp__body body-popUp">

                    <div>
                        <DetailsBlock mutable={true} detail={repair.imei} nameId={'imei'} repairId={repair.id}>IMEI</DetailsBlock>
                        <DetailsBlock mutable={false} detail={repair.model}>Модель</DetailsBlock>
                        <DetailsBlock mutable={true} detail={repair.password} nameId={'password'} repairId={repair.id}>Пароль</DetailsBlock>
                    </div>
                    <div>
                        <DetailsBlock mutable={false} detail={repair.customer_name}>Клієнт</DetailsBlock>
                        <DetailsBlock mutable={false} detail={repair.vendor}>Постачальник</DetailsBlock>
                        <DetailsBlock 
                            mutable={true}
                            nameId={'time_create'}
                            repairId={repair.id}
                            detail={`${moment(repair.time_create.time_create).format('HH:mm')} - ${moment(repair.time_create.time_work).format('HH:mm')}`}
                            setTmWork={setTmWork}
                        >
                            Час завершення
                        </DetailsBlock>
                    </div>
                    <div>
                        <DetailsBlock mutable={false} detail={repair.status}>Статус</DetailsBlock>
                        <DetailsBlock mutable={false} detail={`${repair.master ? repair.master.name : 'Не прийнятий'}`}>Майстер</DetailsBlock> 
                        <DetailsBlock mutable={false} detail={'Поки що нема'}>Менеджер</DetailsBlock>
                    </div>

                </div>

                <div className="popUp__malfunction malfunction-popUp">
                    <div className="malfunction-popUp__title">Несправність</div>
                    <div className="malfunction-popUp__text">{repair.defect}</div>
                </div>

                <div className="popUp__notes notes-popUp">
                    <div className="notes-popUp__title">Відписати за ремонт</div>

                    <TextArea
                        value={answerInput}
                        setValue={setAnswerInput}
                    />

                </div>
                <div className="popUp__actions action-popUp">
                    <a href="#" className="action-popUp__close">Закрити ремонт</a>
                    <a href="#" className="action-popUp__history">Історія</a>
                    <a href="#" className="action-popUp__answer">Відповісти</a>
                </div>

            </div>
        </div>
    )
}

export default RepairModal;

