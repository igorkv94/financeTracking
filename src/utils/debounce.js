export function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      // eslint-disable-next-line babel/no-invalid-this
      func.apply(this, args);
    }, timeout);
  };
}
