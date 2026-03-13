# Exam Focus - Marginal Stability and Instability

## What examiners usually ask

This topic appears as a classification problem more often than a long derivation. You are usually given:

- a transfer function with a specific pole pattern
- a list of pole locations
- a time-domain natural response containing exponentials, oscillations, or repeated-pole terms

and then asked to classify the system as asymptotically stable, marginally stable, or unstable.

## The scoring logic

Most of the marks come from the **reason**, not the final label. A complete answer usually does three things:

1. identifies the critical poles
2. comments on their real parts and multiplicity
3. links them to bounded or unbounded time-domain behaviour

If you write only "marginally stable" with no justification, you often lose method marks.

## Reliable answer pattern

Use a sentence of this form:

> The poles satisfy Re$(p_i) \le 0$, but there are simple poles on the imaginary axis and no repeated imaginary-axis poles, so the response remains bounded but does not decay to zero. Therefore the system is marginally stable.

For instability, adjust the sentence:

> The system is unstable because there is a right-half-plane pole / repeated imaginary-axis pole, so the natural response contains a growing term.

## Common mistakes

- calling every imaginary-axis pole "stable" without checking repetition
- forgetting that a repeated pole introduces a factor of $t$
- confusing "bounded" with "decays to zero"
- identifying the correct classification but explaining it with zeros instead of poles

## Last-minute memory aid

- left half plane only -> asymptotically stable
- imaginary-axis simple poles allowed -> marginally stable
- right half plane or repeated imaginary-axis poles -> unstable
