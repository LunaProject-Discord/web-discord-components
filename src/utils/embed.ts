export interface Color {
    r: number;
    g: number;
    b: number;
}

export const rgbToDecimal = (rgb: Color) => (rgb.r << 16) + (rgb.g << 8) + rgb.b;

export const decimalToRgb = (decimal: number): Color => ({
    r: (decimal & 0xff0000) >> 16,
    g: (decimal & 0x00ff00) >> 8,
    b: decimal & 0x0000ff
});

export const decimalToHex = (decimal: number) => `#${decimal.toString(16).padStart(6, '0')}`;
