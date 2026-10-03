# Site Impact ESTP

Le site du média étudiant Impact ESTP. Il est publié gratuitement par GitHub Pages : chaque modification enregistrée ici met le site à jour toute seule, en 1 à 2 minutes.

Pas besoin de savoir coder. Tout se fait depuis le site github.com, dans ce dépôt.

## Où est quoi

| Je veux changer… | Fichier ou dossier |
|---|---|
| Les chiffres de l'accueil, les liens LinkedIn et Instagram, l'adresse mail | `_config.yml` |
| La liste des entreprises « Ils sont passés au micro » (nom, logo, fiche) | `_config.yml` |
| Les fiches entreprises (une page par entreprise, pour Google) | dossier `_entreprises` |
| Les offres de stage de la page Stages | `_data/offres_stage.yml` |
| Les objets proposés dans le formulaire de contact | `contact/index.html` |
| Ajouter ou modifier une interview | dossier `_interviews` |
| Publier un article | dossier `_posts` |
| La liste des écoles des formulaires | `_data/ecoles.yml` |
| Les offres de la page Entreprises | `_data/offres.yml` |
| Les rubriques et formats de la presse écrite | `_data/rubriques.yml`, `_data/formats.yml` |
| Le rendez-vous et la rédaction de la presse écrite, le slogan | `_config.yml` |
| Les témoignages de la page Entreprises | `_data/temoignages.yml` |
| La page « Mon profil » (espace membre, pas encore ouvert) | `mon-profil/index.html` |
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

Une interview pas encore en ligne a deux statuts possibles :
- tournée mais en montage : `post_prod: true` (badge « En post-production ») ;
- pas encore tournée : `a_venir: true` (badge « Tournage à venir »).
Le jour de la sortie, enlève cette ligne et colle le lien YouTube. Les chiffres de l'accueil se mettent à jour tout seuls.

Lien direct vers une sélection : `/interviews/?langue=it`, `/interviews/?statut=post-prod`, `/interviews/?theme=energie`, `/interviews/?theme=studio`.

Lien direct vers le formulaire de contact avec l'objet déjà choisi : `/contact/?objet=Lancer Impact dans mon école`.

Si l'entreprise a payé pour le contenu, mets `partenaire: true` : la mention « Collaboration commerciale » s'affiche, comme la loi l'exige.

Interview tournée en studio : ajoute `studio: true`, elle apparaît aussi dans le filtre « En studio ».

### Chapitres, résumé et Google

- `entreprise_id: nge` relie l'interview à la fiche `_entreprises/nge.md` (lien dans la fiche de l'interview, et l'interview s'affiche sur la page de l'entreprise).
- `date_publication: 2026-09-20` (date de sortie sur YouTube) : avec elle, Google comprend que la page contient une vidéo et peut l'afficher dans les résultats.
- `chapitres:` : la liste des moments clés, comme dans la description YouTube. Sur le site, chaque chapitre est cliquable et lance la vidéo au bon moment ; Google peut aussi les afficher.
- Le résumé détaillé s'écrit sous la présentation, dans une partie `## Résumé détaillé` (voir `modeles/interview.md`).

## Ajouter une fiche entreprise

1. Va dans le dossier `_entreprises`, ouvre une fiche existante (par exemple `nge.md`) et copie son contenu.
2. Crée un nouveau fichier dans `_entreprises`, nommé en minuscules avec des tirets (`nom-entreprise.md`).
3. Remplis le nom, le secteur, le site web, et le nom du fichier du logo (déposé dans `assets/img/logos`). Laisse vide ce que tu ne sais pas.
4. Dans les interviews de cette entreprise, ajoute `entreprise_id: nom-entreprise`.

## Ajouter une offre de stage

Ouvre `_data/offres_stage.yml` : un exemple commenté montre les lignes à remplir (titre, entreprise, lieu, durée, début, lien). Enlève les `#` devant le bloc, remplis-le, enregistre. L'offre s'affiche sur la page Stages et sur la fiche de l'entreprise.

## Publier un article

1. Ouvre `modeles/article.md` et copie tout son contenu.
2. Va dans le dossier `_posts`, clique sur « Add file » puis « Create new file ».
3. Nomme le fichier `AAAA-MM-JJ-titre-court.md`, par exemple `2026-11-12-eiffage-route-studio.md`. La date est celle qui s'affiche sur le site. Une date dans le futur ne s'affiche pas.
4. Colle le modèle, choisis la rubrique et le format, écris l'article et enregistre.

Le site ne se reconstruit qu'à chaque enregistrement : pour une parution le mardi à 18h, enregistre l'article le mardi à 18h (un article daté dans le futur et enregistré à l'avance ne s'affichera pas tout seul).

## Brancher les formulaires

Les formulaires (vivier de stages, candidatures à l'équipe avec CV, contact) passent par FormSubmit (formsubmit.co) : gratuit, sans compte, pièces jointes acceptées. Les réponses arrivent par mail, CV en pièce jointe.

1. Dans `_config.yml`, mets `https://formsubmit.co/` suivi de l'adresse qui doit recevoir les réponses, sur les lignes `formulaire_equipe` et `formulaire_contact` (et `formulaire_vivier` le jour de l'ouverture du vivier). Exemple : `formulaire_equipe: "https://formsubmit.co/contact@impactestp.fr"`.
2. Envoie une première réponse de test depuis le site. FormSubmit envoie un mail « Activate form » à cette adresse : clique sur le bouton pour activer.
3. Dans ce mail, FormSubmit donne aussi un code secret qui remplace l'adresse (pour ne pas l'afficher dans le code du site). Remplace l'adresse par ce code : `https://formsubmit.co/le-code-recu`.

Tant qu'une ligne est vide, le formulaire correspondant reste fermé avec un message d'attente.

## Le nom de domaine impactestp.fr

Branché le 3 octobre 2026 : le fichier `CNAME` du dépôt contient `impactestp.fr`, et `_config.yml` a `url: "https://impactestp.fr"` et `baseurl: ""`. Chez OVH, la zone DNS a 4 lignes A sans sous-domaine (185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153) et une ligne CNAME `www` vers `timotheeimpact.github.io.`. Ne supprime pas les lignes MX, SPF et DKIM : elles servent aux e-mails.

## Si quelque chose casse

- L'onglet « Actions » du dépôt montre chaque mise à jour du site. Une croix rouge veut dire qu'il y a une erreur dans la dernière modification, souvent un guillemet ou un espace oublié.
- Pour annuler : ouvre le fichier, clique sur « History », retrouve la version d'avant et recopie-la.
- Le site en ligne reste sur la dernière version qui fonctionnait tant que l'erreur n'est pas corrigée.

## Pour aller plus loin (technique)

Le site est construit avec Jekyll, le générateur intégré à GitHub Pages. Pour le tester sur un ordinateur : `bundle install` puis `bundle exec jekyll serve`.
