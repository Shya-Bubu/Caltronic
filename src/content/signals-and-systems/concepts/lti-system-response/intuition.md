# How LTI Systems Respond to Any Input

> **Narrative thread:** This is where everything comes together. The impulse response h[n] is like a system's "DNA" — once you know it, you can predict the output for ANY input.

---

## FROM BASICS: A System's Fingerprint

In previous lessons, you learned:
- What signals and systems are (Lesson 01)
- What the impulse function is (Lesson 02)
- What LTI properties mean (Lesson 02)

Now we'll combine them to answer the biggest question: **If I give any input x[n] to an LTI system, what output y[n] will I get?**

---

## THE BIG IDEA: The Impulse Response Defines Everything

[[visual:v1]]

The block diagram above shows the key insight: feed an impulse δ[n] into any LTI system, and you get the **impulse response** h[n].

> **Revolutionary fact:** If you know h[n], you can compute the output for ANY input!

This works because of two properties:
1. **Time invariance** — shifted input → shifted output
2. **Linearity** — scaled and summed inputs → scaled and summed outputs

---

## BUILDING UNDERSTANDING: Decomposing Any Signal

Here's the magic trick: ANY discrete signal can be written as a sum of scaled, shifted impulses.

### The Impulse Train Representation

[[visual:v2]]

Consider a signal x[n] with values at different indices. Each value can be thought of as:

$$x[n] = \sum_{k=-\infty}^{\infty} x[k] \cdot \delta[n-k]$$

**What this means:**
- At each index k, there's an impulse δ[n-k]
- Each impulse is scaled by the signal value x[k]
- Sum them all up → you get the original signal!

### Example

If x[n] = {2, 5, 3} at n = {0, 1, 2}:

$$x[n] = 2 \cdot \delta[n] + 5 \cdot \delta[n-1] + 3 \cdot \delta[n-2]$$

---

## Using LTI Properties

Now apply the LTI properties:

### Step 1: Time Invariance

If δ[n] → h[n], then:

$$\delta[n-k] \rightarrow h[n-k]$$

A shifted impulse produces a shifted impulse response!

### Step 2: Linearity (Scaling)

If δ[n-k] → h[n-k], then:

$$x[k] \cdot \delta[n-k] \rightarrow x[k] \cdot h[n-k]$$

Scaling the input scales the output by the same factor!

### Step 3: Linearity (Superposition)

If many scaled impulses go in:

$$\sum_{k} x[k] \cdot \delta[n-k] \rightarrow \sum_{k} x[k] \cdot h[n-k]$$

The sum of inputs produces the sum of outputs!

---

## The Final Result

Combining everything:

$$\boxed{y[n] = \sum_{k=-\infty}^{\infty} x[k] \cdot h[n-k]}$$

This is the **convolution sum** — we'll explore it in detail in the next concept.

---

## Visual Summary

[[visual:v3]]

The diagram shows the complete chain:
1. Input x[n] enters the LTI system
2. System is characterized by h[n]
3. Output y[n] = x[n] * h[n] (convolution)

---

## Why This is Revolutionary

| What you need | What you get |
|---------------|--------------|
| Impulse response h[n] | Output for ANY input |
| One experiment | Complete system characterization |
| Simple formula | Powerful prediction tool |

**Instead of testing infinite inputs, test just one (impulse) and you know everything!**

---

## Key Takeaways

1. **Impulse response h[n]** completely defines an LTI system
2. Any signal = sum of scaled, shifted impulses
3. **Time invariance** shifts the response
4. **Linearity** scales and sums the responses
5. Output y[n] = convolution of x[n] and h[n]

---

*Next: We'll learn exactly how to compute convolution step by step.*
