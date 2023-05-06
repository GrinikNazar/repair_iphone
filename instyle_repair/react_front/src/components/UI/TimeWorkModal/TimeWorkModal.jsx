import React, { useState } from "react";
import './TimeWorkModal.css'

const TimeWorkModal = function ({visible, setVisible}) {
    
    const rootClasses = ['TimeWorkModal']

    if (visible) {
        rootClasses.push('active')
    }

    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className="TimeWork__window">

            </div>
        </div>
    )
}

export default TimeWorkModal;

