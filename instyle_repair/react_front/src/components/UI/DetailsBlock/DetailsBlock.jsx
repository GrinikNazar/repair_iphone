import React from "react";
import cl from "./DetailsBlock.module.css"


const DetailsBlock = function ({children, mutable, detail}) {
    return (
        <div className={cl.detail}>
            <h1>{children}</h1>
            {mutable
            ? 
            <div>
                <input className={cl.detailinput} placeholder={detail}/>
                <div className={cl.refresh}></div>
            </div> 
            : <div className={cl.detailinput}>{detail}</div>
            }
        </div>

    )
}

export default DetailsBlock;