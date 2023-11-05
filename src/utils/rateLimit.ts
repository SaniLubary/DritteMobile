export default function rateLimitedFunction(callback: () => any, timeInterval: number) {
  let lastExecuted = 0;

  return function (this: typeof rateLimitedFunction) {
    const currentTime = Date.now();
    if (currentTime - lastExecuted >= timeInterval) {
      callback.apply(this, arguments as unknown as []);
      callback()
      lastExecuted = currentTime;
    }
  };
}
