import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";



const Main = () => {
    const location = useLocation();
    
    const noHeaderFooter = location.pathname.includes('login') || location.pathname.includes('signup');
    const [loading, setLoading] = useState(true);
    useEffect(() => {
       
        setTimeout(() => {
            setLoading(false);
        }, 3000); 
    }, []);
    return (
        <>
        {loading ? (
                <LoadingSpinner></LoadingSpinner>
            ) : (<>
            { noHeaderFooter ||<Navbar></Navbar>}
           
            <Outlet></Outlet>
            { noHeaderFooter || <Footer></Footer>}
            </>
            )}
       </>
    );
};

export default Main;