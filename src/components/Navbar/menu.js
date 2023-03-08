const navbarMenu = [
    {
        name: "Home",
    },
    {
        name: "Blockchain",
        items: [
            { name: "Transactions" },
            { name: "Pending Transactions" },
            { name: "Contract Internal Transactions" },
            { name: "SEPARATOR" },
            { name: "View Blocks" },
            { name: "Forked Blocks (Reorgs)" },
            { name: "Uncles" },
            { name: "SEPARATOR" },
            { name: "Top Accounts" },
            { name: "Verified Contracts" },
        ]
    },
    {
        name: "Tokens",
        items: [
            { name: "Top Tokens (ERC-20)"},
            { name: "Token Transfers (ERC-20)"}
        ]
    },
    {
        name: "NFTs",
        items: [
            { name: "Top NFTs" },
            { name: "Latest Trades" },
            { name: "Latest Transfers" },
            { name: "Latest Mints" },
        ],
    },
    {
        name: "Resources",
        items: [
            { name: "Charts And Stats" },
            { name: "Top Statistics" },
            { name: "SEPARATOR" },
            { name: "Directory" },
            { name: "Newsletter" },
            { name: "Knowledge Base" },
        ],
    },
    {
        name: "Developers",
        items: [
            { name: "API Plans" },
            { name: "API Documentation" },
            { name: "SEPARATOR" },
            { name: "Verify Contract" },
            { name: "Smart Contract Search" },
            { name: "Contract Diff Checker" },
            { name: "SEPARATOR" },
            { name: "Vyper Online Compiler" },
            { name: "Bytecode to Opcode" },
            { name: "Broadcast Transaction" },
        ],
    },
    {
        name: "More",
        items: [],
    }
];

export default navbarMenu;