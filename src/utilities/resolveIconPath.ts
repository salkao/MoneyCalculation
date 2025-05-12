/**
 * Resolves the full URL path to an SVG icon in the assets/icons directory.
 * @param iconName - The name of the icon file (without extension).
 * @returns The resolved URL string to the icon file.
 */

export function resolveIconPath(iconName: string) {
  return new URL(`../assets/icons/${iconName}.svg`, import.meta.url).href;
}
