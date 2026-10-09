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
    if (!/^[A-Za-z0-9_-]{6,20}$/.test(p.getAttribute('data-youtube') || '')) return;
    var btn = p.querySelector('button');
    var f = document.createElement('iframe');
    f.src = 'https://www.youtube-nocookie.com/embed/' + p.getAttribute('data-youtube') + '?autoplay=1&rel=0' + (debut ? '&start=' + debut : '');
    f.title = (btn && btn.getAttribute('aria-label')) || p.getAttribute('data-titre') || 'Vidéo';
    f.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    f.allowFullscreen = true;
    p.replaceChildren();
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

  // Page « Merci » : texte adapté au formulaire envoyé (?formulaire=vivier, equipe, contact ou newsletter)
  var merci = document.getElementById('merci-texte');
  if (merci) {
    var envoye = params.get('formulaire');
    if (envoye && /^[a-z]+$/.test(envoye) && merci.getAttribute('data-' + envoye)) merci.textContent = merci.getAttribute('data-' + envoye);
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

  // Formulaires qui s'ouvrent tout seuls à une date (newsletter : « newsletter_ouverture » dans _config.yml)
  document.querySelectorAll('form[data-ouverture][action]').forEach(function (form) {
    var d = new Date();
    var auj = d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
    if (auj < form.getAttribute('data-ouverture')) return;
    var champs = form.querySelector(':scope > fieldset[disabled]');
    if (champs) champs.disabled = false;
    var note = form.querySelector('.form-closed');
    if (note) note.remove();
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
        return;
      }
      // Vivier : copie de l'inscription dans le Google Sheets privé de l'association (adresse « vivier_sheets » de _config.yml)
      var sheets = form.getAttribute('data-sheets');
      if (sheets && /^https:\/\/script\.google\.com\//.test(sheets) && navigator.sendBeacon) {
        var champs = new URLSearchParams();
        new FormData(form).forEach(function (v, k) {
          if (typeof v === 'string' && (k.charAt(0) !== '_' || k === '_honey')) champs.append(k, v);
        });
        try { navigator.sendBeacon(sheets, champs); } catch (x) {}
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

  // Bouton clair / sombre : le thème clair est celui par défaut, le choix est retenu dans ce navigateur
  var boutonTheme = document.querySelector('.theme-toggle');
  if (boutonTheme) {
    var racine = document.documentElement;
    boutonTheme.setAttribute('aria-pressed', racine.getAttribute('data-theme') === 'sombre' ? 'true' : 'false');
    boutonTheme.addEventListener('click', function () {
      var sombre = boutonTheme.getAttribute('aria-pressed') !== 'true';
      if (sombre) racine.setAttribute('data-theme', 'sombre'); else racine.removeAttribute('data-theme');
      boutonTheme.setAttribute('aria-pressed', sombre ? 'true' : 'false');
      var meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute('content', sombre ? '#0b1a1f' : '#eff5f1');
      try { window.localStorage.setItem('theme', sombre ? 'sombre' : 'clair'); } catch (e) {}
    });
  }

  // Menu du téléphone : bouton « Menu » qui ouvre et ferme la liste des pages
  var boutonMenu = document.querySelector('.menu-toggle');
  var navPrincipale = document.getElementById('nav-principale');
  if (boutonMenu && navPrincipale) {
    var basculerMenu = function (ouvrir) {
      navPrincipale.classList.toggle('ouvert', ouvrir);
      boutonMenu.setAttribute('aria-expanded', ouvrir ? 'true' : 'false');
      boutonMenu.setAttribute('aria-label', boutonMenu.getAttribute(ouvrir ? 'data-fermer' : 'data-ouvrir'));
    };
    boutonMenu.addEventListener('click', function () { basculerMenu(boutonMenu.getAttribute('aria-expanded') !== 'true'); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && boutonMenu.getAttribute('aria-expanded') === 'true') { basculerMenu(false); boutonMenu.focus(); }
    });
    window.addEventListener('resize', function () { if (window.innerWidth > 900) basculerMenu(false); });
  }

  // Fiches entreprises : les flèches du clavier passent à la fiche précédente ou suivante
  var ficheNav = document.querySelector('.co-nav');
  if (ficheNav) {
    document.addEventListener('keydown', function (e) {
      if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
      var cible = e.target;
      if (cible && (cible.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(cible.tagName))) return;
      var lien = e.key === 'ArrowLeft' ? ficheNav.querySelector('[rel="prev"]') : e.key === 'ArrowRight' ? ficheNav.querySelector('[rel="next"]') : null;
      if (lien) window.location.href = lien.href;
    });
  }

  // Petits menus « Ajouter à mon agenda » : se referment quand on clique ailleurs
  document.addEventListener('click', function (e) {
    document.querySelectorAll('details.add-cal[open]').forEach(function (d) { if (!d.contains(e.target)) d.open = false; });
  });

  // Agenda : dates du jour au format 2026-10-03, dans le fuseau du visiteur
  var isoJour = function (d) {
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  };
  var maintenant = new Date();
  var jour = isoJour(maintenant);
  var dansJours = function (n) { var d = new Date(maintenant); d.setDate(d.getDate() + n); return isoJour(d); };
  var sansAccents = function (txt) { return (txt || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''); };

  // Marque les évènements en cours et passés (le site n'est reconstruit qu'à chaque modification)
  document.querySelectorAll('.evt[data-fin], .next-evt[data-fin]').forEach(function (li) {
    var passe = li.getAttribute('data-fin') < jour;
    var enCours = !passe && li.getAttribute('data-debut') <= jour;
    li.classList.toggle('evt-passe', passe);
    var tNow = li.querySelector('.evt-now');
    var tPast = li.querySelector('.evt-past');
    if (tNow) tNow.hidden = !enCours;
    if (tPast) tPast.hidden = !passe;
  });

  // Accueil : les 3 prochains évènements seulement, et le prochain sous la dernière interview
  document.querySelectorAll('.evts[data-limite], .next-evts[data-limite]').forEach(function (liste) {
    var max = parseInt(liste.getAttribute('data-limite'), 10) || 3;
    var n = 0;
    liste.querySelectorAll(':scope > li').forEach(function (li) {
      var garder = !li.classList.contains('evt-passe') && n < max;
      li.hidden = !garder;
      if (garder) n++;
    });
    if (n === 0) { var bloc = liste.closest('section') || liste; bloc.hidden = true; }
  });

  // Agenda : filtres par type, thème, ville, date, recherche
  var agenda = document.getElementById('evt-liste');
  if (agenda) {
    var evts = agenda.querySelectorAll('.evt');
    var compteEvt = document.getElementById('evt-count');
    var filtresEvt = document.getElementById('evt-filtres');
    var etat = { type: 'all', theme: 'all', ville: 'all', periode: 'all', q: '', etudiants: false, gratuit: false, passes: false };
    var periodeOk = function (li) {
      var d = li.getAttribute('data-debut'), f = li.getAttribute('data-fin'), p = etat.periode;
      if (p === 'all') return true;
      if (p === '30' || p === '90') return d <= dansJours(parseInt(p, 10)) && f >= jour;
      return d.slice(0, 7) <= p && f.slice(0, 7) >= p;
    };
    var reinitialiser;
    var appliquer = function (majAdresse) {
      var n = 0, q = sansAccents(etat.q.trim());
      evts.forEach(function (li) {
        var passe = li.classList.contains('evt-passe');
        var types = ' ' + li.getAttribute('data-type') + ' ';
        var themes = ' ' + li.getAttribute('data-themes') + ' ';
        var ok = (etat.type === 'all' || types.indexOf(' ' + etat.type + ' ') !== -1)
          && (etat.theme === 'all' || themes.indexOf(' ' + etat.theme + ' ') !== -1)
          && (etat.ville === 'all' || li.getAttribute('data-ville') === etat.ville)
          && periodeOk(li)
          && (!q || sansAccents(li.getAttribute('data-texte')).indexOf(q) !== -1)
          && (!etat.etudiants || (li.getAttribute('data-public') !== 'professionnels' && li.getAttribute('data-entree') !== 'reserve-ecole'))
          && (!etat.gratuit || li.getAttribute('data-entree') === 'gratuit' || li.getAttribute('data-entree') === 'sur-inscription')
          && (etat.passes || !passe);
        li.hidden = !ok;
        if (ok && !passe) n++;
      });
      agenda.querySelectorAll('.evt-mois').forEach(function (m) {
        m.hidden = !m.querySelector('.evt:not([hidden])');
      });
      if (compteEvt) {
        compteEvt.textContent = '';
        var visibles = agenda.querySelectorAll('.evt:not([hidden])').length;
        if (visibles > 0) {
          compteEvt.textContent = n + ' ' + (n > 1 ? compteEvt.getAttribute('data-plusieurs') : compteEvt.getAttribute('data-un'));
        } else {
          compteEvt.appendChild(document.createTextNode(compteEvt.getAttribute('data-aucun') + ' '));
          var r = document.createElement('button');
          r.type = 'button';
          r.className = 'count-reset';
          r.textContent = compteEvt.getAttribute('data-reset');
          r.addEventListener('click', function () { reinitialiser(); });
          compteEvt.appendChild(r);
        }
      }
      if (majAdresse && window.history && window.history.replaceState) {
        var u = new URLSearchParams();
        ['type', 'theme', 'ville', 'periode'].forEach(function (k) { if (etat[k] !== 'all') u.set(k, etat[k]); });
        if (etat.q) u.set('q', etat.q);
        var qs = u.toString();
        window.history.replaceState(null, '', window.location.pathname + (qs ? '?' + qs : '') + window.location.hash);
      }
    };
    var boutonsType = filtresEvt.querySelectorAll('[data-evt="type"] button');
    var choisirType = function (v) {
      etat.type = v;
      boutonsType.forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-filter') === v ? 'true' : 'false'); });
    };
    boutonsType.forEach(function (b) {
      b.addEventListener('click', function () { choisirType(b.getAttribute('data-filter')); appliquer(true); });
    });
    filtresEvt.querySelectorAll('select[data-evt]').forEach(function (s) {
      s.addEventListener('change', function () { etat[s.getAttribute('data-evt')] = s.value; appliquer(true); });
    });
    var champQ = filtresEvt.querySelector('input[data-evt="q"]');
    if (champQ) champQ.addEventListener('input', function () { etat.q = champQ.value; appliquer(true); });
    filtresEvt.querySelectorAll('input[type="checkbox"][data-evt]').forEach(function (c) {
      c.addEventListener('change', function () { etat[c.getAttribute('data-evt')] = c.checked; appliquer(false); });
    });
    reinitialiser = function () {
      choisirType('all');
      ['theme', 'ville', 'periode'].forEach(function (k) { etat[k] = 'all'; var s = filtresEvt.querySelector('select[data-evt="' + k + '"]'); if (s) s.value = 'all'; });
      etat.q = ''; if (champQ) champQ.value = '';
      ['etudiants', 'gratuit'].forEach(function (k) { etat[k] = false; var c = filtresEvt.querySelector('input[data-evt="' + k + '"]'); if (c) c.checked = false; });
      appliquer(true);
    };
    // Mois déjà passés retirés de la liste « Quand »
    filtresEvt.querySelectorAll('select[data-evt="periode"] option').forEach(function (o) {
      if (/^\d{4}-\d{2}$/.test(o.value) && o.value < jour.slice(0, 7)) o.remove();
    });
    // Filtres choisis dans l'adresse, par exemple /evenements/?type=forum-etudiant&ville=paris
    var pa = new URLSearchParams(window.location.search);
    if (pa.get('type') && filtresEvt.querySelector('[data-evt="type"] button[data-filter="' + pa.get('type').replace(/[^a-z0-9-]/gi, '') + '"]')) choisirType(pa.get('type'));
    ['theme', 'ville', 'periode'].forEach(function (k) {
      var v = pa.get(k), s = filtresEvt.querySelector('select[data-evt="' + k + '"]');
      if (v && s && Array.prototype.some.call(s.options, function (o) { return o.value === v; })) { s.value = v; etat[k] = v; }
    });
    if (pa.get('q') && champQ) { champQ.value = pa.get('q').slice(0, 60); etat.q = champQ.value; }
    // Un lien vers un évènement passé (#evt-…) l'affiche quand même
    var cibleEvt = window.location.hash && document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
    if (cibleEvt && cibleEvt.classList.contains('evt-passe')) {
      etat.passes = true;
      var cp = filtresEvt.querySelector('input[data-evt="passes"]'); if (cp) cp.checked = true;
    }
    appliquer(false);
    // Nombre d'évènements à venir dans le titre de la partie
    var nAVenir = agenda.querySelectorAll('.evt:not(.evt-passe)').length;
    var pastille = document.querySelector('#agenda .fold-n');
    if (pastille) pastille.textContent = nAVenir;
    if (cibleEvt && cibleEvt.classList.contains('evt')) cibleEvt.scrollIntoView({ block: 'center' });
  }

  // Bouton « Apple, Outlook (.ics) » : fichier d'agenda créé dans le navigateur
  var echapperIcs = function (txt) { return (txt || '').replace(/\\/g, '\\\\').replace(/;/g, '\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n'); };
  document.querySelectorAll('.ics-link').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      var li = a.closest('.evt');
      var d = li.getAttribute('data-debut'), f = li.getAttribute('data-fin');
      var fin = new Date(f + 'T12:00:00'); fin.setDate(fin.getDate() + 1);
      var stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d+Z$/, 'Z');
      var lignes = [
        'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Impact ESTP//Agenda//FR', 'CALSCALE:GREGORIAN',
        'BEGIN:VEVENT',
        'UID:' + (a.getAttribute('data-uid') || d) + '@impactestp.fr',
        'DTSTAMP:' + stamp,
        'DTSTART;VALUE=DATE:' + d.replace(/-/g, ''),
        'DTEND;VALUE=DATE:' + isoJour(fin).replace(/-/g, ''),
        'SUMMARY:' + echapperIcs(a.getAttribute('data-titre')),
        'LOCATION:' + echapperIcs(a.getAttribute('data-lieu')),
        'DESCRIPTION:' + echapperIcs(a.getAttribute('data-desc') + (a.getAttribute('data-lien') ? ' ' + a.getAttribute('data-lien') : ''))
      ];
      if (a.getAttribute('data-lien')) lignes.push('URL:' + a.getAttribute('data-lien'));
      lignes.push('END:VEVENT', 'END:VCALENDAR');
      var blob = new Blob([lignes.join('\r\n') + '\r\n'], { type: 'text/calendar;charset=utf-8' });
      var url = URL.createObjectURL(blob);
      var lien = document.createElement('a');
      lien.href = url;
      lien.download = (a.getAttribute('data-uid') || 'evenement') + '.ics';
      document.body.appendChild(lien);
      lien.click();
      lien.remove();
      setTimeout(function () { URL.revokeObjectURL(url); }, 2000);
      var det = a.closest('details'); if (det) det.open = false;
    });
  });
  // Annuaire des entreprises (page Stages) : filtre par interview et par siège, tri A-Z / Z-A
  var coBox = document.getElementById('co-filtres');
  var coGrille = document.getElementById('co-grille');
  if (coBox && coGrille) {
    var coCount = document.getElementById('co-count');
    var coEtat = { stage: 'all', statut: 'all', zone: 'all', tri: 'az', q: '' };
    var coItems = Array.prototype.slice.call(coGrille.children);
    var coMaj = function () {
      var tries = coItems.slice().sort(function (a, b) {
        var r = a.getAttribute('data-nom').localeCompare(b.getAttribute('data-nom'), document.documentElement.lang || 'fr');
        return coEtat.tri === 'za' ? -r : r;
      });
      var n = 0;
      tries.forEach(function (li) {
        var ok = (coEtat.stage === 'all' || li.getAttribute('data-stage') === coEtat.stage) &&
          (coEtat.statut === 'all' || li.getAttribute('data-statut') === coEtat.statut) &&
          (coEtat.zone === 'all' || li.getAttribute('data-zone') === coEtat.zone) &&
          (!coEtat.q || sansAccents(li.getAttribute('data-nom')).indexOf(sansAccents(coEtat.q).trim()) !== -1);
        li.hidden = !ok;
        if (ok) n++;
        coGrille.appendChild(li);
      });
      if (coCount) {
        coCount.textContent = n ? n + ' ' + coCount.getAttribute(n > 1 ? 'data-plusieurs' : 'data-un') : coCount.getAttribute('data-aucun');
        if (!n) {
          var b = document.createElement('button');
          b.type = 'button'; b.className = 'count-reset'; b.textContent = coCount.getAttribute('data-reset');
          b.addEventListener('click', function () {
            coEtat.stage = 'all'; coEtat.statut = 'all'; coEtat.zone = 'all'; coEtat.q = '';
            coBox.querySelectorAll('.filters[data-co] button').forEach(function (x) { x.setAttribute('aria-pressed', x.getAttribute('data-filter') === 'all' ? 'true' : 'false'); });
            var z = coBox.querySelector('[data-co="zone"]'); if (z) z.value = 'all';
            var q = coBox.querySelector('[data-co="q"]'); if (q) q.value = '';
            coMaj();
          });
          coCount.appendChild(document.createTextNode(' '));
          coCount.appendChild(b);
        }
      }
    };
    coBox.querySelectorAll('.filters[data-co]').forEach(function (groupe) {
      var g = groupe.getAttribute('data-co');
      groupe.querySelectorAll('button').forEach(function (btn) {
        btn.addEventListener('click', function () {
          coEtat[g] = btn.getAttribute('data-filter');
          groupe.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-pressed', x === btn ? 'true' : 'false'); });
          coMaj();
        });
      });
    });
    var coQ = coBox.querySelector('[data-co="q"]');
    if (coQ) coQ.addEventListener('input', function () { coEtat.q = coQ.value; coMaj(); });
    ['zone', 'tri'].forEach(function (k) {
      var sel = coBox.querySelector('[data-co="' + k + '"]');
      if (sel) sel.addEventListener('change', function () { coEtat[k] = sel.value; coMaj(); });
    });
  }
  // Profils des étudiants qui cherchent un stage (page Entreprises) : filtres niveau, recherche, lieu, domaine
  var stuBox = document.getElementById('stu-filtres');
  var stuGrille = document.getElementById('stu-grille');
  if (stuBox && stuGrille) {
    var stuCount = document.getElementById('stu-count');
    var stuSelects = stuBox.querySelectorAll('select[data-stu]');
    var stuMaj = function () {
      var n = 0;
      Array.prototype.forEach.call(stuGrille.children, function (li) {
        var ok = Array.prototype.every.call(stuSelects, function (sel) {
          var k = sel.getAttribute('data-stu');
          // une carte peut avoir plusieurs valeurs séparées par des espaces (ex. lieu « france ile-de-france »)
          return sel.value === 'all' || (' ' + (li.getAttribute('data-' + k) || '') + ' ').indexOf(' ' + sel.value + ' ') !== -1;
        });
        li.hidden = !ok;
        if (ok) n++;
      });
      if (!stuCount) return;
      stuCount.textContent = n ? n + ' ' + stuCount.getAttribute(n > 1 ? 'data-plusieurs' : 'data-un') : stuCount.getAttribute('data-aucun');
      if (!n) {
        var b = document.createElement('button');
        b.type = 'button'; b.className = 'count-reset'; b.textContent = stuCount.getAttribute('data-reset');
        b.addEventListener('click', function () {
          stuSelects.forEach(function (sel) { sel.value = 'all'; });
          stuMaj();
        });
        stuCount.appendChild(document.createTextNode(' '));
        stuCount.appendChild(b);
      }
    };
    stuSelects.forEach(function (sel) { sel.addEventListener('change', stuMaj); });
  }
})();
