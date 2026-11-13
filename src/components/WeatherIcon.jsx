import { condition } from "../utils/weather"

export default function WeatherIcon({ code, night = false, className = "" }) {
  const type = condition(code).type
  const sun = type === "sun" || type === "partly"
  return (
    <svg
      className={`weather-icon ${className}`}
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {sun &&
        (night ? (
          <path
            d="M74 21A32 32 0 1 0 99 69 34 34 0 0 1 74 21Z"
            fill="#b4dce2"
            stroke="#8db7c5"
            strokeWidth="2"
          />
        ) : (
          <g stroke="#23cfbe" strokeWidth="5" strokeLinecap="round">
            <circle cx="60" cy="51" r="22" fill="#23cfbe" strokeWidth="2" />
            {Array.from({ length: 8 }, (_, i) => (
              <path
                key={i}
                d="M60 11v10"
                transform={`rotate(${i * 45} 60 51)`}
              />
            ))}
          </g>
        ))}
      {type !== "sun" && (
        <path
          d="M32 87C8 87 8 53 32 51 40 28 76 28 84 57 108 55 114 87 91 87Z"
          fill="#e4f1f5"
          stroke="#86acbb"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      )}
      {type === "rain" && (
        <g stroke="#43c4e5" strokeWidth="4" strokeLinecap="round">
          <path d="m37 96-5 9m28-9-5 9m28-9-5 9" />
        </g>
      )}
      {type === "storm" && (
        <>
          <path d="m61 78-14 22h13l-5 16 24-28H65l7-10" fill="#23cfbe" />
          <path
            d="m32 96-4 8m58-8-4 8"
            stroke="#43c4e5"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </>
      )}
      {type === "snow" && (
        <g stroke="#59a4c0" strokeWidth="3" strokeLinecap="round">
          <path d="M39 96v12m-6-6h12m28-6v12m-6-6h12" />
        </g>
      )}
      {type === "fog" && (
        <g stroke="#86acbb" strokeWidth="3" strokeLinecap="round">
          <path d="M23 97h73M32 106h55" />
        </g>
      )}
    </svg>
  )
}
