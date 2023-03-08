import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useState } from "react"

export default function NavbarDropdown({ name, items }) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="flex flex-col">
            <div className="flex items-center gap-2" onClick={() => setIsExpanded(!isExpanded)}>
                <p className="text-[14.5px]"> { name } </p>
                {
                    items?.length ? <ChevronDownIcon height="15" width="15" /> : null
                }
            </div>
            <div className="relative">
                {
                    items?.length && isExpanded ? (
                        <ul className="flex flex-col gap-1 absolute bg-[#f8f8f8] w-[250px] rounded-b-2xl">
                            {
                                items.map(({ name }, key) => (
                                    <li key={key} className="px-6 py-[0.3rem]">
                                        {
                                            name === "SEPARATOR" ? <hr className="bg-[#e9ecef] w-full" /> : <p className="text-[.8203125rem]"> { name } </p>
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