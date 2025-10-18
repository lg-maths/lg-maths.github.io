### 1. Limites de $f$ en $+\infty$ et $-\infty$

$f(x) = x^3 - 3x^2 + 2$

- $\lim_{x \to +\infty} f(x) = \lim_{x \to +\infty} x^3 = +\infty$
- $\lim_{x \to -\infty} f(x) = \lim_{x \to -\infty} x^3 = -\infty$

### 2. Calcul de $f'(x)$ et étude de son signe

$$f'(x) = 3x^2 - 6x = 3x(x - 2)$$

**Étude du signe :**

- $f'(x) = 0 \Leftrightarrow x = 0$ ou $x = 2$
- $f'(x) > 0$ si $x < 0$ ou $x > 2$
- $f'(x) < 0$ si $0 < x < 2$

### 3. Tableau de variations

| $x$        | $-\infty$ |     | $0$  |     | $2$  |     | $+\infty$ |
|------------|-----------|-----|------|-----|------|-----|-----------|
| $f'(x)$    |           | $+$ | $0$  | $-$ | $0$  | $+$ |           |
| $f(x)$     | $-\infty$ | ↗   | $2$  | ↘   | $-2$ | ↗   | $+\infty$ |

**Valeurs :**
- $f(0) = 0 - 0 + 2 = 2$ (maximum local)
- $f(2) = 8 - 12 + 2 = -2$ (minimum local)

### 4. Points d'inflexion

On calcule $f''(x)$ :

$$f''(x) = 6x - 6 = 6(x - 1)$$

$f''(x) = 0 \Leftrightarrow x = 1$

Le point d'inflexion a pour coordonnées :
- $x = 1$
- $f(1) = 1 - 3 + 2 = 0$

**Point d'inflexion : $I(1, 0)$**

### 5. Allure de la courbe

La courbe :
- Passe par l'origine car $f(0) = 2$
- A un maximum local en $(0, 2)$
- A un minimum local en $(2, -2)$
- A un point d'inflexion en $(1, 0)$
- Croît de $-\infty$ vers le maximum, décroît vers le minimum, puis croît vers $+\infty$

### 6. Résolution de $f(x) = 0$

**Graphiquement :** D'après le tableau de variations, la courbe coupe l'axe des abscisses 3 fois (une fois pour $x < 0$, une fois entre 0 et 2, et une fois pour $x > 2$).

**Algébriquement :**

$$x^3 - 3x^2 + 2 = 0$$

On cherche une racine évidente. Essayons $x = 1$ :

$$f(1) = 1 - 3 + 2 = 0$$ ✓

Donc $x = 1$ est une solution. On factorise par $(x - 1)$ :

$$x^3 - 3x^2 + 2 = (x - 1)(x^2 - 2x - 2)$$

Pour résoudre $x^2 - 2x - 2 = 0$ :

$$\Delta = 4 + 8 = 12 = 4 \times 3$$

$$x = \frac{2 \pm 2\sqrt{3}}{2} = 1 \pm \sqrt{3}$$

**Solutions : $x_1 = 1 - \sqrt{3} \approx -0,732$, $x_2 = 1$, $x_3 = 1 + \sqrt{3} \approx 2,732$**
