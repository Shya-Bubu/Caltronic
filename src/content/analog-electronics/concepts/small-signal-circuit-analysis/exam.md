# Exam Patterns — Small-Signal Circuit Analysis

## Common Question Types

### Type 1: Derive A_V or A_I (5-10 marks)
"For the given CE amplifier, derive an expression for the voltage gain."
**Approach:** Draw AC equivalent → replace BJT with h-model → apply KVL/KCL → simplify.

### Type 2: Effect of Source Resistance (3-5 marks)
"How does adding a 1 kΩ source resistance affect the voltage gain?"
**Key formula:** $A_{VS} = A_V \cdot Z_{in}/(R_S + Z_{in})$.

### Type 3: Calculate All Four Quantities (10-15 marks)
"Given h-parameters, find R_in, R_out, A_V, and A_I for the circuit."

## Common Mistakes
1. **Wrong current direction.** $A_I = -I_2/I_1$, not $+I_2/I_1$. Load current is opposite to the h-parameter convention.
2. **Forgetting to include the load in Z_in.** When $h_r \neq 0$, the input impedance depends on $Z_L$.
3. **Using memorised formulas instead of deriving.** Examiners want to see KVL/KCL application, not formulae recall.
4. **Not short-circuiting V_S when finding Z_out.** By definition, $Y_{out}$ is measured with the source voltage set to zero.

## Time Management
- Single parameter derivation: 3-4 minutes
- Full analysis (all 4): 12-15 minutes
