import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from './context/authContext.jsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthContextProvider>
        <Router>
          <Routes>
            <Route path='/*' element = {<App/>}/>
          </Routes>
        </Router>
    </AuthContextProvider>
  </React.StrictMode>,
)
