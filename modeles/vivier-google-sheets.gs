/**
 * Impact ESTP : copie des inscriptions au vivier dans un Google Sheets privé.
 *
 * À coller dans Extensions > Apps Script du tableau Google Sheets de l'association,
 * puis Déployer > Nouveau déploiement > Application Web :
 *   - Exécuter en tant que : Moi
 *   - Qui a accès : Tout le monde
 * Copier l'adresse qui finit par /exec dans la ligne vivier_sheets de _config.yml.
 *
 * Le script n'accepte que les colonnes ci-dessous, coupe les textes trop longs,
 * ignore les robots (champ piège _honey) et neutralise les formules (=, +, -, @).
 */
var ONGLET = 'Vivier';
var COLONNES = ['date', 'ecole', 'ecole_autre', 'annee', 'specialite', 'recherche', 'disponibilite', 'email', 'langue_du_site', 'consentement'];
var LONGUEUR_MAX = 500;

function doPost(e) {
  var verrou = LockService.getScriptLock();
  verrou.waitLock(10000);
  try {
    var p = (e && e.parameters) || {};
    if (p._honey && String(p._honey[0] || '') !== '') return reponse();
    if (!p.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(p.email[0]))) return reponse();

    var feuille = SpreadsheetApp.getActive().getSheetByName(ONGLET) || SpreadsheetApp.getActive().insertSheet(ONGLET);
    if (feuille.getLastRow() === 0) feuille.appendRow(COLONNES);

    var ligne = COLONNES.map(function (c) {
      if (c === 'date') return new Date();
      var v = (p[c] || []).join(', ').slice(0, LONGUEUR_MAX);
      return /^[=+\-@\t\r]/.test(v) ? "'" + v : v;
    });
    feuille.appendRow(ligne);
    return reponse();
  } finally {
    verrou.releaseLock();
  }
}

function reponse() {
  return ContentService.createTextOutput('ok');
}
