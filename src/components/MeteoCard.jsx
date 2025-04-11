import React from "react"
import { useNavigate } from "react-router-dom"

function MeteoCard({ data }) {
  const navigate = useNavigate()
  if (data.error) return <div className="text-danger">{data.error}</div>

  const { name, main, weather, wind } = data

  return (
    <div className="card mt-3 text-center">
      <div className="card-body">
        <div className="card-title">
          <h5>{name}</h5>
        </div>
        <div className="card-text">
          <div className="d-flex justify-content-center mb-3">
            <div className="me-4">
              <strong>Min:</strong>{" "}
              <i className="bi bi-thermometer-snow text-primary"></i>
              {main.temp_min}°C
            </div>
            <div>
              <strong>Max:</strong>{" "}
              <i className="bi bi-thermometer-sun text-warning"></i>
              {main.temp_max}°C
            </div>
          </div>

          <div className="d-flex justify-content-center gap-4">
            <div>
              <strong>Condizione:</strong>
              {<br />}
              {weather[0].main === "Clear" && (
                <>
                  <i className="bi bi-sun me-2 text-warning"></i>
                  Soleggiato
                </>
              )}
              {weather[0].main === "Clouds" && (
                <>
                  <i className="bi bi-cloud me-2 text-info"></i>
                  Poco nuvoloso
                </>
              )}
              {weather[0].main === "Rain" && (
                <>
                  <i className="bi bi-cloud-rain me-2"></i>
                  Pioggia
                </>
              )}
              {!["Clear", "Clouds", "Rain", "Thunderstorm"].includes(
                weather[0].main
              ) && (
                <>
                  <i className="bi bi-question-circle me-2"></i>
                  {weather[0].description}
                </>
              )}
            </div>

            <div>
              <strong>Umidità:</strong>
              {<br />}
              <i className="bi bi-droplet me-2 text-info"></i>
              {main.humidity}%
            </div>

            <div>
              <strong>Vento:</strong> {<br />}
              <i className="bi bi-wind me-2 text-info"></i>
              {wind.speed} m/s
            </div>
          </div>
        </div>
        <div className="pt-4">
          <button
            onClick={() => navigate(`/meteo-settimana/${data.name}`)}
            className="btn mynav text-white"
          >
            Vai alle previsioni
          </button>
        </div>
      </div>
    </div>
  )
}

export default MeteoCard
