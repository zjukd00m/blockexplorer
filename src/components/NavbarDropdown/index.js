import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useState } from "react"

export default function NavbarDropdown({ name, items }) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="flex flex-col w-full" 
            onMouseEnter={() => setIsExpanded(true)} 
            onMouseLeave={() => setIsExpanded(false)} 
            onClick={() => setIsExpanded(!isExpanded)}
        >
            <div className="flex items-center gap-2 w-full">
                <p className="text-[14.5px]"> { name } </p>
                <div className="flex w-full">
                    <div className="flex-grow"></div>
                    {
                        items?.length ? <ChevronDownIcon height="15" width="15" /> : null
                    }
                </div>
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