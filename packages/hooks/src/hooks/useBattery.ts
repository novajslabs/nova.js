import { useSyncExternalStore } from "react";

interface BatteryManager {
  level: number;
  charging: boolean;
  chargingTime: number;
  dischargingTime: number;
  addEventListener(
    type: string,
    listener: EventListener | EventListenerObject | null,
    options?: boolean | AddEventListenerOptions,
  ): void;
  removeEventListener(
    type: string,
    listener: EventListener | EventListenerObject | null,
    options?: boolean | EventListenerOptions,
  ): void;
}

interface BatteryState {
  supported: boolean;
  loading: boolean;
  level: number | null;
  charging: boolean | null;
  chargingTime: number | null;
  dischargingTime: number | null;
}

interface NavigatorWithBattery extends Navigator {
  getBattery: () => Promise<BatteryManager>;
}

let battery: BatteryManager | null = null;
let cachedSnapshot: BatteryState = {
  supported: true,
  loading: true,
  level: null,
  charging: null,
  chargingTime: null,
  dischargingTime: null,
};

const getBattery = async () => {
  if (!battery) {
    battery = await (navigator as NavigatorWithBattery).getBattery();
  }
  return battery;
};

const getSnapshot = (): BatteryState => {
  if (!(navigator as NavigatorWithBattery).getBattery) {
    if (!cachedSnapshot.supported && !cachedSnapshot.loading) return cachedSnapshot;

    cachedSnapshot = {
      supported: false,
      loading: false,
      level: null,
      charging: null,
      chargingTime: null,
      dischargingTime: null,
    };
    return cachedSnapshot;
  }

  if (!battery) {
    if (cachedSnapshot.loading) return cachedSnapshot;

    cachedSnapshot = {
      supported: true,
      loading: true,
      level: null,
      charging: null,
      chargingTime: null,
      dischargingTime: null,
    };
    return cachedSnapshot;
  }

  if (
    cachedSnapshot.level === battery.level &&
    cachedSnapshot.charging === battery.charging &&
    cachedSnapshot.chargingTime === battery.chargingTime &&
    cachedSnapshot.dischargingTime === battery.dischargingTime &&
    !cachedSnapshot.loading
  ) {
    return cachedSnapshot;
  }

  cachedSnapshot = {
    supported: true,
    loading: false,
    level: battery.level,
    charging: battery.charging,
    chargingTime: battery.chargingTime,
    dischargingTime: battery.dischargingTime,
  };
  return cachedSnapshot;
};

const serverSnapshot: BatteryState = {
  supported: false,
  loading: false,
  level: null,
  charging: null,
  chargingTime: null,
  dischargingTime: null,
};

const getServerSnapshot = () => serverSnapshot;

const subscribe = (onStoreChange: () => void) => {
  getBattery().then((bat) => {
    bat.addEventListener("levelchange", onStoreChange);
    bat.addEventListener("chargingchange", onStoreChange);
    bat.addEventListener("chargingtimechange", onStoreChange);
    bat.addEventListener("dischargingtimechange", onStoreChange);
    onStoreChange();
  });

  return () => {
    if (battery) {
      battery.removeEventListener("levelchange", onStoreChange);
      battery.removeEventListener("chargingchange", onStoreChange);
      battery.removeEventListener("chargingtimechange", onStoreChange);
      battery.removeEventListener("dischargingtimechange", onStoreChange);
    }
  };
};

/**
 * React hook to read the current device battery status through the Battery Status API.
 *
 * @returns {BatteryState} The current battery snapshot.
 * @returns {boolean} returns.supported - `false` when the current browser does not support the Battery Status API.
 * @returns {boolean} returns.loading - `true` while the battery manager is still being resolved.
 * @returns {number | null} returns.level - Battery level from `0` to `1`, or `null` while unavailable.
 * @returns {boolean | null} returns.charging - `true` when the device is charging, or `null` while unavailable.
 * @returns {number | null} returns.chargingTime - Seconds remaining until the battery is fully charged, or `null` while unavailable.
 * @returns {number | null} returns.dischargingTime - Estimated seconds remaining until the battery is empty, or `null` while unavailable.
 */
export const useBattery = () => {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
};
