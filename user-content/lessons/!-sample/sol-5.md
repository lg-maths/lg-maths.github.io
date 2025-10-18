On utilise la méthode d'**intégration par parties** deux fois de suite.

### Première intégration par parties

Formule : $\int u \, dv = [uv] - \int v \, du$

Posons :
- $u(x) = x^2$ donc $du = 2x \, dx$
- $dv = e^x \, dx$ donc $v = e^x$

$$\int_0^1 x^2 e^x \, dx = [x^2 e^x]_0^1 - \int_0^1 2x e^x \, dx$$

$$= e - 0 - 2\int_0^1 x e^x \, dx$$

$$= e - 2\int_0^1 x e^x \, dx$$

### Deuxième intégration par parties

Pour calculer $\int_0^1 x e^x \, dx$, on pose :
- $u(x) = x$ donc $du = dx$
- $dv = e^x \, dx$ donc $v = e^x$

$$\int_0^1 x e^x \, dx = [x e^x]_0^1 - \int_0^1 e^x \, dx$$

$$= (1 \times e - 0 \times 1) - [e^x]_0^1$$

$$= e - (e - 1)$$

$$= e - e + 1 = 1$$

### Calcul final

$$\int_0^1 x^2 e^x \, dx = e - 2 \times 1 = e - 2$$

**Réponse : $\int_0^1 x^2 e^x \, dx = e - 2$**

**Vérification numérique :** $e - 2 \approx 2,718 - 2 = 0,718$
