import { useContext } from 'react';
import logo from '../../assets/dogLogo.svg';
import './navbar.scss';
import { AuthContext } from '../../context/authContext';

function Navbar() {

  const context = useContext(AuthContext);
  
  if (!context) {
      throw new Error('Login must be used within an AuthContextProvider');
  }
  
  const { logout } = context;

  const handleLogout = () => {
    logout()
  }
    
  return (
    <div className='navbar'>
        <div className="left">
            <img src={logo}/>
        </div>
        <div className="right">
            <button onClick={handleLogout}>Logout</button>
        </div>
    </div>
  )
}

export default Navbar