(function () {
  // Filtres par langue et par thème (page Interviews), combinés
  var cards = document.querySelectorAll('#cards .card');
  var count = document.getElementById('count');
  var choix = { langue: 'all', theme: 'all' };
  var attr = { langue: 'data-langue', theme: 'data-theme-tag' };
  document.querySelectorAll('.filters[data-group]').forEach(function (group) {
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

  // Envoi des formulaires sans quitter la page
  document.querySelectorAll('form.js-form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      var action = form.getAttribute('action');
      if (!action || !window.fetch) return;
      e.preventDefault();
      var ok = form.querySelector('[data-ok]');
      var err = form.querySelector('[data-err]');
      var btn = form.querySelector('button[type="submit"]');
      ok.hidden = true; err.hidden = true; btn.disabled = true;
      fetch(action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
        .then(function (r) {
          if (!r.ok) throw new Error(r.status);
          form.querySelector('fieldset.all').hidden = true;
          ok.hidden = false;
          ok.setAttribute('tabindex', '-1');
          ok.focus();
        })
        .catch(function () { err.hidden = false; btn.disabled = false; });
    });
  });
})();
