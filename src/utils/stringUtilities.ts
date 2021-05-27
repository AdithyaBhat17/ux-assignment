export function capitalizeString([firstChar, ...restOfTheWord]: string) {
  return firstChar.toLocaleUpperCase() + restOfTheWord.join("");
}
