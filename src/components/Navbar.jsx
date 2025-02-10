import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    // const [isAdmin] = useAdmin();
    const [theme, setTheme] = useState('light');

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
    }
    const toggleTheme = () => {
        // Toggle between light and dark themes
        if (theme === 'light') {
            setTheme('dark');
            document.documentElement.classList.add('dark'); // Apply dark theme globally
        } else {
            setTheme('light');
            document.documentElement.classList.remove('dark'); // Apply light theme globally
        }
    };
    const navOptions = <>
        <li><Link to="/">Home</Link></li>
        <li><Link to="">Templates</Link></li>
        {/* <li><Link to="">Order Food</Link></li> */}
        {
            // user ? 'true': 'false'
            // user ? condition ? 'double true' : 'one true' : 'false' 
        }
        {/* {
            user && isAdmin && <li><Link to="/dashboard/adminHome">Dashboard</Link></li>
        }
        {
            user && !isAdmin && <li><Link to="/dashboard/userHome">Dashboard</Link></li>
        } */}
        
        {
            user ? <>
                {/* <span>{user?.displayName}</span> */}
                <button onClick={handleLogOut} className="btn btn-ghost">LogOut</button>
            </> : <>
                <li><Link to="/login">Login</Link></li>
            </>
        }
    </>
    return (
        <>
            <div className="navbar fixed z-10 bg-opacity-30 max-w-screen-xl bg-black text-white">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {navOptions}
                        </ul>
                    </div>
                    <a className="btn btn-ghost normal-case text-xl">My Form</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navOptions}
                    </ul>
                </div>
                <div className="navbar-end flex items-center space-x-4">
                    <button onClick={toggleTheme} className="btn btn-ghost">
                        {/* Icon for Light/Dark theme */}
                        {theme === 'light' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1M12 21v1M4.22 4.22l.707.707M19.071 19.071l.707.707M3 12h1M21 12h1M4.22 19.071l.707-.707M19.071 4.22l.707-.707" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4V2M12 22v-2M4.22 4.22l-.707.707M19.071 19.071l-.707.707M3 12h1M21 12h1M4.22 19.071l-.707-.707M19.071 4.22l-.707-.707M12 7c2.5 0 4.5 2.5 4.5 4.5 0 2.5-2 4.5-4.5 4.5S7.5 14.5 7.5 12C7.5 9.5 9.5 7 12 7z" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>
        </>
    );
};

export default Navbar;