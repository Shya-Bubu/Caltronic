## Exam Focus: The PN-Junction Diode

### Common Question Patterns

1. **Calculate current given voltage**: Apply $i = I_s(e^{v/V_T} - 1)$ directly. Remember $V_T \approx 26\,\text{mV}$ at room temperature.
2. **Calculate voltage given current**: Use the inverted form $v = V_T \ln(i/I_s + 1)$ or, for forward bias where $i \gg I_s$, use $v \approx V_T \ln(i/I_s)$.
3. **Temperature effects**: Determine how the operating point shifts when temperature changes. Higher $T$ means higher $V_T$ and dramatically higher $I_s$.
4. **Compare with ideal diode**: Sketch both characteristics on the same v-i plane and explain the differences.
5. **Ratio problems**: Two diodes at different operating points; find the voltage difference given a current ratio (e.g., $\Delta v = V_T \ln(i_2/i_1)$).

### Common Mistakes

- **Using the wrong value of $V_T$**: At room temperature (approximately 300K), $V_T \approx 26\,\text{mV}$. Students sometimes use 25 mV, 0.26V, or forget to convert to volts entirely. Always double-check units.
- **Forgetting the $-1$ in the equation**: For reverse bias calculations, the $-1$ matters because $e^{v/V_T}$ is close to zero, making $i \approx -I_s$. For forward bias with $v > 100\,\text{mV}$, the $-1$ is negligible.
- **Treating $I_s$ as a large current**: $I_s$ is picoamps ($10^{-12}\,\text{A}$), not milliamps. Students sometimes use $I_s = 10^{-12}$ but forget the units and get answers that are off by many orders of magnitude.
- **Confusing $V_T$ with the turn-on voltage**: $V_T \approx 26\,\text{mV}$ is the thermal voltage. The "turn-on voltage" of approximately 0.7V is where significant current begins to flow. These are completely different quantities.
- **Neglecting temperature dependence of $I_s$**: When a problem changes temperature, students often update $V_T$ but forget that $I_s$ also changes (it roughly doubles per 10K increase).

### Exam Tips

- Memorise $V_T \approx 26\,\text{mV}$ at 300K. If the problem states a different temperature, recalculate $V_T = kT/q$.
- The rule "$60\,\text{mV}$ per decade" is extremely useful: increasing $v$ by approximately $60\,\text{mV}$ multiplies the forward current by 10 (since $V_T \ln 10 \approx 59.6\,\text{mV}$).
- For ratio problems with two operating points at the same temperature: $v_2 - v_1 = V_T \ln(i_2/i_1)$. The $I_s$ cancels.
- When in doubt about whether to keep the $-1$, ask: is $e^{v/V_T} \gg 1$? If $v > 4V_T \approx 100\,\text{mV}$, yes, drop the $-1$. If $v$ is near zero or negative, keep it.
- Always state your assumptions: "At room temperature ($T = 300\,\text{K}$, $V_T = 26\,\text{mV}$)" at the start of your solution.
