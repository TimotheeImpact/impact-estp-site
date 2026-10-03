# Site Impact ESTP

Le site du média étudiant Impact ESTP. Il est publié gratuitement par GitHub Pages : chaque modification enregistrée ici met le site à jour toute seule, en 1 à 2 minutes.

Pas besoin de savoir coder. Tout se fait depuis le site github.com, dans ce dépôt.

## Où est quoi

| Je veux changer… | Fichier ou dossier |
|---|---|
| Les chiffres de l'accueil, les liens LinkedIn et Instagram, l'adresse mail | `_config.yml` |
| La liste des entreprises « Ils sont passés au micro » | `_config.yml` |
| Ajouter ou modifier une interview | dossier `_interviews` |
| Publier un article | dossier `_posts` |
| La liste des écoles des formulaires | `_data/ecoles.yml` |
| Les offres de la page Entreprises | `_data/offres.yml` |
| Les thèmes (bas-carbone, énergie…) | `_data/themes.yml` |
| Le logo | `assets/img/logo.png` (et `logo-sombre.png` pour le mode sombre) |

## Modifier un fichier

1. Ouvre le fichier sur github.com.
2. Clique sur le crayon (« Edit this file ») en haut à droite.
3. Fais ta modification. Garde bien les guillemets et les espaces en début de ligne.
4. Clique sur « Commit changes », puis encore « Commit changes ».
5. Attends 1 à 2 minutes et recharge le site.

## Ajouter une interview

1. Ouvre `modeles/interview.md` et copie tout son contenu.
2. Va dans le dossier `_interviews`, clique sur « Add file » puis « Create new file ».
3. Nomme le fichier en minuscules avec des tirets, par exemple `prenom-nom-entreprise.md`.
4. Colle le modèle, remplis-le (titre, invité, lien YouTube, thème, numéro) et enregistre avec « Commit changes ».

La vignette de la vidéo s'affiche toute seule à partir du lien YouTube.

Si l'entreprise a payé pour le contenu, mets `partenaire: true` : la mention « Collaboration commerciale » s'affiche, comme la loi l'exige.

## Publier un article

1. Ouvre `modeles/article.md` et copie tout son contenu.
2. Va dans le dossier `_posts`, clique sur « Add file » puis « Create new file ».
3. Nomme le fichier `AAAA-MM-JJ-titre-court.md`, par exemple `2026-11-12-eiffage-route-studio.md`. La date est celle qui s'affiche sur le site. Une date dans le futur ne s'affiche pas.
4. Colle le modèle, écris l'article et enregistre.

## Brancher les formulaires

Les formulaires (vivier de stages, candidatures à l'équipe) ont besoin d'un service qui reçoit les réponses. Tant que ce n'est pas fait, ils affichent « Ouverture des inscriptions le 15 novembre 2026 ».

Avec Formspree (gratuit jusqu'à 50 réponses par mois) :

1. Crée un compte sur formspree.io avec l'adresse de l'association.
2. Clique sur « New form », nomme-le « Impact ESTP ».
3. Copie l'adresse du formulaire, qui ressemble à `https://formspree.io/f/abcdwxyz`.
4. Colle-la dans `_config.yml`, sur les lignes `formulaire_vivier` et `formulaire_equipe` (la même adresse convient pour les deux : chaque réponse indique de quel formulaire elle vient).

Les réponses arrivent par mail et dans le tableau de bord Formspree, d'où tu peux les exporter vers Excel.

## Brancher le nom de domaine impactestp.fr

1. Dans `_config.yml`, mets `url: "https://impactestp.fr"` et `baseurl: ""`.
2. Dans ce dépôt, va dans Settings, puis Pages, et écris `impactestp.fr` dans « Custom domain ».
3. Chez le vendeur du nom de domaine, ajoute les enregistrements DNS indiqués par GitHub (4 lignes de type A et une ligne CNAME pour `www`).
4. Une fois le domaine vérifié, coche « Enforce HTTPS ».

## Si quelque chose casse

- L'onglet « Actions » du dépôt montre chaque mise à jour du site. Une croix rouge veut dire qu'il y a une erreur dans la dernière modification, souvent un guillemet ou un espace oublié.
- Pour annuler : ouvre le fichier, clique sur « History », retrouve la version d'avant et recopie-la.
- Le site en ligne reste sur la dernière version qui fonctionnait tant que l'erreur n'est pas corrigée.

## Pour aller plus loin (technique)

Le site est construit avec Jekyll, le générateur intégré à GitHub Pages. Pour le tester sur un ordinateur : `bundle install` puis `bundle exec jekyll serve`.
