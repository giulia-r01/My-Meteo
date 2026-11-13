export function formatTemperature(value, unit) {
  return value == null
    ? "—"
    : Math.round(unit === "F" ? (value * 9) / 5 + 32 : value)
}

export function condition(code) {
  if (code === 0) return { label: "Sereno", type: "sun" }
  if (code === 1 || code === 2)
    return { label: "Parzialmente nuvoloso", type: "partly" }
  if (code === 3) return { label: "Nuvoloso", type: "cloud" }
  if (code === 45 || code === 48) return { label: "Nebbia", type: "fog" }
  if ([71, 73, 75, 77, 85, 86].includes(code))
    return { label: "Neve", type: "snow" }
  if (code >= 95) return { label: "Temporali", type: "storm" }
  if ([51, 53, 55, 56, 57].includes(code))
    return { label: "Pioviggine", type: "rain" }
  if ([61, 66, 80].includes(code))
    return { label: "Pioggia leggera", type: "rain" }
  if ([63, 65, 67, 81, 82].includes(code))
    return { label: "Pioggia", type: "rain" }
  return { label: "Condizioni non disponibili", type: "cloud" }
}
