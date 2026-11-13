import Brand from "./Brand"
import useActiveSection from "../../hooks/useActiveSection"

export default function Header({ unit, onUnitChange }) {
  const active = useActiveSection()
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Brand />
        <nav className="pill-nav" aria-label="Navigazione principale">
          {[
            ["oggi", "Oggi"],
            ["settimana", "Settimana"],
            ["dettagli", "Dettagli"],
          ].map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className={active === id ? "active" : ""}
              aria-current={active === id ? "location" : undefined}
            >
              {label}
            </a>
          ))}
        </nav>
        <div
          className="unit-switch"
          role="group"
          aria-label="Unità di temperatura"
        >
          {["C", "F"].map((value) => (
            <button
              key={value}
              aria-label={`Gradi ${value === "C" ? "Celsius" : "Fahrenheit"}`}
              aria-pressed={unit === value}
              onClick={() => onUnitChange(value)}
            >
              °{value}
            </button>
          ))}
        </div>
      </div>
    </header>
  )
}
