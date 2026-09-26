export const ROLE_LABELS = {
  background: 'Background', surface: 'Surface', text: 'Text', accent: 'Accent', accentText: 'Accent text'
};

const clamp = value => Math.max(0, Math.min(255, Math.round(value)));
const toHex = n => clamp(n).toString(16).padStart(2, '0');
export const rgbToHex = ([r, g, b]) => `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
export const hexToRgb = hex => [1, 3, 5].map(i => Number.parseInt(hex.slice(i, i + 2), 16));

function distance(a, b) {
  return Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
}

export function extractPalette(ctx, width, height, count = 5) {
  const pixels = ctx.getImageData(0, 0, width, height).data;
  const bins = new Map();
  const stride = Math.max(1, Math.floor((width * height) / 14000));
  for (let p = 0; p < width * height; p += stride) {
    const i = p * 4;
    if (pixels[i + 3] < 180) continue;
    const rgb = [pixels[i], pixels[i + 1], pixels[i + 2]];
    const key = rgb.map(value => Math.min(7, Math.floor(value / 32))).join('-');
    const bin = bins.get(key) ?? { sum: [0, 0, 0], count: 0 };
    for (let c = 0; c < 3; c += 1) bin.sum[c] += rgb[c];
    bin.count += 1;
    bins.set(key, bin);
  }
  const candidates = [...bins.values()]
    .map(bin => ({ rgb: bin.sum.map(n => n / bin.count), count: bin.count }))
    .sort((a, b) => b.count - a.count);
  if (!candidates.length) throw new Error('The image has no visible pixels to sample.');
  const selected = [];
  for (const candidate of candidates) {
    if (selected.every(other => distance(candidate.rgb, other.rgb) >= 52)) selected.push(candidate);
    if (selected.length === count) break;
  }
  for (const candidate of candidates) {
    if (selected.length === count) break;
    if (!selected.includes(candidate)) selected.push(candidate);
  }
  while (selected.length < count) selected.push(selected[selected.length - 1]);
  return selected.map(item => rgbToHex(item.rgb));
}

function luminance(hex) {
  const rgb = hexToRgb(hex).map(value => value / 255).map(value => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);
  return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
}

export function contrastRatio(a, b) {
  const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (light + 0.05) / (dark + 0.05);
}

export function suggestRoles(swatches) {
  const indices = swatches.map((hex, index) => ({ index, light: luminance(hex) }));
  const lightest = [...indices].sort((a, b) => b.light - a.light)[0].index;
  const darkest = [...indices].sort((a, b) => a.light - b.light)[0].index;
  const surface = [...indices].sort((a, b) => b.light - a.light).find(item => item.index !== lightest)?.index ?? lightest;
  const accent = indices.find(item => ![lightest, darkest, surface].includes(item.index))?.index ?? 2;
  const accentText = contrastRatio(swatches[darkest], swatches[accent]) >= contrastRatio(swatches[lightest], swatches[accent]) ? darkest : lightest;
  return { background: lightest, surface, text: darkest, accent, accentText };
}

export function cssForRoles(swatches, roles) {
  return `:root {\n${Object.keys(ROLE_LABELS).map(role => `  --color-${role.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)}: ${swatches[roles[role]]};`).join('\n')}\n}`;
}
