# Lois de probabilité continues

## Variables aléatoires continues

### Définition
Une variable aléatoire $X$ est continue si elle peut prendre toutes les valeurs d'un intervalle de $\mathbb{R}$.

### Fonction de densité
Une fonction $f$ est une densité de probabilité si :
- $f(x) \geq 0$ pour tout $x$
- $\int_{-\infty}^{+\infty} f(x) \, dx = 1$

### Probabilités
Pour une variable continue $X$ de densité $f$ :
$$P(a \leq X \leq b) = \int_a^b f(x) \, dx$$

**Important :** $P(X = a) = 0$ pour toute valeur $a$.

## Loi uniforme sur [a, b]

### Densité
$f(x) = \frac{1}{b-a}$ si $x \in [a, b]$, $0$ sinon

### Caractéristiques
- **Espérance :** $E(X) = \frac{a+b}{2}$
- **Variance :** $V(X) = \frac{(b-a)^2}{12}$

## Loi exponentielle de paramètre λ

### Densité
$f(x) = \lambda e^{-\lambda x}$ si $x \geq 0$, $0$ sinon ($\lambda > 0$)

### Caractéristiques
- **Espérance :** $E(X) = \frac{1}{\lambda}$
- **Variance :** $V(X) = \frac{1}{\lambda^2}$

### Propriété sans mémoire
$P(X > s+t | X > s) = P(X > t)$

### Applications
- Durée de vie d'un composant
- Temps d'attente entre deux événements

## Loi normale N(μ, σ²)

### Densité
$$f(x) = \frac{1}{\sigma\sqrt{2\pi}} \times e^{-\frac{(x-\mu)^2}{2\sigma^2}}$$

### Caractéristiques
- **Espérance :** $E(X) = \mu$
- **Variance :** $V(X) = \sigma^2$
- **Écart-type :** $\sigma$

### Loi normale centrée réduite N(0, 1)
Variable $Z = \frac{X - \mu}{\sigma}$ suit la loi $\mathcal{N}(0, 1)$

**Lecture de table :** $P(Z \leq z) = \Phi(z)$

### Propriétés remarquables
- $P(\mu - \sigma \leq X \leq \mu + \sigma) \approx 0,68$
- $P(\mu - 2\sigma \leq X \leq \mu + 2\sigma) \approx 0,95$
- $P(\mu - 3\sigma \leq X \leq \mu + 3\sigma) \approx 0,997$

## Approximation normale de la loi binomiale
Si $X$ suit $\mathcal{B}(n, p)$ avec $n$ grand, $np \geq 5$ et $n(1-p) \geq 5$ :
$X$ peut être approximée par $\mathcal{N}(np, np(1-p))$

## Exercices
1. $X$ suit la loi uniforme sur $[2, 8]$. Calculer $P(3 \leq X \leq 5)$
2. $Y$ suit la loi exponentielle de paramètre $0,2$. Calculer $P(Y > 3)$
3. $Z$ suit $\mathcal{N}(100, 15^2)$. Calculer $P(85 \leq Z \leq 115)$
