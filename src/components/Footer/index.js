const socialUrls = [
    {  
        url: "https://twitter.com/",
        icon: "fa-twitter"
    },
    {
        url: "https://medium.com/",
        icon: "fa-medium"
    },
    {
        url: "https://facebook.com",
        icon: "fa-facebook"
    },
    {
        url: "https://reddit.com",
        icon: "fa-reddit"
    }
];

const companySection = [
    {
        name: "About Us",
    },
    {
        name: "Brand Assets",
    },
    {
        name: "Contact Us",
    },
    {
        name: "Careers",
        optional: () => (
            <div className="rounded-lg">
               <p className="text-[10px]"> We're Hiring! </p> 
            </div>
        )
    },
    {
        name: "Terms of Service",
    },
    {
        name: "Bug Bounty",
    },
];

const communitySection = [
    {
        name: "API Documentation",
    },
    {
        name: "Knowledge Base",
    },
    {
        name: "Network Status",
    },
    {
        name: "Newsletters",
    },
    {
        name: "Disqus Comments",
    },
];

const pAsSection = [
    {
        name: "Advertise",
    },
    {
        name: "Explorer-as-a-Service (EaaS)",
    },
    {
        name: "API Plans",
    },
    {
        name: "Priority Support",
    },
    {
        name: "Blockscan",
        icon: "fa-solid fa-arrow-up-right-from-square"
    },
    {
        name: "Blockscan Chat",
        icon: "fa-solid fa-arrow-up-right-from-square"
    }
]

export default function Footer() {
    return (
        <div className="bg-[#f8f9fa]">
            <div className="social-footer">
                {/* Social Footer */}
                <div className="flex content-center justify-between my-4">
                    <div className="flex gap-5">
                        {
                            socialUrls.map((social, index) => (
                                <div key={index} className="" >
                                    <div className="rounded-full">
                                        <a href={social.url}>
                                            <i className={`fa-brands ${social.icon}`}></i>
                                        </a>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="">
                        <i className="fa-solid fa-arrows-up-to-line"></i>
                        <p className="ml-1 inline text-[0.9062rem]"> Back to Top </p>
                    </div>
                </div>
                <hr className="bg-[#e9ecef] w-full" />
                {/* Menu Footer */}
                <div className="grid grid-cols-2 mt-10">
                    {/* COL 1 */}
                    <div className="flex flex-col gap-2">
                        <div>
                            <i className="fa-brands fa-ethereum fa-2xl"></i>
                            <p className="inline text-md ml-1"> Powered by Ethereum </p>
                        </div>
                        <p className="text-[0.75rem] mt-2 leading-none"> Etherscan is a Block Explorer and Analytics Platform for Ethereum, </p> 
                        <p className="text-[0.75rem] leading-none"> a descentralized smart contracts platform. </p>
                        <img src="/assets/the-world.jpeg" alt="the-world" height="50px" width="280px" />
                    </div>
                    {/* COL 2 */}
                    <div className="w-full flex justify-between">
                        <div className="flex flex-col">
                            <p className="font-semibold mb-1"> Company </p> 
                            {
                                companySection.map((section, index) => (
                                    <div key={index} className="flex content-center gap-1">
                                        <a key={index} href="/" className="text-[0.78rem] my-1"> { section.name } </a>
                                        {
                                            section.optional ? ( section.optional ) : null
                                        }
                                    </div>
                                ))
                            }
                        </div>
                        <div className="flex flex-col">
                            <p className="font-semibold mb-1"> Community </p> 
                            {
                                communitySection.map((section, index) => (
                                    <div key={index} className="flex content-center gap-1">
                                        <a key={index} href="/" className="text-[0.78rem] my-1"> { section.name } </a>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="flex flex-col">
                            <p className="font-semibold mb-1"> Products & Services </p> 
                            {
                                pAsSection.map((section, index) => (
                                    <div key={index} className="flex items-center gap-1">
                                        <a key={index} href="/" className="text-[0.78rem] my-1"> { section.name } </a>
                                        {
                                            section.icon ? <i className={`${section.icon} fa-xs ml-1`}></i> : null
                                        }
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <hr className="bg-[#e9ecef] w-full" />
                {/* COL 3 */}
                <div className="flex justify-end my-4">
                    <p className="text-[0.75rem]"> Donations: <span className="text-blue-400 ml-1 mr-2"> 0x000000...000000 </span> </p>
                    <i className="fa-solid fa-heart text-red-600"></i>
                </div>
            </div>
        </div>
    )
}