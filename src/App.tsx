import { useBattery } from "./hooks/ts/useBattery";

function AppTs() {
  const battery = useBattery();

  return (
    <div>
      <p>Battery level:{battery.level && battery.level * 100}</p>
      <p>{battery.charging ? "Battery charging" : "Battery not charging"}</p>
    </div>
  );
}

export default AppTs;
