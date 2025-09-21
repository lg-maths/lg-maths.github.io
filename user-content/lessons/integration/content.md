# Intégration

## Primitive d'une fonction

### Définition
Une primitive de $f$ sur un intervalle $I$ est une fonction $F$ dérivable sur $I$ telle que $F'(x) = f(x)$ pour tout $x \in I$.

### Primitives usuelles
- $\int k \, dx = kx + C$
- $\int x \, dx = \frac{x^2}{2} + C$
- $\int x^n \, dx = \frac{x^{n+1}}{n+1} + C$ ($n \neq -1$)
- $\int \frac{1}{x} \, dx = \ln|x| + C$
- $\int e^x \, dx = e^x + C$
- $\int \cos x \, dx = \sin x + C$
- $\int \sin x \, dx = -\cos x + C$

### Opérations
- $\int [f(x) + g(x)] \, dx = \int f(x) \, dx + \int g(x) \, dx$
- $\int kf(x) \, dx = k \int f(x) \, dx$

## Intégrale définie

### Définition
L'intégrale de $f$ sur $[a, b]$ est : $$\int_a^b f(x) \, dx = F(b) - F(a)$$
où $F$ est une primitive de $f$.

### Interprétation géométrique
$\int_a^b f(x) \, dx$ représente l'aire algébrique entre la courbe de $f$, l'axe des abscisses et les droites $x = a$ et $x = b$.

### Propriétés
- $\int_a^a f(x) \, dx = 0$
- $\int_a^b f(x) \, dx = -\int_b^a f(x) \, dx$
- $\int_a^b f(x) \, dx + \int_b^c f(x) \, dx = \int_a^c f(x) \, dx$ (relation de Chasles)
- $\int_a^b [f(x) + g(x)] \, dx = \int_a^b f(x) \, dx + \int_a^b g(x) \, dx$

## Calcul d'aires

### Aire entre une courbe et l'axe des abscisses
- Si $f(x) \geq 0$ sur $[a, b]$ : Aire = $\int_a^b f(x) \, dx$
- Si $f(x) \leq 0$ sur $[a, b]$ : Aire = $-\int_a^b f(x) \, dx$
- Cas général : Aire = $\int_a^b |f(x)| \, dx$

### Aire entre deux courbes
Aire entre les courbes de $f$ et $g$ sur $[a, b]$ : $\int_a^b |f(x) - g(x)| \, dx$

## Valeur moyenne
La valeur moyenne de $f$ sur $[a, b]$ est : $$\mu = \frac{1}{b-a} \int_a^b f(x) \, dx$$

## Intégration par parties
$$\int_a^b u'(x)v(x) \, dx = [u(x)v(x)]_a^b - \int_a^b u(x)v'(x) \, dx$$

## Applications
- Calcul d'aires et de volumes
- Probabilités (lois continues)
- Physique (travail, énergie)
- Économie (surplus du consommateur)

## Exercices
1. Calculer $\int_1^2 (2x + 1) \, dx$
2. Déterminer l'aire comprise entre la parabole $y = x^2$ et la droite $y = x$ sur $[0, 1]$
3. Calculer la valeur moyenne de $f(x) = x^2$ sur $[0, 2]$
