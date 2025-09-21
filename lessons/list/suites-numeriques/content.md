# Suites numériques

## Définition et notations
Une suite numérique est une fonction définie sur $\mathbb{N}$ (ou une partie de $\mathbb{N}$) à valeurs dans $\mathbb{R}$.

**Notations :** $(u_n)$, $u_0$, $u_1$, $u_2$, ..., $u_n$, ...

## Modes de définition

### Définition explicite
Le terme général est donné par une formule : $u_n = f(n)$

**Exemple :** $u_n = 2n + 1$
$u_0 = 1$, $u_1 = 3$, $u_2 = 5$, $u_3 = 7$, ...

### Définition par récurrence
- Premier terme : $u_0$ donné
- Relation de récurrence : $u_{n+1} = f(u_n)$

**Exemple :** $u_0 = 1$ et $u_{n+1} = 2u_n + 1$
$u_1 = 3$, $u_2 = 7$, $u_3 = 15$, ...

## Suites arithmétiques

### Définition
Une suite $(u_n)$ est arithmétique s'il existe un réel $r$ tel que :
$$u_{n+1} = u_n + r \text{ pour tout } n$$

$r$ est appelé la raison de la suite.

### Terme général
$$u_n = u_0 + nr \text{ ou } u_n = u_1 + (n-1)r$$

### Somme des termes
$$S_n = u_0 + u_1 + \ldots + u_n = \frac{(n+1)(u_0 + u_n)}{2}$$

## Suites géométriques

### Définition
Une suite $(u_n)$ est géométrique s'il existe un réel $q \neq 0$ tel que :
$$u_{n+1} = qu_n \text{ pour tout } n$$

$q$ est appelé la raison de la suite.

### Terme général
$$u_n = u_0 \times q^n \text{ ou } u_n = u_1 \times q^{n-1}$$

### Somme des termes
Si $q \neq 1$ : $$S_n = u_0 \times \frac{1 - q^{n+1}}{1 - q}$$

## Sens de variation

### Suite croissante
$u_{n+1} \geq u_n$ pour tout $n$ (ou $u_{n+1} - u_n \geq 0$)

### Suite décroissante
$u_{n+1} \leq u_n$ pour tout $n$ (ou $u_{n+1} - u_n \leq 0$)

## Limite d'une suite
Une suite $(u_n)$ a pour limite $l$ si les termes se rapprochent indéfiniment de $l$ quand $n$ tend vers $+\infty$.

**Notation :** $\lim_{n \to +\infty} u_n = l$

## Exercices
1. Calculer les $5$ premiers termes de la suite définie par $u_0 = 2$ et $u_{n+1} = 3u_n - 1$
2. Une suite arithmétique vérifie $u_3 = 7$ et $u_7 = 15$. Déterminer $u_0$ et $r$
3. Calculer la somme $1 + 2 + 4 + 8 + \ldots + 1024$
