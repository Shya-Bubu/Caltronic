# Exam Preparation

> Common traps, examiner framing, and grading patterns.

---

## Typical Exam Questions

### Type 1: Definition Questions (2-3 marks)

**Q: Define a signal and a system.**

**A:** 
- A **signal** is a physical quantity that varies with one or more independent variables, typically time.
- A **system** is a device or process that transforms an input signal into an output signal according to a defined rule.

---

### Type 2: Classification Questions (3-5 marks)

**Q: Classify the following as signals or systems:**
1. A resistor
2. An ECG waveform
3. A low-pass filter
4. Temperature recorded every hour

**A:**
1. **System** — transforms current input to voltage output (V = IR)
2. **Signal** — voltage varying with time
3. **System** — transforms input signal by removing high frequencies
4. **Signal** — temperature values indexed by time

---

### Type 3: Block Diagram Analysis (5-8 marks)

**Q: Draw a block diagram for an intercom system.**

**A:**
```
Microphone → Amplifier → Transmission → Amplifier → Speaker
(Transducer)  (System)    (Channel)     (System)  (Transducer)
```

Explain each block's input and output types.

[[visual:v5]]

---

## Common Mistakes to Avoid

| Mistake | Correction |
|---------|------------|
| Confusing signal with system | Signal = the varying quantity; System = the transformer |
| Forgetting transducers convert types | Microphone: acoustic → electrical |
| Mixing up x(t) and x[n] | Parentheses = continuous; Brackets = discrete |

---

## Past Paper Insight

Based on University of Peradeniya exams:

- **2-3 marks**: Basic definitions
- **5 marks**: Block diagram with explanation
- **Rarely asked alone**: Usually combined with classification questions

---

## Practice Problem

**Q: A temperature sensor measures temperature every second and sends the data to a computer. Identify:**
1. The original signal
2. The sampled signal
3. The system(s) involved

**A:**
1. Original signal: $T(t)$ — continuous temperature over time
2. Sampled signal: $T[n] = T(nT_s)$ where $T_s = 1$ second
3. Systems:
   - Temperature sensor (transducer: thermal → electrical)
   - ADC (system: continuous → discrete)
   - Computer (system: processing)
