# Exam Strategies: Signal Fundamentals

## Common Question Types

### 1. Signal Classification
**Pattern**: Given a signal expression, classify it.

**Example**: Determine if $x(t) = e^{-|t|}$ is:
- Energy or power signal
- Even, odd, or neither
- Periodic or aperiodic

**Strategy**: Check definitions systematically:
1. Calculate energy integral first
2. Check symmetry by substituting $-t$
3. Test periodicity condition

### 2. Energy and Power Calculations
**Pattern**: Calculate total energy or average power.

**Trap**: Don't forget the absolute value squared $|x(t)|^2$

**Time-saver**: For sinusoids, power = $A^2/2$ (memorize!)

### 3. Even-Odd Decomposition
**Pattern**: Find even and odd components of given signal.

**Formula to memorize**:
- $x_e(t) = \frac{x(t) + x(-t)}{2}$
- $x_o(t) = \frac{x(t) - x(-t)}{2}$

**Verification**: Always check $x_e(t) + x_o(t) = x(t)$

### 4. Period Calculation
**Pattern**: Find fundamental period of given signal.

**For sinusoids**: $T = \frac{2\pi}{\omega}$

**Trap**: For sum of sinusoids, find LCM of individual periods.

## Key Formulas to Memorize

| Concept | Formula |
|---------|---------|
| Energy | $E = \int_{-\infty}^{\infty} |x(t)|^2 dt$ |
| Power | $P = \lim_{T\to\infty} \frac{1}{2T} \int_{-T}^{T} |x(t)|^2 dt$ |
| Sinusoid Power | $P = \frac{A^2}{2}$ |
| Euler | $e^{j\omega t} = \cos(\omega t) + j\sin(\omega t)$ |
| Period | $T = \frac{2\pi}{\omega} = \frac{1}{f}$ |
