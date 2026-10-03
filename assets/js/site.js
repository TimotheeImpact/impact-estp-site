(function () {
  // Filtres par langue et par thème (page Interviews), combinés
  var cards = document.querySelectorAll('#cards .card');
  var count = document.getElementById('count');
  var choix = { statut: 'all', langue: 'all', theme: 'all' };
  var attr = { statut: 'data-statut', langue: 'data-langue', theme: 'data-theme-tag' };
  document.querySelectorAll('.filters[data-group]:not([data-target])').forEach(function (group) {
    var g = group.getAttribute('data-group');
    var buttons = group.querySelectorAll('button');
    buttons.forEach(function (b) {
      b.addEventListener('click', function () {
        choix[g] = b.getAttribute('data-filter');
        buttons.forEach(function (o) { o.setAttribute('aria-pressed', o === b ? 'true' : 'false'); });
        var n = 0;
        cards.forEach(function (c) {
          var show = Object.keys(choix).every(function (k) {
            return choix[k] === 'all' || c.getAttribute(attr[k]) === choix[k];
          });
          c.hidden = !show;
          if (show) n++;
        });
        if (count) count.textContent = n === 0 ? 'Aucune interview pour ce choix' : n + (n > 1 ? ' interviews' : ' interview');
      });
    });
  });

  // Filtres choisis dans l'adresse, par exemple /interviews/?langue=it ou ?statut=post-prod
  var params = new URLSearchParams(window.location.search);
  Object.keys(choix).forEach(function (g) {
    var v = params.get(g);
    if (!v) return;
    var b = document.querySelector('.filters[data-group="' + g + '"] button[data-filter="' + v.replace(/[^a-z0-9-]/gi, '') + '"]');
    if (b) b.click();
  });

  // Filtre simple d'une liste (rubriques de la presse écrite)
  document.querySelectorAll('.filters[data-target]').forEach(function (group) {
    var g = group.getAttribute('data-group');
    var items = document.querySelectorAll(group.getAttribute('data-target') + ' > li');
    var buttons = group.querySelectorAll('button');
    buttons.forEach(function (b) {
      b.addEventListener('click', function () {
        var f = b.getAttribute('data-filter');
        buttons.forEach(function (o) { o.setAttribute('aria-pressed', o === b ? 'true' : 'false'); });
        items.forEach(function (li) { li.hidden = f !== 'all' && li.getAttribute('data-' + g) !== f; });
      });
    });
  });

  // Lecteur YouTube chargé seulement au clic
  document.querySelectorAll('.player[data-youtube]').forEach(function (p) {
    var btn = p.querySelector('button');
    btn.addEventListener('click', function () {
      var f = document.createElement('iframe');
      f.src = 'https://www.youtube-nocookie.com/embed/' + p.getAttribute('data-youtube') + '?autoplay=1&rel=0';
      f.title = btn.getAttribute('aria-label') || 'Vidéo';
      f.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      f.allowFullscreen = true;
      p.innerHTML = '';
      p.appendChild(f);
    });
  });

  // Champ « Si autre, laquelle ? » affiché seulement quand il sert
  document.querySelectorAll('select[data-autre]').forEach(function (s) {
    var champ = document.getElementById(s.getAttribute('data-autre') + '-champ');
    if (!champ) return;
    var maj = function () {
      var v = s.value || '';
      champ.hidden = !(v === 'Autre école' || v === "École à l'étranger" || v === 'Autre INSA' || v === 'Université (licence, master)');
    };
    s.addEventListener('change', maj);
    maj();
  });

  // Vérification de la taille des pièces jointes avant l'envoi
  document.querySelectorAll('form.js-form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      var err = form.querySelector('[data-err]');
      var trop = Array.prototype.filter.call(form.querySelectorAll('input[type="file"]'), function (input) {
        var max = parseFloat(input.getAttribute('data-max-mo') || '5') * 1024 * 1024;
        return input.files && input.files[0] && input.files[0].size > max;
      });
      if (trop.length && err) {
        e.preventDefault();
        err.textContent = 'Un fichier dépasse 5 Mo. Enregistre-le en PDF plus léger et réessaie.';
        err.hidden = false;
        trop[0].focus();
      }
    });
  });
})();
