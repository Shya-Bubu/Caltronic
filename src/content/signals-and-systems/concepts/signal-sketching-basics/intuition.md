# Sketching Signals from Equations

> **Narrative thread**: This concept teaches us the fundamental translation skill of signals — if you cannot convert between equations and graphs, every advanced topic (convolution, Fourier, Laplace) becomes impenetrable.

> The essential skill: see the equation, draw the signal.

---

## 📖 Resources

| Type | Resource |
|------|----------|
| 📺 Video | [Michel van Biezen: Plotting Signals](https://www.youtube.com/watch?v=O0Y8FChBaFU) |
| 📚 Textbook | Oppenheim & Willsky, Section 1.2 |
| 🎓 Lectures | University of Peradeniya EE2020 Week 2 |

---

## Standard Signal Shapes

Use the interactive simulation above to explore time scaling, shifting, and reversal of standard signals:

- **Unit Step**: The switch function — zero for t<0, one for t≥0
- **Rectangular Pulse**: A box function — value is 1 for a finite duration
- **Triangular Pulse**: A ramp up and ramp down, centered at zero

---

## Why This Matters

Every exam in signals and systems will ask you to:
1. Given an equation → sketch the signal
2. Given a sketch → write the equation

This is **not optional**. If you can't do this quickly and accurately, everything else becomes harder.

---

## Reading Piecewise Functions

Many signals are defined **piecewise** — different expressions for different time ranges:

$$x(t) = \begin{cases} \text{expression}_1 & \text{condition}_1 \\ \text{expression}_2 & \text{condition}_2 \\ \vdots & \vdots \end{cases}$$

### Example: Triangular Pulse
$$x(t) = \begin{cases} 1 - |t|/T & |t| \leq T \\ 0 & |t| > T \end{cases}$$

**How to read this:**
- When $|t| > T$ (outside the range): signal is 0
- When $|t| \leq T$ (inside): signal equals $1 - |t|/T$

---

## The |t| Notation

The **absolute value** $|t|$ is crucial:

$$|t| = \begin{cases} t & t \geq 0 \\ -t & t < 0 \end{cases}$$

This creates **symmetry** around $t = 0$.

### Sketching $1 - |t|/T$

1. At $t = 0$: value = $1 - 0 = 1$ (peak)
2. At $t = T$: value = $1 - 1 = 0$ (reaches zero)
3. At $t = -T$: value = $1 - 1 = 0$ (symmetric)
4. Connect with straight lines → **triangle**

---

## Common Pulse Shapes

### Rectangular Pulse
$$\text{rect}(t/T) = \begin{cases} 1 & |t| \leq T/2 \\ 0 & |t| > T/2 \end{cases}$$

```
      ┌───────┐
      │       │
──────┴───────┴──────
   -T/2   0   T/2
```

### Triangular Pulse
$$\text{tri}(t/T) = \begin{cases} 1 - |t|/T & |t| \leq T \\ 0 & |t| > T \end{cases}$$

```
        /\
       /  \
──────/    \──────
   -T   0   T
```

---

## Step-by-Step Sketching Process

1. **Identify regions**: Where is the signal zero? Non-zero?
2. **Find key points**: What's the value at boundaries?
3. **Check at t = 0**: This is often a peak or special point
4. **Determine the shape**: Linear? Curved? Constant?
5. **Draw carefully**: Label axes and key values

---

## From Sketch to Equation

The reverse skill is equally important.

### Example: Given this signal
```
      1 ┤  ┌───┐
        │  │   │
      0 ┼──┴───┴──────
         -1  0  1
```

### Write the equation:
$$x(t) = \begin{cases} 1 & -1 \leq t \leq 1 \\ 0 & \text{otherwise} \end{cases}$$

Or using the rectangle function: $x(t) = \text{rect}(t/2)$

---

## Pro Tips

1. **Always mark the axes** — t horizontally, x(t) vertically
2. **Label key values** — amplitudes and time boundaries
3. **Use symmetry** — |t| means symmetric about t = 0
4. **Check endpoints** — are they included (≤) or excluded (<)?
5. **Plot a few points first** — then connect
