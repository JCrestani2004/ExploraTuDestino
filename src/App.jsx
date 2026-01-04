import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"


const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App