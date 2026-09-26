---
doc: prd
status: draft
---

# PaletteDock — Product Requirements

Agent-proposed requirements for the draft in `scope.md`. No learner approval is asserted.

## The Core Journey

1. Open the page and see a built-in sample plus a clear local image upload control.
2. Choose an image or keep the sample. The browser extracts five distinct colors.
3. Assign available colors to background, surface, text, accent, and accent text.
4. Inspect a mini page preview and visible contrast values for key text pairs.
5. Adjust a role if needed, then copy or download CSS variables for the chosen palette.

## Screens and Layout

One responsive page: image input and swatches on the left/top, role controls below, preview and export on the right/bottom. No navigation or account.

## Look and Feel

Neutral framing with restrained typography and generous spacing. This is an implementation proposal, not a user-stated aesthetic preference. The uploaded image and assigned palette provide the color.

## Features and Behavior

- Sample and uploaded images use the same extraction path.
- Selecting an image never sends it to a server.
- Five representative swatches are shown with hex values; when the image has fewer distinct colors, closely related shades may appear. Role controls can choose among them.
- The preview uses the current role mapping immediately.
- Contrast values are calculated for text/background and accent text/accent. Values are labeled as guidance, without claiming certification.
- Copy and download export the same CSS variable block shown on screen.

## States and Boundaries

- **First use** — the built-in sample makes the workflow testable without a file.
- **Unsupported file** — a short error explains that an image is required.
- **Image decode failure** — the previous usable palette remains, with an error message.
- **Local-only processing** — images and palette state stay in browser memory and disappear on refresh.

## Product Decisions

- The user's stated preference is autonomous progress on submissions. All product choices here are agent proposals that can be changed before submission.

## What We're Building

A browser-local image-to-palette prototype, public source with setup instructions, and a short working demo video.

## Deferred From the POC

Accounts, cloud sync, palette history, and image URL import add scope without proving the core loop.

## Possible Later Enhancements

Color-blindness simulation and JSON design token export.

## Non-Goals

The app does not establish a full design system or guarantee accessible results.

## Open Questions

The learner's own idea, design preferences, and learning goal are not established. Event registration's personal responses remain unanswered and are not inferred from this document.
