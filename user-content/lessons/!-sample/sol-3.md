### 1. Étude de la convergence

**Calcul des premiers termes :**
- $u_0 = 1$
- $u_1 = \frac{2 \times 1 + 3}{1 + 2} = \frac{5}{3}$
- $u_2 = \frac{2 \times \frac{5}{3} + 3}{\frac{5}{3} + 2} = \frac{\frac{19}{3}}{\frac{11}{3}} = \frac{19}{11} \approx 1,727$

**Montrons que la suite est bornée :**

Démontrons par récurrence que pour tout $n \in \mathbb{N}$, $1 \leq u_n \leq 3$.

- *Initialisation* : $u_0 = 1$, donc $1 \leq u_0 \leq 3$ ✓
- *Hérédité* : Supposons que $1 \leq u_n \leq 3$

$$u_{n+1} = \frac{2u_n + 3}{u_n + 2}$$

Si $1 \leq u_n \leq 3$ :
- Numérateur : $2 \times 1 + 3 \leq 2u_n + 3 \leq 2 \times 3 + 3$, soit $5 \leq 2u_n + 3 \leq 9$
- Dénominateur : $1 + 2 \leq u_n + 2 \leq 3 + 2$, soit $3 \leq u_n + 2 \leq 5$

Donc : $\frac{5}{5} \leq u_{n+1} \leq \frac{9}{3}$, soit $1 \leq u_{n+1} \leq 3$ ✓

**Montrons que la suite est croissante :**

$$u_{n+1} - u_n = \frac{2u_n + 3}{u_n + 2} - u_n = \frac{2u_n + 3 - u_n(u_n + 2)}{u_n + 2} = \frac{-u_n^2 + 3}{u_n + 2}$$

Pour $1 \leq u_n \leq 3$ :
- $-u_n^2 + 3 \geq 0 \Leftrightarrow u_n^2 \leq 3 \Leftrightarrow u_n \leq \sqrt{3} \approx 1,732$

On constate que $u_1 = \frac{5}{3} < \sqrt{3}$, donc la suite devient croissante à partir de $u_1$.

La suite $(u_n)$ est croissante et majorée par 3, donc elle converge.

### 2. Détermination de la limite

Si $(u_n)$ converge vers $\ell$, alors :

$$\ell = \frac{2\ell + 3}{\ell + 2}$$

$$\ell(\ell + 2) = 2\ell + 3$$

$$\ell^2 + 2\ell = 2\ell + 3$$

$$\ell^2 = 3$$

Comme $u_n > 0$ pour tout $n$, on a $\ell = \sqrt{3}$.

**Réponse : La suite converge vers $\sqrt{3}$.**
