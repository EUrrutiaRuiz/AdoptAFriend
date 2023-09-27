import './App.css'
import { Route,Routes } from 'react-router-dom'
import LoginScreen from './screens/LoginScreen/LoginScreen'
import MainScreen from './screens/MainScreen/MainScreen'
import Layout from './utils/Layout'
import MatchScreen from './screens/MatchScreen/MatchScreen'

function App() {

  return (
    <Routes>
      <Route path="AdoptAFriend/login" element={<LoginScreen/>}/>
      <Route path="/" element={<Layout/>}>
        <Route path="AdoptAFriend/" element={<MainScreen/>}/>
        <Route path="AdoptAFriend/match/:id/" element={<MatchScreen/>}/>
      </Route>
    </Routes>
  )
}

export default App
