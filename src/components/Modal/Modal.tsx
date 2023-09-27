import {useEffect, useState} from 'react';
import './modal.scss';
import Select from '../Select/Select';
import Range from '../Range/Range';

interface ModalProps {
  onClose: () => void;
  onReceiveData: (checkedItems: string[]) => void;
  onReceiveRangeData: (rageItems: ValueProps) => void;
}


interface ValueProps {
  min:number;
  max:number;
}


function Modal({ onClose, onReceiveData, onReceiveRangeData}:ModalProps) {

  const [breeds, setBreeds] = useState<string[]>([])
  
  useEffect(() => {

    // Realizar la petición a la API
    fetch("https://frontend-take-home-service.fetch.com/dogs/breeds",{
      credentials: 'include',
    })
      .then(response => response.json())
      .then((breeds: string[]) => {
        setBreeds(breeds);
      })
      .catch(error => {
        console.error('Error fetching the breeds:', error);
      });
  }, []);

  const handleCheckedItemsChange = (newCheckedItems: string[]) => {
    onReceiveData(newCheckedItems);
  };

  const handleRangeItemsChange = (newCheckedItems: ValueProps) =>{
    onReceiveRangeData(newCheckedItems);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className='filters'>
          <h1>Filters</h1>
          <section className="breeds">
            <h3>Beeds</h3>
            <Select breeds={breeds} onCheckedItemsChange={handleCheckedItemsChange}/>
          </section>
          <h3>Age</h3>
          <section className='year'>
            <Range onCheckedItemsChange={handleRangeItemsChange}/>
          </section>
        </div>
      </div>
      <div className='modal-close' onClick={onClose}/>
    </div>
  );
}

export default Modal;