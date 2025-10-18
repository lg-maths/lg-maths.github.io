### Méthode : Forme exponentielle

**Réécriture de l'équation :**

$$z^3 = 8i$$

**Forme exponentielle de $8i$ :**

On a $8i = 8 \times e^{i\frac{\pi}{2}}$ (car $i = e^{i\frac{\pi}{2}}$)

Plus généralement : $8i = 8 \times e^{i(\frac{\pi}{2} + 2k\pi)}$ pour $k \in \mathbb{Z}$

**Solutions de l'équation :**

Si $z^3 = 8e^{i(\frac{\pi}{2} + 2k\pi)}$, alors :

$$z = \sqrt[3]{8} \times e^{i\frac{\frac{\pi}{2} + 2k\pi}{3}} = 2 \times e^{i\frac{\pi + 4k\pi}{6}}$$

Pour $k = 0, 1, 2$ (on obtient 3 solutions distinctes) :

**Solution 1** ($k = 0$) :
$$z_0 = 2e^{i\frac{\pi}{6}} = 2\left(\cos\frac{\pi}{6} + i\sin\frac{\pi}{6}\right) = 2\left(\frac{\sqrt{3}}{2} + i\frac{1}{2}\right) = \sqrt{3} + i$$

**Solution 2** ($k = 1$) :
$$z_1 = 2e^{i\frac{5\pi}{6}} = 2\left(\cos\frac{5\pi}{6} + i\sin\frac{5\pi}{6}\right) = 2\left(-\frac{\sqrt{3}}{2} + i\frac{1}{2}\right) = -\sqrt{3} + i$$

**Solution 3** ($k = 2$) :
$$z_2 = 2e^{i\frac{3\pi}{2}} = 2\left(\cos\frac{3\pi}{2} + i\sin\frac{3\pi}{2}\right) = 2(0 - i) = -2i$$

**Vérification pour $z_0 = \sqrt{3} + i$ :**

$$z_0^3 = (\sqrt{3} + i)^3$$

Module : $|z_0|^3 = 2^3 = 8$ ✓

Argument : $3 \times \frac{\pi}{6} = \frac{\pi}{2}$ donc $z_0^3 = 8i$ ✓

**Réponse : Les solutions sont $z_0 = \sqrt{3} + i$, $z_1 = -\sqrt{3} + i$ et $z_2 = -2i$.**
