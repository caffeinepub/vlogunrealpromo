# Specification

## Summary
**Goal:** Fix portfolio video visibility by improving YouTube embed URL parsing, adding robust thumbnail fallbacks, and providing a clear viewer-modal fallback when embedding isn’t possible.

**Planned changes:**
- Make YouTube URL parsing robust across common formats (watch, youtu.be, shorts, embed, and URLs with extra query parameters) to reliably generate an embeddable iframe URL in the portfolio viewer modal.
- Add resilient thumbnail fallback handling in portfolio grid cards and in the viewer modal so broken/missing thumbnail URLs show a neutral placeholder and remain clickable.
- Improve viewer modal fallback UX when a video cannot be embedded by showing an English explanation and a prominent “Open Video in New Tab” action that links to the original URL, while keeping a consistent aspect-video thumbnail/placeholder container.

**User-visible outcome:** Portfolio video cards no longer appear blank when thumbnails fail, and clicking a portfolio item reliably opens a playable embedded YouTube video when possible; when embedding fails, users see a clear English message and can always open the video in a new tab.
