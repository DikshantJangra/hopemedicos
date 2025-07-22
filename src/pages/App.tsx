import { Route, BrowserRouter as Router, Routes } from "react-router"
import LandingPage from "./LandingPage/LandingPage"
import AboutUs from "./AboutUs"

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutUs />} /> {/* Added route for About Us page */}
        </Routes>
      </Router>
    </>
  )
}

export default App