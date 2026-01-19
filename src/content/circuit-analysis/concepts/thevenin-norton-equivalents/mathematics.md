# Thévenin and Norton - Mathematical Framework

## Formal Theorem Statements

### Thévenin's Theorem

Any linear two-terminal network can be replaced by an equivalent circuit consisting of:
- A voltage source $V_{th}$ in series with
- A resistance $R_{th}$

where $V_{th}$ equals the open-circuit voltage and $R_{th}$ equals the resistance seen looking into the terminals with all independent sources deactivated.

### Norton's Theorem

Any linear two-terminal network can be replaced by an equivalent circuit consisting of:
- A current source $I_N$ in parallel with
- A resistance $R_N$

where $I_N$ equals the short-circuit current and $R_N$ equals the Thévenin resistance.

---

## Mathematical Proof

### Linear Network Characterization

For any linear resistive network, the terminal voltage-current relationship is:

$$V = aI + b$$

where $a$ and $b$ are constants determined by the network.

**At open circuit** ($I = 0$):
$$V_{oc} = b = V_{th}$$

**At short circuit** ($V = 0$):
$$0 = aI_{sc} + V_{th}$$
$$I_{sc} = -\frac{V_{th}}{a} = I_N$$

Therefore: $a = -\frac{V_{th}}{I_N} = -R_{th}$

The relationship becomes:
$$V = -R_{th}I + V_{th}$$

Or rearranged:
$$V = V_{th} - R_{th}I$$

This is exactly the equation for a Thévenin equivalent!

---

## Computing Thévenin Parameters

### Method 1: Direct Calculation

$$V_{th} = V_{oc}$$ (voltage with terminals open)

For $R_{th}$, deactivate all independent sources:
- Voltage sources → short circuit
- Current sources → open circuit

Then calculate equivalent resistance.

### Method 2: Using Both Terminal Conditions

$$R_{th} = \frac{V_{oc}}{I_{sc}} = \frac{V_{th}}{I_N}$$

Requires calculating both open-circuit and short-circuit conditions.

### Method 3: Test Source (for dependent sources)

Apply test voltage $V_t$ at terminals (with independent sources off):
$$R_{th} = \frac{V_t}{I_t}$$

Or apply test current $I_t$:
$$R_{th} = \frac{V_t}{I_t}$$

---

## Source Transformation Mathematics

### Thévenin to Norton

Given: $V_{th}$, $R_{th}$

Norton parameters:
$$I_N = \frac{V_{th}}{R_{th}}$$
$$R_N = R_{th}$$

### Norton to Thévenin

Given: $I_N$, $R_N$

Thévenin parameters:
$$V_{th} = I_N \cdot R_N$$
$$R_{th} = R_N$$

### Proof of Equivalence

For Thévenin: $V = V_{th} - R_{th}I$

For Norton: $I = I_N - \frac{V}{R_N}$

Rearranging Norton:
$$V = R_N I_N - R_N I = I_N R_N - R_N I$$

If $R_N = R_{th}$ and $V_{th} = I_N R_N$:
$$V = V_{th} - R_{th}I$$

Identical to Thévenin! ∎

---

## Matrix Approach

### For Complex Networks

Consider a linear network with node equations:
$$\mathbf{G}\mathbf{v} = \mathbf{i}_s$$

where $\mathbf{i}_s$ represents source currents.

The open-circuit voltage at node k:
$$V_{th} = v_k |_{i_k = 0}$$

The short-circuit current (when $v_k = 0$):
$$I_{sc} = -\sum_j G_{kj}v_j + i_{sk}$$

The Thévenin resistance:
$$R_{th} = \frac{1}{G_{kk}^{eq}}$$

where $G_{kk}^{eq}$ is the self-conductance at node k with all independent sources off.

---

## Example: Complete Analysis

**Circuit:**
```
      R₁       R₂
   ○──/\/\/──┬──/\/\/──○ A
             │
            V_s
             │
   ○─────────┴─────────○ B
```

**Open-circuit voltage:**

No current through $R_2$ when A-B is open.

$$V_{th} = V_s \cdot \frac{R_2}{R_1 + R_2}$$

Wait, that's not right. Let me reconsider the topology...

Actually, with $V_s$ between the junction and ground:
$$V_{th} = V_s$$ (voltage at A equals $V_s$ since no current through $R_2$)

Hmm, depends on exact topology. Let me use a clearer example:

**Revised Circuit:**
```
            R₁=4Ω
    ┌───────/\/\/────┬───○ A
    │                │
   (+)              R₂=6Ω
   20V               │
   (-)              │
    │                │
    └────────────────┴───○ B
```

**$V_{th}$**: Voltage divider
$$V_{th} = 20 \times \frac{6}{4+6} = 20 \times 0.6 = 12V$$

**$R_{th}$**: Short the 20V
$$R_{th} = R_1 || R_2 = \frac{4 \times 6}{4+6} = 2.4Ω$$

**$I_N$**:
$$I_N = \frac{V_{th}}{R_{th}} = \frac{12}{2.4} = 5A$$

**Verification**: Short A-B directly
Current from 20V through 4Ω: $I = 20/4 = 5A$ ✓

---

## Load Current Formula

With Thévenin equivalent connected to load $R_L$:

$$I_L = \frac{V_{th}}{R_{th} + R_L}$$

$$V_L = V_{th} \cdot \frac{R_L}{R_{th} + R_L}$$

$$P_L = I_L^2 R_L = \frac{V_{th}^2 R_L}{(R_{th} + R_L)^2}$$

---

## Maximum Power Transfer

To maximize $P_L$, take derivative and set to zero:

$$\frac{dP_L}{dR_L} = V_{th}^2 \cdot \frac{(R_{th} + R_L)^2 - R_L \cdot 2(R_{th} + R_L)}{(R_{th} + R_L)^4}$$

Setting numerator to zero:
$$(R_{th} + R_L) - 2R_L = 0$$
$$R_{th} = R_L$$

**Maximum power occurs when** $R_L = R_{th}$

$$P_{max} = \frac{V_{th}^2}{4R_{th}}$$

---

## Summary of Key Formulas

| Parameter | Formula |
|-----------|---------|
| $V_{th}$ | Open-circuit voltage |
| $I_N$ | Short-circuit current |
| $R_{th} = R_N$ | $\frac{V_{th}}{I_N}$ or source-off resistance |
| Conversion | $V_{th} = I_N R_N$, $I_N = V_{th}/R_{th}$ |
| Load current | $I_L = \frac{V_{th}}{R_{th} + R_L}$ |
| Load voltage | $V_L = V_{th} \cdot \frac{R_L}{R_{th} + R_L}$ |
| Max power | At $R_L = R_{th}$: $P_{max} = \frac{V_{th}^2}{4R_{th}}$ |
