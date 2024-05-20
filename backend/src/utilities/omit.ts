export function omit(obj: Record<string, any>, ...keys: string[]) {
  const result = { ...obj };
  keys.forEach((key) => {
    delete result[key];
  });
  return result;
}
