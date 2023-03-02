import { Routes, Route } from "react-router-dom";
import Index from "./pages";

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.

// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface

function App() {

  return (
    <Routes>
      <Route path="/" element={<Index />} />
    </Routes>
  )
}

export default App;
