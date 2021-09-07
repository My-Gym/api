const SEPARATOR_USER_CODE = '_';
export const decodeUserCode = (string: string): string[] =>
  string.split(SEPARATOR_USER_CODE);

export const codeUserCode = (id: number, source: string) =>
  `${id}${SEPARATOR_USER_CODE}${source}`;
