## Before We Start

<details>
<summary><strong>What you should already be comfortable with</strong></summary>

- **Voltage divider bias**: the Thévenin conversion, Q-point calculation, and emitter stabilisation
- **Output characteristics**: $I_C$ vs $V_{CE}$ curves for different values of $I_B$
- **DC vs AC equivalent circuits**: open-circuit capacitors for DC, short-circuit them for AC
- **The equation** $V_{CC} = I_C R_C + V_{CE} + I_E R_E$

</details>

---

## Hook: Where Exactly Does the Transistor Operate?

You've calculated the Q-point algebraically. But there's a much more powerful way to visualise what's happening: **draw the load line** on the transistor's output characteristics.

The load line is the set of all possible $(V_{CE}, I_C)$ operating points that the external circuit allows. The transistor can only operate at a point that lies on **both** the load line (circuit constraint) **and** the characteristic curve (device physics). Their intersection is the Q-point.

Better yet, when a signal is applied, the operating point moves along a *different* load line — the **AC load line**. Understanding both lines tells you exactly how much signal swing you can get before clipping.

---

## The DC Load Line

### Derivation

Start with KVL around the collector-emitter output loop (DC equivalent circuit):

$$V_{CC} = I_C R_C + V_{CE} + I_E R_E$$

Since $I_E \approx I_C$ (because $\beta \gg 1$):

$$V_{CC} = I_C (R_C + R_E) + V_{CE}$$

Rearranging to get $I_C$ as a function of $V_{CE}$:

$$\boxed{I_C = \frac{-1}{R_C + R_E} \cdot V_{CE} + \frac{V_{CC}}{R_C + R_E}}$$

This is $y = mx + c$ — a **straight line** on the $I_C$ vs $V_{CE}$ plane.

[[visual:dc-load-line-derivation]]

### Parameters

| Parameter | Value |
|-----------|-------|
| **Slope** ($m$) | $-1/(R_C + R_E)$ |
| **$V_{CE}$-intercept** (set $I_C = 0$) | $V_{CE} = V_{CC}$ |
| **$I_C$-intercept** (set $V_{CE} = 0$) | $I_C = V_{CC}/(R_C + R_E)$ |

### How to Draw It

You only need two points to draw a straight line:

[[visual:dc-load-line-endpoints]]

1. **Point A** ($I_C = 0$): $V_{CE} = V_{CC}$ → plot $(V_{CC}, 0)$ on the $V_{CE}$ axis
2. **Point B** ($V_{CE} = 0$): $I_C = V_{CC}/(R_C + R_E)$ → plot $(0, V_{CC}/(R_C + R_E))$ on the $I_C$ axis
3. Connect them with a straight line

### Finding the Q-Point Graphically

The Q-point is where the DC load line intersects the transistor characteristic curve for the particular value of $I_{BQ}$.

[[visual:dc-load-line-on-chars]]

> **Key Insight**: The load line depends only on the **external circuit** ($V_{CC}$, $R_C$, $R_E$). The characteristic curves depend only on the **transistor**. The Q-point is determined by both — it's the intersection of the circuit constraint and the device physics.

<details>
<summary><strong>Pause & Think</strong>: If you increase R_C, what happens to the DC load line?</summary>

The slope becomes less steep (slope = $-1/(R_C + R_E)$ — larger denominator, smaller magnitude). The $V_{CE}$-intercept stays at $V_{CC}$ (unchanged). The $I_C$-intercept decreases to $V_{CC}/(R_C + R_E)$. The load line rotates clockwise around the point $(V_{CC}, 0)$, and the Q-point shifts to a lower $I_C$ and higher $V_{CE}$.

</details>

---

## The AC Equivalent Circuit

To analyse signal behaviour, you need the **AC equivalent circuit**. The rules are the opposite of DC:

| Component | DC Equivalent | AC Equivalent |
|-----------|--------------|---------------|
| Capacitor | Open circuit ($X_C = \infty$) | Short circuit ($X_C \approx 0$) |
| Inductor | Short circuit ($X_L = 0$) | Open circuit ($X_L = \infty$) |
| DC voltage source ($V_{CC}$) | Keep it | **Short to ground** (no AC content) |
| DC current source | Keep it | **Open circuit** |

[[visual:ac-equivalent-circuit]]

After applying these rules to a VDB circuit with a bypass capacitor across $R_{E2}$:
- $V_{CC}$ is shorted to ground → $R_C$ connects collector to ground
- $C_{in}$ is shorted → signal source connects directly to the base
- Bypass capacitor shorts $R_{E2}$ → only $R_{E1}$ remains in the emitter
- $R_1$ and $R_2$ now both connect to ground → they appear in parallel from the base

---

## The AC Load Line

### Derivation

Apply KVL around the collector-emitter loop in the AC equivalent circuit:

$$i_c R_C + v_{ce} + i_e r_{e1} = 0$$

Since $i_e \approx i_c$:

$$i_c(R_C + r_{e1}) + v_{ce} = 0$$

$$\boxed{i_c = \frac{-v_{ce}}{R_C + r_{e1}}}$$

[[visual:ac-load-line-derivation]]

Key differences from the DC load line:

| Property | DC Load Line | AC Load Line |
|----------|-------------|-------------|
| Slope | $-1/(R_C + R_E)$ | $-1/(R_C + r_{e1})$ |
| Intercept | $V_{CC}/(R_C + R_E)$ | 0 (passes through origin for AC components) |
| Total line passes through | $(V_{CC}, 0)$ and $(0, V_{CC}/(R_C+R_E))$ | **Through the Q-point** |

The AC load line is **steeper** than the DC load line because $r_{e1} < R_E = R_{E1} + R_{E2}$ (the bypass capacitor has removed $R_{E2}$).

### Drawing the AC Load Line

The AC load line passes through the Q-point with slope $-1/(R_C + r_{e1})$. On the total $I_C$ vs $V_{CE}$ plot, it's the line through $(V_{CEQ}, I_{CQ})$ with the AC slope.

[[visual:dc-vs-ac-load-lines]]

---

## Signal Swing and Clipping

When a signal is applied, the operating point moves **along the AC load line**, not the DC load line. The signal can swing from the Q-point towards:

- **Saturation** ($V_{CE} \approx V_{CE(sat)} \approx 0.2$ V) — on the left
- **Cutoff** ($I_C \approx 0$) — on the right/bottom

[[visual:signal-swing-regions]]

The maximum undistorted swing is limited by whichever boundary is closer to the Q-point along the AC load line.

### Is the Circuit Properly Biased?

[[visual:properly-biased-check]]

A circuit is **properly biased** if the signal can swing its full amplitude in both directions without the operating point hitting saturation or cutoff. If the Q-point is too close to either boundary, the output clips.

> **Pro Tip**: For maximum symmetric swing, centre the Q-point on the AC load line so the distances to saturation and cutoff are equal. This gives the largest possible undistorted output.

<details>
<summary><strong>Pause & Think</strong>: Why does the signal travel along the AC load line instead of the DC load line?</summary>

The DC load line accounts for all resistances including bypassed $R_{E2}$. But at signal frequencies, the bypass capacitor shorts $R_{E2}$, so the signal "sees" a different total resistance ($R_C + r_{e1}$ instead of $R_C + R_E$). The AC load line reflects this smaller resistance, hence its steeper slope. The operating point starts at the Q-point (set by DC) and swings along the AC load line (set by AC impedances).

</details>

---

## Worked Example (from the lecture)

**Given (from voltage divider bias example):**
- $V_{CC} = 10$ V, $R_C = 10$ kΩ, $R_{E1} = 240$ Ω, $R_{E2} = 20$ kΩ (bypassed)
- Q-point: $(3.85$ V$, 205\;\mu$A$)$

**DC Load Line:**
- Slope = $-1/(10\text{k} + 20.24\text{k}) = -1/30.24\text{k} \approx -1/30\text{k}$
- $V_{CE}$-intercept = $V_{CC} = 10$ V
- $I_C$-intercept = $10/30\text{k} = 333\;\mu$A

**AC Load Line:**
- Slope = $-1/(R_C + R_{E1}) = -1/(10\text{k} + 0.24\text{k}) = -1/10.24\text{k} \approx -1/10\text{k}$
- Passes through Q-point $(3.85$ V$, 205\;\mu$A$)$

The AC slope is about 3× steeper than the DC slope — a significant difference.

---

## Interactive: Load Line Explorer

[[visual:load-line-sim]]

Try the interactive above:
1. Set $R_C$, $R_E$, and $V_{CC}$ to draw the DC load line
2. Choose the Q-point (set $I_{BQ}$)
3. Apply a signal and watch the operating point track along the AC load line
4. Increase the signal amplitude until you see clipping at saturation or cutoff

---

## Summary

[[visual:dc-vs-ac-summary-table]]

- **DC load line**: $I_C = -V_{CE}/(R_C+R_E) + V_{CC}/(R_C+R_E)$ — draw using two intercepts, find Q-point at intersection with $I_{BQ}$ curve
- **AC equivalent circuit**: short capacitors, short $V_{CC}$, open current sources
- **AC load line**: slope $= -1/(R_C + r_{e1})$, passes through Q-point — steeper than DC line
- **Signal swing** occurs along the AC load line, bounded by saturation ($V_{CE} \approx 0.2$ V) and cutoff ($I_C = 0$)
- **Properly biased** = signal can swing its full amplitude without hitting either boundary
