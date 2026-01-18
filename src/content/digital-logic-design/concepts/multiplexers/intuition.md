# Multiplexers: Data Selection Circuits

## What is a Multiplexer?

A **multiplexer (MUX)** is a data selector. Think of it as a digital switch that chooses one of many inputs and routes it to the output.

**Real-world analogy**: A TV remote control selecting which channel to watch from many available channels.

---

## 2:1 Multiplexer

[[visual:v1]]

The simplest MUX: selects between 2 inputs.

**Inputs**:
- X₀, X₁: Data inputs
- S: Select line

**Output**: Y

| S | Y |
|:-:|:-:|
| 0 | X₀ |
| 1 | X₁ |

**Formula**: 
$$Y = \overline{S} \cdot X_0 + S \cdot X_1$$

```
X₀ ──┬──[AND]──┐
     │         │
S̄ ───┘         ├──[OR]── Y
               │
X₁ ──┬──[AND]──┘
     │
S ───┘
```

---

## 4:1 Multiplexer

[[visual:v3]]

Selects from 4 inputs using 2 select lines.

**Inputs**: X₀, X₁, X₂, X₃
**Select**: S₁, S₀
**Output**: Y

| S₁ | S₀ | Y |
|:--:|:--:|:-:|
| 0 | 0 | X₀ |
| 0 | 1 | X₁ |
| 1 | 0 | X₂ |
| 1 | 1 | X₃ |

**Formula**:
$$Y = \overline{S_1}\overline{S_0}X_0 + \overline{S_1}S_0X_1 + S_1\overline{S_0}X_2 + S_1S_0X_3$$

---

## 8:1 Multiplexer

8 inputs, 3 select lines (since 2³ = 8).

| S₂ | S₁ | S₀ | Y |
|:--:|:--:|:--:|:-:|
| 0 | 0 | 0 | X₀ |
| 0 | 0 | 1 | X₁ |
| 0 | 1 | 0 | X₂ |
| ... | ... | ... | ... |
| 1 | 1 | 1 | X₇ |

**Pattern**: Select lines form binary address of desired input.

---

## General Rule

For **N:1 MUX**:
- Number of data inputs: N
- Number of select lines: log₂(N)
- 2:1 needs 1 select
- 4:1 needs 2 selects
- 8:1 needs 3 selects
- 16:1 needs 4 selects

---

## Using MUX to Implement Functions

**Key insight**: Any Boolean function can be implemented with a MUX!

**Method**:
1. Use variables as select lines
2. Connect 0 or 1 to data inputs based on truth table

**Example**: Implement Y = AB using 4:1 MUX
- S₁ = A, S₀ = B
- Truth table: Y=1 only when AB=11

| A | B | Y |
|:-:|:-:|:-:|
| 0 | 0 | 0 → X₀ = 0 |
| 0 | 1 | 0 → X₁ = 0 |
| 1 | 0 | 0 → X₂ = 0 |
| 1 | 1 | 1 → X₃ = 1 |

Connect: X₀=0, X₁=0, X₂=0, X₃=1

---

## Building Larger MUX from Smaller

[[visual:v4]]

**8:1 from 4:1 MUX**:
```
       ┌──────────┐
X₀-X₃ ─┤  4:1 MUX ├──┐
       └────┬─────┘  │    ┌──────────┐
            │ S₁S₀   ├────┤  2:1 MUX ├── Y
       ┌────┴─────┐  │    └────┬─────┘
X₄-X₇ ─┤  4:1 MUX ├──┘         │ S₂
       └──────────┘
```

Higher select bit (S₂) chooses which 4:1 output to use.
