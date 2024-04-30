import { useBattery } from "./hooks/js/useBattery";
import { useIsTouchDevice } from "./hooks/js/useIsTouchDevice";
import { useScript } from "./hooks/js/useScript";

function AppJs() {
  const battery = useBattery();
  const isTouchDevice = useIsTouchDevice();
  const mermaidIsReady = useScript(
    "https://cdnjs.cloudflare.com/ajax/libs/mermaid/10.9.0/mermaid.min.js"
  );
  const classDiagramExample = `
            classDiagram
            class GeoPointType {
            <<enumeration>>
              BROWNFIELD
              OGWELL
              CELL_TOWER
              NUCLEAR_REACTOR
              SUPERFUND
            }`;

  return (
    <div>
      <p>Battery level:{battery.level * 100}</p>
      <p>{battery.charging ? "Battery charging" : "Battery not charging"}</p>

      {isTouchDevice ? "It is a touch device" : "It is not a touch device"}

      {mermaidIsReady && (
        <>
          <h2>Mermaid</h2>
          <div className="mermaid">{classDiagramExample}</div>
        </>
      )}
    </div>
  );
}

export default AppJs;
