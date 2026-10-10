# Site Impact ESTP

Le site du média étudiant Impact ESTP. Il est publié gratuitement par GitHub Pages : chaque modification enregistrée ici met le site à jour toute seule, en 1 à 2 minutes.

Pas besoin de savoir coder. Tout se fait depuis le site github.com, dans ce dépôt.

## Où est quoi

| Je veux changer… | Fichier ou dossier |
|---|---|
| Les chiffres de l'accueil, les liens LinkedIn et Instagram, l'adresse mail | `_config.yml` |
| La liste des entreprises « Ils sont passés au micro » (nom, logo, fiche) | `_config.yml` |
| Les fiches entreprises (une page par entreprise, pour Google) | dossier `_entreprises` |
| Les offres de stage de la page Stages (ligne `source` : `impact` pour les offres trouvées par Impact, `jobteaser` pour une offre de l'ESTP publiée avec l'accord de l'entreprise, avec `categorie` : `ciblee`, `partenaire` ou `reseau`) | `_data/offres_stage.yml` |
| Les chiffres des offres de l'ESTP sur JobTeaser (74 ciblées, 20 partenaires, 9 réseau école au 10 octobre 2026) et la date du relevé | `_data/jobteaser.yml` |
| Le podcast : liens Spotify, Apple Podcasts…, chroniques audio | `_data/podcast.yml` (et la ligne `audio:` dans la fiche d'une interview pour l'ajouter à la page Podcast) |
| Les profils des étudiants qui cherchent un stage (page Entreprises) | dossier `_etudiants` |
| La newsletter de la page Presse (date d'ouverture des inscriptions, adresse d'envoi) | `_config.yml` (`newsletter_ouverture`, `formulaire_newsletter`) et la partie `newsletter` de `_data/textes/fr.yml`, `en.yml`, `it.yml`, `de.yml` |
| L'agenda des évènements (page Évènements et accueil) | `_data/evenements.yml` |
| Les objets proposés dans le formulaire de contact | `_data/textes/fr.yml` (partie `objets`, et la même dans `en.yml` et `it.yml`) |
| Ajouter ou modifier une interview | dossier `_interviews` |
| Publier un article | dossier `_posts` |
| La liste des écoles des formulaires | `_data/ecoles.yml` |
| Les offres de la page Entreprises | `_data/offres.yml` |
| Les rubriques et formats de la presse écrite | `_data/rubriques.yml`, `_data/formats.yml` |
| Le rendez-vous et la rédaction de la presse écrite, le slogan | `_config.yml` |
| Les témoignages de la page Entreprises | `_data/temoignages.yml` |
| La rédaction de la presse écrite (prénom et fonction) | `_config.yml` (`presse_redaction`) |
| L'équipe de l'association (page À propos : prénom, fonction, petite phrase drôle) | `_data/equipe.yml` |
| La page « Mon profil » (espace membre, pas encore ouvert) | `mon-profil/index.html` |
| Les thèmes (bas-carbone, énergie…) | `_data/themes.yml` |
| Le logo | `assets/img/logo.png` (et `logo-sombre.png` pour le mode sombre, que le visiteur choisit avec le bouton lune en haut à droite ; le site s'ouvre toujours en clair) |
| Les textes des menus, boutons et pages, en français, anglais, italien et allemand | `_data/textes/fr.yml`, `en.yml`, `it.yml`, `de.yml` |
| Les traductions des interviews et des fiches entreprises | dossiers `_interviews_en`, `_interviews_it`, `_interviews_de`, `_entreprises_en`, `_entreprises_it`, `_entreprises_de` |

## Le site en quatre langues

Le site existe en français (`impactestp.fr`), en anglais (`impactestp.fr/en/`), en italien (`impactestp.fr/it/`) et en allemand (`impactestp.fr/de/`). Le petit drapeau en haut à droite permet de changer de langue sur la même page.

- Les textes des menus, boutons et pages sont dans `_data/textes/fr.yml`, `en.yml`, `it.yml` et `de.yml`. Ces quatre fichiers ont exactement les mêmes lignes : si tu changes une phrase en français, change la même ligne dans les trois autres.
- Dans les autres fichiers de `_data` et dans `_config.yml`, une ligne qui finit par `_en`, `_it` ou `_de` est la traduction de la ligne du même nom. Si elle est vide ou absente, le texte français s'affiche.
- Une interview ou une fiche entreprise se traduit dans un fichier du même nom, dans `_interviews_en`, `_interviews_it` ou `_interviews_de` (et pareil pour `_entreprises`). Ce fichier ne contient que les lignes traduites (titre, poste, présentation, chapitres…). Le reste (lien YouTube, logo, LinkedIn) est repris de la version française. Sans traduction, la page traduite affiche la version française.
- Les articles de la presse écrite restent en français.
- Les réponses aux formulaires envoyées depuis une version traduite arrivent avec « (EN) », « (IT) » ou « (DE) » à la fin de l'objet du mail.

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

`linkedin: "https://www.linkedin.com/in/..."` : le profil LinkedIn de l'invité s'affiche sur la fiche de l'interview et sur la fiche de son entreprise.

La page Interviews s'ouvre sur les interviews publiées. Pour ouvrir directement toutes les interviews : `/interviews/?statut=all`.

### Chapitres, résumé et Google

- `entreprise_id: nge` relie l'interview à la fiche `_entreprises/nge.md` (lien dans la fiche de l'interview, et l'interview s'affiche sur la page de l'entreprise).
- `date_publication: 2026-09-20` (date de sortie sur YouTube) : avec elle, Google comprend que la page contient une vidéo et peut l'afficher dans les résultats.
- `chapitres:` : la liste des moments clés, comme dans la description YouTube. Sur le site, chaque chapitre est cliquable et lance la vidéo au bon moment ; Google peut aussi les afficher.
- Le résumé détaillé s'écrit sous la présentation, dans une partie `## Résumé détaillé` (voir `modeles/interview.md`).

## Ajouter une fiche entreprise

1. Va dans le dossier `_entreprises`, ouvre une fiche existante (par exemple `nge.md`) et copie son contenu.
2. Crée un nouveau fichier dans `_entreprises`, nommé en minuscules avec des tirets (`nom-entreprise.md`).
3. Remplis le nom, le secteur, le site web, la page Wikipédia (`wikipedia:`, avec si besoin `wikipedia_en:`, `wikipedia_it:` et `wikipedia_de:` pour les autres langues), la ville du siège social (`siege:`, par exemple `Paris`) et sa zone (`zone:`, par exemple `ile-de-france`, `hauts-de-france`, `italie`, `canada` : la liste est dans `_data/textes/fr.yml`, partie `annuaire`, `zones`), et le nom du fichier du logo (déposé dans `assets/img/logos`). Laisse vide ce que tu ne sais pas.
   Dans les pages Stages et Entreprises, l'annuaire se trie de A à Z ou de Z à A, et se filtre par relation avec Impact, par statut de l'interview et par zone du siège.
4. Ajoute un fun fact, affiché en haut de la fiche dans un encadré « Le savais-tu ? » : `fun_fact:` (une phrase courte et vérifiée) et, si tu l'as, `fun_fact_source:` (le lien de la source). Dans les fiches traduites (`_entreprises_en`, `_it`, `_de`), mets seulement `fun_fact:` traduit.
5. Si l'entreprise est partenaire d'Impact, ajoute `partenaire: true` (elle l'est aussi automatiquement si une de ses interviews a `partenaire: true`).
6. Dans les interviews de cette entreprise, ajoute `entreprise_id: nom-entreprise`.

Le filtre « Relation » de l'annuaire se remplit tout seul : « Réseau Impact » = au moins une interview (tournée ou prévue), « Partenaires » = `partenaire: true`, « Présentes sur le site » = une fiche sans interview, par exemple une entreprise dont on relaie seulement les offres. Un bouton n'apparaît que s'il compte au moins une entreprise.

## Ajouter une offre de stage

Ouvre `_data/offres_stage.yml` : un exemple commenté montre les lignes à remplir (titre, entreprise, lieu, durée, début, lien). Enlève les `#` devant le bloc, remplis-le, enregistre. L'offre s'affiche sur la page Stages et sur la fiche de l'entreprise.

Les offres de l'ESTP sur JobTeaser ne sont publiées ici qu'avec l'accord écrit de l'entreprise (les conditions d'utilisation de JobTeaser interdisent de les recopier sans autorisation). Avec cet accord, ajoute l'offre avec `source: "jobteaser"` et sa `categorie`. Pense aussi à mettre à jour les chiffres et la date dans `_data/jobteaser.yml`.

Pour le lien, trois possibilités : un lien vers l'annonce de l'entreprise (`https://...`), un lien vers le formulaire de contact avec l'objet déjà choisi (`/contact/?objet=Stage&offre=Nom de l'offre`, comme l'offre de Toits Temporaires Urbains), ou rien (le bouton renvoie alors vers le vivier).

## Ajouter un étudiant qui cherche un stage

Les profils des étudiants s'affichent dans la page Entreprises, partie « Les étudiants qui cherchent un stage ». Les entreprises les filtrent par niveau, type de stage, lieu et domaine, puis passent par le formulaire de contact : aucun e-mail ni téléphone n'est affiché.

1. Demande son accord écrit à l'étudiant (c'est obligatoire : son profil sera public).
2. Copie `_etudiants/eric-g.md` dans un nouveau fichier du dossier `_etudiants`, nommé en minuscules avec des tirets (`prenom-initiale.md`).
3. Remplis les lignes. Les mots en minuscules servent aux filtres et doivent être choisis dans la liste de `_data/textes_etudiants/fr.yml` :
   - `niveau:` `bac3`, `m1`, `m2` ou `diplome` ;
   - `recherche:` `ouvrier`, `assistant`, `tfe`, `alternance`, `cesure` ou `emploi` ;
   - `lieu:` `ile-de-france`, `france`, `international` ou `partout` ;
   - `domaines:` `batiment`, `travaux-publics`, `genie-civil`, `energie`, `amenagement` (plusieurs : sépare-les par une espace).
4. `sigles:` est la liste des abréviations expliquées en bas du profil (GECD, TFE…).
5. Pour traduire le profil, crée un fichier du même nom dans `_etudiants_en`, `_etudiants_it` ou `_etudiants_de` avec seulement les lignes traduites (titre, accroche, présentation, points forts, sigles). Sans traduction, la version française s'affiche.

Dans l'annuaire des entreprises (page Stages), un filtre « Offre de stage en cours » et une recherche par nom aident les étudiants à trouver les entreprises qui recrutent. Une entreprise y apparaît dès qu'elle a une offre dans `_data/offres_stage.yml`.

Les mots affichés dans cette partie (titres, étiquettes, libellés des filtres) sont dans `_data/textes_etudiants/fr.yml`, `en.yml`, `it.yml`, `de.yml`, et son habillage dans `assets/css/etudiants.css`.

## L'agenda des évènements

La page Évènements (`/evenements/`) liste les salons, forums étudiants et conférences de la construction et de l'énergie, avec des filtres par type, thème, ville, date et une recherche. Les trois prochains s'affichent aussi sur l'accueil.

- Pour ajouter un évènement, ouvre `_data/evenements.yml` : le modèle commenté en haut montre les lignes à remplir. Les dates s'écrivent `année-mois-jour`.
- Un évènement organisé par Impact : ajoute `impact: true`. Il apparaît aussi dans la partie « Nos évènements », avec un badge vert.
- Les évènements passés se masquent tout seuls (le visiteur peut les revoir avec « Voir aussi les évènements passés »).
- Chaque évènement a un bouton « Ajouter à mon agenda » (Google Agenda, ou fichier pour Apple et Outlook).
- Quand tu vérifies l'agenda, change la date `evenements_verifies` dans `_config.yml` : elle s'affiche sous la liste.
- Lien direct vers une sélection : `/evenements/?type=forum-etudiant`, `/evenements/?ville=lyon`, `/evenements/?theme=energie`.

## Sur téléphone

Sur téléphone et tablette, les pages sont rangées derrière le bouton « Menu » en haut à droite. Le site peut aussi s'installer comme une application : dans le navigateur du téléphone, « Ajouter à l'écran d'accueil » pose l'icône Impact (fichier `manifest.webmanifest`, icônes `assets/img/icon-*.png`). Le bouton « Installer l'appli » (pied de page et menu du téléphone) ouvre directement la fenêtre d'installation sur Chrome, Edge et Android ; ailleurs, il mène à la page `/appli/`, qui explique comment faire sur iPhone, Android et ordinateur. Il disparaît quand le site est ouvert depuis l'appli.

## Animation de l'accueil et parties dépliables

À l'arrivée sur l'accueil, le titre et la dernière interview apparaissent en glissant, les chiffres défilent jusqu'à leur valeur et les logos des invités défilent en continu (pause au survol). Rien ne bouge pour les personnes qui ont réglé leur appareil sur « réduire les animations ».

Pour mettre un court extrait vidéo muet en boucle à la place de la vignette de la dernière interview : dépose un fichier `.mp4` de 10 à 15 secondes (moins de 3 Mo) dans `assets/video/` et mets son chemin sur la ligne `accueil_clip` de `_config.yml`, par exemple `accueil_clip: "/assets/video/extrait.mp4"`. La vidéo YouTube, elle, ne se lance pas toute seule : elle déposerait des cookies, et le site devrait alors afficher un bandeau de consentement.

Sur les pages Stages, Évènements, Presse, Entreprises, Groupe Impact et À propos, chaque partie s'ouvre et se referme en cliquant sur la flèche. La première est ouverte au chargement. Un lien vers une partie (par exemple `/stages/#offres`) l'ouvre directement.

## Publier un article

1. Ouvre `modeles/article.md` et copie tout son contenu.
2. Va dans le dossier `_posts`, clique sur « Add file » puis « Create new file ».
3. Nomme le fichier `AAAA-MM-JJ-titre-court.md`, par exemple `2026-11-12-eiffage-route-studio.md`. La date est celle qui s'affiche sur le site. Une date dans le futur ne s'affiche pas.
4. Colle le modèle, choisis la rubrique et le format, écris l'article et enregistre.

Le site ne se reconstruit qu'à chaque enregistrement : pour une parution le mardi à 18h, enregistre l'article le mardi à 18h (un article daté dans le futur et enregistré à l'avance ne s'affichera pas tout seul).

## Brancher les formulaires

Les formulaires (vivier de stages, candidatures à l'équipe avec CV, contact avec 2 pièces jointes) passent par FormSubmit (formsubmit.co) : gratuit, sans compte, pièces jointes acceptées (5 Mo maximum par fichier). Les réponses arrivent par mail, CV en pièce jointe.

1. Dans `_config.yml`, mets `https://formsubmit.co/` suivi de l'adresse qui doit recevoir les réponses, sur les lignes `formulaire_equipe` et `formulaire_contact` (et `formulaire_vivier` le jour de l'ouverture du vivier). Le site utilise déjà le code secret FormSubmit de contact@impactestp.fr (reçu le 4 octobre 2026) : `https://formsubmit.co/febc6e870cbdd2c6fed4d33857abdbcf`. Le jour de l'ouverture du vivier, recopie la même adresse sur la ligne `formulaire_vivier`.
2. Envoie une première réponse de test depuis le site. FormSubmit envoie un mail « Activate form » à cette adresse : clique sur le bouton pour activer.
3. Dans ce mail, FormSubmit donne aussi un code secret qui remplace l'adresse (pour ne pas l'afficher dans le code du site). Remplace l'adresse par ce code : `https://formsubmit.co/le-code-recu`.

Tant qu'une ligne est vide, le formulaire correspondant reste fermé avec un message d'attente.

## Le vivier dans Google Sheets

En plus du mail FormSubmit, chaque inscription au vivier peut s'ajouter toute seule comme une ligne dans un tableau Google Sheets privé (accord écrit de Timo le 4 octobre 2026). Tant que la ligne `vivier_sheets` de `_config.yml` est vide, rien n'est envoyé vers Google.

1. Avec le compte Google de l'association, crée un tableau Google Sheets (par exemple « Vivier Impact ESTP »). Ne le partage qu'avec le bureau.
2. Dans le tableau : Extensions > Apps Script. Efface le code proposé et colle tout le fichier `modeles/vivier-google-sheets.gs`. Enregistre.
3. Déployer > Nouveau déploiement > type « Application Web ». Exécuter en tant que : Moi. Qui a accès : Tout le monde. Clique sur Déployer, puis autorise l'accès (Google affiche « application non validée » : Paramètres avancés, puis Accéder au projet).
4. Copie l'adresse qui finit par `/exec` et colle-la dans `_config.yml` : `vivier_sheets: "https://script.google.com/macros/s/…/exec"`.
5. Le jour où le vivier ouvre (ligne `formulaire_vivier` remplie), chaque inscription arrive dans l'onglet « Vivier » : date, école, année, spécialité, recherche, disponibilité, e-mail, langue du site, accord.

La page Confidentialité affiche toute seule la phrase sur Google Sheets dès que `vivier_sheets` est rempli. Le script refuse les robots (champ piège), coupe les textes trop longs et neutralise les formules.

## Le nom de domaine impactestp.fr

Branché le 3 octobre 2026 : le fichier `CNAME` du dépôt contient `impactestp.fr`, et `_config.yml` a `url: "https://impactestp.fr"` et `baseurl: ""`. Chez OVH, la zone DNS a 4 lignes A sans sous-domaine (185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153) et une ligne CNAME `www` vers `timotheeimpact.github.io.`. Ne supprime pas les lignes MX, SPF et DKIM : elles servent aux e-mails.

## Si quelque chose casse

- L'onglet « Actions » du dépôt montre chaque mise à jour du site. Une croix rouge veut dire qu'il y a une erreur dans la dernière modification, souvent un guillemet ou un espace oublié.
- Pour annuler : ouvre le fichier, clique sur « History », retrouve la version d'avant et recopie-la.
- Le site en ligne reste sur la dernière version qui fonctionnait tant que l'erreur n'est pas corrigée.

## Pour aller plus loin (technique)

Le site est construit avec Jekyll, le générateur intégré à GitHub Pages. Pour le tester sur un ordinateur : `bundle install` puis `bundle exec jekyll serve`.

### Sécurité

- Le site n'a ni base de données ni mot de passe : il n'y a rien à pirater côté serveur. Les formulaires passent par FormSubmit (et Google Sheets pour le vivier).
- Une politique de sécurité (CSP, dans `_layouts/default.html`) interdit au navigateur de charger quoi que ce soit qui ne vient pas du site ou des services listés (YouTube sans cookies, FormSubmit, Google Apps Script, Cloudflare). Si on ajoute un service, il faut l'ajouter dans cette ligne, sinon il sera bloqué.
- Aucun script ni style n'est écrit directement dans les pages : tout est dans `assets/js/debut.js` (chargé en premier : thème, miniatures), `assets/js/site.js` et `assets/css/site.css`. Pour un espacement ponctuel, utiliser les petites classes `mt-14`, `mt-28`, etc.
- Adresse pour signaler une faille : `/.well-known/security.txt` (date d'expiration à repousser chaque année, avant le 1er octobre).
