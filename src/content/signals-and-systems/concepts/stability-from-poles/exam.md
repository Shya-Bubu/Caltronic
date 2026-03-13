# Exam Focus - Pole Locations and Asymptotic Stability

## How this appears in exams

This topic is usually tested in one of three forms:

- a direct question asking for the stability condition in terms of pole locations
- a short derivation or explanation connecting pole locations to forms such as $e^{pt}$ or $e^{\sigma t}\cos(\omega t + \theta)$
- a classification problem where a transfer function is given and you must decide whether the system is stable

## The marks usually go here

- 1 to 2 marks for correctly defining poles and zeros
- 2 to 3 marks for stating the correct pole-location rule
- 3 to 5 marks for explaining why the real part controls decay
- 1 to 2 marks for a correct final classification

If the question says "justify," do not stop at "all poles are in the left half plane." Add the time-domain link: negative real parts produce decaying exponentials, so $h(t) \to 0$.

## Fast answer structure

When you see a stability question, answer in this order:

1. Identify the poles from the denominator.
2. State their real parts.
3. Link each pole type to the natural response.
4. Give the final classification.

That structure keeps your answer clear and earns method marks even if arithmetic goes wrong.

## Common mistakes

- talking about zeros when the question is really about poles
- saying "imaginary poles are stable" without checking whether they are repeated
- forgetting that **one** right-half-plane pole is enough to make the system unstable
- giving the rule with no time-domain explanation when the question asks for reasoning

## High-value sentence

If you remember only one exam-ready sentence, make it this one:

> A finite-dimensional continuous-time LTI system is asymptotically stable if and only if every pole of $H(s)$ has negative real part, because each natural mode in $h(t)$ then decays to zero as $t \to \infty$.
