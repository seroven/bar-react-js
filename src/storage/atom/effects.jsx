export const localStorageEffects =
  (key) =>
  ({ setSelf, onSet }) => {
    if (typeof localStorage == "undefined") {
      return;
    }

    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue, _, isReset) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };




