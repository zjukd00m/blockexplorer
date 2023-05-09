import { Routes, Route } from "react-router-dom";
import Index from "./pages";
import Blocks from "./pages/blocks";
import Transactions from "./pages/transactions";
import TopBar from "./components/TopBar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Address from "./pages/address";
import Block from "./pages/block";
import Transaction from "./pages/transaction";
import { useEffect, useState } from "react";

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.

// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface

function App() {
  const [isBlue, setIsBlue] = useState(false);

  useEffect(() => {
    console.log(window.location.pathname)
    if(window.location.pathname === "/") {
      setIsBlue(true);
    } else {
      setIsBlue(false);
    }

    return () => {
      setIsBlue(false);
    }
  }, [window.location.pathname]);

  return (
    <div className="relative">
      <div className="app-container flex flex-col 2xl:mx-[120px]">
        <TopBar />
        <hr className="bg-[#e9ecef] w-full" />
        <Navbar />
        <div className="-2xl:mx-[120px] -z-10">
          <div className={`absolute w-full h-[250px] bg-blue-800 left-0 ${!isBlue ? 'bg-white' : null}`}> </div>
        </div>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/blocks" element={<Blocks />} />
          <Route path="/block/:blockNumber" element={<Block />} />
          <Route path="/txs" element={<Transactions />} />
          <Route path="/tx/:txHash" element={<Transaction />} />
          <Route path="/address/:userAddress" element={<Address />} />
        </Routes>
      </div>
      <div className="mt-5">
        <Footer />
      </div>
    </div>
  )
}

export default App;
