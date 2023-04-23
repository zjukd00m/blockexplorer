import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import navbarMenu from "./menu";
import NavbarDropdown from "../NavbarDropdown";
import "./styles.css";
import { useState } from "react";

export default function Navbar() {
    const [openMenu, setOpenMenu] = useState(false);
    const navigate = useNavigate();
    return (
        <nav className="navbar_container py-4 relative">
            <div className="navbar_logo__container">
                <img className="flex" src="https://etherscan.io/assets/svg/logos/logo-etherscan.svg?v=0.0.5" height="34.5px" width="150px" alt="Etherscan Logo" onClick={() => navigate("/")} />
                <div className="nav_hamburguer__icon w-full flex-wrap">
                    <div className="w-full" onClick={() => setOpenMenu(!openMenu)}>
                        <i class="m-3 fa-solid fa-bars"></i> 
                    </div>
                </div>
            </div>
            
            <div className="navbar__menu">
                <ul className="flex items-center gap-8 mr-8">
                    {
                        navbarMenu.map(({ name, items }, key) => {
                            return (
                                <li key={key} className="navbar-dropdown">
                                    <NavbarDropdown name={name} items={items} />
                                </li>
                            )
                        })
                    } 
                </ul> 
                <div className="navbar-user flex items-center gap-2 w-full">
                    <p className=""> Sign In </p>
                    <UserCircleIcon height="22px" width="22px" />
                </div>
            </div>
        </nav>
    )
}