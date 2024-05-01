export function addLightToColor(color: any, amount: any) {
  // Parse the color string into RGB components
  const hexToRgb = (hex: { match: (arg0: RegExp) => any[] }) =>
    hex.match(/\w\w/g).map((hex: string) => parseInt(hex, 16));
  const rgbToHex = (r: number, g: number, b: number) =>
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("");

  // Parse the input color code to RGB
  const [r, g, b] = hexToRgb(color);

  // Increase the RGB values proportionally
  const newR = Math.min(r + amount, 255);
  const newG = Math.min(g + amount, 255);
  const newB = Math.min(b + amount, 255);

  // Convert the new RGB values back to hexadecimal
  return rgbToHex(newR, newG, newB);
}
