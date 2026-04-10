import { useEffect, useSyncExternalStore, useCallback } from "react";

const isFunction = <T>(value: T | ((prevState: T) => T)): value is (prevState: T) => T =>
  typeof value === "function";

const dispatchStorageEvent = (key: string, newValue: string | null) =>
  window.dispatchEvent(new StorageEvent("storage", { key, newValue }));

const getLocalStorageItem = (key: string) => window.localStorage.getItem(key);

const setLocalStorageItem = <T>(key: string, value: T) => {
  const stringifiedValue = JSON.stringify(value);
  window.localStorage.setItem(key, stringifiedValue);
  dispatchStorageEvent(key, stringifiedValue);
};

const removeLocalStorageItem = (key: string) => {
  window.localStorage.removeItem(key);
  dispatchStorageEvent(key, null);
};

const localStorageSubscribe = (cb: () => void) => {
  window.addEventListener("storage", cb);
  return () => window.removeEventListener("storage", cb);
};

/**
 * React hook to read, write, and remove a JSON-serializable value in `localStorage`.
 *
 * @template T - The stored value type.
 * @param {string} key - Storage key.
 * @param {T} initialValue - Value written when the key does not exist yet.
 * @returns {Object} An object with the current value and storage helpers.
 * @returns {T} returns.current - Current parsed storage value, or `initialValue` when the key is missing.
 * @returns {(value: T) => void} returns.setItemValue - Serializes and stores the provided value under `key`.
 * @returns {() => void} returns.removeItem - Removes the item from `localStorage`.
 */
export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const getSnapshot = () => getLocalStorageItem(key);
  const store = useSyncExternalStore(localStorageSubscribe, getSnapshot);

  const setState = useCallback(
    (v: T) => {
      try {
        let nextState: T;
        if (isFunction(v)) {
          const parsedStore = store ? JSON.parse(store) : null;
          nextState = v(parsedStore ?? initialValue);
        } else {
          nextState = v;
        }

        if (nextState === undefined || nextState === null) {
          removeLocalStorageItem(key);
        } else {
          setLocalStorageItem(key, nextState);
        }
      } catch (e) {
        console.log(e);
      }
    },
    [key, store, initialValue],
  );

  useEffect(
    function syncInitialLocalStorageValue() {
      if (getLocalStorageItem(key) === null && typeof initialValue !== "undefined") {
        setLocalStorageItem(key, initialValue);
      }
    },
    [key, initialValue],
  );

  return {
    current: store ? JSON.parse(store) : initialValue,
    setItemValue: setState,
    removeItem: () => removeLocalStorageItem(key),
  };
};
