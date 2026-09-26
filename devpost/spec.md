---
doc: spec
status: draft
---

# PaletteDock — Technical Spec

Agent-proposed implementation derived from the draft PRD. No learner approval is asserted.

## How This Works, In Plain Language

The browser reads a local image into a small Canvas, counts sampled colors, groups similar colors, and chooses five representatives. Role menus tell the preview and CSS exporter which representative to use. Nothing is uploaded.

## The Core Journey Through the System

Image input decodes a local file or bundled sample → Canvas sampling yields RGB pixels → palette extraction returns five swatches → role selections map swatches to CSS variables → preview and export update from the same mapping. See `prd.md > The Core Journey`.

## Stack

Plain HTML, CSS, and JavaScript modules using standard browser Canvas, File, Clipboard, and Blob APIs. This small stack needs no paid service or framework. Browser API behavior is to be verified during build. This is an implementation choice, not a learner-selected preference.

## Where It Runs and How Someone Tries It

Static browser app. A local server can run `python3 -m http.server 8000` in the project root, then open `http://localhost:8000`. Public GitHub source and a 1–3 minute working demo video are required for the event; deployment is optional.

## Look and Feel

Neutral, readable workspace. The live preview is deliberately simple so palette changes are obvious. This derives from `prd.md > Look and Feel` and is not attributed to the learner.

## Components

### Image sampler

Decode, downscale, and sample local images in Canvas. Reject unreadable files while retaining the last usable state. PRD ref: `Features and Behavior`, `States and Boundaries`.

### Palette extractor

Quantize sampled RGB colors, weight frequent groups, and select five sufficiently different representatives. PRD ref: `Features and Behavior`.

### Role editor and preview

Map each semantic role to one of the extracted swatches and apply the mapping to the preview. PRD ref: `The Core Journey`, `Screens and Layout`.

### Contrast and export

Calculate WCAG-style luminance contrast ratios and generate CSS variables from the same role map. Display the ratios as guidance. PRD ref: `Features and Behavior`.

## Data Model

`swatches`: five `{hex, rgb}` values in memory. `roles`: `{background, surface, text, accent, accentText}` indexes into swatches. `imageName` and transient error text also stay in memory. Refresh clears user input.

## File Structure

```
project/
├── index.html
├── styles.css
├── src/
│   ├── app.js
│   ├── palette.js
│   └── sample.js
├── devpost/
│   ├── scope.md
│   ├── prd.md
│   └── spec.md
└── README.md
```

## External Services and Dependencies

None for runtime. GitHub will host public source if the candidate proceeds. No keys, network calls, or cost.

## Important Failure Modes

- Large image stalls decode → resize using Canvas before sampling, and show progress text.
- Colors too similar → diversify selected quantized groups and allow manual role assignment.
- Clipboard permission denied → keep CSS visible for manual copy and offer a download.

## What Was Simplified and Why

- Five representative colors instead of exhaustive clustering — enough to demonstrate the role assignment loop.
- One sample and one current upload instead of a library — keeps state and privacy clear.

## Decisions and Open Issues

All product and stack choices above are agent proposals. No learner uncertainty was discussed, so none is invented. User-specific registration responses and product approval are unresolved.
