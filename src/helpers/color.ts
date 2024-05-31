export const rgbToHex = (rgbString: string) => {
  const rgbSubString = rgbString.substring(4, rgbString.length - 1);
  const rgbNumbers = rgbSubString.split(",");

  const hexCode = rgbNumbers
    .map((x) => {
      const hex = Number(x).toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    })
    .join("");

  return `#${hexCode}`;
};
