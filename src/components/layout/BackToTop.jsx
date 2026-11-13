import { useEffect, useState } from "react"
import { ArrowUp } from "lucide-react"

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 450)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  if (!visible) return null

  return (
    <a
      className="back-to-top"
      href="#inizio"
      aria-label="Torna in alto"
      onClick={() =>
        document
          .querySelector(".site-header .brand")
          ?.focus({ preventScroll: true })
      }
    >
      <ArrowUp size={22} aria-hidden="true" />
      <span>Torna in alto</span>
    </a>
  )
}
