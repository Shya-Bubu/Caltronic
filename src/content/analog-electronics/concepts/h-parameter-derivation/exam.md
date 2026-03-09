# Exam Patterns — h-Parameter Derivation

## How This Topic Appears in Exams

h-parameter derivation appears as both standalone theory questions (5–8 marks) and as Part (a) of full amplifier analysis problems.

## Common Question Types

### Type 1: Define Each h-Parameter (4 marks)
"Define the four h-parameters for the common emitter configuration and state their units."

**Expected answer:** Write each as a partial derivative with the correct constraint, name, and units:
- $h_{ie} = \partial V_{BE}/\partial I_B |_{V_{CE}}$ — input impedance (Ω)
- $h_{re} = \partial V_{BE}/\partial V_{CE} |_{I_B}$ — reverse voltage gain (dimensionless)
- $h_{fe} = \partial I_C/\partial I_B |_{V_{CE}}$ — forward current gain (dimensionless)
- $h_{oe} = \partial I_C/\partial V_{CE} |_{I_B}$ — output conductance (S)

### Type 2: Draw the Equivalent Circuit (5 marks)
"Draw the h-parameter equivalent circuit for a BJT in common emitter configuration. Label all elements."

**Mark allocation:** 1 mark per element (h_ie resistor, h_re source, h_fe source, 1/h_oe resistor) + 1 mark for correct terminal labels and current directions.

### Type 3: Convert Between Configurations (3–5 marks)
"Given h_ie = 1 kΩ and h_fe = 50, if the circuit is common base, which model do you substitute?"

**Key:** Always use the model for which you have parameters. If given CE parameters but the circuit is CB, still insert the CE equivalent circuit — just rotate the terminals appropriately.

## Common Mistakes

1. **Wrong constraint on partial derivatives.** $h_{ie}$ is at constant $V_{CE}$, not constant $V_{BE}$.
2. **Forgetting that $h_{re} \approx 0$ doesn't apply to CC.** For common collector, $h_{rc} \approx 1$.
3. **Drawing current source direction wrong.** The $h_{fe} i_b$ source must generate current flowing *into* the collector terminal.

## Time Management
- Draw and label equivalent circuit: 3 minutes
- Define parameters with derivatives: 2 minutes
- Full derivation from Taylor series: 5–6 minutes
