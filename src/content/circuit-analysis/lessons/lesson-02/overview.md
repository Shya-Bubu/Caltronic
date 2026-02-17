# Section 2: General Resistive Circuit Analysis

## What This Section Covers

Section 1 taught you to analyze one or two resistors at a time using v-i curves and graphical methods. But real circuits have dozens of nodes and branches. This section gives you **systematic matrix methods** that scale to circuits of any size — and a powerful algorithm (Newton-Raphson) that extends these methods to nonlinear circuits.

## The Three Concepts

### Concept 1: Nodal Analysis and the Node-Admittance Matrix
The workhorse of linear circuit analysis. Choose a reference node, assign node voltages, and write KCL at every other node. The result is a matrix equation $\mathbf{Y}_n \cdot \mathbf{e} = \mathbf{i}_s(t)$ where $\mathbf{Y}_n$ is the **node-admittance matrix** — built by inspection from the circuit. You'll also learn the **reduced incidence matrix** $\mathbf{A}$ that connects graph theory to circuit equations: $\mathbf{Y}_n = \mathbf{A} \mathbf{Y}_b \mathbf{A}^\top$.

### Concept 2: Tableau Analysis for Circuit Equations
Nodal analysis breaks down when the circuit contains voltage sources, ideal transformers, or dependent sources (CCCS, CCVS, VCVS). **Tableau analysis** handles everything by writing ALL equations simultaneously — KCL, KVL, and branch equations — in one large matrix system $\mathbf{T} \cdot \mathbf{x} = \mathbf{u}$. The price is a bigger matrix, but the reward is complete generality: any circuit element fits naturally into the tableau framework.

### Concept 3: Newton-Raphson Method for Nonlinear Circuits
When branch equations are nonlinear (diodes, transistors), the circuit equations become $\mathbf{f}(\mathbf{x}) = \mathbf{0}$ — a system you can't solve by matrix inversion. The **Newton-Raphson method** linearizes around the current guess using the **Jacobian matrix** and iterates: $\mathbf{x}^{(j+1)} = \mathbf{x}^{(j)} - \mathbf{J}^{-1}(\mathbf{x}^{(j)}) \cdot \mathbf{f}(\mathbf{x}^{(j)})$. The remarkable insight: each iteration is equivalent to solving a **linear circuit** — the nonlinear problem becomes a sequence of linear problems.

## How These Concepts Connect

```
Nodal Analysis → Tableau Analysis → Newton-Raphson
  (linear,          (linear,           (nonlinear,
   simple elements)  all elements)       iterative)
```

Nodal analysis is fast but limited. Tableau analysis removes the limitations but stays linear. Newton-Raphson extends to nonlinear circuits by converting them into a sequence of linear problems — which you solve using nodal or tableau methods.

## What You'll Be Able To Do

After completing this section, you will be able to:

1. **Form** the node-admittance matrix $\mathbf{Y}_n$ by inspection for any resistive circuit
2. **Construct** the reduced incidence matrix $\mathbf{A}$ and verify $\mathbf{Y}_n = \mathbf{A}\mathbf{Y}_b\mathbf{A}^\top$
3. **Write** the complete tableau equation for circuits with voltage sources, dependent sources, and transformers
4. **Apply** Newton-Raphson iteration to solve nonlinear circuit equations
5. **Compute** the Jacobian matrix and perform 2-3 iterations to convergence
6. **Interpret** each Newton-Raphson iteration as a discrete equivalent linear circuit

## Connection to Later Sections

- **Section 3**: First-order circuits are analyzed by reducing the resistive part to a Thévenin/Norton equivalent — using nodal or tableau methods from this section
- **Section 4**: Second-order circuits require determining initial conditions by solving a resistive circuit at $t = 0^+$
