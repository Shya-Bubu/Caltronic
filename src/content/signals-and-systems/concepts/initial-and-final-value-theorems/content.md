# Initial & Final Value Theorems

> **Why This Matters**: Imagine you've just computed $Y(s)$ — a complex rational function in $s$. You want to know: does the system start correctly? Does it settle to the right value? Normally you'd need the full inverse Laplace transform to answer these. The Initial Value Theorem (IVT) and Final Value Theorem (FVT) give you these two critical numbers **directly from $Y(s)$** — no inverse transform needed. These theorems save enormous time on exams and are standard tools in control system design.

## Initial Value Theorem (IVT)

The initial value of any signal $y(t)$ can be found directly from its Laplace transform:

$$\boxed{y(0^+) = \lim_{s \to \infty} s \cdot Y(s)}$$

This gives the value of $y(t)$ immediately after $t = 0$ (the $0^+$ notation means the limit from the right).

[[visual:ivt-concept-plotly]]

### Applying IVT to the RC Step Response

We know $Y(s) = \frac{1}{s(1 + RCs)}$. Apply IVT:

$$y(0^+) = \lim_{s \to \infty} s \cdot \frac{1}{s(1 + RCs)} = \lim_{s \to \infty} \frac{1}{1 + RCs} = 0$$

✓ This matches $y(0^+) = 1 - e^0 = 0$ from the time-domain solution. The capacitor starts uncharged.

[[visual:lecture-page-2-ivt]]

## Final Value Theorem (FVT)

The steady-state (final) value of $y(t)$ as $t \to \infty$:

$$\boxed{y(\infty) = \lim_{s \to 0} s \cdot Y(s)}$$

[[visual:fvt-concept-plotly]]

> **Warning**: The FVT is only valid if the final value **exists** — meaning all poles of $sY(s)$ must have negative real parts (or be at the origin). If the system is unstable or oscillates forever, FVT doesn't apply.

### Applying FVT to the RC Step Response

$$y(\infty) = \lim_{s \to 0} s \cdot \frac{1}{s(1 + RCs)} = \lim_{s \to 0} \frac{1}{1 + RCs} = 1$$

✓ This matches $y(\infty) = 1 - 0 = 1$. The capacitor charges fully to the input voltage.

### Applying to the RLC Circuit (Example #2 from Lesson 08)

For the RLC circuit with current output: $Y(s) = \frac{1}{L} \cdot \frac{1}{s^2 + \frac{R}{L}s + \frac{1}{LC}} \cdot \frac{1}{s}$

**IVT:**
$$y(0^+) = \lim_{s \to \infty} s \cdot \frac{1}{L(s^2 + \frac{R}{L}s + \frac{1}{LC})} \cdot \frac{1}{s} = \lim_{s \to \infty} \frac{1}{L(s + \frac{R}{L} + \frac{1}{LCs})} = 0$$

**FVT:**
$$y(\infty) = \lim_{s \to 0} s \cdot \frac{s}{L(s^2 + \frac{R}{L}s + \frac{1}{LC})} \cdot \frac{1}{s} = \lim_{s \to 0} \frac{s}{L(s^2 + \frac{R}{L}s + \frac{1}{LC})} = 0$$

[[visual:lecture-page-5-rlc]]

Both $y(0^+) = 0$ and $y(\infty) = 0$ make physical sense: current starts at zero (inductors resist sudden current changes) and returns to zero (capacitor fully charged, no current flows).

<details>
<summary><strong>Pause & Think</strong>: For Example #3 (RLC with capacitor voltage output), what would you expect for y(0) and y(∞)?</summary>

$y(0^+) = 0$ (capacitor starts uncharged). $y(\infty) = 1$ (capacitor charges to full input voltage at DC). Verify: $H(s) = \frac{1/LC}{s^2 + \frac{1}{RC}s + \frac{1}{LC}}$, IVT: $\lim_{s\to\infty} \frac{1/LC}{s^2 + \frac{1}{RC}s + \frac{1}{LC}} = 0$ ✓, FVT: $\lim_{s\to 0} \frac{1/LC}{s^2 + \frac{1}{RC}s + \frac{1}{LC}} \cdot \frac{s}{s} = \frac{1/LC}{1/LC} = 1$ ✓

</details>

## When FVT Fails

The FVT requires all poles of $sY(s)$ (except possibly at origin) to be in the left-half plane. It fails when:

- The system is **unstable** (poles with positive real parts)
- The output **oscillates forever** (purely imaginary poles)
- There are **repeated poles** at the origin

[[visual:fvt-conditions-plotly]]

<details>
<summary><strong>Pause & Think</strong>: Can you use FVT for y(t) = sin(ωt)?</summary>

No! $Y(s) = \omega/(s^2+\omega^2)$, which has poles at $s = \pm j\omega$ — on the imaginary axis. The signal oscillates forever and has no final value. FVT would give $\lim_{s\to 0} s \cdot \omega/(s^2+\omega^2) = 0$, which is wrong (the average is zero, but there's no single final value).

</details>

## Quick Reference

| Theorem | Formula | What it gives | $s$ limit |
|---------|---------|--------------|-----------|
| **IVT** | $\lim_{s\to\infty} sY(s)$ | $y(0^+)$ | $s \to \infty$ |
| **FVT** | $\lim_{s\to 0} sY(s)$ | $y(\infty)$ | $s \to 0$ |

[[visual:comparison-table-plotly]]

## Summary

- **IVT**: $y(0^+) = \lim_{s\to\infty} sY(s)$ — initial value without inverse transform
- **FVT**: $y(\infty) = \lim_{s\to 0} sY(s)$ — final (steady-state) value without inverse transform
- FVT only valid if final value exists (stable systems, no sustained oscillation)
- Both theorems verified on RC step response: $y(0^+)=0$, $y(\infty)=1$
- Use these as **quick checks** after computing the full solution, or as standalone tools on exams
