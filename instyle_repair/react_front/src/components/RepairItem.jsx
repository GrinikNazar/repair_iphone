import React, { useEffect, useState } from "react";
import ProgressBarV2 from "./ProgressBarV2";
import moment from 'moment';
import RepairModal from "./UI/RepairModal/RepairModal";
import TimeWorkModal from "./UI/TimeWorkModal/TimeWorkModal";


const RepairItem = function ({repair, applyRepair}) {

    const [modalRepair, setModalRepair] = useState(false)
    const [progressBar, setProgressBar] = useState(0)
    const [modalTimeChange, setModalTimeChange] = useState(false)

    return (
        
        <div
            className={`main-content__item item-main-content ${
                repair.status === "closed" 
                    ? "item-gray" 
                    : progressBar >= 100 
                        ? "item-red"
                        : progressBar < 50
                            ? "item-green"
                            : "item-orange"
            }
            }`}
        >

        <TimeWorkModal
            visible={modalTimeChange} 
            setVisible={setModalTimeChange}
            repair={repair}
            detail={`${moment(repair.time_create.time_create).format('HH:mm')} - ${moment(repair.time_create.time_work).format('HH:mm')}`}
            nameId={'time_create'}
        />

        <RepairModal 
            visible={modalRepair} 
            setVisible={setModalRepair} 
            repair={repair}
        />

            <div className="item-main-content__body   body-item ">
                
                <div 
                    className="body-item__repair-details details-repair"
                    onClick={() => setModalRepair(true)}
                >
                    <div className="details-repair__number">{repair.number}</div>
                    <div className="details-repair__shop">{repair.shop}</div>
                </div>

                <div className="body-item__titles titles-item">
                    <div className="titles-item__model">Модель: </div>
                    <div className="titles-item__malfunction">Несправність:</div>
                    <div className="titles-item__password">Пароль: </div>
                </div>

                <div className={`body-item__parameters parameters-item ${repair.warranty ? "worranty" : ""}`}>
                    <div className="parameters-item__model-parameter">{repair.model}({repair.imei.slice(-5)})</div>
                    <div className={`parameters-item__malfunction-parameter ${repair.warranty ? "warranty" : ""}`}>{repair.defect}</div>
                    <div className="parameters-item__passAndTimes passAndTimes">
                    <div className="passAndTimes__password">{repair.password}</div>

                    {repair.status === "closed" ? (
                        <div className="passAndTimes__times">
                            <div className="passAndTimes__label2">Виконаний:</div>
                            <div className="passAndTimes__endtime">{moment(repair.time_end).format('D-MM-H:mm')}</div>
                        </div>
                    ): (
                        <div className="passAndTimes__times">
                            <div className="passAndTimes__label">Час: </div>
                            <div className="passAndTimes__starttime">{moment(repair.time_create.time_create).format('H:mm')}</div>
                            <div className="passAndTimes__label2"> до</div>
                            <div className="passAndTimes__endtime">{moment(repair.time_create.time_work).format('H:mm')}</div>
                        </div>
                    )}
                    </div>

                </div>

                {repair.master ? (
                    <div className="body-item__actions actions-item ">
                        <div className="actions-item__worker">{repair.master.name}</div>
                        {repair.status === "closed" ? (
                            <div className="actions-item__button button-done">
                                Виконаний
                            </div>
                        ): (
                            <div 
                                className="actions-item__button button-close"
                                onClick={() => applyRepair(repair.id, repair.status)}
                            >
                                Закрити
                            </div>
                        )}
                    </div>
                ): (
                    <div className="body-item__actions actions-item ">
                        <div onClick={() => applyRepair(repair.id, repair.status)} className="actions-item__button button-take">Прийняти</div>
                    </div>
                )}

            </div>
            {repair.status === "closed" ? (
                <div className="item-main-content__statusbar">
                    <span style={{width: "100%", background: "grey"}}></span>
                </div>
            ): (   
                <div onClick={() => setModalTimeChange(true)} className="progress-bar-line">
                    
                    <ProgressBarV2 
                        timeCreate={repair.time_create.time_create} 
                        timeWork={repair.time_work} 
                        master={repair.master}
                        changeProgressBar={setProgressBar}
                    />
                </div>
            )}

        </div>

    )
}

export default RepairItem;