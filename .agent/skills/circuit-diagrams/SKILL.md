---
name: circuit-diagrams
description: Best practices for generating error-free SVG circuit schematics and Falstad CircuitJS embeds. Use when creating visuals.json entries, CircuitSchematic JSON, or Falstad circuit text for any Caltronic concept.
---

# Circuit Diagram Skill — SVG Schematics & Falstad Embeds

## When to Use This Skill
- Creating `visuals.json` entries with `type: "circuit-schematic"` or `type: "falstad-embed"`
- Generating CircuitSchematic JSON for any concept
- Writing Falstad circuit text for interactive simulations
- Validating existing circuit diagrams for correctness

---

## Part 1: SVG Circuit Schematics

### Grid System

**Grid constant: 32px.** All coordinates must be multiples of 32. Component terminals must land exactly on grid points.

```
GRID_SIZE      = 32px
WIRE_STROKE    = 2px
COMP_STROKE    = 2px
JUNCTION_R     = 5px (filled black circle)
LABEL_OFFSET   = 20px above horizontal components
VIEWBOX_PADDING = 40px around all content
```

### Symbol Dimensions (at 32px grid)

| Component | Width | Height | Terminals |
|-----------|-------|--------|-----------|
| Resistor (IEEE zigzag) | 64px | 32px | Left-center, Right-center |
| Resistor (IEC rectangle) | 64px | 24px | Left-center, Right-center |
| Capacitor | 8px | 48px | Top-center, Bottom-center |
| Inductor | 64px | 32px | Left-center, Right-center |
| Diode | 48px | 32px | Anode left, Cathode right |
| Voltage Source (circle) | 48px | 48px | Top (+), Bottom (−) |
| Current Source (circle) | 48px | 48px | Top, Bottom |
| Ground | 32px | 24px | Top-center |
| Junction dot | r=5px | — | Center (filled) |

### Terminal Position Calculation

**CRITICAL:** Wire endpoints must exactly equal terminal coordinates. Compute terminals from component center:

```javascript
// Horizontal resistor at center (cx, cy)
const terminals = {
  left:  { x: cx - 32, y: cy },
  right: { x: cx + 32, y: cy }
};
// Wire endpoint MUST equal terminal position exactly
```

### Wire Routing Rules

1. **90° turns only.** No diagonals.
2. **Endpoints must exactly match terminals.** 1px gap = disconnection.
3. **Never route wires through component bodies.**
4. **T-junction:** Always draw a filled junction dot (r=5px).
5. **Crossing without connection:** No dot. Prefer staggered T-junctions over 4-way crosses.
6. **Parallel wires:** Minimum 32px between centerlines.

### Label Placement

| What | Where | Offset |
|------|-------|--------|
| Value (10kΩ) | Above horizontal, right of vertical | y − 20px from center |
| Designator (R1) | Opposite side from value | Same offset |
| Voltage polarity (+/−) | Inside source circle or adjacent to terminals | 4–8px from terminal |
| Current arrow | Along wire, 16px from terminal | 12px arrow length |
| Node voltage (Vₐ) | Above/above-right of node dot | Clear of wires |

### SVG Draw Order (Z-ordering)

Render in this exact order (first = bottom, last = top):
1. Ground symbols
2. Wires
3. Component bodies
4. Junction dots
5. Polarity marks and arrows
6. Text labels (always last)

### Label Knockout Effect

When labels cross wires, add a white background rectangle:
```json
{ "type": "rect", "x": "labelX - 4", "y": "labelY - 10", "width": "textWidth + 8", "height": 14, "fill": "white", "opacity": 0.85 },
{ "type": "text", "x": "labelX", "y": "labelY", "text": "10kΩ" }
```

### Viewbox Calculation

```javascript
const padding = 40;
const viewBox = `${minX - padding} ${minY - padding} ${(maxX - minX) + 2*padding} ${(maxY - minY) + 2*padding}`;
```

---

## Part 2: Falstad Circuit Text Format

### Header Line (Required)

Every Falstad circuit **must** start with:
```
$ 1 5e-6 10.20027730826997 64 0 0 43
```

| Field | Value | Meaning |
|-------|-------|---------|
| `1` | Always 1 | Format version |
| `5e-6` | Timestep (seconds) | 5μs default |
| `10.2...` | Internal sim clock | Leave as-is |
| `64` | Zoom | Default for 450px iframe |
| `0 0` | Viewport offset | Center |
| `43` | Flags (binary 101011) | Auto-run, grid snap, conventional current |

**Flags 43 = simulation runs immediately on load.** Use 59 for paused start.

### Component Line Format

```
<type> <x1> <y1> <x2> <y2> <flags> [params...]
```

**All coordinates must be multiples of 16.**

### Component Codes

| Code | Component | Parameters |
|------|-----------|------------|
| `w` | Wire | (none) |
| `r` | Resistor | `<ohms>` |
| `c` | Capacitor | `<farads> <initial_voltage>` |
| `l` | Inductor | `<henries> <initial_current>` |
| `d` | Diode | (default silicon model) |
| `v` | Voltage source | `<waveform> <freq> <amplitude> <bias> <phase> <duty>` |
| `i` | Current source | `<waveform> <freq> <amplitude> <bias> <phase> <duty>` |
| `g` | Ground | (none) |
| `x` | Text label | `<font_size> <text>` |
| `o` | Oscilloscope | `<element_idx> <speed> 0 <flags> <scale_v> <scale_i> <plot> <extra>` |
| `a` | Op-amp | `<maxVoltage>` |
| `t` | NPN BJT | `<VBE_threshold>` |
| `s` | Switch | `<state: 0=open, 1=closed>` |

### Waveform Types (for `v` and `i` sources)

| Value | Waveform |
|-------|----------|
| `0` | DC |
| `1` | Sine (AC) |
| `2` | Square |
| `3` | Triangle |
| `4` | Sawtooth |

### Units — ALWAYS SI BASE

| Quantity | Unit | Example |
|----------|------|---------|
| Resistance | ohms | `10000` not `10k` |
| Capacitance | farads | `1e-6` not `1μF` |
| Inductance | henries | `1e-3` not `1mH` |
| Frequency | hertz | `1000` |
| Voltage | volts | `5` |
| Coordinates | pixels (×16) | `160` not `170` |

### Template Circuits

**Voltage Divider:**
```
$ 1 5e-6 10.20027730826997 64 0 0 43
v 160 96 160 288 0 0 40.0 10.0 0.0 0.0 0.5
r 160 96 320 96 0 10000
r 320 96 320 288 0 10000
w 160 288 320 288 0
g 160 288 160 320 0
x 220 80 0 0 0 12 R1=10k
x 340 192 0 0 0 12 R2=10k
```

**RC Step Response:**
```
$ 1 5e-6 10.20027730826997 64 0 0 43
v 160 96 160 288 0 2 1.0 5.0 0.0 0.0 0.5
r 160 96 304 96 0 1000
c 304 96 304 288 0 1e-6 0
w 304 288 160 288 0
g 160 288 160 320 0
o 2 128 0 4099 10 0.05 0 -1
```

**Half-Wave Rectifier (Diode):**
```
$ 1 5e-6 10.20027730826997 64 0 0 43
v 160 96 160 288 0 1 60.0 10.0 0.0 0.0 0.5
r 160 96 304 96 0 1000
d 304 96 304 288 0
w 304 288 160 288 0
g 160 288 160 320 0
o 3 64 0 35 5 0.05 0 -1
```

### Iframe Embedding

```html
<iframe
  src="https://www.falstad.com/circuit/circuitjs.html?cct=<base64_circuit>&running=true&hideSidebar=true"
  width="700"
  height="450"
  style="border: none; background: #1a1a2e;">
</iframe>
```

| Use Case | Width | Height |
|----------|-------|--------|
| Inline | 500px | 350px |
| Standard | 700px | 450px |
| Full demo | 900px | 550px |

---

## Part 3: Passive Sign Convention

### The Rule

For **passive elements** (R, C, L): current arrow enters the **+** terminal.

```
     +          −
 ────┤  R  ├────
 →  i enters +

 P_absorbed = V × I  (positive = absorbing)
```

For **sources**: current exits the **+** terminal (generator convention).

```
     +          −
 ────┤  V  ├────
         → i exits +

 P_delivered = V × I  (positive = delivering)
```

### Summary Table

| Element | Reference Direction | Power Formula | Sign |
|---------|-------------------|---------------|------|
| Resistor | Associated (i enters +) | P = VI = I²R = V²/R | Always + (absorbs) |
| Capacitor | Associated | P = VI | + absorbs, − delivers stored energy |
| Inductor | Associated | P = VI | + absorbs, − delivers stored energy |
| Voltage Source | Non-associated (i exits +) | P_del = VI | + delivers |
| Current Source | Non-associated (i exits +) | P_del = VI | + delivers |

### Power Balance Check

$$\sum P_{\text{delivered by sources}} = \sum P_{\text{absorbed by passives}}$$

### Common Errors

1. **Current arrow pointing away from + terminal** on a passive element → violates PSC
2. **Mixing associated and non-associated** within same analysis
3. **Reversing arrow direction without flipping sign** of I in equations
4. **Treating all voltage drops as positive** — sign depends on reference direction

### SVG Representation

```json
{
  "annotations": [
    { "type": "text", "text": "+", "x": 168, "y": 90, "fill": "red" },
    { "type": "text", "text": "−", "x": 232, "y": 90, "fill": "blue" },
    { "type": "arrow", "from": [140, 100], "to": [168, 100], "label": "i" }
  ]
}
```

**Rule:** Arrow must point toward the + mark. Violating this is an immediate PSC error.

---

## Part 4: Validation Checklist

### Before Rendering Any Circuit

**Electrical:**
- [ ] At least one ground element present
- [ ] At least one source (voltage or current)
- [ ] Every node has degree ≥ 2 (no floating wires)
- [ ] All nodes reachable from ground (connected graph via BFS/DFS)
- [ ] Component values physically reasonable (R: 0.001–10¹², C: 10⁻¹⁵–1, L: 10⁻¹²–100)

**SVG Visual:**
- [ ] All coordinates multiples of 32px
- [ ] Every wire endpoint exactly matches a terminal coordinate
- [ ] Junction dots at all T-junctions
- [ ] No 4-way crossings (use staggered T-junctions)
- [ ] Consistent stroke widths (wires=2, components=2)
- [ ] Labels don't overlap wires or each other
- [ ] Viewbox includes all elements + 40px padding
- [ ] Draw order correct (wires → components → dots → labels)

**Falstad:**
- [ ] `$ 1` header line present
- [ ] All coordinates multiples of 16
- [ ] Values in SI base units (ohms, farads, henries)
- [ ] No capacitor loops without resistance
- [ ] Ground element present

---

## Top 10 Mistakes to Avoid

| # | Mistake | Format | Fix |
|---|---------|--------|-----|
| 1 | Wire endpoint 1px off from terminal | SVG | Compute terminals from component center with fixed offsets |
| 2 | Missing ground reference | Both | Always include `g` (Falstad) or ground symbol (SVG) |
| 3 | Non-grid coordinates | Both | SVG: multiples of 32. Falstad: multiples of 16 |
| 4 | Missing junction dots at T-connections | SVG | Draw filled r=5px dot at every 3+ wire intersection |
| 5 | Wrong units in Falstad | Falstad | Use `10000` not `10k`, `1e-6` not `1μF` |
| 6 | Inconsistent stroke widths | SVG | Enforce 2px for all wires and components |
| 7 | Labels behind wires (z-order) | SVG | Render labels last in SVG element tree |
| 8 | PSC polarity reversal | SVG | Current arrow must enter + terminal for passives |
| 9 | Missing `$ 1` header | Falstad | Always start with `$ 1 5e-6 10.20027730826997 64 0 0 43` |
| 10 | 4-way wire junctions | SVG | Use staggered T-junctions instead |
