import { useEffect, useState } from "react"
import { readStored } from "../utils/storage"

export default function useLocalStorageState(key, fallback, sanitize) {
  const [value, setValue] = useState(() => sanitize(readStored(key, fallback)))

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      return
    }
  }, [key, value])

  return [value, setValue]
}
