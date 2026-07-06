# Handoff: Landing Page Personnelle — Louis Burette

## Overview
Landing page personnelle pour Louis Burette (Product Builder freelance / fondateur d'Autorise.ai). Objectif double : décrocher des missions freelance one-shot ET susciter l'intérêt d'entreprises pour du consulting long terme ou une embauche. Ton brutaliste, direct, assumé — pas un site "portfolio générique".

## About the Design Files
Les fichiers de ce dossier sont des **références de design créées en HTML** (prototype fonctionnel, pas du code de production). Le fichier `reference/Louis Burette.dc.html` tourne dans un outil d'édition propriétaire (balises `<x-dc>`, `<sc-for>`, `<sc-if>`, attributs `{{ }}`, `<image-slot>`, `support.js`) — **ne pas copier ces balises telles quelles**. La tâche est de **recréer** ce design dans l'environnement cible (recommandé : Next.js ou Astro pour du SSR/SEO propre, sinon tout framework déjà en place) avec du HTML/CSS/JS standard, en gardant fidèlement la mise en page, les couleurs, la typographie et les interactions décrites ci-dessous.

## Fidélité
**Haute fidélité (hifi)** : couleurs, typographie, espacements et interactions sont définitifs. Recréer pixel-perfect.

## Système visuel

### Typographie
- **Titres / citations** : `DM Serif Display` (serif, avec variante italique utilisée pour les citations narratives). Chargée via Google Fonts : `family=DM+Serif+Display:ital@0;1`
- **UI / corps de texte** : `Space Grotesk` (sans-serif), poids 300/400/500/600/700. Chargée via Google Fonts : `family=Space+Grotesk:wght@300;400;500;600;700`
- Tailles fluides via `clamp()` partout (ex. `clamp(36px,4.5vw,68px)` pour le H1) — à recréer avec `clamp()` CSS ou équivalent responsive.

### Couleurs
| Rôle | Hex |
|---|---|
| Fond crème (base) | `#F5EFE5` |
| Encre / noir (texte, bordures) | `#1A1714` |
| Orange accent (CTA, highlights) | `#E8622A` |
| Vert badge "disponible" | `#2D5A27` |
| Vert foncé (fond section Partenaire) | `#0E2215` |
| Vert foncé (fond footer/trail) | `#1B3A22` |
| Vert clair (accents section footer + partenaire) | `#7FB069` |

### Langage visuel — "brutaliste"
- Bordures dures : `3px solid #1A1714` presque partout (jamais de `border-radius` — zéro coin arrondi dans tout le site).
- Ombres portées dures, sans flou : `box-shadow: 8px 8px 0 #E8622A` (ou `#1A1714`) — décalage net, pas de blur, couleur pleine.
- Rotations légères (-1.5deg à 1.5deg) sur la photo hero et le cadre logo pour casser la rigidité.
- Un seul accent couleur par contexte : orange sur fond crème, vert clair sur fond vert foncé — jamais les deux mélangés sur un même fond.

## Structure de la page (ordre des sections)

1. **Nav** (sticky, top:0) — logo texte "LOUIS BURETTE", liens ancre `#expertise` `#projets` `#parcours`, sélecteur de langue FR/ES/EN (**visuel uniquement actuellement — pas fonctionnel, i18n réel à implémenter**).

2. **Hero** — badge "Disponible pour missions" (pastille verte animée), H1 sur 3 lignes ("Saisir les vrais enjeux. Concevoir la bonne solution. La livrer de bout en bout."), paragraphe positionnement, 2 CTA (Me contacter / En savoir plus) + lien texte autorise.ai, photo portrait cadrée avec bordure+ombre orange et légère rotation.
   - **Asset photo actuellement hébergé en externe** : `https://autorise.ai/img/photo.png` — à rapatrier en asset local pour la prod (dépendance externe fragile + mauvais pour perf/SEO).

3. **Marquee** (bandeau noir défilant, hauteur 48px) — liste de livrables en boucle infinie (Automatisations · Agents IA · RAG · Web apps · Landing pages · Mobile App · Dashboards · Data pipelines · Scraping), séparés par des losanges orange. Animation CSS : le contenu est dupliqué 2x et translaté de 0 à -50% en boucle (`animation: marqueeScroll 24s linear infinite`). Vitesse mesurée ≈ 59px/s — **à conserver comme référence de vitesse pour tout bandeau similaire**.

4. **Chat IA** — démo de chat fonctionnelle, differenciateur clé du site. Interface façon fenêtre d'app (barre de titre, messages, suggestions rapides, input). Voir section "Chat IA — logique" ci-dessous pour le détail technique et ce qui doit changer en prod.

5. **Expertise** (`#expertise`) — grille 2×2 de 4 cartes ("Libérer du temps", "Accélérer la croissance", "Construire le bon produit", "Piloter par la donnée"), chacune avec titre serif, paragraphe, tags de compétences. Toutes les cartes ont le même fond crème (choix délibéré — éviter de recolorer différemment, ça avait été testé et jugé arbitraire).

6. **Projets** (`#projets`) —
   - 2 "projets fondateurs" côte à côte (Autorise, Lagun) : image 16:10 (`object-fit:cover`), titre, description courte, lien externe. Images fournies dans `assets/`.
   - Rangée "Missions" en **scroll horizontal** (overflow-x:auto, scrollbar masquée) : 8 cartes de mission (Reply Desk, Data Sourcing, Prospection ultra ciblée, Ghost Writing System, Documents post-AG, Zero Inbox, Chatbot Support Client, Assistant de correction), chacune avec label de domaine (Agent IA / Automation) en orange, titre, description, et une **ligne de résultat** séparée par un filet (`→ texte en gras`) — c'est la preuve d'impact, ne pas la supprimer ni la fusionner avec la description. Une carte "fantôme" en bordure pointillée ferme la rangée ("La prochaine, c'est *la vôtre*.") — sert d'appel à l'action discret.

7. **Partenaire** (fond vert foncé `#0E2215`, pas d'ancre nav — accessible seulement au scroll, intentionnel) — bloc "Team for the Planet" : logo (actuellement un placeholder à remplacer par le vrai logo), badge "Ils me font confiance", titre, texte, lien. En dessous, bandeau défilant listant 7 entreprises soutenues par Team for the Planet (accent vert clair au lieu d'orange). Vitesse calée sur le marquee du haut (~59px/s → `animation: marqueeScrollTftp 19s linear infinite` sur contenu triplé à -33.33%).

8. **À propos** (`#parcours`) — 2 citations narratives en serif italique (positionnement + philosophie de travail), et une liste "Je ne travaille jamais avec" (secteurs exclus) barrée en orange — signal de valeurs, pas juste une liste.

9. **Footer / Trail** (`#trail-section`, fond vert foncé `#1B3A22`) — section signature du site : profil de dénivelé de montagne en SVG (référence : passion de Louis pour le trail running), voir détail technique ci-dessous. CTA "Me contacter" + lien LinkedIn qui s'allument en orange quand l'utilisateur atteint le bas de la section.

## Chat IA — logique
Le chat appelle actuellement `window.claude.complete({ system, messages })` — **une fonction disponible uniquement dans l'outil d'édition**, pas en production. En prod, remplacer par un vrai backend : endpoint serveur qui proxy vers l'API Claude (ou autre LLM), avec le system prompt ci-dessous conservé côté serveur (ne jamais l'exposer côté client tel quel si vous ne voulez pas qu'il soit lisible dans le JS front).

Le system prompt actuel (à adapter/enrichir, sert de base de connaissance RAG-like pour le bio de Louis) :
```
Tu es l'assistant IA de Louis Burette, Product Builder freelance basé au Pays Basque...
[voir le fichier reference/Louis Burette.dc.html, variable SYSTEM_PROMPT, pour le texte complet]
```
Comportement : 3 boutons de suggestion rapide (Parcours / Expertise / Méthode / Disponibilité) envoient une question pré-écrite. Auto-scroll vers le bas des messages à chaque nouveau message. État de chargement "···" pendant la réponse.

## Footer — animation au scroll (détail technique)
- Un profil d'élévation (24 points x,y) est dessiné 30 fois en polylines superposées avec un décalage vertical croissant + opacité dégressive, créant un effet de "courbes de niveau" (contour lines) — d'abord en vert clair (`#7FB069`), avec une seconde copie identique en orange (`#E8622A`) cachée derrière un `<clipPath>` dont la largeur du rectangle de clip est pilotée par le scroll.
- Au scroll dans la section, on calcule `progress` = position de la section par rapport au viewport (0 à 1), on échantillone un point sur un `<path>` de référence à `progress * longueur totale`, et on met à jour : la largeur du rect de clip (révèle l'orange jusqu'à ce point), la position d'un curseur circulaire orange, une ligne pointillée verticale de repère.
- Quand `progress >= 0.9` (bas de la section atteint), le bouton "Me contacter" passe de transparent/discret à plein orange avec ombre noire, et le lien LinkedIn s'éclaircit.
- Recréer cette logique en JS vanilla (scroll listener + `getBoundingClientRect`) ou avec une lib d'animation scroll-driven (ex. Framer Motion `useScroll`, GSAP ScrollTrigger) — le calcul de progress et la structure SVG sont indépendants de l'outil d'origine et portables tels quels.

## Assets
- `assets/autorise_card.png` — capture du produit Autorise, utilisée dans la carte projet.
- `assets/lagun_2.png` — capture du produit Lagun, utilisée dans la carte projet.
- Photo portrait hero — actuellement chargée depuis `https://autorise.ai/img/photo.png` (externe, à rapatrier).
- Logo Team for the Planet — **manquant**, actuellement un placeholder drag-and-drop dans l'outil d'édition (`<image-slot>`). Demander l'asset réel à Louis avant mise en prod.

## À faire pour le SEO / i18n / prod (hors périmètre du design)
- Le fichier de référence n'a ni `<title>`, ni meta description, ni Open Graph — à écrire pour la prod (le README ne les invente pas, à définir avec Louis).
- Sélecteur FR/ES/EN dans le nav est un mockup visuel — implémenter un vrai système i18n (contenu du site + system prompt du chat traduits) si les 3 langues sont un besoin réel à court terme.
- `data-comment-anchor` sur la section À propos est un artefact interne à l'outil d'auteur — sans effet, à ignorer/supprimer.
- `image-slot.js` et `support.js` référencés dans le fichier de référence sont des scripts internes à l'outil d'édition — **ne pas les porter en prod**.

## Files
- `reference/Louis Burette.dc.html` — fichier de référence complet (structure, tous les styles inline, tout le copy, la logique du chat et de l'animation footer).
- `assets/` — images utilisées par le design.
