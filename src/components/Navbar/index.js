import { UserCircleIcon } from "@heroicons/react/24/solid";
import navbarMenu from "./menu";
import NavbarDropdown from "../NavbarDropdown";

export default function Navbar() {
    return (
        <nav className="flex items-center justify-between py-4">
            <div className="flex-grow">
                <img src="https://etherscan.io/assets/svg/logos/logo-etherscan.svg?v=0.0.5" height="34.5px" width="150px" alt="Etherscan Logo" />
            </div>
            
            <ul className="flex items-center gap-8 mr-8">
                {
                    navbarMenu.map(({ name, items }, key) => {
                        return (
                            <li key={key} className="">
                                <NavbarDropdown name={name} items={items} />
                            </li>
                        )
                    })
                } 
            </ul> 

            <div className="flex items-center gap-2">
                <UserCircleIcon height="19" width="19" />
                <p className=""> Sign In </p>
            </div>
        </nav>
    )
}