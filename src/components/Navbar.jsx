
// import { useContext, useState } from "react";
// import { Link } from "react-router-dom";
// import { AuthContext } from "../providers/AuthProvider";
// import { ThemeContext } from "../providers/ThemeProvider";

// const Navbar = () => {
//     const { user, logOut } = useContext(AuthContext);
//     const { theme, toggleTheme } = useContext(ThemeContext);
//     const [searchQuery, setSearchQuery] = useState("");

//     const handleLogOut = () => {
//         logOut()
//             .then(() => {})
//             .catch((error) => console.log(error));
//     };

    

//     const handleSearch = (e) => {
//         e.preventDefault();
//         console.log("Search Query:", searchQuery);
//     };

    

//     return (
//         <div className="navbar fixed z-10 bg-opacity-30 max-w-screen-xl bg-gray-500 text-white px-4 lg:px-8">
//             {/* Navbar Wrapper */}
//             <div className="flex w-full items-center justify-between gap-x-4">
//                 {/* Left Section: Logo & Mobile Menu */}
//                 <div className="flex items-center">
//                     <div className="dropdown lg:hidden">
//                         <label tabIndex={0} className="btn btn-ghost">
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
//                             </svg>
//                         </label>
//                         <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 text-black">
//                         <form onSubmit={handleSearch} className="w-full max-w-md flex bg-white rounded-md px-2 shadow-md">
//                         <input
//                             type="text"
//                             placeholder="Search templates..."
//                             className="input input-sm w-full focus:outline-none text-black"
//                             value={searchQuery}
//                             onChange={(e) => setSearchQuery(e.target.value)}
//                         />
//                         <button type="submit" className="btn btn-sm btn-ghost">
//                             🔍
//                         </button>
//                     </form>
//                         </ul>
//                     </div>
//                     <Link to="/" className="btn btn-ghost normal-case text-xl">My Form</Link>
//                 </div>

//                 {/* Center Section: Search Bar */}
//                 <div className="hidden lg:flex flex-grow justify-center">
//                     <form onSubmit={handleSearch} className="w-full max-w-md flex bg-white rounded-md px-2 shadow-md">
//                         <input
//                             type="text"
//                             placeholder="Search templates..."
//                             className="input input-sm w-full focus:outline-none text-black"
//                             value={searchQuery}
//                             onChange={(e) => setSearchQuery(e.target.value)}
//                         />
//                         <button type="submit" className="btn btn-sm btn-ghost">
//                             🔍
//                         </button>
//                     </form>
//                 </div>

//                 {/* Right Section: Theme & Logout */}
//                 <div className="flex items-center space-x-2">
//                     <button onClick={toggleTheme} className="btn btn-ghost">
//                         {theme === "light" ? "🌞" : "🌙"}
//                     </button>
//                     {user && (
//                         <button onClick={handleLogOut} className="btn btn-outline btn-sm">
//                             Logout
//                         </button>
//                     )}
//                 </div>
//             </div>

            
//         </div>
//     );
// };

// export default Navbar;


import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { ThemeContext } from "../providers/ThemeProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const handleLogOut = () => {
        logOut()
            .then(() => {})
            .catch((error) => console.log(error));
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
    
        try {
            const { data } = await axiosSecure.get(`/template/search?query=${searchQuery}`);
            console.log("Search API Response:", data); // Debugging
            setSearchResults(data);
        } catch (error) {
            console.error("Search error:", error);
        }
    };
    

    return (
        <div className="navbar fixed z-10 bg-opacity-30 max-w-screen-xl bg-gray-500 text-white px-4 lg:px-8">
            {/* Navbar Wrapper */}
            <div className="flex w-full items-center justify-between gap-x-4">
                {/* Left Section: Logo & Mobile Menu */}
                <div className="flex items-center">
                    <div className="dropdown lg:hidden">
                        <label tabIndex={0} className="btn btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 text-black">
                            <form onSubmit={handleSearch} className="w-full max-w-md flex bg-white rounded-md px-2 shadow-md">
                                <input
                                    type="text"
                                    placeholder="Search templates..."
                                    className="input input-sm w-full focus:outline-none text-black"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <button type="submit" className="btn btn-sm btn-ghost">
                                    🔍
                                </button>
                            </form>
                        </ul>
                    </div>
                    <Link to="/" className="btn btn-ghost normal-case text-xl">My Form</Link>
                </div>

                {/* Center Section: Search Bar */}
                <div className="hidden lg:flex flex-grow justify-center">
                    <form onSubmit={handleSearch} className="w-full max-w-md flex bg-white rounded-md px-2 shadow-md">
                        <input
                            type="text"
                            placeholder="Search templates..."
                            className="input input-sm w-full focus:outline-none text-black"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button type="submit" className="btn btn-sm btn-ghost">
                            🔍
                        </button>
                    </form>
                    {searchResults.length > 0 && (
                        <div className="absolute top-full mt-2 w-full bg-white shadow-lg rounded-md p-2 dark:bg-gray-800">
                            {searchResults.map((template) => (
                                <div
                                    key={template.id}
                                    className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer rounded-md"
                                    onClick={() => navigate(`/dashboard/templates/${template.id}`)}
                                >
                                    <p className="font-semibold text-black dark:text-white">{template.title}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{template.description}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                
                {/* Right Section: Theme & Conditional Login/Logout */}
                <div className="flex items-center space-x-2">
                    <button onClick={toggleTheme} className="btn btn-ghost">
                        {theme === "light" ? "🌞" : "🌙"}
                    </button>
                    
                    {/* Conditional rendering based on user login status */}
                    {user ? (
                        <button onClick={handleLogOut} className="btn btn-outline btn-sm">
                            Logout
                        </button>
                    ) : (
                        <Link to="/login" className="btn btn-outline btn-sm">
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
