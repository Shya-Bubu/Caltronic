# What Are Signals and Systems?

> **Narrative thread**: This concept teaches us that signals and systems are the universal language of engineering — you cannot analyze any circuit, control system, or communication channel without them.

> The foundation of everything in electrical engineering.

---

## 📖 Resources

| Type | Resource |
|------|----------|
| 📺 Video | [3Blue1Brown: But what is a Fourier series?](https://www.youtube.com/watch?v=r6sGWTCMz2k) |
| 📚 Textbook | Oppenheim & Willsky, Chapter 1 |
| 🎓 Lectures | University of Peradeniya EE2020 Week 1-2 |

---

## 🖼️ Visual: The System Model

![System Input-Output Model](/course/signals-and-systems/lesson-01/concepts/signal-system-block.png)

**The fundamental model**: Every system transforms input x(t) into output y(t).

---

Before we dive into equations, let's ask the most basic question: **What exactly is a signal?**

Think about it. Right now, as you read this:
- Light signals are hitting your eyes
- If you're listening to music, sound signals are reaching your ears
- Your heart is generating electrical signals
- The temperature around you is a signal

**A signal is any quantity that varies with one or more independent variables.**

That's it. Simple, yet profound.

---

## 🖼️ Visual: Real-World Signals

![Real World Signals](/course/signals-and-systems/lesson-01/concepts/real-world-signals.png)

Signals appear in biology (ECG), economics (stocks), and acoustics (audio). All can be modeled mathematically.

---

## Real-World Signals Are Everywhere

| Signal Type | Example | Physical Property |
|-------------|---------|-------------------|
| **Acoustic** | Your voice | Air pressure variations |
| **Electrical** | Power line voltage | Voltage over time |
| **Optical** | Video feed | Light intensity |
| **Biological** | ECG | Heart's electrical activity |
| **Economic** | Stock price | Value over time |

The moment you realize signals are everywhere, engineering starts to make sense.

---

## What About Systems?

Now, if signals are the "nouns" of engineering, **systems are the verbs**.

A system takes an input signal and produces an output signal:

```
Input Signal → [SYSTEM] → Output Signal
```

---

## 🖼️ Visual: Audio Signal Chain

![Audio Signal Chain](/course/signals-and-systems/lesson-01/concepts/audio-chain.png)

A classic engineering system: Microphone (Transducer) → Amplifier (System) → Speaker (Transducer).

---

### The Audio Chain Example

Think about when you speak into a microphone:

1. **Your voice** (acoustic signal) → **Microphone** (system) → **Electrical signal**
2. **Electrical signal** → **Amplifier** (system) → **Louder electrical signal**
3. **Electrical signal** → **Speaker** (system) → **Louder acoustic signal**

Three systems, each transforming one signal into another.

---

## Why This Split Matters

You might wonder: why study signals AND systems? Can't we just study one?

Here's the insight: **They're inseparable.**

- A signal without a system to measure it is unknowable
- A system without signals is just a box doing nothing

This is why the course is called "Signals AND Systems" — not one or the other.

---

## The Vocabulary You Need

| Term | Meaning |
|------|---------|
| **Signal** | Physical quantity varying with time (or space) |
| **System** | Device/process that transforms signals |
| **Input** | Signal going into a system |
| **Output** | Signal coming out of a system |
| **Transducer** | System that converts one signal type to another |

---

## One More Thing

This might sound abstract now, but here's why it matters:

> **Every single topic in EE** — circuits, control, communications, power, DSP — uses this framework.

When you analyze a filter, you're studying a system.  
When you process audio, you're manipulating a signal.  
When you design a controller, you're shaping the input-output relationship.

**Master this vocabulary, and you've mastered the language of engineering.**

