import React, { useState, useEffect } from "react";
import { Outlet, useLocation, Link, matchPath } from "react-router-dom";
import { FaHome, FaShapes, FaNewspaper } from "react-icons/fa";
import DefaultHeader from "@/components/layouts/headers/DefaultHeader";

const DefaultLayout: React.FunctionComponent = () => {
    const location = useLocation();
    const [activeMenu, setActiveMenu] = useState(location.pathname);

    const noSidebarRoutes = ["/admin/lesson", "/lesson/add"];

    const shouldHideSidebar =
        noSidebarRoutes.includes(location.pathname) ||
        matchPath("/admin/lesson/:id", location.pathname);

    useEffect(() => {
        setActiveMenu(location.pathname);
    }, [location.pathname]);

    const handleMenuClick = (path: string) => {
        setActiveMenu(path);
    };

    const getTabName = (path: string) => {
        switch (true) {
            case path === "/":
                return "Home";
            case path === "/geogebra":
                return "GeoGebra";
            case path === "/lesson":
                return "Lesson";
            case path.startsWith("/lesson/") && !path.startsWith("/lesson/add"):
                return "Lesson Detail";
            case path === "/lesson/add":
                return "Add Lesson";
            case path === "/admin/lesson":
                return "List Lesson";
            case path.startsWith("/admin/lesson/"):
                return "Edit Lesson";
            case path === "/admin/chapter":
                return "Chapter";
            default:
                return "";
        }
    };


    return (
        <div className="default-layout">
            <div className="layout-container">
                {!shouldHideSidebar && (
                    <div className="sidebar">
                        <ul className="menu">
                            <li
                                className={activeMenu === "/" ? "active" : ""}
                                onClick={() => handleMenuClick("/")}
                            >
                                <Link to="/">
                                    <FaHome className="menu-icon" /> Home
                                </Link>
                            </li>
                            <li
                                className={activeMenu === "/geogebra" ? "active" : ""}
                                onClick={() => handleMenuClick("/geogebra")}
                            >
                                <Link to="/geogebra">
                                    <FaShapes className="menu-icon" /> GeoGebra
                                </Link>
                            </li>
                            <li
                                className={activeMenu === "/post" ? "active" : ""}
                                onClick={() => handleMenuClick("/post")}
                            >
                                <Link to="/lesson">
                                    <FaNewspaper className="menu-icon" /> Lesson
                                </Link>
                            </li>
                        </ul>
                    </div>
                )}
                <div className="content-wrapper">
                    <DefaultHeader tabName={getTabName(location.pathname)} />
                    <div className="main-content">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DefaultLayout;
