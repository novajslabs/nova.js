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
 * React hook to track the battery status of a user's device.
 *
 * @returns {BatteryState} The current battery state.
 * @returns {boolean} returns.supported - `false` if the Battery Status API is not available in the current browser.
 * @returns {boolean} returns.loading - `true` while the `BatteryManager` promise has not resolved yet.
 * @returns {number | null} returns.level - Battery level from `0` to `1` (e.g. `0.72` = 72%), or `null` while loading.
 * @returns {boolean | null} returns.charging - `true` if the device is currently charging, or `null` while loading.
 * @returns {number | null} returns.chargingTime - Seconds until fully charged, `0` if already full, or `null` while loading.
 * @returns {number | null} returns.dischargingTime - Seconds of battery life remaining, or `null` while loading or charging.
 *
 * @example
 * const { supported, loading, level, charging, chargingTime, dischargingTime } = useBattery();
 *
 * if (!supported) return <p>Battery API not supported.</p>;
 * if (loading) return <p>Loading battery info...</p>;
 *
 * return (
 *   <div>
 *     <p>Level: {level! * 100}%</p>
 *     <p>{charging ? `Full in ${chargingTime}s` : `Remaining: ${dischargingTime}s`}</p>
 *   </div>
 * );
 */
export const useBattery = () => {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
};
