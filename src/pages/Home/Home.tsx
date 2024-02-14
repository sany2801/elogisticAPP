import React, { useState, useEffect } from 'react';
import Menu from '../../components/Menu/Menu';
import { Outlet, useLocation } from 'react-router-dom';
import HomeStyle from "./Home.module.css"

const Home = () => {
    const [activeLink, setActiveLink] = useState("");
    const location = useLocation();

    useEffect(() => {
        const currentPath = window.location.pathname.toLowerCase();
        // console.log(currentPath)
        if (currentPath.includes("shipments")) {
            setActiveLink("Shipments")
        } else if (currentPath.includes("items")) {
            setActiveLink("Items")
        } else if (currentPath.includes("spaces")) {
            setActiveLink("Spaces")
        } else if (currentPath.includes("notifications")) {
            setActiveLink("Notifications")
        } else if (currentPath.includes("profile")) {
            setActiveLink("Account settings")
        } else {
            setActiveLink("")
        }
    }, [location])
    return (
        <div className={HomeStyle.home_page}>
            <Menu></Menu>
            <Outlet></Outlet>
        </div>
    );
};

export default Home;