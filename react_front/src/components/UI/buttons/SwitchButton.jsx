import React from "react";
import '../buttons/SwitchButton.css'

const SwitchButton = function ({ isCheked, handleCheckboxChange }) {

    return (
        <div className="switch__block">
            <label className="switch">
                <input
                    type="checkbox"
                    className="switch__input"
                    checked={isCheked}
                    onChange={handleCheckboxChange}
                />
                <span className="switch__slider"></span>
            </label>
        </div>
    )

}

export default SwitchButton;