export function camelCaseConverter() {
  return {
    lowerCamelCase(input: string): string {
      return input
        .toLowerCase()
        .replace(/_+/g, ' ')
        .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) =>
          index === 0 ? match.toLowerCase() : match.toUpperCase()
        )
        .replace(/\s+/g, '');
    },
    upperCamelCase(input: string): string {
      return input
        .toLowerCase()
        .replace(/_+/g, ' ')
        .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match) => match.toUpperCase())
        .replace(/\s+/g, '');
    },
  };
}
