# Raccourcis et Améliorations

## Raccourcis

<span style="color: gray">*Déjà cette documenatation et les autres (README.md, et roadmap.md) sont rédigées en français pour aller plus vite (tout le code/commentaires et l'interface graphique sont faits en anglais comme usuellement en programmation).*</span> 😆



### Quelques Considérations
- Le taux de change a été considéré comme supérieur ou égal à 0.1. L'idée étant de fixer une valeur positive minimale pour éviter d'avoir un taux de change nul ou négatif.
- l'historique concerne les demandes de conversion et non les valeurs calculées automatiquement selon ma compréhension de l'énoncé. Du coup, un bouton de conversion est utilisé pour générer ce dernier.
- le rapport comparé aux 2% a été calculé en divisant la différence entre les deux taux sur le taux réel (ce n'était pas clair s'il fallait plutôt utiliser le taux fixe comme diviseur).
 

### Gestion des entrées
Pour les deux entrées (montant et taux fixe), il est possible d'entrer des valeurs non valides (exemple: e, ou e2). Parce que 'e' signie 'x10 puissance' dans les input de type number.
Seulement, on pourrait empêcher ce type de saisie invalide avec plus de contrôles.


### Tests
Aucun code de tests n'est réalisé. On pourrait faire des tests de fonction javascript ou de navigation (avec des librairies comme Puppeteer)


## Améliorations

### Tests
Intégrer des tests unitaires, et d'interface graphique (avec Puppeteer ou React Testing Library)

### Documentation
La documentation du code peut être encore améliorée pour expliquer davantage la logique.
On pourrait la faire en différentes langues: anglais en plus à minima (comme l'interface graphique). De même, l'application pourrait être multilingue.

### UX/UI
L'UI peut encore être améliorée pour tenir compte du type de navigateur ou de la taille d'écran (voir même des mal voyants si on veut aller plus loin 🤔). On peut la rendre adaptative et responsive, et bien plus belle.

### Application complète
On pourrait penser à faire une application complète (incorporant un backend) avec l'historique des calculs stockées en base de données pour éviter de perdre les données lors des rechargements du navigateur. Penser même à conserver les session pour avoir l'historique suivant les utilisateurs ayant faits les demandes de conversion.

### CI/CD
Dévolopper un script bash (ou une pipeline CI/CD minimaliste: avec docker-compose par exemple pour lancer le back et le front dans des conteneurs) pour un déploiement automatique en dev ou prod.