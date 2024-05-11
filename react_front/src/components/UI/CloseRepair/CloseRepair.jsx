import React, { useState, useEffect, useRef } from "react";
import './CloseRepair.css'
import SendMessageBot from '../../../API/BotMessage';

const CloseRepair = function ({ visible, setVisible, repair, applyRepair }) {

    const inputRef = useRef(null)

    const rootClasses = ['CloseRepairModal']

    if (visible) {
        inputRef.current.focus()
        rootClasses.push('active')
    }

    const [itemValue, setItemValue] = useState(0)
    const [applyStyle, setApplyStyle] = useState(false)

    useEffect(() => {
        if (applyStyle) {
            setTimeout(() => {
                setApplyStyle(false)
            }, 1000)
        }
    }, [applyStyle])


    // async function SendMessageToBot(number, price) {
    //     const response = await SendMessageBot.sendMessage(number, price)
    //     return response.data.status
    // }


    const handleSubmit = (event) => {
        event.preventDefault()

        // const response = SendMessageToBot(repair.number, itemValue)

        // дописати умову
        setApplyStyle(true)
        applyRepair(repair.id, repair.status)


        setTimeout(() => {
            setVisible(false)
        }, 2000)
    }

    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>

            <div className="CloseRepair__window" onClick={(e) => e.stopPropagation()}>


                <div className="CloseRepair__header">
                    <h1>№{repair.number}</h1>
                    <h1>{itemValue}грн.</h1>
                </div>

                <div className="CloseRepair__formblock">
                    <form onSubmit={handleSubmit}>
                        <input
                            ref={inputRef}
                            className={applyStyle ? 'CloseRepair__input-green' : 'CloseRepair__formblock-input'}
                            value={itemValue}
                            onChange={(e) => setItemValue(e.target.value)}
                        />
                        <button
                            type="submit"
                        >
                            Закрити ремонт
                        </button>
                    </form>

                </div>


            </div>

        </div>
    )
}

export default CloseRepair;

