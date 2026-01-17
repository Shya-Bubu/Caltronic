# Engineering Applications: Linear Resistors

> Now that you understand Ohm's Law, let's see how resistors are actually used in real circuits.

---

## Why Resistors Matter in Real Life

Every electronic device you use has resistors:
- Your phone charger
- LED lights
- Computer motherboard
- TV remote control

They're used to **control current** and **divide voltage** — two essential tasks in any circuit.

---

## Application 1: Current Limiting for LEDs

**The Problem:**

You have a 9V battery and want to light an LED. But LEDs are fragile:
- They need exactly **20mA** to light properly
- More current → they burn out
- Less current → too dim

**The Solution: Add a Resistor**

### Step-by-Step Design

**Given:**
- Battery voltage: $V_s = 9V$
- LED forward voltage: $V_{LED} = 2V$ (this is how much the LED "uses")
- Desired current: $I = 20mA = 0.02A$

**Find the resistor value:**

Step 1: Voltage across resistor
$$V_R = V_s - V_{LED} = 9V - 2V = 7V$$

Step 2: Use Ohm's Law
$$R = \frac{V_R}{I} = \frac{7V}{0.02A} = 350\Omega$$

Step 3: Choose nearest standard value
Standard resistors: ..., 330Ω, **360Ω**, 390Ω, ...

**Use 360Ω** (slightly higher is safer for LED)

**Real-world note:** This is why you see a small resistor connected to every LED in circuits!

---

## Application 2: Voltage Divider

**The Problem:**

You have a 5V power supply, but your sensor needs exactly 3.3V.

**The Solution: Two Resistors in Series**

The voltage gets "divided" proportionally between resistors.

### How It Works

```
     5V
      |
     [R1]  ← Voltage drop: V1
      |
      •---- Output (3.3V)
      |
     [R2]  ← Voltage drop: V2
      |
     GND (0V)
```

**Formula:**
$$V_{out} = V_{in} \times \frac{R_2}{R_1 + R_2}$$

**Example:**
Want 3.3V from 5V? Choose $R_1 = 1.7k\Omega$ and $R_2 = 3.3k\Omega$:

$$V_{out} = 5V \times \frac{3.3k}{1.7k + 3.3k} = 5V \times \frac{3.3}{5} = 3.3V$$ ✓

**Real use:** Every electronic circuit uses voltage dividers to create different voltage levels from a single power supply.

---

## Application 3: Pull-Up and Pull-Down Resistors

**The Problem:**

Microcontroller input pins are "floating" (undefined voltage) when nothing is connected. This causes random behavior!

**The Solution:**

### Pull-Up Resistor (connects to +V)
```
    +5V
     |
    [R]  ← 10kΩ
     |
     •---- to microcontroller pin
     |
   Switch
     |
    GND
```

- Switch open: pin sees +5V (HIGH)
- Switch closed: pin sees 0V (LOW)

### Why 10kΩ?
- Not too small (would waste power when switch closed)
- Not too large (pin might pick up noise)
- **10kΩ is the standard "safe middle ground"**

**Real use:** Every button in your keyboard uses this!

---

## From Lecture Notes: Series and Parallel (Preview)

Your lecture (Pages 9-13) will cover:
- **Series resistors:** Resistances add: $R_{total} = R_1 + R_2$
- **Parallel resistors:** Conductances add: $G_{total} = G_1 + G_2$

But we'll cover that in detail in concept 5. For now, just know:
- Series → currents are same, voltages add
- Parallel → voltages are same, currents add

---

## One Interesting Real-World Fact

**Resistor sizes in modern electronics:**

In your phone or laptop, resistors are **tiny**:
- Size: 0.6mm × 0.3mm (smaller than a grain of rice!)
- Called "0201 SMD" (surface-mount device)

But in power systems (like electric trains), resistors can be:
- Size: *room-sized!*
- Used for braking (converting kinetic energy to heat)

Same V = IR principle, massively different scales!

---

## Summary

**Three key applications:**
1. **Current limiting:** Protect LEDs and sensitive components
2. **Voltage divider:** Create different voltages from one supply
3. **Pull-up/down:** Set default states for digital inputs

**Next:** In the mathematics section, we'll derive exactly WHERE these formulas come from.
