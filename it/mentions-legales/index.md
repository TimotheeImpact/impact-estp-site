---
layout: page
title: Note legali
etiquette: Informazioni legali
description: "Note legali del sito Impact ESTP: editore, direttore della pubblicazione, hosting e proprietà intellettuale."
lang: it
---

Ai sensi dell'articolo 6 della legge n. 2004-575 del 21 giugno 2004 per la fiducia nell'economia digitale (loi pour la confiance dans l'économie numérique, LCEN), ecco le informazioni sull'editore e sul fornitore di hosting di questo sito.

## Editore del sito

Il sito è pubblicato dall'associazione **{{ site.association }}**, associazione disciplinata dalla legge francese del 1° luglio 1901 (loi du 1er juillet 1901).

- Sede legale: {{ site.siege }}
- Numero SIREN: {{ site.siren }}
{%- if site.rna != "" %}
- Numero RNA: {{ site.rna }} (dichiarata presso la sottoprefettura di L'Haÿ-les-Roses il 21 maggio 2026)
{%- endif %}
{%- if site.telephone != "" %}
- Telefono: {{ site.telephone }}
{%- endif %}
{%- if site.email != "" %}
- E-mail: [{{ site.email }}](mailto:{{ site.email }})
{%- endif %}
{%- if site.linkedin != "" %}
- Contatto: [pagina LinkedIn di Impact ESTP]({{ site.linkedin }})
{%- endif %}

## Direttore della pubblicazione

{{ site.directeur_publication }}, {{ site.role_directeur_it }}.

## Hosting

Il sito è ospitato da **GitHub, Inc.** (servizio GitHub Pages), 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, Stati Uniti. Sito web: [github.com](https://github.com).

I video sono ospitati da **YouTube** (Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irlanda).

## Proprietà intellettuale

I testi, i video, le fotografie, il logo e il marchio Impact ESTP sono di proprietà dell'associazione {{ site.association }}, salvo diversa indicazione. È vietata qualsiasi riproduzione, totale o parziale, senza previa autorizzazione scritta.

I nomi e i loghi delle aziende citate su questo sito appartengono ai rispettivi proprietari. La loro menzione non implica una partnership, salvo quando questa è indicata.

Il nome «ESTP» è utilizzato con il consenso dell'ESTP. Impact ESTP è un'associazione studentesca indipendente: le opinioni espresse nei nostri contenuti non impegnano né la scuola né le aziende degli ospiti.

## Contenuti sponsorizzati

Quando un contenuto è realizzato nell'ambito di una partnership retribuita, riporta la dicitura «Collaborazione commerciale», ai sensi della legge francese n. 2023-451 del 9 giugno 2023 sull'influenza commerciale (loi n° 2023-451 du 9 juin 2023).

## Dati personali e cookie

Questo sito non installa alcun cookie{% if site.cloudflare_analytics != "" %}; misura la sua audience con uno strumento senza cookie che non permette di identificarti{% else %} e non utilizza alcuno strumento di misurazione dell'audience{% endif %}. Le informazioni inviate tramite i moduli sono trattate come spiegato nella nostra [informativa sulla privacy]({{ '/it/confidentialite/' | relative_url }}).

## Crediti

Caratteri tipografici Archivo, Newsreader e IBM Plex Mono, con licenza SIL Open Font License.

*Traduzione fornita per comodità. Fa fede la versione francese.*
