import React, { useContext, useEffect, useState } from "react";
import cl from "./DetailsBlock.module.css"
import DetailsRepair from "../../../API/ChangeDetailsRepair";
import moment from 'moment';
import Repairs from "../../../API/Repairs";
import { MastersContext } from "../../../context";


const DetailsBlock = function ({children, mutable, detail, nameId, repairId, master}) {

    const [itemValue, setItemValue] = useState('')
    const [applyStyle, setApplyStyle] = useState(false)

    const {mastersAndShops} = useContext(MastersContext)

    async function setMasterIdAndGetMasters(event) {
        await Repairs.deleteMaster(repairId, event.target.value, 'same')
    }

    useEffect( () => {
        if (applyStyle) {
            setTimeout( () => {
                setApplyStyle(false)
            }, 1000)
        }
    }, [applyStyle])

    async function changeItem() {
       await DetailsRepair.detailsRepair(nameId, repairId, itemValue, moment())
    }

    async function deleteMaster() {
        await Repairs.deleteMaster(repairId, master.masterId, master.status)
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
                <div>

                    {master
                    ?
                        <div>
                            <div className={cl.detail_input_block_select}>

                                <select className={cl.detail_select} onChange={(e) => setMasterIdAndGetMasters(e)}>
                                    <option hidden>{detail}</option>
                                    {mastersAndShops.masters.map(master => 
                                        <option key={master.id} value={master.id} label={master.name}></option>
                                    )}
                                </select>

                            </div>

                            <button 
                                className={cl.master__delete}
                                onClick={deleteMaster}
                            >
                            </button>
                        </div>
                    :
                        <div className={cl.detail_input_block}>
                            {detail}
                        </div>
                    }

                </div>


            }
        </div>

    )
}

export default DetailsBlock;