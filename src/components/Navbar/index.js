import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import navbarMenu from "./menu";
import NavbarDropdown from "../NavbarDropdown";
import "./styles.css";
import { useEffect, useState } from "react";

export default function Navbar() {
    const [openMenu, setOpenMenu] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        window.addEventListener("resize", () => {
            const width = window.innerWidth;

            if (width <= 1024) {
                setOpenMenu(false);
            } else {
                setOpenMenu(true);
            }
        })
    }, []);

    return (
        <nav className="navbar_container py-4 relative">
            <div className="navbar_logo__container">
                <img className="flex-grow-0" src="https://etherscan.io/assets/svg/logos/logo-etherscan.svg?v=0.0.5" height="34.5px" width="150px" alt="Etherscan Logo" onClick={() => navigate("/")} />
                <div className="nav_hamburguer__icon">
                    <div className="w-full" onClick={() => setOpenMenu(!openMenu)}>
                        <i class="m-3 fa-solid fa-bars"></i> 
                    </div>
                </div>
            </div>
            
            <div className="navbar__menu">
                <ul className="flex items-center gap-8 mr-8 navbar__menu_list">
                    {
                        openMenu && navbarMenu.map(({ name, items }, key) => {
                            return (
                                <li key={key} className="navbar-dropdown">
                                    <NavbarDropdown name={name} items={items} />
                                </li>
                            )
                        })
                    } 
                </ul> 
                <div className="navbar-user gap-2 w-fit">
                    <p className=""> Sign In </p>
                    <UserCircleIcon className="" height="22px" width="22px" />
                </div>
            </div>
        </nav>
    )
}