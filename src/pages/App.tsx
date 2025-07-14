import { Route, BrowserRouter as Router, Routes } from "react-router"
import LaunchingSoon from "./LaunchingSoon"

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LaunchingSoon />} />
        </Routes>
      </Router>
    </>
  )
}

export default App