# Two-Terminal Resistors

> **First Steps**: This concept introduces the resistor — the most fundamental passive component in all of electronics.

## The Big Picture

<!-- DIAGRAM: diag-intuition-01 -->

A resistor is the electrical equivalent of friction. Just as friction opposes motion and converts kinetic energy to heat, a resistor opposes current flow and converts electrical energy to heat.

Think of water flowing through pipes. A narrow section creates *resistance* to flow — water pressure drops across it, and less water flows per second. Electrical resistors work the same way: voltage drops across them, and they limit current flow.

The beauty of resistors is their simplicity: they have only two terminals, and the relationship between voltage and current is (ideally) linear and time-independent. This makes them the perfect starting point for understanding electronics.

> 🤔 **Pause & Reflect**: If you had two pipes of the same diameter but different lengths, which would have higher resistance to water flow? What's the electrical analog?

<details>
<summary>Click to reveal answer</summary>

The **longer pipe** has higher resistance — water must travel further and encounters more friction. Electrically, this means:
- Longer wire = higher resistance
- The relationship is **linear**: double the length, double the resistance

This is why power transmission lines use very thick cables — to reduce resistance over long distances.

</details>

## Why Resistors Matter

<!-- DIAGRAM: diag-intuition-02 -->

Resistors are everywhere in electronics:

1. **Voltage dividers** — Create reference voltages from a power supply
2. **Current limiting** — Protect LEDs, transistors, and ICs from damage
3. **Biasing** — Set the operating point of amplifiers
4. **Pull-up/pull-down** — Define logic levels in digital circuits
5. **Sensing** — Convert current to voltage for measurement

You cannot design a practical circuit without resistors. Even "resistor-less" circuits use parasitic resistance of wires and components.

> 🤔 **Pause & Reflect**: An LED needs about 2V across it when conducting. If you connect it directly to a 5V supply, what happens? How would a resistor help?

<details>
<summary>Click to reveal answer</summary>

Without a resistor, the LED tries to drop only 2V, leaving 3V with almost no resistance. By Ohm's law, current explodes (limited only by LED's internal resistance). The LED **burns out instantly**.

With a series resistor:
- Resistor drops 3V (5V - 2V)
- If R = 150Ω, current = 3V/150Ω = 20mA
- LED operates safely at its rated current

This is why resistors are called the "unsung heroes" of electronics.

</details>

## Reading Resistors: Color Codes

<!-- SIMULATION: sim-intuition-01 -->

Physical resistors use color bands to indicate their value. This system predates digital printing and remains standard today because colors are visible from any angle and don't require decoding equipment.

The 4-band code works as follows:
- **Band 1**: First significant digit (0-9)
- **Band 2**: Second significant digit (0-9)
- **Band 3**: Multiplier (power of 10)
- **Band 4**: Tolerance (gold = 5%, silver = 10%)

Use the simulation above to practice reading color codes. Master this skill — you'll use it throughout your career.

---

*Ready to see how this applies in practice? Continue to the Engineering layer.*
