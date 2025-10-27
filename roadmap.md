# Roadmap

Pour cette roadmap, 5 personnes peuvent travailler en parallèle sur le front, le back, les tests, la sécurité et la CI/CD décrits plus bas, après avoir redéfinis des fonctionnalités plus complètes.

## Spécifications plus complètes 
Il faudrait des spécifications plus complètes, avec:
- une description de la façon d'accéder à la page par les utilisateurs finaux (via un lien public ou privé sur le réseau...), 
- l'historique et les autres données doit-elle être persistante (pas seulement limité à 5) ?
- doit-on pouvoir supprimer des données de l'historique ?
- le nombre d'utilisateurs accédent simultanément à l'information, 
- le fait que l'information est propre à chaque navigateur ou la même pour tous les utilisateurs y accédant,
- le type d'appareil à partir desquels on assiste à la page.

## Améliorations visuelles

### UX/UI
Quelques éléments intéressants:
- Ajout d'indicateurs de chargement
- Ajout de messages d'erreur clairs
- Optimisation pour mobile et accessibilité pour mal-voyants

### Composants
On pourrait intégrer différents composants comme:
- un graphique d'évolution des taux
- des toasts pour notification des actions
- des modals pour confirmation des actions importantes

## Améliorations des fonctionnalités (+ backend)

Un backend python (avec Django) peut être envisagé.

### Backend (python)
On pourrait avoir:
- Une API REST pour mettre à disposition des endpoints pour taux réels
- Une base de données pour un historique persistant
- La gestion des comptes utilisateur

### Fonctionnalités avancées
- Intégrer une API financière. Il y en a plusieurs en ligne.
- Supporter de multiples devises: EUR, USD, GBP, etc.
- Permettre l'export CSV/PDF de l'historique

## Tests

### Tests unitaires
- Tests de la fonction de conversion
- Tests de la logique de taux fixe
- Tests des calculs de variation (2% threshold)
- Tests de l'historique (ajout/suppression)

### Tests d'intégration
- Test du flux complet de conversion
- Test de la persistance de l'historique

### Tests de performance et de responsive design


## Sécurité
- Chiffrement de l'envoie des données (et certificats) avec https
- Utiliser des outils pour le formatage (prettier, pylint) et pour vérifier la qualité et la sécurité du code comme SonarQube, Bearer, ou CodeQL.
- Validation côté client ET serveur (pour le futur backend)
- Protection des serveurs surlesquels seront déployés les outils en dev, recette et production (si pas cloud ou fournisseurs).


## CI/CD

### Améliorations CI/CD

Plusieurs solutions existent avec des outils comme Ansible, Github Actions, jenkins, docker-compuse ou des solutions cloud (Aws Elastic Beanstalk)... (si l'on envisage un front et back séparés à déployer sur des serveurs)
