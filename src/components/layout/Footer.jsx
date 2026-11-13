import Brand from "./Brand"

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <Brand />
        <p>Il meteo, semplice.</p>
        <p>© {new Date().getFullYear()} myMeteo</p>
      </div>
    </footer>
  )
}
