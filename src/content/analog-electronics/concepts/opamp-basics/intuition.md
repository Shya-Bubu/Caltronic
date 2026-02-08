# Op-Amp Fundamentals

## What is an Operational Amplifier?

An **Operational Amplifier (Op-Amp)** is an electronic component that can amplify voltage signals. Think of it as a "super-amplifier" that takes a tiny input voltage and makes it much larger.

### From A-Level: What is Amplification?

Remember from A-Level Physics:
- **Amplification** means making a signal larger
- **Gain** = Output / Input
- If Gain = 10, a 0.1V input becomes 1V output

**Op-amps take this to an extreme** — they have gains of 100,000 or more!

## The 741 Op-Amp IC

In this lab, you'll use the **LM741** op-amp — one of the most famous ICs ever made.

[[visual:diag-intuition-01]]

### Pin Configuration

| Pin | Name | Function |
|-----|------|----------|
| **2** | Inverting Input (−) | Input that inverts the signal |
| **3** | Non-Inverting Input (+) | Input that doesn't invert |
| **4** | V− | Negative power supply (−15V) |
| **6** | Output | Amplified output signal |
| **7** | V+ | Positive power supply (+15V) |

> 🤔 **Pause & Reflect**: The op-amp needs ±15V power supply. What do you think happens if the output tries to exceed these voltage limits?

<details>
<summary>Click to reveal answer</summary>

**The output "saturates"** — it clips at approximately ±14V (slightly less than supply voltage). This is called **saturation** and causes distortion. You'll observe this in Activity 1 when you increase the input too much!

</details>

[[visual:sim-intuition-01]]

## The Two Golden Rules

Op-amps are analysed using two simple rules (when negative feedback is present):

### Rule 1: No Current Into Inputs

$$I_+ = I_- = 0$$

The op-amp has **very high input impedance** (megaohms), so essentially no current flows into the + or − terminals.

### Rule 2: Virtual Short

$$V_+ = V_-$$

With negative feedback, the op-amp adjusts its output to make both input terminals have the **same voltage**.

> 🤔 **Why "Virtual"?** The inputs are at the same voltage but NOT physically connected. It's as if there's a short circuit... but there isn't!

## The Analysis Procedure

To analyse ANY op-amp circuit:

1. **Identify the feedback** — look for connection from output back to inverting (−) input
2. **Apply KCL** at the inverting node (−)
3. **Apply KCL** at the non-inverting node (+)  
4. **Set V+ = V−** using the virtual short rule
5. **Solve for gain** (Vo/Vi)

This procedure will work for ALL the circuits in this lab!

## Open-Loop vs Closed-Loop

[[visual:diag-intuition-02]]

| Configuration | Feedback? | Gain | Use |
|---------------|-----------|------|-----|
| **Open-Loop** | No | 100,000+ | Comparator (saturates) |
| **Closed-Loop** | Yes | Controlled (e.g., 10) | Amplifier |

**Key insight**: Without feedback, the massive gain causes the output to slam to ±14V (saturation). Negative feedback "tames" the op-amp to give predictable, controlled gain.

---

*Continue to Engineering to understand how to build and test op-amp circuits in the lab.*
