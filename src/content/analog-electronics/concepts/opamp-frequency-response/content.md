# Frequency Response & Bandwidth

> **Why This Matters**: So far, we have assumed that if you design an amplifier with a gain of $100$, it will multiply a $1\text{ Hz}$ sine wave and a $10\text{ MHz}$ radio wave equally well by $100$. This is false. All amplifiers are limited in how fast they can react. Understanding the **Frequency Response** is the key to designing audio amplifiers that sound good, radio receivers that pick up signals, and active filters that separate noise from data.

## 1. The Open-Loop Frequency Response

If you look at the datasheet for the classic LM741, it advertises a massive open-loop DC voltage gain ($A_d$) of $200,000$. 

However, if you input a $10\text{ kHz}$ audio tone, you will not get a gain of $200,000$. In fact, you might only get a gain of $100$!

Modern op-amps are intentionally designed to be "sluggish." Inside the silicon, manufacturers embed a microscopic compensation capacitor. This capacitor acts like a low-pass filter, intentionally killing the op-amp's gain at high frequencies to prevent the amplifier from accidentally turning into an unstable high-frequency oscillator.

[[visual:open-loop-bode]]

As you can see in the Bode plot, the gain stays perfectly flat at $10^5$ only up to about $10\text{ Hz}$! This point is called the **Open-Loop Break Frequency ($f_c$)**.
After $10\text{ Hz}$, the gain rolls off linearly on a log-log plot (specifically at a rate of $-20\text{ dB/decade}$). By the time the frequency reaches $1\text{ MHz}$, the open-loop gain has dropped all the way to $1$. 

## 2. The Magic of Negative Feedback

At first glance, an amplifier that starts losing gain at $10\text{ Hz}$ sounds completely useless for audio ($20\text{ Hz} \text{ to } 20\text{ kHz}$), let alone video or radio. So how do we actually use op-amps?

The answer is **Negative Feedback**. Let's look at the classic control theory block diagram for negative feedback.

[[visual:feedback-block-diagram]]

We take the source signal $V_s$ and subtract a fraction ($\beta$) of the output voltage $V_o$ from it. The resulting tiny error voltage $V_i = V_s - \beta V_o$ is what enters the op-amp. The op-amp amplifies this tiny error by its massive open-loop gain $A_d$.

The overall **Closed-Loop Gain ($A_f$)** of the entire system can be mathematically derived as:
$$\boxed{A_f = \frac{V_o}{V_s} = \frac{A_d}{1 + A_d \beta}}$$

### The "A is Huge" Approximation
Let's analyze this equation. What happens if the open-loop gain $A_d$ is massively large (e.g. $100,000$)?
The denominator is $(1 + A_d \beta)$. If $A_d$ is massive, then $A_d \beta \gg 1$. We can just ignore the $1$!
$$A_f \approx \frac{A_d}{A_d \beta}$$
The $A_d$ terms cancel out completely!

$$\boxed{A_f \approx \frac{1}{\beta} \text{ (when } A_d \text{ is large)}}$$

This is the most profound equation in analog electronics. **The closed-loop gain $A_f$ depends entirely on the feedback network ($\beta$) and is completely independent of the op-amp's actual internal gain $A_d$**.

### Temperature Stability Advantage
If the temperature of the silicon chip rises by $50^\circ\text{C}$, the internal open-loop gain $A_d$ might drop from $200,000$ down to $150,000$. 

Without feedback, your output would shrink drastically. With negative feedback, because $A_f = 1/\beta$, the closed loop gain does not care! As long as the external resistors forming $\beta$ (like $R_1$ and $R_2$) are stable, the amplifier's gain is rock solid against temperature changes.

[[visual:temperature-stability]]

## 3. Bandwidth Extension 

Let's return to the frequency problem. We know $A_d$ starts dropping at $10\text{ Hz}$. 

Imagine you design a non-inverting amplifier with resistors to set the closed-loop gain $A_f = 100$. 
This means $\beta = 1/100 = 0.01$.

At $1\text{ kHz}$, the open-loop gain $A_d$ has dropped from $100,000$ down to $1,000$. 
Let's plug $A_d = 1000$ and $\beta = 0.01$ into our exact equation:
$$A_f = \frac{1000}{1 + (1000 \times 0.01)} = \frac{1000}{1 + 10} = \frac{1000}{11} \approx 90.9$$
We aimed for $100$, and we are still getting nearly $91$. The gain has been maintained!

The closed-loop gain will remain flat at $100$ all the way up until the plummeting open-loop gain curve actually intersects with it. 

**By deliberately trading away massive internal gain ($100,000 \rightarrow 100$), we have pushed our operating bandwidth out from $10\text{ Hz}$ to $10,000\text{ Hz}$!**

[[visual:bandwidth-extension]]

## 4. Gain-Bandwidth Product (GBP)

Because the open-loop curve drops at a constant linear rate on a log-log plot ($-20\text{ dB/decade}$), a fascinating mathematical constant emerges.

If you multiply the Closed-Loop Gain by your resultant operating Bandwidth, you will always get the exact same number. This is called the **Gain-Bandwidth Product (GBP)**. 

$$\boxed{\text{Gain} \times \text{Bandwidth} = \text{GBP}}$$

For the 741, the GBP is $1\text{ MHz}$.

This allows incredibly fast mental design math:
- If I need a gain of $10$, my max frequency is $1\text{ MHz} / 10 = \mathbf{100\text{ kHz}}$.
- If I need a gain of $1000$, my max frequency is $1\text{ MHz} / 1000 = \mathbf{1\text{ kHz}}$.
- If I configure it as a Unity Gain Buffer (gain of $1$), my max frequency is $1\text{ MHz} / 1 = \mathbf{1\text{ MHz}}$.

*(Note: The frequency where the open-loop gain crosses $1$ is called the Unity Gain Frequency ($f_T$). For standard voltage-feedback op-amps, $f_T = \text{GBP}$).*

[[visual:gain-bandwidth-product]]

## 5. Active Filters

We've seen that the op-amp's internal capacitance acts as a Low-Pass filter. What if we intentionally place capacitors in the negative feedback network?

Because capacitor impedance is frequency-dependent ($X_C = \frac{1}{2\pi f C}$), we can create amplifiers whose gain intentionally changes with frequency.

- **AC Coupling (High-Pass)**: Placing a capacitor in series with the input blocks $0\text{ Hz}$ (DC) completely. This is mathematically equivalent to the differentiator we studied previously, but heavily limited by a series resistor.
- **Low-Pass Filter**: Placing a capacitor in parallel with the feedback resistor $R_F$. At high frequencies, the capacitor acts like a short circuit, making $R_F$ effectively zero, which kills the amplifier's gain to $1$ (or $0$ if inverting).
- **Bandpass Filter**: Combining both techniques to only amplify a specific "band" of frequencies in the middle.

[[visual:falstad-bandpass]]
[[visual:ac-coupling-plotly]]

## Summary
- **Open-Loop Gain ($A_d$)** is incredibly high but drops rapidly at very low frequencies (e.g., $10\text{ Hz}$) due to internal compensation.
- **Negative Feedback** stabilizes the amplifier against temperature fluctuations and manufacturing differences ($A_f \approx 1/\beta$).
- You can trade excess open-loop gain to extend the **bandwidth** of your amplifier to useful ranges.
- The **Gain-Bandwidth Product (GBP)** is a constant. If you want more gain, you must accept a lower maximum frequency limit.
- Using capacitors in the feedback network creates **Active Filters** with custom-designed frequency responses.
