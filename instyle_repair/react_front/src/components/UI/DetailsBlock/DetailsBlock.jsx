import React, { useEffect, useState } from "react";
import cl from "./DetailsBlock.module.css"
import DetailsRepair from "../../../API/ChangeDetailsRepair";


const DetailsBlock = function ({children, mutable, detail, nameId, repairId}) {

    const [itemValue, setItemValue] = useState(detail)
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
            setApplyStyle(true) 
       }
    }

    return (
        <div className={cl.detail}>
            <h1>{children}</h1>
            {mutable
            ? 
                <div>
                    <input 
                        className={applyStyle ? cl.detailinput__green : cl.detailinput } 
                        placeholder={itemValue}
                        onChange={ (e) => setItemValue(e.target.value)}
                    />
                    <div 
                        className={cl.refresh}
                        onClick={changeItem}
                    >
                    </div>
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