import { useBattery } from "./hooks/ts/useBattery";
import { useIsTouchDevice } from "./hooks/ts/useIsTouchDevice";
import { useLoadScript } from "./hooks/ts/useLoadScript";
import { classDiagramExample } from "./constants";

function AppTs() {
  const battery = useBattery();
  const isTouchDevice = useIsTouchDevice();
  const mermaidIsReady = useLoadScript(
    "https://cdnjs.cloudflare.com/ajax/libs/mermaid/10.9.0/mermaid.min.js"
  );
  return (
    <div>
      <p>Battery level:{battery.level && battery.level * 100}</p>
      <p>{battery.charging ? "Battery charging" : "Battery not charging"}</p>

      {isTouchDevice ? "It is a touch device" : "It is not a touch device"}

      {mermaidIsReady && <div className="mermaid">{classDiagramExample}</div>}
    </div>
  );
}

export default AppTs;
