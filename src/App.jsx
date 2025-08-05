import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.min.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./index.css"
import NavbarMeteo from "./components/NavbarMeteo"
import FooterMeteo from "./components/FooterMeteo"
import MeteoAccordion from "./components/MeteoAccordion"
import MeteoSettimana from "./components/MeteoSettimana"

function App() {
  return (
    <>
      <BrowserRouter>
        <NavbarMeteo />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<MeteoAccordion />} />
            <Route
              element={<MeteoSettimana />}
              path="/meteo-settimana/:cityName"
            />
          </Routes>
        </main>
        <FooterMeteo />
      </BrowserRouter>
    </>
  )
}

export default App
