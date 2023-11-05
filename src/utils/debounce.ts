export default function debounce(func: () => any, delay: number) {
  let timer: NodeJS.Timeout;
  return function (this: typeof debounce) {
    const context = this;
    const args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      func.apply(context, args as unknown as []);
    }, delay);
  };
}
