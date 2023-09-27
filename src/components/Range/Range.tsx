import React, { useState, useEffect } from "react";
import './range.scss';

interface ValueProps {
  min:number;
  max:number;
}

interface RangeProps {
  onCheckedItemsChange: (value: ValueProps) => void;
}

function Range({onCheckedItemsChange}:RangeProps) {
  const [minValue, setMinValue] = useState<number>(0);
  const [maxValue, setMaxValue] = useState<number>(20);

  useEffect(()=>{
    const storedMin = localStorage.getItem('minAge');
    if (storedMin) {
      const storedMinV = JSON.parse(storedMin);
      setMinValue(storedMinV);
    }

    const storedMax = localStorage.getItem('maxAge');
    if (storedMax) {
      const storedMaxV = JSON.parse(storedMax);
      setMaxValue(storedMaxV);
    }
  },[])

  const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(event.target.value), maxValue);
    localStorage.setItem('minAge', JSON.stringify(value));
    setMinValue(value);
    onCheckedItemsChange({ min: value, max: maxValue });
  };

  const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(event.target.value), minValue);
    localStorage.setItem('maxAge', JSON.stringify(value));
    setMaxValue(value);
    onCheckedItemsChange({ min: minValue, max: value });
  };


  return (
    <div className="range">
      <div className="range-slider">
        <span className="range-selected"></span>
      </div>
      <div className="range-input">
        <input 
          type="range" 
          className="min" 
          min="0" 
          max="20" 
          value={minValue} 
          step="1" 
          onChange={handleMinChange}
        />
        <input 
          type="range" 
          className="max" 
          min="0" 
          max="20" 
          value={maxValue} 
          step="1" 
          onChange={handleMaxChange}
        />
        <div className="mesures">
            <span>Min: {minValue}</span>
            <span>Max: {maxValue}</span>
        </div>
      </div>
    </div> 
  );
}

export default Range;
