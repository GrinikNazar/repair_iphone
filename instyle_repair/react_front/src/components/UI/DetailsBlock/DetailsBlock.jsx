import React, { useState } from "react";
import cl from "./DetailsBlock.module.css"
import DetailsRepair from "../../../API/ChangeDetailsRepair";


const DetailsBlock = function ({children, mutable, detail, nameId, repairId}) {

    const [itemValue, setItemValue] = useState(detail)

    async function changeItem() {
       const response = await DetailsRepair.detailsRepair(nameId, repairId, itemValue)

       console.log(response.status)
    }

    return (
        <div className={cl.detail}>
            <h1>{children}</h1>
            {mutable
            ? 
                <div>
                    <input 
                        className={cl.detailinput} 
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