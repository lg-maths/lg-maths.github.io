### 1. Calcul des premiers termes

$$u_0 = 2$$

$$u_1 = \sqrt{2 + u_0} = \sqrt{2 + 2} = \sqrt{4} = 2$$

$$u_2 = \sqrt{2 + u_1} = \sqrt{2 + 2} = 2$$

$$u_3 = \sqrt{2 + u_2} = 2$$

**Observation :** La suite semble constante égale à 2.

### 2. Démonstration par récurrence : $1 \leq u_n \leq 2$

**Initialisation :** $u_0 = 2$, donc $1 \leq u_0 \leq 2$ ✓

**Hérédité :** Supposons que $1 \leq u_n \leq 2$

Alors : $1 + 2 \leq 2 + u_n \leq 2 + 2$, soit $3 \leq 2 + u_n \leq 4$

En prenant la racine carrée : $\sqrt{3} \leq u_{n+1} \leq 2$

Or $\sqrt{3} \approx 1,732 > 1$, donc $1 \leq u_{n+1} \leq 2$ ✓

Par récurrence, pour tout $n \in \mathbb{N}$, $1 \leq u_n \leq 2$.

### 3. Monotonie de la suite

Étudions le signe de $u_{n+1} - u_n$ :

$$u_{n+1} - u_n = \sqrt{2 + u_n} - u_n$$

Posons $f(x) = \sqrt{2 + x} - x$ pour $x \in [1, 2]$

$$f'(x) = \frac{1}{2\sqrt{2 + x}} - 1 = \frac{1 - 2\sqrt{2 + x}}{2\sqrt{2 + x}}$$

$f'(x) = 0 \Leftrightarrow 1 = 2\sqrt{2 + x} \Leftrightarrow \sqrt{2 + x} = \frac{1}{2}$

Cette équation n'a pas de solution pour $x \geq 1$ (car $\sqrt{2 + 1} = \sqrt{3} > \frac{1}{2}$).

Pour $x \in [1, 2]$ : $\sqrt{2 + x} \geq \sqrt{3} > 1,5$, donc $2\sqrt{2 + x} > 3 > 1$

Ainsi $f'(x) < 0$ sur $[1, 2]$ : $f$ est décroissante.

- $f(1) = \sqrt{3} - 1 \approx 0,732 > 0$
- $f(2) = 2 - 2 = 0$

La suite n'est ni strictement croissante ni strictement décroissante en général, mais elle converge vers 2.

### 4. Convergence

La suite est bornée (par la question 2). De plus, pour $u_n < 2$ :

$$u_{n+1}^2 = 2 + u_n > u_n \text{ si } u_n < 2$$

Donc si $u_n < 2$, alors $u_{n+1} > u_n$. La suite est croissante tant qu'elle est strictement inférieure à 2.

Une suite croissante et majorée converge.

### 5. Valeur de la limite $\ell$

Si $u_n \to \ell$, alors $u_{n+1} \to \ell$ aussi.

$$\ell = \sqrt{2 + \ell}$$

$$\ell^2 = 2 + \ell$$

$$\ell^2 - \ell - 2 = 0$$

$$(\ell - 2)(\ell + 1) = 0$$

Comme $u_n \geq 1 > 0$, on a $\ell = 2$.

**La suite converge vers $\ell = 2$.**

### 6. Algorithme Python

```python
import math

def find_n():
    u = 2  # u_0
    ell = 2  # limite
    n = 0
    epsilon = 1e-6
    
    while abs(u - ell) >= epsilon:
        u = math.sqrt(2 + u)
        n += 1
        
        # Sécurité pour éviter une boucle infinie
        if n > 1000000:
            return "Convergence trop lente"
    
    return n

# Test
n_min = find_n()
print(f"Le plus petit n tel que |u_n - ℓ| < 10^-6 est : {n_min}")
```

**Note :** Comme $u_0 = 2 = \ell$, le résultat sera $n = 0$ dans ce cas particulier.
