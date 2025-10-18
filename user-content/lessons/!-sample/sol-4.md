**Informations :**
- Urne : 5 boules rouges + 3 boules vertes = 8 boules au total
- Tirage : 3 boules successivement **sans remise**
- On cherche : P(exactement 2 boules rouges)

### Méthode 1 : Dénombrement

**Nombre total de tirages possibles :**

On tire 3 boules parmi 8 sans remise et sans tenir compte de l'ordre : $\binom{8}{3}$

$$\binom{8}{3} = \frac{8!}{3! \times 5!} = \frac{8 \times 7 \times 6}{3 \times 2 \times 1} = 56$$

**Nombre de tirages favorables (exactement 2 rouges) :**

- Choisir 2 boules rouges parmi 5 : $\binom{5}{2}$
- Choisir 1 boule verte parmi 3 : $\binom{3}{1}$

$$\binom{5}{2} \times \binom{3}{1} = \frac{5!}{2! \times 3!} \times 3 = 10 \times 3 = 30$$

**Probabilité :**

$$P(\text{exactement 2 rouges}) = \frac{30}{56} = \frac{15}{28}$$

### Méthode 2 : Arbre de probabilités

On peut aussi considérer les différents ordres possibles :

- **RRV** : $\frac{5}{8} \times \frac{4}{7} \times \frac{3}{6} = \frac{60}{336}$
- **RVR** : $\frac{5}{8} \times \frac{3}{7} \times \frac{4}{6} = \frac{60}{336}$
- **VRR** : $\frac{3}{8} \times \frac{5}{7} \times \frac{4}{6} = \frac{60}{336}$

$$P(\text{exactement 2 rouges}) = \frac{60}{336} + \frac{60}{336} + \frac{60}{336} = \frac{180}{336} = \frac{15}{28}$$

**Réponse : La probabilité est $\frac{15}{28}$ (soit environ 0,536 ou 53,6%).**
