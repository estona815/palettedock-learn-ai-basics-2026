import { ROLE_LABELS, extractPalette, contrastRatio, suggestRoles, cssForRoles } from './palette.js';
import { drawSample } from './sample.js';
import { decodeImageFile } from './decode-image.js';

const canvas = document.querySelector('#source-canvas');
const ctx = canvas.getContext('2d', { willReadFrequently: true });
const sourceName = document.querySelector('#source-name');
const imageStatus = document.querySelector('#image-status');
const swatchRoot = document.querySelector('#swatches');
const roleRoot = document.querySelector('#role-controls');
const preview = document.querySelector('#preview');
const contrastRoot = document.querySelector('#contrast-results');
const cssOutput = document.querySelector('#css-output');
const exportStatus = document.querySelector('#export-status');
const input = document.querySelector('#image-input');

let swatches = [];
let roles = {};
let imageImportVersion = 0;

function renderSwatches() {
  swatchRoot.replaceChildren(...swatches.map((hex, index) => {
    const card = document.createElement('div');
    card.className = 'swatch';
    card.innerHTML = `<span class="swatch-chip" style="background:${hex}"></span><span class="swatch-meta"><small>${String(index + 1).padStart(2, '0')}</small><strong>${hex}</strong></span>`;
    return card;
  }));
}

function renderRoleControls() {
  roleRoot.replaceChildren(...Object.entries(ROLE_LABELS).map(([key, label]) => {
    const row = document.createElement('label');
    row.className = 'role-row';
    const title = document.createElement('span');
    title.textContent = label;
    const select = document.createElement('select');
    select.name = key;
    select.setAttribute('aria-label', `${label} color`);
    for (const [index, hex] of swatches.entries()) {
      const option = document.createElement('option');
      option.value = String(index);
      option.textContent = `${String(index + 1).padStart(2, '0')} · ${hex}`;
      select.append(option);
    }
    select.value = String(roles[key]);
    select.addEventListener('change', () => { roles[key] = Number(select.value); updatePreview(); });
    row.append(title, select);
    return row;
  }));
}

function updatePreview() {
  for (const key of Object.keys(ROLE_LABELS)) {
    const variable = key.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
    preview.style.setProperty(`--color-${variable}`, swatches[roles[key]]);
  }
  const checks = [
    { label: 'Body text / background', a: swatches[roles.text], b: swatches[roles.background] },
    { label: 'Button text / accent', a: swatches[roles.accentText], b: swatches[roles.accent] }
  ];
  contrastRoot.replaceChildren(...checks.map(check => {
    const ratio = contrastRatio(check.a, check.b);
    const row = document.createElement('div');
    row.className = 'contrast-row';
    row.innerHTML = `<span>${check.label}</span><strong class="${ratio >= 4.5 ? 'contrast-good' : 'contrast-low'}">${ratio.toFixed(2)}:1 <small>${ratio >= 4.5 ? '✓ 4.5+' : 'Below 4.5'}</small></strong>`;
    return row;
  }));
  cssOutput.textContent = cssForRoles(swatches, roles);
  exportStatus.textContent = 'The CSS updates whenever you change a role.';
}

function refreshPalette() {
  swatches = extractPalette(ctx, canvas.width, canvas.height);
  roles = suggestRoles(swatches);
  renderSwatches();
  renderRoleControls();
  updatePreview();
}

async function loadFile(file, version) {
  if (!file.type.startsWith('image/')) throw new Error('Choose a JPG, PNG, WebP, or SVG image.');
  if (file.size > 20 * 1024 * 1024) throw new Error('Choose an image smaller than 20 MB.');
  const bitmap = await decodeImageFile(file);
  try {
    if (version !== imageImportVersion) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Sample the whole image; transparent letterboxing is ignored by extractPalette.
    const scale = Math.min(canvas.width / bitmap.width, canvas.height / bitmap.height);
    // Keep thin images at least one opaque pixel high/wide and align padding to pixels.
    const width = Math.max(1, Math.round(bitmap.width * scale));
    const height = Math.max(1, Math.round(bitmap.height * scale));
    ctx.drawImage(bitmap.source, Math.floor((canvas.width - width) / 2), Math.floor((canvas.height - height) / 2), width, height);
    refreshPalette();
    sourceName.textContent = file.name;
    imageStatus.textContent = `Five colors extracted from ${file.name}. Your image stays on this device.`;
  } finally {
    bitmap.close();
  }
}

input.addEventListener('change', async () => {
  const file = input.files?.[0];
  if (!file) return;
  const version = ++imageImportVersion;
  const previousImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const previousName = sourceName.textContent;
  const previousSwatches = [...swatches];
  const previousRoles = { ...roles };
  imageStatus.textContent = 'Reading your image…';
  try {
    await loadFile(file, version);
  } catch (error) {
    if (version !== imageImportVersion) return;
    ctx.putImageData(previousImage, 0, 0);
    swatches = previousSwatches;
    roles = previousRoles;
    renderSwatches();
    renderRoleControls();
    updatePreview();
    sourceName.textContent = previousName;
    imageStatus.textContent = error?.message || 'Could not read that image. Try another file.';
  }
});

document.querySelector('#copy-button').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(cssOutput.textContent);
    exportStatus.textContent = 'CSS copied to your clipboard.';
  } catch {
    exportStatus.textContent = 'Clipboard access is unavailable. Select the CSS above or download the file.';
    cssOutput.focus();
  }
});

document.querySelector('#download-button').addEventListener('click', () => {
  const url = URL.createObjectURL(new Blob([cssOutput.textContent + '\n'], { type: 'text/css' }));
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'palettedock-colors.css';
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  exportStatus.textContent = 'CSS file downloaded.';
});

drawSample(canvas);
refreshPalette();
