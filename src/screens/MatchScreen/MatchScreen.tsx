import { useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import './match.scss'

interface DogData  {
  id: string
  img: string
  name: string
  age: number
  zip_code: string
  breed: string
}

function MatchScreen() {
  
  const match = useParams()
  const [dog, setDog] = useState<DogData[]>([])

  useEffect(()=>{
    console.log(match.id)
    fetch('https://frontend-take-home-service.fetch.com/dogs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify([match.id]),
          credentials: 'include',
    })
    .then(response => response.json())
    .then((dog: DogData[]) => {
      setDog(dog);
    })
    .catch(error => {
      console.error('Error fetching the dogs:', error);
    });
  },[])


  let navigate = useNavigate()
  const handleAdopt = () => {
    alert('Thank you for adopting your new best friend')
    navigate('/AdoptAFriend/')
  }

  const handleQuit = () => {
    alert("What a shame you didn't adopt")
    navigate('/AdoptAFriend/')
  }

  return (
    <div className='match'>
      {dog.map(dg =>(
        <div className='adopt'>
          <h2>You and "{dg.name}" are one and the same</h2>
          <h5></h5>
          <div>
            <img src={dg.img}/>
          </div>
          <div className="buttons">
            <button className='adopt' onClick={handleAdopt}>Adopt Now</button>
            <button onClick={handleQuit}>Find Another friend</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MatchScreen