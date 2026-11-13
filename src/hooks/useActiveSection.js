import { useEffect, useState } from "react"

export default function useActiveSection() {
  const [active, setActive] = useState("oggi")

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: "-15% 0px -55% 0px" },
    )

    document
      .querySelectorAll("[data-nav-section]")
      .forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return active
}
