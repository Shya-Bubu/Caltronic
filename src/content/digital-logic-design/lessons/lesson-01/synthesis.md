# Synthesis: Processing of Logical Information

## The Big Picture

You've now covered the complete path from **physical circuits** to **optimised logic**:

| Layer | What you learned |
|-------|-----------------|
| **Physical** | Transistor inverters, diode OR/AND circuits, voltage-to-logic mapping (0V ↔ 0, 5V ↔ 1) |
| **Gate** | Seven fundamental gates: NOT, OR, AND, XOR, NAND, NOR, XNOR |
| **Functional** | Half adder, binary comparator, parity checker, controlled NOT |
| **Design** | Requirement → truth table → SOP/POS → gate circuit |
| **Optimisation** | Boolean algebra, De Morgan's theorems, Hamming distance, canonical vs. non-canonical forms |

## Key Connections

- **NAND and NOR are universal** — any logic function can be built from just one gate type. This is why real IC families (like 7400-series TTL) are overwhelmingly NAND-based.
- **SOP ↔ POS duality** — minterms and maxterms are two views of the same truth table. SOP focuses on rows where Z = 1; POS focuses on rows where Z = 0.
- **Minimisation saves real resources** — fewer gates means less area, lower cost, lower power, and (often) higher speed.

## Looking Ahead

In the next lesson, you'll use **Karnaugh maps** for systematic graphical minimisation — a faster, less error-prone method than algebraic manipulation for up to 5–6 variables. You'll also formalise the Quine–McCluskey algorithm for machine-aided minimisation.
