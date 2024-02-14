import React, { useState, useEffect } from 'react';
import MenuStyle from "./Menu.module.css"
import { Link } from 'react-router-dom';

const Menu = () => {
    const [activeLink, setActiveLink] = useState("");
    const [menuState, setMenuState] = useState(MenuStyle.menu_section_close);
    const [isHovered, setIsHovered] = useState<string>('');

    useEffect(() => {
        const currentPath = window.location.pathname;
        if (currentPath.includes("shipments")) {
            setActiveLink("shipments")
        } else if (currentPath.includes("items")) {
            setActiveLink("items")
        } else if (currentPath.includes("spaces")) {
            setActiveLink("spaces")
        } else if (currentPath.includes("notifications")) {
            setActiveLink("notifications")
        } else if (currentPath.includes("profile")) {
            setActiveLink("profile")
        } else if (currentPath.includes("history")) {
            setActiveLink("history")
        } else if (currentPath.includes("support")) {
            setActiveLink("support")
        } else {
            setActiveLink("")
        }
    }, [])

    const handleLinkClick = (link: any) => {
        setActiveLink(link)
    }

    //меняет состояние меню открыто/закрыто
    const handlMenu_state = () => {
        setMenuState(menuState === `${MenuStyle.menu_section_close}` ? `${MenuStyle.menu_section_open}` : `${MenuStyle.menu_section_close}`);
    }

    return (
        <div className={menuState}>
            <div className={MenuStyle.menu_logo} />
            <div className={MenuStyle.hr}></div>
            <div className={MenuStyle.nav_menu}>
                <Link onMouseEnter={() => setIsHovered("shipments")} onMouseLeave={() => setIsHovered('')} to={"shipments"} className={`${MenuStyle.link_menu} ${activeLink === "shipments" ? `${MenuStyle.active_link}` : ""}`}
                    onClick={() => handleLinkClick("shipments")}>
                    <div className={MenuStyle.logo_link}></div>
                    <p className={MenuStyle.item_link}>Shipments</p>
                    {(isHovered === "shipments" && menuState === `${MenuStyle.menu_section_close}`) &&
                        <div className={MenuStyle.menu_tooltip}>Shipments</div>
                    }
                </Link>
                <Link onMouseEnter={() => setIsHovered("items")} onMouseLeave={() => setIsHovered('')} to={"items"} className={`${MenuStyle.link_menu} ${activeLink === "items" ? `${MenuStyle.active_link}` : ""}`}
                    onClick={() => handleLinkClick("items")}>
                    <div className={MenuStyle.logo_link}></div>
                    <p className={MenuStyle.item_link}>Items</p>
                    {(isHovered === "items" && menuState === `${MenuStyle.menu_section_close}`) &&
                        <div className={MenuStyle.menu_tooltip}>Items</div>
                    }
                </Link>
                <Link onMouseEnter={() => setIsHovered("spaces")} onMouseLeave={() => setIsHovered('')} to={"spaces"} className={`${MenuStyle.link_menu} ${activeLink === "spaces" ? `${MenuStyle.active_link}` : ""}`}
                    onClick={() => handleLinkClick("spaces")}>
                    <div className={MenuStyle.logo_link}></div>
                    <p className={MenuStyle.item_link}>Spaces</p>
                    {(isHovered === "spaces" && menuState === `${MenuStyle.menu_section_close}`) &&
                        <div className={MenuStyle.menu_tooltip}>Spaces</div>
                    }
                </Link>
                <Link onMouseEnter={() => setIsHovered("notifications")} onMouseLeave={() => setIsHovered('')} to={"notifications"}
                    className={`${MenuStyle.link_menu} ${activeLink === "notifications" ? `${MenuStyle.active_link}` : ""}`}
                    onClick={() => handleLinkClick("notifications")}>
                    <div className={MenuStyle.logo_link}></div>
                    <p className={MenuStyle.item_link}>Notifications</p>
                    {(isHovered === "notifications" && menuState === `${MenuStyle.menu_section_close}`) &&
                        <div className={MenuStyle.menu_tooltip}>Notifications</div>
                    }
                </Link>
                <Link onMouseEnter={() => setIsHovered("history")} onMouseLeave={() => setIsHovered('')} to={"history"}
                    className={`${MenuStyle.link_menu} ${activeLink === "history" ? `${MenuStyle.active_link}` : ""}`}
                    onClick={() => handleLinkClick("history")}>
                    <div className={MenuStyle.logo_link}></div>
                    <p className={MenuStyle.item_link}>Payment history</p>
                    {(isHovered === "history" && menuState === `${MenuStyle.menu_section_close}`) &&
                        <div className={MenuStyle.menu_tooltip}>Payment history</div>
                    }
                </Link>
                <Link onMouseEnter={() => setIsHovered("support")} onMouseLeave={() => setIsHovered('')} to={"support"}
                    className={`${MenuStyle.link_menu} ${activeLink === "support" ? `${MenuStyle.active_link}` : ""}`}
                    onClick={() => handleLinkClick("support")}>
                    <div className={MenuStyle.logo_link}></div>
                    <p className={MenuStyle.item_link}>Support</p>
                    {(isHovered === "support" && menuState === `${MenuStyle.menu_section_close}`) &&
                        <div className={MenuStyle.menu_tooltip}>Support</div>
                    }
                </Link>
                <div className={MenuStyle.menu_footer}>
                    <Link onMouseEnter={() => setIsHovered("profile")} onMouseLeave={() => setIsHovered('')} to={"profile"} className={`${MenuStyle.link_menu} ${activeLink === "profile" ? `${MenuStyle.active_link}` : ""}`}
                        onClick={() => handleLinkClick("profile")}>
                        <div className={MenuStyle.logo_link}></div>
                        <p className={MenuStyle.item_link}>Profile</p>
                        {(isHovered === "profile" && menuState === `${MenuStyle.menu_section_close}`) &&
                            <div className={MenuStyle.menu_tooltip}>Profile</div>
                        }
                    </Link>

                    <div className={MenuStyle.hr}></div>
                    <div className={MenuStyle.menu_control} onClick={handlMenu_state}>
                        <div className={MenuStyle.logo_link}></div>
                        <p className={MenuStyle.item_link}>Close</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Menu;