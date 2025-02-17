// import { NavLink, Outlet } from "react-router-dom";
// import useAdmin from "../hooks/useAdmin";
// import { FaAd, FaBook, FaCalendar, FaEnvelope, FaHome, FaList, FaSearch, FaUsers, FaUtensils } from "react-icons/fa";


// const Dashboard = () => {
//     const [isAdmin] = useAdmin();

//     return (
//         <div className="flex">
//         {/* dashboard side bar */}
//         <div className="w-64 min-h-screen bg-orange-400">
//             <ul className="menu p-4">
//                 {
//                     isAdmin ? <>
//                         <li>
//                             <NavLink to="/dashboard/adminHome">
//                                 <FaHome></FaHome>
//                                 Admin Home</NavLink>
//                         </li>
//                         <li>
//                             <NavLink to="/dashboard/addItems">
//                                 <FaUtensils></FaUtensils>
//                                 Add Items</NavLink>
//                         </li>
//                         <li>
//                             <NavLink to="/dashboard/manageItems">
//                                 <FaList></FaList>
//                                 Manage Items</NavLink>
//                         </li>
//                         <li>
//                             <NavLink to="/dashboard/bookings">
//                                 <FaBook></FaBook>
//                                 Manage Bookings</NavLink>
//                         </li>
//                         <li>
//                             <NavLink to="/dashboard/users">
//                                 <FaUsers></FaUsers>
//                                 All Users</NavLink>
//                         </li>
//                     </>
//                         :
//                         <>
//                             <li>
//                                 <NavLink to="/dashboard/userHome">
//                                     <FaHome></FaHome>
//                                     User Home</NavLink>
//                             </li>
//                             <li>
//                                 <NavLink to="/dashboard/reservation">
//                                     <FaCalendar></FaCalendar>
//                                     Reservation</NavLink>
//                             </li>
                            
//                             <li>
//                                 <NavLink to="/dashboard/review">
//                                     <FaAd></FaAd>
//                                     Add a Review</NavLink>
//                             </li>
//                             <li>
//                                 <NavLink to="/dashboard/bookings">
//                                     <FaList></FaList>
//                                     My Bookings</NavLink>
//                             </li>
//                         </>
//                 }
//                 {/* shared nav links */}
//                 <div className="divider"></div>
//                 <li>
//                     <NavLink to="/">
//                         <FaHome></FaHome>
//                         Home</NavLink>
//                 </li>
//                 <li>
//                     <NavLink to="/order/salad">
//                         <FaSearch></FaSearch>
//                         Menu</NavLink>
//                 </li>
//                 <li>
//                     <NavLink to="/order/contact">
//                         <FaEnvelope></FaEnvelope>
//                         Contact</NavLink>
//                 </li>
//             </ul>
//         </div>
//         {/* dashboard content */}
//         <div className="flex-1 p-8">
//             <Outlet></Outlet>
//         </div>
//     </div>
//     );
// };

// export default Dashboard;

import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import { FaUserShield, FaUser, FaFileAlt, FaClipboardList, FaUsers, FaComments, FaSignOutAlt, FaHome, FaCheckSquare } from "react-icons/fa";

const Dashboard = () => {
    const [isAdmin] = useAdmin();

    return (
        <div className="flex">
            {/* Dashboard Sidebar */}
            <div className="w-64 min-h-screen bg-orange-400">
                <ul className="menu p-4">
                    {
                        isAdmin ? (
                            <>
                                <li>
                                    <NavLink to="/dashboard/adminHome">
                                        <FaUserShield />
                                        Admin Dashboard
                                    </NavLink>
                                </li>
                                <li>
    <NavLink to="/dashboard/createTemplate">
        <FaFileAlt />
        Create Template
    </NavLink>
</li>

                                <li>
                                    <NavLink to="/dashboard/users">
                                        <FaUsers />
                                        Manage Users
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/manageTemplates">
                                        <FaClipboardList />
                                        Manage Templates
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/reportedComments">
                                        <FaComments />
                                        Review Comments
                                    </NavLink>
                                </li>
                                <li>
                <NavLink to="/dashboard/reviewSubmissions">
                    <FaCheckSquare />
                    Review Submissions
                </NavLink>
            </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <NavLink to="/dashboard/userHome">
                                        <FaUser />
                                        User Dashboard
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/myTemplates">
                                        <FaFileAlt />
                                        My Templates
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/fillForms">
                                        <FaClipboardList />
                                        Fill Forms
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/mySubmissions">
                                        <FaFileAlt />
                                        My Submissions
                                    </NavLink>
                                </li>
                            </>
                        )
                    }
                    {/* Shared Navigation Links */}
                    <div className="divider"></div>
                    <li>
                        <NavLink to="/">
                            <FaHome />
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/logout">
                            <FaSignOutAlt />
                            Logout
                        </NavLink>
                    </li>
                </ul>
            </div>
            {/* Dashboard Content */}
            <div className="flex-1 p-8">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
