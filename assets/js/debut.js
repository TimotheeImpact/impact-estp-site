// Chargé tout en haut de chaque page (dans <head>), avant l'affichage.
// Aucun script n'est écrit directement dans les pages : la politique de sécurité (CSP) les interdit.

(function () {
  var racine = document.documentElement;
  racine.className += ' js';

  // Thème : clair par défaut. Le bouton lune / soleil en haut à droite passe en sombre,
  // et ce choix est retenu dans le navigateur du visiteur (rien n'est envoyé ailleurs).
  var choix = null;
  try { choix = window.localStorage.getItem('theme'); } catch (e) {}
  if (choix === 'sombre') {
    racine.setAttribute('data-theme', 'sombre');
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', '#0b1a1f');
  }

  // Miniatures YouTube introuvables : on retire l'image pour laisser le fond de la carte
  document.addEventListener('error', function (e) {
    var img = e.target;
    if (img && img.tagName === 'IMG' && img.hasAttribute('data-retirer-si-erreur')) img.remove();
  }, true);

  // Le site ne doit pas être affiché dans le cadre d'un autre site (protection contre le « clickjacking »)
  if (window.top !== window.self) {
    try { window.top.location.replace(window.location.href); } catch (e) {}
  }
})();
