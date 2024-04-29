import { useBattery } from "./hooks/ts/useBattery"
import { useIsTouchDevice } from "./hooks/ts/useIsTouchDevice"
import { useRoute } from "./hooks/ts/useRoute"

function AppTs() {
  const battery = useBattery()
  const isTouchDevice = useIsTouchDevice()
  const route = useRoute()

  return (
    <div>
      <p>Battery level:{battery.level && battery.level * 100}</p>
      <p>{battery.charging ? "Battery charging" : "Battery not charging"}</p>
      <p>Current route: {route.route}</p>

      {isTouchDevice ? "It is a touch device" : "It is not a touch device"}
    </div>
  )
}

export default AppTs
