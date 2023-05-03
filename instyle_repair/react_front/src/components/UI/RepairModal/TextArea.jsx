import React, { useRef } from "react";
import './RepairModal.css';

const TextArea = function ({value, setValue}) {

  const textareaRef = useRef(null);

  const handleChange = (event) => {
    setValue(event.target.value);
    setHeight();
  };

  const setHeight = () => {
    const { current } = textareaRef;
    if (current) {
      current.style.height = "auto";
      current.style.height = `${current.scrollHeight}px`;
    }
  };

  return (
    <div>
      <textarea
        className="notes-popUp__text"
        ref={textareaRef}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
  
}

export default TextArea;