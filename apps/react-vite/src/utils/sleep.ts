export function sleep(timeout: number) {
  return new Promise((resolve) => setTimeout(resolve, timeout));
}

const rand = () => Math.round(Math.random() * 100);
export const resolve = (d: any, ms: number) =>
  new Promise((r) => setTimeout(() => r(d), ms));
