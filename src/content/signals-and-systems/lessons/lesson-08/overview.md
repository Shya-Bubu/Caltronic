# Systems, LTI, Convolution & Transfer Functions — Overview

> **Why This Matters**: Up until now, you've focused on signals — how to describe, classify, and decompose them. Now comes the other half of the course title: **Systems**. Understanding systems is understanding how the real world processes signals. Every amplifier, filter, communication channel, and control loop is a system. This lesson gives you the tools to describe what any system does to any input — using nothing more than its impulse response.

## What You'll Learn

This lesson builds a complete framework for analysing **Linear Time-Invariant (LTI) systems** — the most important class of systems in all of engineering. You'll discover:

- How to **classify** systems (linear vs non-linear, time-invariant vs time-varying) and why LTI systems are special
- How systems can be **interconnected** (series, parallel, feedback) and what those connections mean mathematically
- The **impulse response** $h(t)$ — the single function that completely characterises an LTI system
- The **convolution integral** — how to find the output of any LTI system for any input, derived from first principles
- How the **Laplace transform** converts convolution (hard) into multiplication (easy): $Y(s) = H(s) \cdot X(s)$
- The **transfer function** $H(s)$ and how to derive it for real circuits (RC and RLC examples)

## The Big Picture

The journey in this lesson goes from the abstract to the concrete:

$$\text{Classification} \longrightarrow \text{LTI Properties} \longrightarrow \text{Impulse Response} \longrightarrow \text{Convolution} \longrightarrow \text{Laplace Domain} \longrightarrow \text{Circuit Examples}$$

By the end, you'll be able to take any circuit, write its KVL/KCL equations, transform to the Laplace domain, and extract its transfer function — a complete characterisation of the system.

## Prerequisites

This lesson assumes you're comfortable with:
- Basic signal classifications (from earlier lectures)
- The Dirac delta function $\delta(t)$ and its sifting property
- Basic Laplace transform pairs and properties
- KVL and KCL for circuit analysis
- Complex impedance concepts ($R$, $sL$, $1/Cs$)

Don't worry if some of these feel shaky — we'll revisit them as needed. Let's build your understanding of systems from the ground up.
