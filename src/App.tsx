import { useBattery } from "./hooks/ts/useBattery";
import { useIsTouchDevice } from "./hooks/ts/useIsTouchDevice";

function AppTs() {
  const battery = useBattery();
  const isTouchDevice = useIsTouchDevice();

  return (
    <div>
      <p>Battery level:{battery.level && battery.level * 100}</p>
      <p>{battery.charging ? "Battery charging" : "Battery not charging"}</p>

      {isTouchDevice ? 'It is a touch device' : 'It is not a touch device'}
    </div>
  );
}

export default AppTs;
