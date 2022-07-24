
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
      if (newValue.codigo === 0) {
        localStorage.removeItem("usuario_bar");
        return;
      };
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };




