export const toCamelCase = (snakeStr: string): string => {
  return snakeStr.replace(/(_\w)/g, (match) => match[1].toUpperCase());
};

export const convertKeysToCamel = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map((item) => convertKeysToCamel(item));
  } else if (obj !== null && obj.constructor === Object) {
    return Object.keys(obj).reduce((acc, key) => {
      acc[toCamelCase(key)] = convertKeysToCamel(obj[key]);
      return acc;
    }, {} as any);
  }
  return obj;
};
