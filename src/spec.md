# Specification

## Summary
**Goal:** Build a responsive English-language marketing website for “VlogunrealPromo” and enable visitors (restaurants, hotels, and similar businesses) to submit AI promo-video requests and receive a reference ID.

**Planned changes:**
- Create a responsive marketing site with sections: Hero, Services/What you get, Industries, How it works, Pricing (informational), Examples gallery, FAQ, and Contact/Request CTA.
- Add a “Request a Promo Video” form with the specified lead/details fields and client-side validation.
- Implement a single Motoko backend actor to persist requests in stable storage, generating a reference ID and createdAt timestamp; expose APIs to create and fetch by reference ID.
- Connect frontend to backend actor for form submission using React Query with loading/success/error states and show confirmation + reference ID.
- Add an Examples/Portfolio gallery with at least 6 responsive thumbnail cards (image, title, short description).
- Apply a premium cinematic theme (dark neutrals with warm accents; avoid blue/purple) with consistent typography and components.
- Integrate static generated images from `frontend/public/assets/generated` and use them in header/hero/examples.

**User-visible outcome:** Visitors can browse a polished VlogunrealPromo marketing page, view example promo concepts, and submit a promo-video request via a form; after submission they see a confirmation and reference ID (and can later retrieve request details by ID).
