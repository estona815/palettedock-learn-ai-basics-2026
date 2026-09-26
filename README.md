# PaletteDock

PaletteDock turns a local image into five representative colors, lets you assign those colors to interface roles, previews a small page, and exports CSS variables. Images are processed in your browser and are not uploaded.

## Run

Prerequisite: a modern desktop or mobile browser with Canvas and JavaScript module support. Python 3 is useful for a local static server.

```sh
python3 -m http.server 8000
```

Open `http://localhost:8000`. The built-in sample works immediately; choose an image to try your own. Change any role menu to update the preview and contrast values. Copy or download the CSS block. No account, key, installation, or paid API is needed.

## How it works

`src/palette.js` samples opaque pixels from a resized Canvas image, groups nearby RGB values, and picks five representative colors. The role mapping and preview use the same state. The contrast numbers use relative luminance; they are guidance, not an accessibility certification. Files stay in browser memory and are cleared on refresh.

`assets/demo-night-city.png` is an original, locally generated sample image for trying the upload flow. The app also draws a separate sample on first load.

## Project notes

This candidate was built with the official Devpost Learn Skill Pack's scope, PRD, and spec format. The `devpost/` planning documents are marked as agent-proposed drafts; they do not claim learner approval or personal learning outcomes. The private `devpost/learner-profile.md` is excluded from Git.
