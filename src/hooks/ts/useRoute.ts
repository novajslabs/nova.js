import { useEffect, useState } from "react"

interface UseRouteOutput {
  route: string
  navigate: (newRoute: string) => void
}

export const useRoute = (): UseRouteOutput => {
  const [route, setRoute] = useState<string>(window.location.pathname)

  useEffect(() => {
    const handlePopState = () => setRoute(window.location.pathname)

    window.addEventListener("popstate", handlePopState)

    return () => window.removeEventListener("popstate", handlePopState)
  }, [])

  const navigate = (newRoute: string) => {
    window.history.pushState({}, "", newRoute)
    setRoute(newRoute)
  }

  return { route, navigate }
}
