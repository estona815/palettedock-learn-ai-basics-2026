---
doc: scope
status: draft
---

# PaletteDock

Agent-proposed proof of concept for Build With AI: Basics. This is a working candidate, not a claim about the learner's personal idea or approval.

One line: turn one local image into a small, editable website color palette and a live preview.

## The Unique Kernel

The app does more than list extracted swatches: it assigns them to practical interface roles, then shows how the roles behave in a real mini page. The user can adjust the assignment before copying CSS variables.

## Who It's For

A student making a first website who has a visual reference but struggles to translate its colors into readable background, text, surface, and accent choices. Today they pick colors by eye and repeatedly edit CSS.

## The Core Loop

Load an image, inspect extracted colors, assign roles, inspect the live preview, adjust roles, and copy CSS. A different image starts the loop again.

## Inspiration & Identity

No user-supplied visual references or preferences. The candidate uses a neutral workspace so the selected image drives the visible colors.

## Why This Matters to the Learner

No personal reason was provided. The observable goal is a distinct, functional contest entry.

## What "Working" Looks Like

A sample image and an uploaded image each produce distinct swatches. Changing the accent visibly updates buttons and links in the preview. The exported CSS matches the selected roles. A one-minute screen recording can demonstrate the full loop.

## The POC Boundary

One browser page, local image processing through Canvas, five extracted colors, role assignment, readable contrast indication, preview, and CSS export.

## Later

Saved projects, multiple images, font pairing, and design token formats beyond CSS.

## Explicitly Cut

- Accounts and cloud upload: not needed for the local color loop and would add privacy cost.
- Automatic brand identity claims: a single image cannot determine a complete brand system.
- Accessibility certification: contrast numbers are useful guidance, not a compliance verdict.
