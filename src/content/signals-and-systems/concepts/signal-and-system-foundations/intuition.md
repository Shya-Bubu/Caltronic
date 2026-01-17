# What Are Signals and Systems?

> **Narrative thread:** This is where your engineering journey truly begins. Signals and systems form the universal language of electrical engineering — every circuit, every communication system, every control loop uses these concepts.

---

## FROM BASICS: Connecting to What You Know

Before we dive into formal definitions, let's connect to what you already understand from A-Level physics and maths.

Think about a simple experiment: You drop a ball and record its height over time. That recording — height as a function of time h(t) — is a **signal**. 

Now think about what gravity does to the ball. Gravity takes the initial conditions (position, velocity) and produces a predictable motion. Gravity is acting as a **system** that transforms the input (initial state) into an output (trajectory).

**That's the essence:**
- **Signal** = Any quantity that changes with time (or space)
- **System** = Anything that transforms one signal into another

---

## THE BIG IDEA: The Universal Engineering Framework

[[visual:v1]]

The block diagram above captures the most important concept in all of engineering:

$$\boxed{x(t) \xrightarrow{\text{System } H} y(t)}$$

- **x(t)** = Input signal (what goes in)
- **H** = The system (what transforms it)
- **y(t)** = Output signal (what comes out)

This simple model applies to:
- Amplifiers (input voltage → output voltage)
- Filters (noisy signal → clean signal)
- Control systems (error → correction)
- Communication channels (transmitted → received)

**Master this model, and you've mastered the framework for all of EEE.**

---

## BUILDING UNDERSTANDING: What Exactly Is a Signal?

[[visual:v2]]

The waveform above shows a **continuous-time sinusoidal signal** — the most fundamental signal in engineering. Notice how the amplitude varies smoothly with time.

### Formal Definition

> **A signal is any physical quantity that carries information and varies with one or more independent variables.**

The independent variable is usually **time** (t), but can also be:
- **Space** (x, y, z) — like an image
- **Frequency** (f) — like a spectrum
- **Both** — like a video

### Real-World Examples

| Signal Type | Physical Quantity | Independent Variable |
|------------|-------------------|---------------------|
| Audio | Air pressure | Time |
| ECG | Heart voltage | Time |
| Image | Light intensity | Space (x, y) |
| Video | Light intensity | Time + Space |
| Temperature | Thermal energy | Time + Space |

The moment you realize **signals are everywhere**, engineering starts making deep sense.

---

## What About Systems?

If signals are the **nouns** of engineering (what we describe), systems are the **verbs** (what we do).

### The Audio Chain Example

Consider what happens when you speak into a microphone:

```
Voice (acoustic) → [Microphone] → Electrical signal
                        ↓
Electrical signal → [Amplifier] → Louder electrical signal
                        ↓
Louder signal → [Speaker] → Louder sound (acoustic)
```

**Three systems in a row**, each transforming one type of signal into another.

### Why the Split Matters

You might wonder: why study signals AND systems separately?

Here's the deep insight: **They're defined in terms of each other.**

- You can't measure a signal without a system (your oscilloscope is a system!)
- A system without signals is just a box doing nothing

This is why the course is called **"Signals AND Systems"** — the two are inseparable.

---

## The Mathematical Framework

Now let's introduce the formal notation you'll use throughout this course.

### Continuous-Time Signals

$$x(t) \quad \text{where } t \in \mathbb{R}$$

The signal value exists for **every** instant in the continuum of time.

### Discrete-Time Signals

$$x[n] \quad \text{where } n \in \mathbb{Z}$$

The signal value exists only at **integer** time indices.

### System as Transformation

We write a system as an operator **H** that maps input to output:

$$y(t) = H\{x(t)\}$$

Or more compactly:

$$y = H(x)$$

---

## The Vocabulary You Need

| Term | Definition | Example |
|------|------------|---------|
| **Signal** | Quantity varying with independent variable | Voltage v(t) |
| **System** | Device that transforms signals | Amplifier |
| **Input** | Signal entering a system | Microphone output |
| **Output** | Signal leaving a system | Speaker input |
| **Transducer** | System converting signal types | Microphone, sensor |
| **Excitation** | Another word for input | Same as input |
| **Response** | Another word for output | Same as output |

---

## Why This Foundation Matters

> **Every single topic in EE uses this framework.**

| When you study... | You're analyzing... |
|-------------------|---------------------|
| Filters | Systems that select frequencies |
| Amplifiers | Systems that scale magnitude |
| Control | Systems with feedback loops |
| Communications | Signals through noisy channels |
| DSP | Discrete systems on digital signals |

**The signal-system paradigm is the unifying language of electrical engineering.**

---

## Key Takeaways

1. **Signals** are functions that carry information (usually vs. time)
2. **Systems** are operators that transform signals
3. The box model **x(t) → H → y(t)** is universal
4. Continuous uses x(t), Discrete uses x[n]
5. This framework underlies ALL of EEE

---

*Next: We'll classify signals by their time properties — continuous vs. discrete, periodic vs. aperiodic.*
