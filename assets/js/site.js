(function () {
  var langue = (document.documentElement.getAttribute('lang') || 'fr').slice(0, 2);

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
            // une carte peut avoir plusieurs thèmes séparés par des espaces (ex. « grands-projets studio »)
            return choix[k] === 'all' || (' ' + (c.getAttribute(attr[k]) || '') + ' ').indexOf(' ' + choix[k] + ' ') !== -1;
          });
          c.hidden = !show;
          if (show) n++;
        });
        afficherCompte(n);
      });
    });
  });

  // Nombre d'interviews affichées, dans la langue de la page (textes lus sur la balise #count)
  function afficherCompte(n) {
    if (!count) return;
    count.textContent = '';
    if (n > 0) {
      count.textContent = n + ' ' + (n > 1 ? count.getAttribute('data-plusieurs') : count.getAttribute('data-un'));
      return;
    }
    count.appendChild(document.createTextNode((count.getAttribute('data-aucune') || '') + ' '));
    // Aucun résultat avec le filtre « Publiées » : un bouton remet tous les statuts
    var tous = document.querySelector('.filters[data-group="statut"] button[data-filter="all"]');
    if (tous && choix.statut !== 'all') {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'count-reset';
      b.textContent = count.getAttribute('data-tous-statuts') || 'Voir tous les statuts';
      b.addEventListener('click', function () { tous.click(); });
      count.appendChild(b);
    }
  }

  // Filtres choisis dans l'adresse, par exemple /interviews/?langue=it ou ?statut=post-prod
  var params = new URLSearchParams(window.location.search);
  var filtreDansAdresse = false;
  Object.keys(choix).forEach(function (g) {
    var v = params.get(g);
    if (!v) return;
    var b = document.querySelector('.filters[data-group="' + g + '"] button[data-filter="' + v.replace(/[^a-z0-9-]/gi, '') + '"]');
    if (b) { b.click(); filtreDansAdresse = true; }
  });
  // Sans filtre dans l'adresse, la page Interviews s'ouvre sur les interviews publiées
  if (!filtreDansAdresse) {
    var publiees = document.querySelector('.filters[data-group="statut"] button[data-filter="publiee"]');
    if (publiees) publiees.click();
  }

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

  // Lecteur YouTube chargé seulement au clic, ou au clic sur un chapitre (démarre au bon moment)
  var lancer = function (p, debut) {
    var btn = p.querySelector('button');
    var f = document.createElement('iframe');
    f.src = 'https://www.youtube-nocookie.com/embed/' + p.getAttribute('data-youtube') + '?autoplay=1&rel=0' + (debut ? '&start=' + debut : '');
    f.title = (btn && btn.getAttribute('aria-label')) || p.getAttribute('data-titre') || 'Vidéo';
    f.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    f.allowFullscreen = true;
    p.innerHTML = '';
    p.appendChild(f);
  };
  document.querySelectorAll('.player[data-youtube]').forEach(function (p) {
    var btn = p.querySelector('button');
    // ?t=225 dans l'adresse (lien vers un chapitre depuis Google) : la vidéo démarre à ce moment-là
    var depart = parseInt(params.get('t'), 10) || 0;
    if (btn) btn.addEventListener('click', function () { lancer(p, depart); });
  });
  document.querySelectorAll('.chapters a[data-debut]').forEach(function (a) {
    var p = document.querySelector('.player[data-youtube]');
    if (!p) return;
    a.addEventListener('click', function (e) {
      e.preventDefault();
      lancer(p, parseInt(a.getAttribute('data-debut'), 10) || 0);
      p.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });

  // Objet du message prérempli depuis l'adresse, par exemple /contact/?objet=Lancer%20Impact%20dans%20mon%20%C3%A9cole
  var objet = document.getElementById('c-objet');
  if (objet) {
    var voulu = params.get('objet');
    if (voulu) {
      var trouve = Array.prototype.some.call(objet.options, function (o) {
        if (o.value.toLowerCase() === voulu.toLowerCase()) { o.selected = true; return true; }
        return false;
      });
      if (!trouve) {
        var opt = new Option(voulu.slice(0, 120), voulu.slice(0, 120), true, true);
        objet.add(opt, objet.options[1] || null);
      }
    }
    // ?offre=… (bouton « Postuler » d'une offre de stage) : l'offre est ajoutée au message et à l'objet du mail
    var offre = document.getElementById('c-offre');
    var offreVoulue = (params.get('offre') || '').slice(0, 160);
    if (offre && offreVoulue) offre.value = offreVoulue;
    var sujet = document.querySelector('#form-contact input[name="_subject"]');
    var majSujet = function () { if (sujet && objet.value) sujet.value = 'Impact ESTP, contact : ' + objet.value + (offreVoulue ? ' (' + offreVoulue + ')' : '') + (langue !== 'fr' ? ' (' + langue.toUpperCase() + ')' : ''); };
    objet.addEventListener('change', majSujet);
    majSujet();
  }

  // Liens vers d'autres sites (réseaux sociaux, YouTube, partenaires) ouverts dans un nouvel onglet
  document.querySelectorAll('a[href^="http"]').forEach(function (a) {
    if (a.hostname && a.hostname !== window.location.hostname) {
      a.target = '_blank';
      var rel = (a.getAttribute('rel') || '').split(' ').filter(Boolean);
      if (rel.indexOf('noopener') === -1) rel.push('noopener');
      a.setAttribute('rel', rel.join(' '));
    }
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
        err.textContent = form.getAttribute('data-err-fichier') || 'Un fichier dépasse 5 Mo. Enregistre-le en PDF plus léger et réessaie.';
        err.hidden = false;
        trop[0].focus();
      }
    });
  });

  // Parties dépliables : un lien vers #offres (ou un titre à l'intérieur) ouvre la bonne partie
  var ouvrirDepuisAdresse = function () {
    var id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    var cible = document.getElementById(id);
    if (!cible) return;
    var fold = cible.closest('details.fold');
    if (fold && !fold.open) {
      fold.open = true;
      cible.scrollIntoView({ block: 'start' });
    }
  };
  ouvrirDepuisAdresse();
  window.addEventListener('hashchange', ouvrirDepuisAdresse);

  var calme = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Chiffres de l'accueil qui défilent jusqu'à leur valeur
  if (!calme) {
    document.querySelectorAll('[data-count]').forEach(function (el) {
      var fin = parseInt(el.getAttribute('data-count'), 10);
      if (!fin || fin < 2) return;
      var texte = el.textContent;
      var debut = null;
      var duree = 1200;
      el.textContent = texte.replace(String(fin), '0');
      var pas = function (ts) {
        if (debut === null) debut = ts;
        var k = Math.min(1, (ts - debut) / duree);
        var v = Math.round(fin * (1 - Math.pow(1 - k, 3)));
        el.textContent = texte.replace(String(fin), String(v));
        if (k < 1) window.requestAnimationFrame(pas);
      };
      window.setTimeout(function () { window.requestAnimationFrame(pas); }, 450);
    });
  }

  // Sections de l'accueil qui apparaissent quand on fait défiler la page
  var aReveler = document.querySelectorAll('.reveal');
  if (!calme && aReveler.length && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('js-reveal');
    var obs = new IntersectionObserver(function (entrees) {
      entrees.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('vu'); obs.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    aReveler.forEach(function (el) { obs.observe(el); });
  }

  // Menu des langues : se referme avec Échap ou en cliquant ailleurs
  var menuLangue = document.querySelector('.lang-menu');
  if (menuLangue) {
    document.addEventListener('click', function (e) { if (menuLangue.open && !menuLangue.contains(e.target)) menuLangue.open = false; });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && menuLangue.open) { menuLangue.open = false; menuLangue.querySelector('summary').focus(); } });
  }
})();
