# Probabilités conditionnelles

## Probabilité conditionnelle

### Définition
Soient $A$ et $B$ deux événements avec $P(B) \neq 0$.
La probabilité conditionnelle de $A$ sachant $B$ est :

$$P_B(A) = \frac{P(A \cap B)}{P(B)}$$

Elle se lit "probabilité de $A$ sachant $B$".

### Interprétation
$P_B(A)$ représente la probabilité que $A$ se réalise dans la nouvelle situation où l'on sait que $B$ s'est réalisé.

## Arbre de probabilité

### Construction
1. Première étape : événements et leurs probabilités
2. Deuxième étape : événements conditionnels et leurs probabilités

### Règles
- Sur chaque branche : probabilité conditionnelle
- Somme des probabilités issues d'un même nœud = $1$
- Probabilité d'un chemin = produit des probabilités des branches

## Formule des probabilités totales
Si $B_1, B_2, \ldots, B_n$ forment une partition de l'univers :

$$P(A) = P(A \cap B_1) + P(A \cap B_2) + \ldots + P(A \cap B_n)$$

$$P(A) = P(B_1) \times P_{B_1}(A) + P(B_2) \times P_{B_2}(A) + \ldots + P(B_n) \times P_{B_n}(A)$$

## Formule de Bayes
$$P_A(B) = \frac{P_B(A) \times P(B)}{P(A)}$$

## Indépendance
Deux événements $A$ et $B$ sont indépendants si :
$$P_B(A) = P(A) \text{ ou } P(A \cap B) = P(A) \times P(B)$$

## Exemple
Dans une urne : $3$ boules rouges, $2$ boules bleues.
On tire $2$ boules sans remise.

- $P(\text{1ère rouge}) = \frac{3}{5}$
- $P(\text{2ème rouge | 1ère rouge}) = \frac{2}{4} = \frac{1}{2}$
- $P(\text{2ème rouge | 1ère bleue}) = \frac{3}{4}$
- $P(\text{les deux rouges}) = \frac{3}{5} \times \frac{1}{2} = \frac{3}{10}$

## Applications
- Tests médicaux (sensibilité, spécificité)
- Contrôle qualité
- Fiabilité des systèmes
- Spam dans les emails

## Exercices
1. Dans une classe, $60\%$ des élèves sont des filles. $40\%$ des filles et $30\%$ des garçons portent des lunettes. Quelle est la probabilité qu'un élève porte des lunettes ?
2. Un test détecte une maladie dans $95\%$ des cas si elle est présente, et donne un faux positif dans $2\%$ des cas. Si $1\%$ de la population a la maladie, quelle est la probabilité d'être malade sachant que le test est positif ?
