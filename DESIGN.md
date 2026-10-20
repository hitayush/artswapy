# Design System: Art Swapy Kinetic Craft & Stitch Framework

## 1. Creative North Star: "The Editorial Artisan"
Art Swapy is not another templated agency portfolio. It is a kinetic, tactile workshop where high-conviction brand strategy meets precision craft and textile-inspired structural stitching.

We move beyond static corporate layouts through **Kinetic Asymmetry**, **Stitched Seams**, and **Scroll-Driven Choreography**. Every element feels physically grounded—like heavy cotton stock pinned to a studio drafting table, bound with high-tensile orange thread.

---

## 2. Color Calibration & Atmospheric Roles
The palette marries natural artisanal warmth with a signature luminous orange thread.

- **Canvas Paper (`--paper` / `#f5f2eb`):** Tactile warm newsprint canvas that eliminates screen glare.
- **Deep Ink (`--ink` / `#161614`):** High-density charcoal ink for maximum typographic authority without harsh pure black.
- **Electric Orange Stitch (`--orange` / `#ff551f`):** The signature thread color. Used for active seams, key glyphs, cursor accents, and registration marks.
- **Stitched Sage (`--sage` / `#dedfce`):** Organic botanical identity accent.
- **Terracotta Dust (`--terracotta` / `#e6a98f`):** Warm fired clay accent.
- **Charcoal Slate (`--slate` / `#22211e`):** Dark contrast ground for nocturnal studio sections.
- **Ghost Seam (`--ghost-seam` / `rgba(22, 22, 20, 0.12)`): Subtle dashed measurement boundaries.

---

## 3. The "Stitch System" Rules
1. **Dashed Seams over Solid Borders:** Structural compartments are sewn together using `1px dashed` or `1px dotted` accent borders.
2. **Registration Crosshairs:** Technical layout indicators (`✛`, `⌜ ⌝`, `⌞ ⌟`, `STITCH SPEC. 01`) mark corners and frame coordinates.
3. **Tactile Interactive Cards:** Brand identity swatches and tiles respond to mouse velocity, hover tilt, and drag physics.
4. **Perpetual Kinetic Marquee:** Running thread tape displaying studio principles across screen transitions.

---

## 4. Typographic Architecture
- **Display (`Space Grotesk`, 700 / 600):** Ultra-tight tracking (`-0.08em` to `-0.11em`), commanding scale (`clamp(90px, 18vw, 240px)`), sharp geometric cuts.
- **Metadata & Technical Reads (`DM Mono`, 400 / 500):** All-caps, generous tracking (`0.06em` to `0.1em`), paired with bracketed indices (`[01]`, `[02]`).
- **Body & Prose (`DM Sans`, 400 / 500):** Natural warm readability at 1.6x line height.

---

## 5. Motion & Scroll Dynamics
- **Velocity Parallax:** Background technical grid shifts at 0.35x scroll rate; foreground typography moves at 1.0x; floating stitch swatches move at 1.35x.
- **Scroll Progress HUD:** Fixed corner gauge showing active section tracker and smooth percentage readout.
- **Spring Physics:** Interactive tiles use snappy spring curves (`damping: 24, stiffness: 260`) for instant tactile response.
- **Dynamic Scroll Storytelling:** A 3-stage sticky narrative dissecting brand creation from wireframe sketch to stitched identity system.
