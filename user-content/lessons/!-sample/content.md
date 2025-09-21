
## Introduction

This is a comprehensive example of a mathematics lesson written in **Markdown** with *LaTeX* equations for **KaTeX** rendering. This document demonstrates various formatting features commonly used in educational content.

## Basic Text Formatting

You can use **bold text**, *italic text*, and ***bold italic text***. You can also use `inline code` for mathematical variables like `x`, `y`, or `n`.

### Lists

#### Unordered List:
- First item
- Second item with **bold text**
- Third item with *italic text*
  - Nested item
  - Another nested item

#### Ordered List:
1. First step: Define the problem
2. Second step: Apply the theorem
3. Third step: Solve the equation
4. Final step: Verify the solution

## Mathematical Equations

### Inline Mathematics

The quadratic formula is $ax^2 + bx + c = 0$ where $a \neq 0$. The discriminant is $\Delta = b^2 - 4ac$.

The derivative of $f(x) = x^n$ is $f'(x) = nx^{n-1}$ for any real number $n$.

### Block Mathematics

The solutions of the quadratic equation are:

$$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$$

For trigonometric identities:

$$\sin^2(x) + \cos^2(x) = 1$$

$$\tan(x) = \frac{\sin(x)}{\cos(x)}$$

### Complex Mathematical Expressions

The integral of a function $f(x)$ from $a$ to $b$ is:

$$\int_a^b f(x) \, dx = F(b) - F(a)$$

Matrix multiplication example:

$$\begin{pmatrix} a & b \\ c & d \end{pmatrix} \begin{pmatrix} e & f \\ g & h \end{pmatrix} = \begin{pmatrix} ae + bg & af + bh \\ ce + dg & cf + dh \end{pmatrix}$$

Summation notation:

$$\sum_{i=1}^{n} i = \frac{n(n+1)}{2}$$

Limit definition of derivative:

$$f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}$$

## Alerts and Call-out Boxes

> [!REMARK]  
> Ceci est une remarque ! C'est probablement important, tout dépend...

> [!THEOREM]
> Ceci est un théorème...

> [!DEMO]
> Et la démonstration
> 
> ci-dessous
> 
> ...
> 
> long.

> [!EXAMPLE]
> Ceci est un exemple parmi tant d'autres.

> [!EXO]
> Et c'est à vous de bosser maintenant !

## Code Blocks

```python
def fx(x: int) -> float:
	return x + 1/x
```


## Tables

| Function | Domain | Range | Key Properties |
|----------|---------|-------|----------------|
| $f(x) = x^2$ | $\mathbb{R}$ | $[0, +\infty)$ | Even function, vertex at origin |
| $f(x) = \sqrt{x}$ | $[0, +\infty)$ | $[0, +\infty)$ | Inverse of $x^2$ for $x \geq 0$ |
| $f(x) = \frac{1}{x}$ | $\mathbb{R}^*$ | $\mathbb{R}^*$ | Hyperbola, odd function |
| $f(x) = \sin(x)$ | $\mathbb{R}$ | $[-1, 1]$ | Periodic, period $2\pi$ |

## Theorem and Proof Structure

**Theorem (Pythagorean Theorem):** In a right triangle with legs of length $a$ and $b$, and hypotenuse of length $c$, we have:

$$a^2 + b^2 = c^2$$

**Proof:** Consider a right triangle with legs $a$ and $b$...

## Step-by-Step Problem Solving

**Problem:** Solve the equation $2x^2 - 7x + 3 = 0$

**Solution:**

**Step 1:** Identify the coefficients
- $a = 2$, $b = -7$, $c = 3$

**Step 2:** Calculate the discriminant
$$\Delta = b^2 - 4ac = (-7)^2 - 4(2)(3) = 49 - 24 = 25$$

**Step 3:** Apply the quadratic formula
$$x = \frac{-(-7) \pm \sqrt{25}}{2(2)} = \frac{7 \pm 5}{4}$$

**Step 4:** Find both solutions
- $x_1 = \frac{7 + 5}{4} = \frac{12}{4} = 3$
- $x_2 = \frac{7 - 5}{4} = \frac{2}{4} = \frac{1}{2}$

**Answer:** $x = 3$ or $x = \frac{1}{2}$

## Links and References

For more information, you can refer to:
- [Khan Academy - Quadratic Equations](https://www.khanacademy.org)
- [Wolfram MathWorld](https://mathworld.wolfram.com)

## Horizontal Rules

---

## Special Mathematical Symbols and Sets

Common number sets:
- Natural numbers: $\mathbb{N} = \{1, 2, 3, ...\}$
- Integers: $\mathbb{Z} = \{..., -2, -1, 0, 1, 2, ...\}$
- Rational numbers: $\mathbb{Q}$
- Real numbers: $\mathbb{R}$
- Complex numbers: $\mathbb{C}$

Greek letters commonly used:
- $\alpha, \beta, \gamma, \delta, \epsilon$
- $\theta, \lambda, \mu, \pi, \sigma, \phi$
- $\Gamma, \Delta, \Theta, \Lambda, \Sigma, \Phi$

## Conclusion

This sample demonstrates the rich formatting capabilities available when combining Markdown with LaTeX mathematics for educational content. The KaTeX rendering engine will display all mathematical expressions beautifully in web browsers.

> **:dart: Learning Objective:** Students should be able to recognize and use various mathematical notation and formatting conventions after studying this material.