import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Header from "./components/Header"
import CountryDetail from "./pages/CountryDetail"


const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/country/:name" element={<CountryDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App