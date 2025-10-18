### Suite et algorithme

On définit la suite $(u_n)$ par $u_0 = 2$ et pour tout $n \in \mathbb{N}$, $u_{n+1} = \sqrt{2 + u_n}$.

1. Calculer $u_1$, $u_2$ et $u_3$ (arrondir à $10^{-3}$ près).
2. Démontrer par récurrence que pour tout $n \in \mathbb{N}$, $1 \leq u_n \leq 2$.
3. Montrer que la suite $(u_n)$ est croissante.
4. En déduire que $(u_n)$ est convergente. On note $\ell$ sa limite.
5. Déterminer la valeur de $\ell$.
6. Écrire un algorithme en Python qui calcule le plus petit entier $n$ tel que $|u_n - \ell| < 10^{-6}$.