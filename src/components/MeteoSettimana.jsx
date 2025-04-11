import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { Spinner, Alert, Container, Row, Col, Card } from "react-bootstrap"

const MeteoSettimana = () => {
  const { cityName } = useParams()
  const [previsione, setPrevisione] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  const conditionImages = {
    "cielo sereno": "/sun.png",
    "poche nuvole": "/cloud.png",
    "pioggia leggera": "/rain.png",
    "pioggia moderata": "/umbrella.png",
    "cielo coperto": "/clouds.png",
    "nubi sparse": "/cloud.png",
    Default: "/icons8-fai-una-domanda.gif",
  }

  const API = "477e0e356c1c172d9d418ac94f6adfd1"
  const WeekWeather = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API}&units=metric&lang=it`

  useEffect(() => {
    fetch(WeekWeather)
      .then((response) => {
        if (!response.ok)
          throw new Error("Errore nel recupero delle previsioni")
        return response.json()
      })
      .then((data) => {
        const groupedData = data.list.reduce((acc, item) => {
          const date = new Date(item.dt * 1000).toLocaleDateString()
          if (!acc[date]) acc[date] = []
          acc[date].push(item)
          return acc
        }, {})

        const processedData = Object.keys(groupedData).map((date) => {
          const dayData = groupedData[date]
          const tempMin = Math.min(...dayData.map((item) => item.main.temp_min))
          const tempMax = Math.max(...dayData.map((item) => item.main.temp_max))
          const condition = dayData[0].weather[0].description // Usa 'description' per avere il testo in italiano

          return { date, tempMin, tempMax, condition }
        })

        setPrevisione(processedData)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error("Errore nella fetch delle previsioni:", error)
        setIsError(true)
        setIsLoading(false)
      })
  }, [cityName])

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        {isLoading && (
          <Spinner animation="border" className="text-center text-color" />
        )}
        {isError && (
          <Alert variant="danger" className="text-center">
            Non siamo riusciti a recuperare le previsioni per {cityName}.
          </Alert>
        )}
        {!isLoading && !isError && previsione && (
          <>
            <h2 className="my-4 text-center text-warning fw-bold">
              Previsioni per {cityName}
            </h2>
            <Row>
              {previsione.map((prev, index) => (
                <Col key={index} xs={12} md={6} lg={4}>
                  <Card className="my-3 text-center">
                    <Card.Img
                      className="card-img"
                      src={conditionImages[prev.condition]}
                      alt={prev.condition}
                    />

                    <Card.Body>
                      <Card.Title>{prev.date}</Card.Title>
                      <Card.Text>
                        <strong>Temp Min:</strong> {prev.tempMin}°C
                        <br />
                        <strong>Temp Max:</strong> {prev.tempMax}°C
                        <br />
                        <strong>Condizione:</strong> {prev.condition}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </>
        )}
      </Row>
    </Container>
  )
}

export default MeteoSettimana
