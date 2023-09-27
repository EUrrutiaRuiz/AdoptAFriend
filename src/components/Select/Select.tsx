import { useEffect, useState } from 'react';
import './checklist.scss'

interface SelectProps {
    breeds: string[];
    onCheckedItemsChange: (checkedItems: string[]) => void;
}

function Select({ breeds, onCheckedItemsChange }: SelectProps) {    
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  useEffect(()=>{
    const storedCheckedItemsString = localStorage.getItem('checkedItems');
    if (storedCheckedItemsString) {
      const storedCheckedItems = JSON.parse(storedCheckedItemsString);
      setCheckedItems(storedCheckedItems);
    }
  },[])

  const handleCheckChange = (breed: string, isChecked: boolean) => {
    const updatedCheckedItems = isChecked 
      ? [...checkedItems, breed] 
      : checkedItems.filter(item => item !== breed);
    setCheckedItems(updatedCheckedItems);

    localStorage.setItem('checkedItems', JSON.stringify(updatedCheckedItems));
    onCheckedItemsChange(updatedCheckedItems);
  };

  return (
    <div className="checkbox-container">
      {breeds.map((breed) => (
        <div key={breed} className="checkbox-item">
          <input
            id={breed}
            type="checkbox"
            checked={checkedItems.includes(breed)}
            onChange={(e) => handleCheckChange(breed, e.target.checked)}
          />
          <label htmlFor={breed} className='box'/>
          <label htmlFor={breed}>{breed}</label>
        </div>
      ))}
    </div>
  )
}

export default Select