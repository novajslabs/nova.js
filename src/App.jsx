import { useBattery } from "./hooks/js/useBattery"
import { useIsTouchDevice } from "./hooks/js/useIsTouchDevice"
import { useRoute } from "./hooks/js/useRoute"

function AppJs() {
  const battery = useBattery()
  const isTouchDevice = useIsTouchDevice()
  const route = useRoute()

  return (
    <div>
      <p>Battery level:{battery.level * 100}</p>
      <p>{battery.charging ? "Battery charging" : "Battery not charging"}</p>
      <p>Current route: {route.route}</p>
      {isTouchDevice ? "It is a touch device" : "It is not a touch device"}
    </div>
  )
}

export default AppJs
