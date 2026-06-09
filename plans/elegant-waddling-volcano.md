# Elegant Waddling Volcano - Frontend Implementation Plan

## Context
The user wants to improve the 360° experience in the project. Current images are displayed at full size, causing them to appear too large relative to the provided images and making transitions between frames look abrupt. The user requests a smoother, more refined way to change between images without modifying the image files themselves.

## Problem Statement
- Images are rendered at their original dimensions, which may not fit well within the viewport.
- Image transition logic exists but could benefit from size adjustment and smoother visual effects.
- Need a reusable, maintainable component that ensures images are displayed appropriately and transitions are visually appealing.

## Proposed Solution
Create a dedicated React component (`360Gallery`) that:
1. **Scales images** to fit the viewport while preserving aspect ratio (e.g., max 80% of viewport height).
2. **Implements a fade transition** between frames (opacity fade) for smooth visual flow.
3. **Keeps the component completely independent** of image manipulation – only CSS/JS changes are required.
4. **Provides a clear API** (`frames` array, optional `durationMs`) for easy integration.

## Implementation Details
- **Component**: `src/components/360Gallery.tsx`
  - Uses `useEffect` to cycle through frames at a configurable interval.
  - Two `` elements: current frame (visible) and next frame (hidden with opacity 0) to enable fade transition.
- **CSS Module**: `src/components/360Gallery.module.css`
  - `.gallery` – positions the wrapper relative to its parent.
  - `.wrapper` – full‑screen container (height: 100vh, width: 100%).
  - `.image` – absolute positioning, `object-fit: contain`, and `max-height: 80vh` to ensure images stay within viewport while keeping aspect ratio.
  - `.image.active` and `.image.inactive` – handle opacity transition (0 → 1) with a smooth 0.8s ease.
- **Styling**: No external libraries required; uses Tailwind‑compatible CSS module (already present).

## Files to Modify
- `src/components/360Gallery.tsx` – new component implementation.
- `src/components/360Gallery.module.css` – updated CSS to enforce size constraints and transition.

## Verification Steps
1. **Run development server**: `npx next dev -p 3001` (or any free port).
2. **Navigate** to the page where `<360Gallery>` is used.
3. **Observe**:
   - Images are scaled so they never exceed 80% of the viewport height.
   - Transitions between frames are smooth fade animations.
   - No image files are altered; only CSS and component logic change.
4. **Test** with different image sizes to confirm consistent behavior.

## Acceptance Criteria
- Images display within the viewport without being overly large.
- Transition between consecutive frames is a smooth fade (opacity) over the configured duration.
- Component works out‑of‑the‑box with any array of image URLs.
- No runtime errors or layout shifts occur during transitions.

## Next Action
Proceed with implementation in the designated files as outlined above.