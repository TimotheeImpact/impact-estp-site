---
layout: page
title: Legal notice
etiquette: Legal information
description: "Legal notice for the Impact ESTP website: publisher, publication director, host and intellectual property."
lang: en
---

In accordance with Article 6 of the French *loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique* (LCEN, the law of 21 June 2004 on confidence in the digital economy), here is the information about the publisher and the host of this website.

## Website publisher

The website is published by the association **{{ site.association }}**, a non-profit association governed by the French law of 1 July 1901 (*loi du 1er juillet 1901*).

- Registered office: {{ site.siege }}
- SIREN number: {{ site.siren }}
{%- if site.rna != "" %}
- RNA number: {{ site.rna }} (registered with the sub-prefecture of L'Haÿ-les-Roses on 21 May 2026)
{%- endif %}
{%- if site.telephone != "" %}
- Telephone: {{ site.telephone }}
{%- endif %}
{%- if site.email != "" %}
- Email: [{{ site.email }}](mailto:{{ site.email }})
{%- endif %}
{%- if site.linkedin != "" %}
- Contact: [Impact ESTP's LinkedIn page]({{ site.linkedin }})
{%- endif %}

## Publication director

{{ site.directeur_publication }}, {{ site.role_directeur_en }}.

## Hosting

The website is hosted by **GitHub, Inc.** (GitHub Pages service), 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, United States. Website: [github.com](https://github.com).

The videos are hosted by **YouTube** (Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland).

## Intellectual property

The texts, videos, photographs, logo and the Impact ESTP brand are the property of the association {{ site.association }}, unless otherwise stated. Any reproduction, in whole or in part, without prior written permission is prohibited.

The names and logos of the companies mentioned on this website belong to their respective owners. Their mention does not imply a partnership, except where one is indicated.

The name "ESTP" is used with the agreement of ESTP. Impact ESTP is an independent student association: the views expressed in our content do not commit either the school or our guests' companies.

## Sponsored content

When content is produced as part of a paid partnership, it is labelled "Commercial collaboration" ("Collaboration commerciale"), in accordance with the French *loi n° 2023-451 du 9 juin 2023* (the law of 9 June 2023 on commercial influence).

## Personal data and cookies

This website does not set any cookies{% if site.cloudflare_analytics != "" %}; it measures its audience with a cookie-free tool that cannot identify you{% else %} and does not use any audience measurement tool{% endif %}. Information sent through the forms is processed as explained in our [privacy policy]({{ '/en/confidentialite/' | relative_url }}).

## Credits

Archivo, Newsreader and IBM Plex Mono typefaces, under the SIL Open Font License.

*This is a translation provided for convenience. The French version prevails.*
