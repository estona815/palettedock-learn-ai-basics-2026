# PaletteDock

PaletteDock turns a local image into five representative colors, lets you assign those colors to interface roles, previews a small page, and exports CSS variables. Images are processed in your browser and are not uploaded.

## Run

Prerequisites: a modern browser with Canvas and JavaScript module support, and a local HTTP server. The command below uses Python 3; run it from the repository root.

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Open `http://localhost:8000`. The built-in sample works immediately; choose an image to try your own. Change any role menu to update the preview and contrast values. Copy or download the CSS block. No account, key, installation, or paid API is needed.

## How it works

`src/palette.js` samples opaque pixels from a resized Canvas image, groups nearby RGB values, and picks five representative colors. Uploaded images are scaled to fit completely inside the preview canvas, rather than cropping the edges. Transparent padding is ignored by palette sampling. Rendered dimensions are rounded to at least one pixel so very thin images remain sampleable. The role mapping and preview use the same state. The contrast numbers use relative luminance; they are guidance, not an accessibility certification. Files stay in browser memory and are cleared on refresh.

`assets/demo-night-city.png` is an original, locally generated sample image for trying the upload flow. The app also draws a separate sample on first load.

## Browser regression check

With the local server running, choose each SVG in `tests/fixtures/`: `wide-three-colors.svg`, `tall-three-colors.svg`, and `thin-three-colors.svg`. Each has red, green and blue source regions. All three colors (`#FF0000`, `#00FF00`, `#0000FF`) must appear in the extracted swatches; extra or repeated swatches are allowed because the app requests five colors and scaled edges can be antialiased. The source must remain visible, without a no-visible-pixels error. Change a color role and download CSS to check that the exported values match the preview controls.

These are synthetic browser regression fixtures, not a representative image-quality benchmark.

## Project notes

This candidate was built with the official Devpost Learn Skill Pack's scope, PRD, and spec format. The `devpost/` planning documents are marked as agent-proposed drafts; they do not claim learner approval or personal learning outcomes. The private `devpost/learner-profile.md` is excluded from Git.
