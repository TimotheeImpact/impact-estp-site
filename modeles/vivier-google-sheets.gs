/**
 * Impact ESTP : copie des inscriptions au vivier dans un Google Sheets privé.
 *
 * À coller dans Extensions > Apps Script du tableau Google Sheets de l'association,
 * puis Déployer > Nouveau déploiement > Application Web :
 *   - Exécuter en tant que : Moi
 *   - Qui a accès : Tout le monde
 * Copier l'adresse qui finit par /exec dans la ligne vivier_sheets de _config.yml.
 *
 * Protections : seules les colonnes ci-dessous sont gardées, textes coupés à 500 caractères,
 * robots ignorés (champ piège _honey), accord obligatoire, une seule ligne par e-mail
 * toutes les 10 minutes, 60 inscriptions par heure au maximum, formules neutralisées.
 */
var ONGLET = 'Vivier';
var COLONNES = ['date', 'ecole', 'ecole_autre', 'annee', 'specialite', 'recherche', 'disponibilite', 'email', 'langue_du_site', 'consentement'];
var LONGUEUR_MAX = 500;
var MAX_PAR_HEURE = 60;

function doPost(e) {
  var p = (e && e.parameters) || {};
  var valeur = function (c) { return String((p[c] || [''])[0] || ''); };
  if (valeur('_honey') !== '') return reponse();
  if (valeur('consentement') !== 'oui') return reponse();
  var email = valeur('email').trim().toLowerCase();
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return reponse();

  var cache = CacheService.getScriptCache();
  if (cache.get('mail:' + email)) return reponse();
  var verrou = LockService.getScriptLock();
  verrou.waitLock(10000);
  try {
    var heure = 'heure:' + Utilities.formatDate(new Date(), 'Etc/UTC', 'yyyyMMddHH');
    var compte = Number(cache.get(heure) || 0);
    if (compte >= MAX_PAR_HEURE) return reponse();
    cache.put(heure, String(compte + 1), 3600);
    cache.put('mail:' + email, '1', 600);

    var classeur = SpreadsheetApp.getActive();
    var feuille = classeur.getSheetByName(ONGLET) || classeur.insertSheet(ONGLET);
    if (feuille.getLastRow() === 0) feuille.appendRow(COLONNES);
    feuille.appendRow(COLONNES.map(function (c) {
      if (c === 'date') return new Date();
      var v = (p[c] || []).join(', ').slice(0, LONGUEUR_MAX);
      return /^[=+\-@\t\r]/.test(v) ? "'" + v : v;
    }));
  } finally {
    verrou.releaseLock();
  }
  return reponse();
}

function reponse() {
  return ContentService.createTextOutput('ok');
}
