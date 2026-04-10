import { useCallback, useEffect, useSyncExternalStore } from "react";

const isFunction = <T>(value: T | ((prevState: T) => T)): value is (prevState: T) => T =>
  typeof value === "function";

const dispatchStorageEvent = (key: string, newValue: string | null) => {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(
    new StorageEvent("storage", {
      key,
      newValue,
      storageArea: window.sessionStorage,
    }),
  );
};

const getSessionStorageItem = (key: string) => {
  if (typeof window === "undefined") {
    return null;
  }

  return window.sessionStorage.getItem(key);
};

const setSessionStorageItem = <T>(key: string, value: T) => {
  if (typeof window === "undefined") {
    return;
  }

  const stringifiedValue = JSON.stringify(value);
  window.sessionStorage.setItem(key, stringifiedValue);
  dispatchStorageEvent(key, stringifiedValue);
};

const removeSessionStorageItem = (key: string) => {
  if (typeof window === "undefined") {
    return;
  }

  window.sessionStorage.removeItem(key);
  dispatchStorageEvent(key, null);
};

const subscribeToSessionStorage = (callback: () => void) => {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener("storage", callback);
  };
};

const getSessionStorageServerSnapshot = () => null;

/**
 * React hook to read, write, and remove a JSON-serializable value in `sessionStorage`.
 *
 * @template T - The stored value type.
 * @param {string} key - Storage key.
 * @param {T} initialValue - Value written when the key does not exist yet.
 * @returns {Object} An object with the current value and storage helpers.
 * @returns {T} returns.current - Current parsed storage value, or `initialValue` when the key is missing.
 * @returns {(value: T | ((prevState: T) => T)) => void} returns.setItemValue - Serializes and stores the provided value under `key`.
 * @returns {() => void} returns.removeItem - Removes the item from `sessionStorage`.
 */
export const useSessionStorage = <T>(key: string, initialValue: T) => {
  const store = useSyncExternalStore(
    subscribeToSessionStorage,
    () => getSessionStorageItem(key),
    getSessionStorageServerSnapshot,
  );

  const setState = useCallback(
    (value: T | ((prevState: T) => T)) => {
      try {
        let nextState: T;
        if (isFunction(value)) {
          const parsedStore = store ? (JSON.parse(store) as T) : null;
          nextState = value(parsedStore ?? initialValue);
        } else {
          nextState = value;
        }

        if (nextState === undefined || nextState === null) {
          removeSessionStorageItem(key);
        } else {
          setSessionStorageItem(key, nextState);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [initialValue, key, store],
  );

  useEffect(
    function syncInitialSessionStorageValue() {
      if (getSessionStorageItem(key) === null && typeof initialValue !== "undefined") {
        setSessionStorageItem(key, initialValue);
      }
    },
    [initialValue, key],
  );

  return {
    current: store ? (JSON.parse(store) as T) : initialValue,
    setItemValue: setState,
    removeItem: () => removeSessionStorageItem(key),
  };
};
