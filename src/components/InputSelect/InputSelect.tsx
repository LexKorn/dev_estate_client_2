import React, { useRef } from 'react';

const InputSelect: React.FC = () => {
  const inputRef = useRef(null);

  const handleInputClick = () => {
    //@ts-ignore
    inputRef.current.select();
  };

  return (
    <input 
      ref={inputRef}
      onClick={handleInputClick}
      value="Click to select all text"
    />
  );
};

export default InputSelect;
