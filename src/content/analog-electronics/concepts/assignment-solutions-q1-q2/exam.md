# Exam Guide: Q1 & Q2 Solution Techniques

## Q1 (Design)
| Step | Formula | Time |
|------|---------|------|
| RE = VE/IE | Direct | 30s |
| RC = (VCC−VC)/IC | Use IC = βIE/(β+1) | 1 min |
| VB = VE+VBE, RB2 = VB/IB2 | Direct | 1 min |
| RB1 = (VCC−VB)/(IB2+IB) | IB = IE/(β+1) | 1 min |
| Round to 5% E24 values | Look up nearest | 1 min |

## Q2 (CB Analysis)
| Step | Formula | Time |
|------|---------|------|
| Thevenin: VTh, RTh | Standard formulas | 1 min |
| Q-point: IB, ICQ, VCEQ | KVL base + collector loops | 3 min |
| AC equivalent: identify CB | Apply AC rules | 3 min |
| Rin, Rout, Av | CB formulas with RE1 | 4 min |
| vo = vs × loading × Av | Include Rs, RL | 2 min |
