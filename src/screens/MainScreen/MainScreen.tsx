import { useEffect, useState } from 'react';
import './main.scss'
import Dog from '../../components/Dog/Dog'
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/Modal/Modal';

interface DogData  {
  id: string
  img: string
  name: string
  age: number
  zip_code: string
  breed: string
}

interface ApiResponse {
  resultIds: string[];
  total: number;
  next?: string;
  prev?: string;
}


interface ValueProps {
  min:number;
  max:number;
}

function MainScreen() {

  
  const url = 'https://frontend-take-home-service.fetch.com';

  const [dogs, setDogs] = useState<DogData[]>([]);
  const [apiResponse, setApiResponse] = useState<ApiResponse>();
  const [checkedItems, setCheckedItems] = useState< string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPageUrl, setCurrentPageUrl] = useState<string>(`${url}/dogs/search`);
  const [nextPageUrl, setNextPageUrl] = useState<string | undefined>();
  const [prevPageUrl, setPrevPageUrl] = useState<string | undefined>();
  const [favoriteDogs, setFavoriteDogs] = useState<string[]>([])
  const [minAge, setMinAge] = useState<number>(0);
  const [maxAge, setMaxAge] = useState<number>(20);
  
  
  useEffect(() => {

    if (!currentPageUrl) return;

    const storedCheckedItemsString = localStorage.getItem('checkedItems');

    let min=''
    if(minAge) {
      min=`&ageMin=${minAge}`
    }

    let max=''
    if(maxAge) {
      max=`&ageMax=${maxAge}`
    }

    let beedsQuery = '';
    if (storedCheckedItemsString) {
      const storedCheckedItems: string[] = JSON.parse(storedCheckedItemsString);
      beedsQuery = storedCheckedItems.map(breed => `breeds=${encodeURIComponent(breed)}`).join('&');
    }
    const apyQuery = `${currentPageUrl}?size=20&${beedsQuery}${min}${max}`

    fetch(apyQuery,{
      credentials: 'include',
    })
      .then(response => response.json())
      .then((data: ApiResponse) => {
        setApiResponse(data);
        setNextPageUrl(data.next);
        setPrevPageUrl(data.prev);
        
        const dogIds = data.resultIds.slice(0, 100);
        return fetch('https://frontend-take-home-service.fetch.com/dogs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dogIds),
          credentials: 'include',
        });
      })
      .then(response => response.json())
      .then((dogs: DogData[]) => {
        setDogs(dogs);
      })
      .catch(error => {
        console.error('Error fetching the dogs:', error);
      });

  }, [currentPageUrl, checkedItems, minAge, maxAge]);


  const handleFavorite = (id: string) => {
    setFavoriteDogs((prevFavorites) => {
      if (prevFavorites.includes(id)) {
        return prevFavorites.filter((dogId) => dogId !== id);
      } else {
        return [...prevFavorites, id];
      }
    });
  };

  const handleReceiveData = (newCheckedItems: string[]) => {
    setCheckedItems(newCheckedItems);
  };

  const handleRangeData = ({min, max}: ValueProps) => {
    setMinAge(min);
    setMaxAge(max)
  };

  async function fetchData(array: string[]) {
    try {
      const response = await fetch('https://frontend-take-home-service.fetch.com/dogs/match',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify(array),
        credentials: 'include',
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data: ', error);
      throw error;
    }
  }

  let navigate = useNavigate()

  const handleClick = async () =>{
    try{
      const data = await fetchData(favoriteDogs);
      navigate(`/match/${data.match}`)
    }catch (error) {
      console.error('Error on Match: ', error);
    }
  }

  const handleOpenModal = () => {
      setIsModalOpen(true);
  };

  const handleCloseModal = () => {
      setIsModalOpen(false);
  };
  return (
    <div className='main'>
      <div className="header">
        <span className='title'>Find your best Friend!</span>
        <span className='number'>{apiResponse?.total && apiResponse.total-100 }+ dogs</span>
        <div className="middle" onClick={handleOpenModal}>
            <section className='one'>
                <svg xmlns="http://www.w3.org/2000/svg" color='#EB5757' className="icon icon-tabler icon-tabler-search" width="17" height="17" viewBox="0 0 20 20" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h17v17H0z" fill="none"></path>
                    <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path>
                    <path d="M21 21l-6 -6"></path>
                </svg>
            </section>
            <section className='two'>
                <span>Filter</span>
            </section>
        </div>
        <div className='right'>
          <span>You have love {favoriteDogs.length} dogs</span>
          {favoriteDogs.length>0 &&
            <button onClick={handleClick}>MATCH NOW</button>
          }
        </div>
        
      </div>
      <div className="dogs">
        {dogs?.map(dog=>(
          <Dog dog={dog} key={dog.id} onFavorite={handleFavorite}/>
        ))}
      </div>
      <div className="pagination">
        {prevPageUrl && <button onClick={() => setCurrentPageUrl(`${url}${prevPageUrl}`)}>PREVIOUS</button>}
        {nextPageUrl && <button onClick={() => setCurrentPageUrl(`${url}${nextPageUrl}`)}>NEXT</button>}
      </div>
      {isModalOpen && <Modal onClose={handleCloseModal} onReceiveData={handleReceiveData} onReceiveRangeData={handleRangeData}/>}
    </div>
  )
}

export default MainScreen