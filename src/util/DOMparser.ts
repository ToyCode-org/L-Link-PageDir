/**
 *
 * @param domString string
 * @returns #document.body
 */
export const DOMparsedData = (domString: string) => {
  const parser = new DOMParser();
  const result = parser.parseFromString(domString, "text/html").body;
  return result;
};
