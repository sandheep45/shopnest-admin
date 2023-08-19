/**
 * Creates a debounced function that delays invoking `func` until after `wait` milliseconds have elapsed since the last time the debounced function was invoked.
 * The debounced function comes with a `cancel` method to cancel delayed `func` invocations and a `flush` method to immediately invoke them.
 *
 * @param func The function to debounce.
 * @param wait The number of milliseconds to delay.
 * @param options The options object.
 * @param options.immediate Specify invoking on the leading edge of the timeout.
 * @param options.maxWait The maximum time `func` is allowed to be delayed before it's invoked.
 * @returns Returns the new debounced function.
 *
 * @example
 * const debounced = debounce((value: string) => console.log(value), 500);
 * debounced('hello'); // logs 'hello' after 500ms
 *
 * @example
 * const debounced = debounce((value: string) => console.log(value), 500, { immediate: true });
 * debounced('hello'); // logs 'hello' immediately and then logs 'world' after 500ms
 * debounced('world');
 *
 * @example
 * const debounced = debounce((value: string) => console.log(value), 500, { maxWait: 1000 });
 * debounced('hello'); // logs 'hello' after 500ms
 * debounced('world'); // logs 'world' after 500ms
 * debounced('!'); // logs '!' after 1000ms
 */
export const debounce = <T extends any[]>(
  func: (...args: T) => void,
  wait: number,
  options?: { immediate?: boolean; maxWait?: number }
) => {
  let timeout: ReturnType<typeof setTimeout> | undefined;
  let lastArgs: T;
  let lastCallTime: number;
  let lastInvokeTime = 0;
  let result: ReturnType<typeof func>;

  const invokeFunc = (time: number) => {
    const args = lastArgs;
    lastInvokeTime = time;
    result = func(...args);
    return result;
  };

  const leadingEdge = (time: number) => {
    lastInvokeTime = time;
    timeout = setTimeout(timerExpired, wait);
    return options?.immediate ? invokeFunc(time) : result;
  };

  const remainingWait = (time: number) => {
    const timeSinceLastCall = time - lastCallTime;
    const timeSinceLastInvoke = time - lastInvokeTime;
    const timeWaiting = wait - timeSinceLastCall;
    return options?.maxWait !== undefined
      ? Math.min(timeWaiting, options.maxWait - timeSinceLastInvoke)
      : timeWaiting;
  };

  const shouldInvoke = (time: number) => {
    const timeSinceLastCall = time - lastCallTime;
    const timeSinceLastInvoke = time - lastInvokeTime;
    return (
      lastCallTime === undefined ||
      timeSinceLastCall >= wait ||
      timeSinceLastCall < 0 ||
      (options?.maxWait !== undefined && timeSinceLastInvoke >= options.maxWait)
    );
  };

  const timerExpired = () => {
    const time = Date.now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    timeout = setTimeout(timerExpired, remainingWait(time));
  };

  const trailingEdge = (time: number) => {
    timeout = undefined;
    if (lastArgs !== undefined) {
      return invokeFunc(time);
    }
    return result;
  };

  return (...args: T) => {
    const time = Date.now();
    lastArgs = args;
    lastCallTime = time;
    if (timeout === undefined) {
      return leadingEdge(time);
    }
    clearTimeout(timeout);
    timeout = setTimeout(timerExpired, remainingWait(time));
  };
};

/**
 * Creates a throttled function that only invokes `func` at most once per every `wait` milliseconds.
 * The throttled function comes with a `cancel` method to cancel delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the leading and/or trailing edge of the `wait` timeout.
 * The `func` is invoked with the last arguments provided to the throttled function.
 * Subsequent calls to the throttled function return the result of the last `func` invocation.
 * @param func The function to throttle.
 * @param wait The number of milliseconds to throttle invocations to.
 * @param options The options object.
 * @param options.leading Specify invoking on the leading edge of the timeout.
 * @param options.trailing Specify invoking on the trailing edge of the timeout.
 * @returns Returns the new throttled function.
 * @example
 * const throttled = throttle((value: string) => console.log(value), 500);
 * throttled('hello'); // logs 'hello' immediately
 * throttled('world'); // logs nothing
 * throttled('!'); // logs nothing
 * setTimeout(() => throttled('world'), 500); // logs 'world' after 500ms
 * setTimeout(() => throttled('!'), 1000); // logs '!' after 1000ms
 * @example
 * const throttled = throttle((value: string) => console.log(value), 500, { leading: false });
 * throttled('hello'); // logs nothing
 * throttled('world'); // logs 'world' after 500ms
 * throttled('!'); // logs nothing
 * setTimeout(() => throttled('world'), 500); // logs 'world' after 1000ms
 * setTimeout(() => throttled('!'), 1000); // logs '!' after 1500ms
 * @example
 * const throttled = throttle((value: string) => console.log(value), 500, { trailing: false });
 * throttled('hello'); // logs 'hello' immediately
 * throttled('world'); // logs nothing
 * throttled('!'); // logs nothing
 * setTimeout(() => throttled('world'), 500); // logs nothing
 * setTimeout(() => throttled('!'), 1000); // logs '!' after 1000ms
 * @example
 * const throttled = throttle((value: string) => console.log(value), 500, { leading: false, trailing: false });
 * throttled('hello'); // logs nothing
 * throttled('world'); // logs nothing
 * throttled('!'); // logs nothing
 * setTimeout(() => throttled('world'), 500); // logs nothing
 * setTimeout(() => throttled('!'), 1000); // logs nothing
 */
export const throttle = <T extends any[]>(
  func: (...args: T) => void,
  wait: number,
  options?: { leading?: boolean; trailing?: boolean }
) => {
  let timeout: ReturnType<typeof setTimeout> | undefined;
  let lastArgs: T;
  let lastInvokeTime = 0;
  let result: ReturnType<typeof func>;

  const invokeFunc = (time: number) => {
    const args = lastArgs;
    lastInvokeTime = time;
    result = func(...args);
    return result;
  };

  const leadingEdge = (time: number) => {
    lastInvokeTime = time;
    timeout = setTimeout(timerExpired, wait);
    return options?.leading ? invokeFunc(time) : result;
  };

  const remainingWait = (time: number) => {
    const timeSinceLastInvoke = time - lastInvokeTime;
    const timeWaiting = wait - timeSinceLastInvoke;
    return options?.trailing !== false ? timeWaiting : Math.max(timeWaiting, 0);
  };

  const shouldInvoke = (time: number) => {
    const timeSinceLastInvoke = time - lastInvokeTime;
    return (
      lastInvokeTime === undefined ||
      timeSinceLastInvoke >= wait ||
      timeSinceLastInvoke < 0
    );
  };

  const timerExpired = () => {
    const time = Date.now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    timeout = setTimeout(timerExpired, remainingWait(time));
  };

  const trailingEdge = (time: number) => {
    timeout = undefined;
    return options?.trailing !== false ? invokeFunc(time) : result;
  };

  return (...args: T) => {
    const time = Date.now();
    lastArgs = args;
    if (timeout === undefined) {
      return leadingEdge(time);
    }
    clearTimeout(timeout);
    timeout = setTimeout(timerExpired, remainingWait(time));
  };
};
