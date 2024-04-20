import { useState, useEffect } from "react";

export const useBattery = () => {
  const [batteryState, setBatteryState] = useState({
    supported: true,
    loading: true,
    level: null,
    charging: null,
    chargingTime: null,
    dischargingTime: null,
  });

  useEffect(() => {
    let battery;

    const handleBatteryChange = () => {
      setBatteryState({
        supported: true,
        loading: false,
        level: battery.level,
        charging: battery.charging,
        chargingTime: battery.chargingTime,
        dischargingTime: battery.dischargingTime,
      });
    };

    if (!navigator.getBattery) {
      setBatteryState((batteryState) => ({
        ...batteryState,
        supported: false,
        loading: false,
      }));
      return;
    }

    navigator.getBattery().then((_battery) => {
      battery = _battery;
      handleBatteryChange();

      _battery.addEventListener("levelchange", handleBatteryChange);
      _battery.addEventListener("chargingchange", handleBatteryChange);
      _battery.addEventListener("chargingtimechange", handleBatteryChange);
      _battery.addEventListener("dischargingtimechange", handleBatteryChange);
    });

    return () => {
      if (battery) {
        battery.removeEventListener("levelchange", handleBatteryChange);
        battery.removeEventListener("chargingchange", handleBatteryChange);
        battery.removeEventListener("chargingtimechange", handleBatteryChange);
        battery.removeEventListener(
          "dischargingtimechange",
          handleBatteryChange
        );
      }
    };
  }, []);

  return batteryState;
};
