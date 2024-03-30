import { useEffect, useSyncExternalStore, useCallback } from "react";

const dispatchStorageEvent = (key: string, newValue: string | null) =>
  window.dispatchEvent(new StorageEvent("storage", { key, newValue }));

const setLocalStorageItem = <T>(key: string, value: T) => {
  const stringifiedValue = JSON.stringify(value);
  window.localStorage.setItem(key, stringifiedValue);
  dispatchStorageEvent(key, stringifiedValue);
};

const removeLocalStorageItem = (key: string) => {
  window.localStorage.removeItem(key);
  dispatchStorageEvent(key, null);
};

const getLocalStorageItem = (key: string) => window.localStorage.getItem(key);

const useLocalStorageSubscribe = (cb: () => void) => {
  window.addEventListener("storage", cb);
  return () => window.removeEventListener("storage", cb);
};

const isFunction = <T>(
  value: T | ((prevState: T) => T)
): value is (prevState: T) => T => typeof value === "function";

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const getSnapshot = () => getLocalStorageItem(key);

  const store = useSyncExternalStore(useLocalStorageSubscribe, getSnapshot);

  const setState = useCallback(
    (v: T | ((prevState: T) => T)) => {
      try {
        let nextState: T;
        if (isFunction(v)) {
          // Asegúrate de que store no sea null antes de parsearlo
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
    [key, store, initialValue]
  );

  useEffect(() => {
    if (
      getLocalStorageItem(key) === null &&
      typeof initialValue !== "undefined"
    ) {
      setLocalStorageItem(key, initialValue);
    }
  }, [key, initialValue]);

  return { store: store ? JSON.parse(store) : initialValue, setState };
};
