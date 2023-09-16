export function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number,
  shouldThrow = false,
): Promise<T> {
  const timeout: Promise<T> = new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      if (shouldThrow) {
        reject(new Error(`Timed out after ${timeoutMs} ms`));
      } else {
        resolve(undefined as any);
      }
    }, timeoutMs);

    promise.then(
      () => clearTimeout(timer),
      () => clearTimeout(timer),
    );
  });

  return Promise.race([promise, timeout]);
}
