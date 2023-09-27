import { useState, useContext, useEffect } from 'react'
import "./login.scss"
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'

function LoginScreen() {
  const context = useContext(AuthContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
  if (!context) {
    throw new Error('Login must be used within an AuthContextProvider');
  }
  
  const { currentUser, login } = context;

  let navigate = useNavigate()

  useEffect(() =>{
    if(currentUser){
      navigate(`/`)
    }
  }, [navigate, currentUser])

  const handleLogin = () => {
    login(name, email)
    navigate("/")
  }

  return (
    <div className='login'>
      <div className='card'>
        <div className='left'>
          <h1>Welcome</h1>
          <p>
            Sign in to access! 
            Here at Fetch, we love dogs, and hope you do too!
          </p>
        </div>
        <div className='right'>
          <h1>Login</h1>
          <form>
            <input type='text' placeholder='name' onChange={(e) => setName(e.target.value)}></input>
            <input type='text' placeholder='email' onChange={(e) => setEmail(e.target.value)}></input>
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginScreen