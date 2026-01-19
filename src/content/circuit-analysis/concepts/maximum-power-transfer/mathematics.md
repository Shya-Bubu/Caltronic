# Maximum Power Transfer - Mathematical Framework

## Problem Formulation

Given Thévenin equivalent source ($V_{th}$, $R_{th}$) connected to load $R_L$:

Find $R_L$ that maximizes power delivered to the load.

---

## Power Expression

Current through circuit:
$$I = \frac{V_{th}}{R_{th} + R_L}$$

Power dissipated in load:
$$P_L = I^2 R_L = \frac{V_{th}^2 R_L}{(R_{th} + R_L)^2}$$

---

## Optimization

### Finding the Maximum

To find maximum, differentiate $P_L$ with respect to $R_L$ and set to zero:

$$\frac{dP_L}{dR_L} = V_{th}^2 \cdot \frac{d}{dR_L}\left[\frac{R_L}{(R_{th} + R_L)^2}\right]$$

Using quotient rule:
$$\frac{d}{dR_L}\left[\frac{R_L}{(R_{th} + R_L)^2}\right] = \frac{(R_{th} + R_L)^2 \cdot 1 - R_L \cdot 2(R_{th} + R_L)}{(R_{th} + R_L)^4}$$

Simplifying numerator:
$$(R_{th} + R_L)^2 - 2R_L(R_{th} + R_L) = (R_{th} + R_L)[(R_{th} + R_L) - 2R_L]$$
$$= (R_{th} + R_L)(R_{th} - R_L)$$

So:
$$\frac{dP_L}{dR_L} = V_{th}^2 \cdot \frac{(R_{th} + R_L)(R_{th} - R_L)}{(R_{th} + R_L)^4} = V_{th}^2 \cdot \frac{R_{th} - R_L}{(R_{th} + R_L)^3}$$

### Critical Point

Setting $\frac{dP_L}{dR_L} = 0$:

$$R_{th} - R_L = 0$$

$$\boxed{R_L = R_{th}}$$

### Verification (Second Derivative Test)

$$\frac{d^2P_L}{dR_L^2}\bigg|_{R_L = R_{th}} < 0$$

This confirms it's a maximum, not minimum.

---

## Maximum Power

Substituting $R_L = R_{th}$:

$$P_{max} = \frac{V_{th}^2 \cdot R_{th}}{(R_{th} + R_{th})^2} = \frac{V_{th}^2 \cdot R_{th}}{4R_{th}^2}$$

$$\boxed{P_{max} = \frac{V_{th}^2}{4R_{th}}}$$

---

## Alternative Forms

Using Norton equivalent ($I_N = V_{th}/R_{th}$):

$$P_{max} = \frac{(I_N R_N)^2}{4R_N} = \frac{I_N^2 R_N}{4}$$

---

## Efficiency at Maximum Power

### Power Delivered

$$P_L = \frac{V_{th}^2}{4R_{th}}$$

### Total Power from Source

$$P_{total} = V_{th} \cdot I = V_{th} \cdot \frac{V_{th}}{2R_{th}} = \frac{V_{th}^2}{2R_{th}}$$

### Efficiency

$$\eta = \frac{P_L}{P_{total}} = \frac{V_{th}^2/4R_{th}}{V_{th}^2/2R_{th}} = \frac{1/4}{1/2} = \frac{1}{2}$$

$$\boxed{\eta_{max-power} = 50\%}$$

---

## General Efficiency Formula

For arbitrary $R_L$:

$$\eta = \frac{P_L}{P_{total}} = \frac{I^2 R_L}{I^2(R_{th} + R_L)} = \frac{R_L}{R_{th} + R_L}$$

### Special Cases

| Condition | Efficiency |
|-----------|------------|
| $R_L = 0$ | $\eta = 0$ |
| $R_L = R_{th}$ | $\eta = 50\%$ |
| $R_L = 3R_{th}$ | $\eta = 75\%$ |
| $R_L = 9R_{th}$ | $\eta = 90\%$ |
| $R_L \to \infty$ | $\eta \to 100\%$ |

---

## Normalized Analysis

Define: $x = R_L/R_{th}$ (normalized load)

Then:
$$P_L = \frac{V_{th}^2}{R_{th}} \cdot \frac{x}{(1+x)^2}$$

Let $p = P_L R_{th}/V_{th}^2$ (normalized power):
$$p = \frac{x}{(1+x)^2}$$

Maximum at $x = 1$ (i.e., $R_L = R_{th}$):
$$p_{max} = \frac{1}{4}$$

---

## Complex Impedances (AC Circuits)

For AC circuits with source impedance $Z_{th} = R_{th} + jX_{th}$:

**Maximum power when**:
$$Z_L = Z_{th}^* = R_{th} - jX_{th}$$

The load impedance equals the **complex conjugate** of the source impedance.

### Proof

Power to load: $P_L = |I|^2 R_L$

where $|I| = \frac{|V_{th}|}{|Z_{th} + Z_L|}$

For $Z_L = R_L + jX_L$:
$$|Z_{th} + Z_L| = \sqrt{(R_{th} + R_L)^2 + (X_{th} + X_L)^2}$$

To minimize denominator (maximize $|I|$):
1. Set $X_L = -X_{th}$ (cancel reactive parts)
2. Then optimize $R_L = R_{th}$

Result: $Z_L = R_{th} - jX_{th} = Z_{th}^*$

---

## Power vs Load: Mathematical Form

$$\frac{P_L}{P_{max}} = \frac{4x}{(1+x)^2}$$

where $x = R_L/R_{th}$

This function:
- Equals 0 at $x = 0$ and $x \to \infty$
- Equals 1 at $x = 1$
- Is symmetric in logarithm: $P(x) = P(1/x)$

---

## Summary of Key Results

| Quantity | Formula |
|----------|---------|
| Optimal load | $R_L = R_{th}$ |
| Maximum power | $P_{max} = \frac{V_{th}^2}{4R_{th}}$ |
| Efficiency at max power | $\eta = 50\%$ |
| General efficiency | $\eta = \frac{R_L}{R_{th} + R_L}$ |
| AC matching | $Z_L = Z_{th}^*$ |
