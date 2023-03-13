import { useState, useEffect } from "react";

export default function Address(props) {
    console.log(props);

    const [address, setAddress] = useState();
    const [ethBalance, setEthBalance] = useState();
    const [firstTxSent, setFirstTxSent] = useState();
    const [lastTxSent, setLastTxSent] = useState();

    return (
        <div className="">
            <p> Address overview </p>
        </div>
    )
}