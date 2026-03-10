# Exam Focus — N-Channel Enhancement MOSFET Operation

## What Examiners Test

NMOS operation is heavily examined — expect **calculation-heavy** questions on operating regions, drain current, and identifying which region a given MOSFET is in. Worth 6–12 marks typically.

## Common Question Types

### Type 1: Determine the Operating Region (4–6 marks)
Given $V_{GS}$, $V_{DS}$, and $V_T$, determine whether the MOSFET is in cutoff, triode, or saturation.
**Method**: Check (1) Is $V_{GS} > V_T$? If no → cutoff. If yes → (2) Is $V_{DS} < V_{GS} - V_T$? If yes → triode. If no → saturation.

### Type 2: Calculate Drain Current (4–6 marks)
Given the region and parameters ($K$, $V_T$, $V_{GS}$, $V_{DS}$), calculate $I_{DS}$.
- Cutoff: $I_{DS} = 0$
- Triode: $I_{DS} = K[(V_{GS}-V_T)V_{DS} - V_{DS}^2/2]$
- Saturation: $I_{DS} = (K/2)(V_{GS}-V_T)^2$

### Type 3: Explain Channel Formation (4 marks)
"Explain how a conductive channel forms in an NMOS enhancement MOSFET."
Must mention: (1) positive VGS, (2) electric field through oxide, (3) holes repelled, (4) electrons attracted → inversion layer.

## Common Mistakes
- Using the triode equation when the device is in saturation (or vice versa)
- Forgetting that $V_T$ for NMOS is **positive**
- Not checking the region before calculating current
- Saying "current flows through the gate" — it doesn't ($i_G = 0$)
