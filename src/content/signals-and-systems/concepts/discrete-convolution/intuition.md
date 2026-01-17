# Computing Discrete Convolution Step by Step

> **Narrative thread:** Convolution might look intimidating, but it's just four simple steps: flip, shift, multiply, sum. Master this algorithm and you can analyze any LTI system.

---

## FROM BASICS: What Is Convolution?

From the previous concept, we know the output of an LTI system is:

$$y[n] = \sum_{k=-\infty}^{\infty} x[k] \cdot h[n-k]$$

This operation is called **convolution** and is denoted:

$$y[n] = x[n] * h[n]$$

The asterisk (*) is the convolution operator (not multiplication!).

---

## THE BIG IDEA: Flip, Shift, Multiply, Sum

[[visual:v1]]

The animation above shows the graphical convolution process. Here's the algorithm:

### The Four Steps

| Step | Action | Result |
|------|--------|--------|
| 1. **Flip** | Reverse h[k] to get h[-k] | Mirror image |
| 2. **Shift** | Move to get h[n₀-k] | Position at output index |
| 3. **Multiply** | x[k] · h[n₀-k] at each k | Point-by-point products |
| 4. **Sum** | Add all products | Output value y[n₀] |

Repeat for each output index n₀!

---

## BUILDING UNDERSTANDING: Worked Example

Let's compute y[n] = x[n] * h[n] for:

$$x[n] = \{1, 2\} \text{ at } n = \{0, 1\}$$
$$h[n] = \{1, 1, 1\} \text{ at } n = \{0, 1, 2\}$$

### Step-by-Step Calculation

[[visual:v2]]

#### y[0]: Compute output at n = 0

1. **Flip h[k]** → h[-k]: Values at k = {0, -1, -2}
2. **Shift by 0** → h[0-k] = h[-k]: Same as flipped
3. **Multiply** x[k] · h[-k]:
   - At k=0: x[0] · h[0] = 1 · 1 = 1
   - At k=1: x[1] · h[-1] = 2 · 0 = 0 (h is zero at -1)
4. **Sum** = 1

$$\boxed{y[0] = 1}$$

#### y[1]: Compute output at n = 1

1. **Shift h[-k] by 1** → h[1-k]: Values now at k = {1, 0, -1}
2. **Multiply** x[k] · h[1-k]:
   - At k=0: x[0] · h[1] = 1 · 1 = 1
   - At k=1: x[1] · h[0] = 2 · 1 = 2
3. **Sum** = 1 + 2 = 3

$$\boxed{y[1] = 3}$$

#### y[2]: Compute output at n = 2

1. **Shift h[-k] by 2** → h[2-k]: Values at k = {2, 1, 0}
2. **Multiply** x[k] · h[2-k]:
   - At k=0: x[0] · h[2] = 1 · 1 = 1
   - At k=1: x[1] · h[1] = 2 · 1 = 2
3. **Sum** = 1 + 2 = 3

$$\boxed{y[2] = 3}$$

#### y[3]: Compute output at n = 3

1. **Shift h[-k] by 3** → h[3-k]: Values at k = {3, 2, 1}
2. **Multiply** x[k] · h[3-k]:
   - At k=0: x[0] · h[3] = 1 · 0 = 0 (h is zero at 3)
   - At k=1: x[1] · h[2] = 2 · 1 = 2
3. **Sum** = 0 + 2 = 2

$$\boxed{y[3] = 2}$$

### Final Result

$$y[n] = \{1, 3, 3, 2\} \text{ at } n = \{0, 1, 2, 3\}$$

---

## Output Length Rule

For finite-length signals:

| Signal | Length |
|--------|--------|
| x[n] | N₁ samples |
| h[n] | N₂ samples |
| y[n] = x*h | N₁ + N₂ - 1 samples |

**Example:** x has 2 samples, h has 3 samples → y has 2+3-1 = 4 samples ✓

---

## Properties of Convolution

| Property | Formula | Meaning |
|----------|---------|---------|
| **Commutative** | x * h = h * x | Order doesn't matter |
| **Associative** | (x * h₁) * h₂ = x * (h₁ * h₂) | Can regroup cascades |
| **Distributive** | x * (h₁ + h₂) = x*h₁ + x*h₂ | Works with sums |
| **Identity** | x * δ = x | Impulse is identity |

---

## Convolution with Special Signals

### Convolution with Impulse

$$x[n] * \delta[n] = x[n]$$

The impulse is the **identity** of convolution!

### Convolution with Shifted Impulse

$$x[n] * \delta[n - n_0] = x[n - n_0]$$

Convolving with a shifted impulse **delays** the signal!

### Convolution with Step

$$x[n] * u[n] = \text{running sum of } x[n]$$

Convolving with step gives the **cumulative sum**!

---

## Common Mistakes to Avoid

> ⚠️ **Mistake 1:** Forgetting to flip h[k] first
> 
> Always flip h[k] to h[-k] before shifting!

> ⚠️ **Mistake 2:** Confusing * with multiplication
> 
> Convolution (*) is NOT point-by-point multiplication!

> ⚠️ **Mistake 3:** Wrong output length
> 
> Length of y = length of x + length of h - 1

---

## Why This Matters

| Application | How convolution is used |
|-------------|-------------------------|
| **Digital filters** | Output = input * filter coefficients |
| **Image processing** | Blur, sharpen, edge detection |
| **Audio reverb** | Output = dry signal * room impulse response |
| **Neural networks** | Convolution layers in CNNs |

---

## Key Takeaways

1. **Convolution:** y[n] = Σ x[k]·h[n-k]
2. **Four steps:** Flip → Shift → Multiply → Sum
3. **Output length:** N₁ + N₂ - 1
4. **Commutative:** x * h = h * x
5. **Identity:** x * δ = x

---

*Congratulations! You've mastered discrete convolution — the most important operation in signals and systems.*
