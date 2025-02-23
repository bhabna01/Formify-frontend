

import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import { FaUserShield, FaUser, FaFileAlt, FaClipboardList, FaUsers, FaComments,  FaHome, FaCheckSquare } from "react-icons/fa";
import Navbar from "../components/Navbar";
import { useTranslation } from "react-i18next";

const Dashboard = () => {
    const [isAdmin] = useAdmin();
    const { t } = useTranslation();

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar></Navbar>
            <div className="flex flex-1 mt-16">
            {/* Dashboard Sidebar */}
            <div className="w-64 min-h-screen bg-base-300">
            <ul className="menu p-4">
                {
                    isAdmin ? (
                        <>
                            <li>
                                <NavLink to="/dashboard/adminHome">
                                    <FaUserShield />
                                    {t("admin_dashboard")}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/createTemplate">
                                    <FaFileAlt />
                                    {t("create_template")}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/users">
                                    <FaUsers />
                                    {t("manage_users")}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/manageTemplates">
                                    <FaClipboardList />
                                    {t("manage_templates")}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/reportedComments">
                                    <FaComments />
                                    {t("review_comments")}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/reviewSubmissions">
                                    <FaCheckSquare />
                                    {t("review_submissions")}
                                </NavLink>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <NavLink to="/dashboard/userHome">
                                    <FaUser />
                                    {t("user_dashboard")}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/myTemplates">
                                    <FaFileAlt />
                                    {t("my_templates")}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/fillForms">
                                    <FaClipboardList />
                                    {t("fill_forms")}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/mySubmissions">
                                    <FaFileAlt />
                                    {t("my_submissions")}
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
                        {t("home")}
                    </NavLink>
                </li>
            </ul>
        </div>
            {/* Dashboard Content */}
            <div className="flex-1 p-8">
                <Outlet />
            </div>
        </div>
        </div>
    );
};

export default Dashboard;
