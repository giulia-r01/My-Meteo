import React, { useState } from "react"
import Accordion from "react-bootstrap/Accordion"
import Form from "react-bootstrap/Form"
import InputGroup from "react-bootstrap/InputGroup"
import MeteoCard from "./MeteoCard"
import { Col, Container, Row } from "react-bootstrap"

const API = "477e0e356c1c172d9d418ac94f6adfd1"
const PRESET_CITIES = ["Firenze", "milano", "cagliari"]

function MeteoAccordion() {
  const [cities, setCities] = useState(
    PRESET_CITIES.map((city) => ({ name: city, data: null }))
  )
  const [searchValue, setSearchValue] = useState("")

  const fetchWeatherForCity = (cityName) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API}&units=metric&lang=it`
    )
      .then((response) => {
        if (!response.ok) throw new Error("Errore nella fetch meteo")
        return response.json()
      })
      .then((data) => {
        console.log(data)
        setCities((prev) => {
          const alreadyExists = prev.find((c) => c.name === cityName)
          if (alreadyExists) {
            return prev.map((c) => (c.name === cityName ? { ...c, data } : c))
          } else {
            console.log(data)
            return [...prev, { name: cityName, data }]
          }
        })
      })
      .catch((err) => {
        console.error("Errore nel recupero meteo:", err)
      })
  }

  const handleSearch = () => {
    const city = searchValue.trim().toLowerCase()
    if (city) {
      fetchWeatherForCity(city)
      setSearchValue("")
    }
  }

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <h1 className="text-center fs-2 text-color py-4">
          Scopri che tempo fa nella tua città!
        </h1>
        <Col xs={12} md={8} lg={6}>
          <InputGroup className="mb-4">
            <Form.Control
              placeholder="Cerca una città..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <button className="btn mynav text-white" onClick={handleSearch}>
              Cerca
            </button>
          </InputGroup>
        </Col>
      </Row>

      <Row className="justify-content-center mt-4">
        <Col xs={12} md={8} lg={6}>
          <Accordion>
            {cities.map((cityObj, index) => (
              <Accordion.Item eventKey={index.toString()} key={cityObj.name}>
                <Accordion.Header
                  onClick={() => fetchWeatherForCity(cityObj.name)}
                >
                  Meteo:{" "}
                  {cityObj.name.charAt(0).toUpperCase() + cityObj.name.slice(1)}
                </Accordion.Header>
                <Accordion.Body>
                  {cityObj.data ? (
                    <MeteoCard data={cityObj.data} />
                  ) : (
                    <p>Clicca per caricare il meteo...</p>
                  )}
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Col>
      </Row>
    </Container>
  )
}

export default MeteoAccordion
