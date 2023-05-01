import React, { useState } from "react";
import cl from "./DetailsBlock.module.css"


const DetailsBlock = function ({children, mutable, detail}) {

    const [itemValue, setItemValue] = useState(detail)

    function changeItem() {
        console.log(itemValue)
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
                <div>
                    <div className={cl.detail_input_block}>
                        {detail}
                    </div>

                </div>

            }
        </div>

    )
}

export default DetailsBlock;