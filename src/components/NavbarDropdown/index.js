import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useState } from "react"

export default function NavbarDropdown({ name, items }) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="flex flex-col" onMouseEnter={() => setIsExpanded(true)} onMouseLeave={() => setIsExpanded(false)}>
            <div className="flex items-center gap-2">
                <p className="text-[14.5px] hover:text-[#1e40af]"> { name } </p>
                {
                    items?.length ? <ChevronDownIcon height="15" width="15" /> : null
                }
            </div>
            <div className="relative">
                {
                    items?.length && isExpanded ? (
                        <ul className="flex flex-col bg-white absolute w-[250px] rounded-b-2xl">
                            {
                                items.map(({ name }, key) => (
                                    <li key={key} className="p-1">
                                        {
                                            name === "SEPARATOR" ? <hr className="bg-[#e9ecef] w-full" /> : (
                                                <div className="hover:bg-[#c8d0db] p-1 rounded-lg">
                                                    <p className="text-[.8203125rem]"> { name } </p>
                                                </div>
                                            )
                                        }
                                    </li>  
                                ))
                            }
                        </ul>
                    ) : null
                }
            </div>
        </div>
    )
}