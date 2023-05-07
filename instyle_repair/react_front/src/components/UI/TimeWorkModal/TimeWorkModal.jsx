import React, { useState, useEffect, useRef} from "react";
import './TimeWorkModal.css'
import DetailsRepair from "../../../API/ChangeDetailsRepair";

const TimeWorkModal = function ({nameId, visible, setVisible, repair, detail}) {

    const inputRef = useRef(null)

    useEffect(() => {

    }, [])

    const rootClasses = ['TimeWorkModal']

    if (visible) {
        rootClasses.push('active')
    }

    const [itemValue, setItemValue] = useState('')
    const [applyStyle, setApplyStyle] = useState(false)

    useEffect( () => {
        if (applyStyle) {
            setTimeout( () => {
                setApplyStyle(false)
            }, 1000)
        }
    }, [applyStyle])

    async function changeItem() {
       await DetailsRepair.detailsRepair(nameId, repair.id, itemValue)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        
        setApplyStyle(true)
        setItemValue('')
    }

    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className="TimeWork__window" onClick={(e) => e.stopPropagation()}>

                <div className="TimeWork__header">
                    <h1>№{repair.number}</h1>
                    <h1>{repair.time_work} год.</h1>
                </div>

                <div className="TimeWork__formblock">
                    <form onSubmit={handleSubmit}>
                        <input
                            autoFocus={true}
                            className={applyStyle ? 'TimeWork__input-green' : 'TimeWork__formblock-input'} 
                            placeholder={detail}
                            value={itemValue}
                            onChange={ (e) => setItemValue(e.target.value)}
                        />
                        <button
                            type="submit"
                            onClick={changeItem}
                        >
                            Змінити час
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default TimeWorkModal;

