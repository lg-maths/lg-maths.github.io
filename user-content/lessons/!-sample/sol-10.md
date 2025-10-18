### 1. Coordonnées des vecteurs

$$\overrightarrow{AB} = \begin{pmatrix} 3-1 \\ 1-0 \\ -1-2 \end{pmatrix} = \begin{pmatrix} 2 \\ 1 \\ -3 \end{pmatrix}$$

$$\overrightarrow{AC} = \begin{pmatrix} 2-1 \\ 3-0 \\ 0-2 \end{pmatrix} = \begin{pmatrix} 1 \\ 3 \\ -2 \end{pmatrix}$$

$$\overrightarrow{AD} = \begin{pmatrix} 0-1 \\ 2-0 \\ 3-2 \end{pmatrix} = \begin{pmatrix} -1 \\ 2 \\ 1 \end{pmatrix}$$

### 2. Non-alignement de $A$, $B$ et $C$

Deux vecteurs sont colinéaires s'il existe $k \in \mathbb{R}$ tel que l'un est égal à $k$ fois l'autre.

Si $\overrightarrow{AB}$ et $\overrightarrow{AC}$ étaient colinéaires :

$$\begin{pmatrix} 2 \\ 1 \\ -3 \end{pmatrix} = k \begin{pmatrix} 1 \\ 3 \\ -2 \end{pmatrix}$$

Cela donnerait :
- $2 = k \times 1 \Rightarrow k = 2$
- $1 = k \times 3 \Rightarrow k = \frac{1}{3}$

Contradiction ! Les vecteurs ne sont pas colinéaires, donc **les points $A$, $B$ et $C$ ne sont pas alignés**.

### 3. Équation cartésienne du plan $(ABC)$

Un vecteur normal au plan $(ABC)$ est $\vec{n} = \overrightarrow{AB} \wedge \overrightarrow{AC}$ :

$$\vec{n} = \begin{pmatrix} 2 \\ 1 \\ -3 \end{pmatrix} \wedge \begin{pmatrix} 1 \\ 3 \\ -2 \end{pmatrix}$$

$$= \begin{pmatrix} 1 \times (-2) - (-3) \times 3 \\ (-3) \times 1 - 2 \times (-2) \\ 2 \times 3 - 1 \times 1 \end{pmatrix}$$

$$= \begin{pmatrix} -2 + 9 \\ -3 + 4 \\ 6 - 1 \end{pmatrix} = \begin{pmatrix} 7 \\ 1 \\ 5 \end{pmatrix}$$

L'équation du plan est de la forme : $7x + y + 5z + d = 0$

Le point $A(1, 0, 2)$ appartient au plan :

$$7 \times 1 + 0 + 5 \times 2 + d = 0$$
$$7 + 10 + d = 0$$
$$d = -17$$

**Équation du plan $(ABC)$ : $7x + y + 5z - 17 = 0$**

### 4. Le point $D$ appartient-il au plan $(ABC)$ ?

On teste si $D(0, 2, 3)$ vérifie l'équation :

$$7 \times 0 + 2 + 5 \times 3 - 17 = 0 + 2 + 15 - 17 = 0$$

**Oui, le point $D$ appartient au plan $(ABC)$.**

### 5. Distance de $D$ au plan $(ABC)$

Comme $D \in (ABC)$, la distance est **0**.

### 6. Volume du tétraèdre $ABCD$

Comme les quatre points $A$, $B$, $C$, $D$ sont coplanaires (ils appartiennent tous au plan $(ABC)$), le tétraèdre est **aplati**.

**Le volume du tétraèdre $ABCD$ est 0.**

**Remarque :** Si $D$ n'appartenait pas au plan, on utiliserait la formule :

$$V = \frac{1}{6} |\overrightarrow{AB} \cdot (\overrightarrow{AC} \wedge \overrightarrow{AD})|$$
