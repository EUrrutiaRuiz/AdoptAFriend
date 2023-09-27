import { Outlet, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import Footer from "../components/Footer/Footer";

const Layout = () =>{
    const context = useContext(AuthContext);
  
    if (!context) {
        throw new Error('Login must be used within an AuthContextProvider');
    }
    
    const { currentUser } = context;

    if(!currentUser){
        return <Navigate to={'/AdoptAFriend/login'} replace/>
    }
    return (
        <div className={`theme-light`}>   
            <Navbar/>
            <div>
                <Outlet/>
            </div>
            <Footer/>
        </div>
    )
}

export default Layout;