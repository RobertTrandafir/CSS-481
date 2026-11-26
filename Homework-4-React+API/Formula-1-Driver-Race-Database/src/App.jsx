import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './components/Home.jsx'
import Drivers from './components/Drivers.jsx'
import DriverDetails from './components/DriverDetails.jsx'
import Races from './components/Races.jsx'
import RaceDetails from './components/RaceDetails.jsx'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/drivers" element={<Drivers />} />
          <Route path="/drivers/:driverNumber" element={<DriverDetails />} />
          <Route path="/races" element={<Races />} />
          <Route path="/races/:sessionKey" element={<RaceDetails />} />
          <Route path="*" element={<p>Page not found. <Link to="/">Go home</Link></p>} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
