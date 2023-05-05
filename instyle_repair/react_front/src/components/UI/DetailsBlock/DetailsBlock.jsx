import React, { useEffect, useState } from "react";
import cl from "./DetailsBlock.module.css"
import DetailsRepair from "../../../API/ChangeDetailsRepair";


const DetailsBlock = function ({children, mutable, detail, nameId, repairId, setTmWork}) {

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
       const response = await DetailsRepair.detailsRepair(nameId, repairId, itemValue)

       if (response.status === 200) {
            setTmWork(response.data)
       }

    }

    const handleSubmit = (event) => {
        event.preventDefault()
        
        setApplyStyle(true)
        setItemValue('')
    }

    return (
        <div className={cl.detail}>
            <h1>{children}</h1>
            {mutable
            ? 
                <div>
                    <form onSubmit={handleSubmit}>
                        <input 
                            className={applyStyle ? cl.detailinput__green : cl.detailinput } 
                            placeholder={detail}
                            value={itemValue}
                            onChange={ (e) => setItemValue(e.target.value)}
                        />
                        <button 
                            type="submit"
                            className={cl.refresh}
                            onClick={changeItem}
                        >
                        </button>
                    </form>
                </div> 
                :
                <div className={cl.detail_input_block}>
                    {detail}
                </div>

            }
        </div>

    )
}

export default DetailsBlock;