import { useEffect, useState } from "react"

export const useRoute = () => {
  const [route, setRoute] = useState(window.location.pathname)

  useEffect(() => {
    const handleRouteChange = () => setRoute(window.location.pathname)

    window.addEventListener("popstate", handleRouteChange)

    return () => window.removeEventListener("popstate", handleRouteChange)
  }, [])

  const navigate = to => {
    window.history.pushState({}, "", to)
    setRoute(to)
  }

  return { route, navigate }
}
