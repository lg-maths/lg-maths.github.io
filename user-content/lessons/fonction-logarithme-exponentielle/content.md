# Fonction logarithme et exponentielle

## La fonction exponentielle

### Définition
La fonction exponentielle, notée $\exp$ ou $x \mapsto e^x$, est l'unique fonction $f$ telle que :
- $f'(x) = f(x)$ pour tout $x \in \mathbb{R}$
- $f(0) = 1$

### Propriétés
- **Domaine :** $\mathbb{R}$
- **Ensemble image :** $]0, +\infty[$
- **Strictement croissante** sur $\mathbb{R}$
- **Dérivée :** $(e^x)' = e^x$
- **Limites :** $\lim_{x \to -\infty} e^x = 0$ et $\lim_{x \to +\infty} e^x = +\infty$

### Propriétés algébriques
- $e^a \times e^b = e^{a+b}$
- $\frac{e^a}{e^b} = e^{a-b}$
- $(e^a)^n = e^{na}$
- $e^0 = 1$

## La fonction logarithme népérien

### Définition
La fonction logarithme népérien, notée $\ln$, est la fonction réciproque de la fonction exponentielle.

### Propriétés
- **Domaine :** $]0, +\infty[$
- **Ensemble image :** $\mathbb{R}$
- **Strictement croissante** sur $]0, +\infty[$
- **Dérivée :** $(\ln x)' = \frac{1}{x}$ pour $x > 0$
- **Limites :** $\lim_{x \to 0^+} \ln x = -\infty$ et $\lim_{x \to +\infty} \ln x = +\infty$

### Propriétés algébriques
- $\ln(a \times b) = \ln a + \ln b$
- $\ln\left(\frac{a}{b}\right) = \ln a - \ln b$
- $\ln(a^n) = n \ln a$
- $\ln 1 = 0$
- $\ln e = 1$

## Relations fondamentales
- $\ln(e^x) = x$ pour tout $x \in \mathbb{R}$
- $e^{\ln x} = x$ pour tout $x > 0$

## Équations et inéquations

### Équations exponentielles
- $e^x = a \Leftrightarrow x = \ln a$ (si $a > 0$)
- $e^u = e^v \Leftrightarrow u = v$

### Équations logarithmiques
- $\ln x = a \Leftrightarrow x = e^a$
- $\ln u = \ln v \Leftrightarrow u = v$ (si $u, v > 0$)

## Applications

### Croissance exponentielle
Modélise des phénomènes de croissance : $N(t) = N_0 e^{kt}$
- Population de bactéries
- Désintégration radioactive
- Intérêts composés

### Échelle logarithmique
- Décibels : $L = 10 \log_{10}\left(\frac{I}{I_0}\right)$
- Magnitude des séismes
- pH en chimie

## Exercices
1. Résoudre l'équation $e^{2x-1} = 5$
2. Simplifier $\ln(e^3) + \ln\left(\frac{1}{e^2}\right)$
3. Étudier les variations de $f(x) = x - \ln x$ sur $]0, +\infty[$
