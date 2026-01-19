# Conservation Laws and Balance Equations - Mathematical Framework

## Formal Statement of Conservation Laws

### Integral Form (Control Volume)

For a scalar quantity $\phi$ with density $\rho_\phi$ (amount per unit volume):

$$\frac{d}{dt}\int_{V} \rho_\phi \, dV = -\oint_{S} \mathbf{J}_\phi \cdot d\mathbf{A} + \int_{V} \sigma_\phi \, dV$$

Where:
- $\int_{V} \rho_\phi \, dV$ = total amount of $\phi$ in volume V
- $\mathbf{J}_\phi$ = flux density (flow per unit area)
- $\sigma_\phi$ = volumetric source/sink rate

### Differential Form

Applying the divergence theorem:

$$\frac{\partial \rho_\phi}{\partial t} + \nabla \cdot \mathbf{J}_\phi = \sigma_\phi$$

This is the **continuity equation** - the fundamental mathematical expression of conservation.

---

## Charge Conservation and KCL

### Maxwell's Continuity Equation

For electric charge (density $\rho$, current density $\mathbf{J}$):

$$\frac{\partial \rho}{\partial t} + \nabla \cdot \mathbf{J} = 0$$

No source term because charge cannot be created or destroyed.

### Derivation of KCL

For a lumped circuit node (concentrated at a point), integrate over a small volume containing the node:

$$\int_V \frac{\partial \rho}{\partial t} dV + \int_V \nabla \cdot \mathbf{J} \, dV = 0$$

Using divergence theorem:

$$\frac{dQ_{node}}{dt} + \oint_S \mathbf{J} \cdot d\mathbf{A} = 0$$

For quasi-static conditions (no charge accumulation):

$$\sum_k i_k = 0$$

**KCL is the lumped-element approximation of Maxwell's charge continuity equation.**

---

## Energy Conservation and KVL

### Faraday's Law

$$\nabla \times \mathbf{E} = -\frac{\partial \mathbf{B}}{\partial t}$$

### Derivation of KVL

For a closed loop L:

$$\oint_L \mathbf{E} \cdot d\mathbf{l} = -\frac{d}{dt}\int_S \mathbf{B} \cdot d\mathbf{A} = -\frac{d\Phi_B}{dt}$$

For quasi-static conditions (negligible changing magnetic flux through the loop):

$$\oint_L \mathbf{E} \cdot d\mathbf{l} \approx 0$$

In terms of voltage drops around the loop:

$$\sum_k v_k = 0$$

**KVL is valid when the loop area is small enough that $\frac{d\Phi_B}{dt}$ is negligible.**

---

## Algebraic Formulation for Circuits

### Graph Theory Approach

A circuit can be represented as a graph $G = (N, B)$ with:
- $N$ = set of nodes (vertices)
- $B$ = set of branches (edges)

Define:
- $n$ = number of nodes
- $b$ = number of branches

### Incidence Matrix A

The reduced incidence matrix $\mathbf{A} \in \mathbb{R}^{(n-1) \times b}$:

$$A_{ij} = \begin{cases} +1 & \text{if branch } j \text{ leaves node } i \\ -1 & \text{if branch } j \text{ enters node } i \\ 0 & \text{otherwise} \end{cases}$$

### KCL in Matrix Form

$$\mathbf{A} \mathbf{i}_b = \mathbf{0}$$

Where $\mathbf{i}_b$ is the vector of branch currents.

**Interpretation**: Each row represents a node; the equation says currents at each node sum to zero.

### KVL in Matrix Form

$$\mathbf{v}_b = \mathbf{A}^T \mathbf{v}_n$$

Where:
- $\mathbf{v}_b$ = branch voltage vector
- $\mathbf{v}_n$ = node voltage vector (reference to ground)

**Interpretation**: Branch voltages are differences of node voltages.

---

## Sparse Tableau Formulation

The complete set of circuit equations:

$$\begin{bmatrix} \mathbf{A} & \mathbf{0} & \mathbf{0} \\ \mathbf{0} & \mathbf{I} & -\mathbf{A}^T \\ \mathbf{Y}_b & -\mathbf{Z}_b & \mathbf{0} \end{bmatrix} \begin{bmatrix} \mathbf{i}_b \\ \mathbf{v}_b \\ \mathbf{v}_n \end{bmatrix} = \begin{bmatrix} \mathbf{0} \\ \mathbf{0} \\ \mathbf{s} \end{bmatrix}$$

Where:
- First row: KCL
- Second row: KVL (branch-node voltage relation)
- Third row: Constitutive relations

---

## Modified Nodal Analysis (MNA)

### Formulation

Combining KCL with Ohm's law for conductances:

$$\mathbf{G}\mathbf{v}_n = \mathbf{i}_s$$

Where $\mathbf{G}$ is the nodal conductance matrix.

### Construction Rules

For conductance $G_k$ between nodes $i$ and $j$:
- Add $G_k$ to entries $(i,i)$ and $(j,j)$
- Subtract $G_k$ from entries $(i,j)$ and $(j,i)$

**Mathematical Statement**:
$$G_{pq} = \begin{cases} \sum_{k \in N_p} G_k & p = q \\ -G_{pq} & p \neq q, \text{ conductance exists} \\ 0 & \text{otherwise} \end{cases}$$

---

## Dynamic Circuit Equations

### State-Space from Conservation Laws

For a circuit with $n_C$ capacitors and $n_L$ inductors:

**Capacitor equations** (from charge conservation):
$$\mathbf{C}\frac{d\mathbf{v}_C}{dt} = \mathbf{i}_C$$

**Inductor equations** (from flux conservation):
$$\mathbf{L}\frac{d\mathbf{i}_L}{dt} = \mathbf{v}_L$$

Where $\mathbf{C}$ and $\mathbf{L}$ are diagonal matrices of capacitances and inductances.

### Combined State Equations

Define state vector $\mathbf{x} = [\mathbf{v}_C^T, \mathbf{i}_L^T]^T$:

$$\begin{bmatrix} \mathbf{C} & \mathbf{0} \\ \mathbf{0} & \mathbf{L} \end{bmatrix} \frac{d}{dt}\begin{bmatrix} \mathbf{v}_C \\ \mathbf{i}_L \end{bmatrix} = \begin{bmatrix} \mathbf{i}_C \\ \mathbf{v}_L \end{bmatrix}$$

KCL and KVL provide the coupling:
$$\mathbf{i}_C = f(\mathbf{v}_C, \mathbf{i}_L, \mathbf{u})$$
$$\mathbf{v}_L = g(\mathbf{v}_C, \mathbf{i}_L, \mathbf{u})$$

---

## Tellegen's Theorem

### Statement

For any network in state $(\mathbf{v}, \mathbf{i})$:

$$\sum_{k=1}^{b} v_k \cdot i_k = 0$$

where the sum is over all branches with associated reference directions.

### Proof

Using matrix notation:

$$\mathbf{v}_b^T \mathbf{i}_b = (\mathbf{A}^T \mathbf{v}_n)^T \mathbf{i}_b = \mathbf{v}_n^T \mathbf{A} \mathbf{i}_b = \mathbf{v}_n^T \mathbf{0} = 0$$

### Generalization (Two-State Tellegen)

For two different states of the same network topology:

$$\sum_{k} v_k^{(1)} \cdot i_k^{(2)} = \sum_{k} v_k^{(2)} \cdot i_k^{(1)}$$

**Applications**: Reciprocity theorem, sensitivity analysis, adjoint networks.

---

## Energy and Co-Energy

### Energy Stored in Capacitor

$$W_C = \int_0^v i \, dv' = \int_0^v C v' \, dv' = \frac{1}{2}Cv^2$$

### Energy Stored in Inductor

$$W_L = \int_0^i v \, di' = \int_0^i L i' \, di' = \frac{1}{2}Li^2$$

### Co-Energy (for nonlinear elements)

For nonlinear capacitor $q = f(v)$:

Energy: $W = \int_0^q v(q') \, dq'$

Co-energy: $W^* = \int_0^v q(v') \, dv'$

Relation: $W + W^* = qv$

---

## Passivity and Stability

### Passivity Condition

A network is passive if it cannot generate energy:

$$\int_{-\infty}^{t} v(\tau) i(\tau) \, d\tau \geq 0 \quad \forall t$$

### Positive Real Functions

For a passive one-port, the impedance $Z(s)$ is **positive real**:
1. $Z(s)$ is real for real $s$
2. $\text{Re}[Z(s)] \geq 0$ for $\text{Re}[s] > 0$

This connects conservation (no energy generation) to transfer function properties.

---

## Summary of Key Formulas

| Law | Integral Form | Algebraic Form |
|-----|---------------|----------------|
| KCL | $\oint_S \mathbf{J} \cdot d\mathbf{A} = -\frac{dQ}{dt}$ | $\mathbf{A}\mathbf{i}_b = \mathbf{0}$ |
| KVL | $\oint_L \mathbf{E} \cdot d\mathbf{l} = -\frac{d\Phi}{dt}$ | $\mathbf{v}_b = \mathbf{A}^T\mathbf{v}_n$ |
| Tellegen | $\int_V \mathbf{E} \cdot \mathbf{J} \, dV = 0$ | $\mathbf{v}_b^T \mathbf{i}_b = 0$ |

| Quantity | Storage Element | Energy Formula |
|----------|-----------------|----------------|
| Charge | Capacitor | $W = \frac{1}{2}Cv^2 = \frac{1}{2}\frac{q^2}{C}$ |
| Flux | Inductor | $W = \frac{1}{2}Li^2 = \frac{1}{2}\frac{\phi^2}{L}$ |
