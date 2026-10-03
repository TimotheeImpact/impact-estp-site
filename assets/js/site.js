(function () {
  // Filtres par thème (page Interviews)
  var buttons = document.querySelectorAll('.filters button');
  var cards = document.querySelectorAll('#cards .card');
  var count = document.getElementById('count');
  buttons.forEach(function (b) {
    b.addEventListener('click', function () {
      var f = b.getAttribute('data-filter');
      var n = 0;
      buttons.forEach(function (o) { o.setAttribute('aria-pressed', o === b ? 'true' : 'false'); });
      cards.forEach(function (c) {
        var show = f === 'all' || c.getAttribute('data-theme-tag') === f;
        c.hidden = !show;
        if (show) n++;
      });
      if (count) count.textContent = n + (n > 1 ? ' interviews' : ' interview');
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
