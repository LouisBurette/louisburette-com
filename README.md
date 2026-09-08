# louisburette.com

Landing page personnelle de Louis Burette — Product Builder freelance, fondateur d'[Autorise](https://autorise.ai).
Trois langues (FR par défaut, EN, ES) et un agent conversationnel branché sur n8n.

Prod : https://louisburette.com (Vercel)

## Stack

- Next.js 15 (App Router, Turbopack) + React 19 + TypeScript
- `next-intl` pour l'i18n par sous-chemin (`/`, `/en`, `/es`)
- Styles en inline styles + `app/globals.css` (keyframes, classes d'interaction, media queries). Pas de Tailwind.
- `@vercel/analytics`

## Démarrer

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run lint
```

Sans les variables d'environnement ci-dessous, la page se rend normalement mais l'agent renvoie son message d'erreur (les routes API répondent 502).

## Variables d'environnement

Trois webhooks n8n, **serveur uniquement** — jamais de préfixe `NEXT_PUBLIC_`, jamais commitées.

| Variable | Utilisée par | Rôle |
|---|---|---|
| `N8N_CHAT_WEBHOOK_URL` | `app/api/chat/route.ts` | Tour de conversation de l'agent |
| `N8N_CALENDLY_WEBHOOK_URL` | `app/api/calendly-slots/route.ts` | Créneaux Calendly disponibles |
| `N8N_COMPLETE_WEBHOOK_URL` | `app/api/complete/route.ts` | Envoi du résumé de conversation par email |

En local : `.env.local` (ignoré par git). En prod : variables de projet Vercel.
Récupérer les valeurs avec `vercel env pull .env.local`.

Ces URLs sont des secrets : les endpoints n8n ne sont pas authentifiés, connaître l'URL suffit à les déclencher.

## Structure

```
app/
  [locale]/          layout (métadonnées, fonts, i18n), page, opengraph-image
  api/               3 routes proxy vers n8n — le seul endroit qui lit les secrets
  globals.css        reset, keyframes, classes d'interaction, responsive
  icon.svg           favicon
components/
  Nav Hero Marquee ChatSection Expertise Projets Apropos TrailFooter
  ScrollFX.tsx       effets de scroll globaux (reveal, rature, parallax, curseur)
i18n/                config next-intl (routing, navigation, request)
messages/            fr.json · en.json · es.json — tout le contenu éditorial
public/              photo.png, assets/ (visuels projets), CV.pdf
```

## Design system

Néo-brutaliste : bordures nettes 4px, ombres portées sans flou, capitales, zéro coin arrondi.

| Rôle | Hex |
|---|---|
| Papier (fond) | `#F3F1EC` |
| Encre (texte, bordures) | `#0A0A0A` |
| Violet (accent principal) | `#5B2BFF` |
| Jaune (surlignage, accent footer) | `#EDFF00` |
| Rouge (liste des secteurs exclus) | `#FF3D6B` |
| Texte secondaire | `#4A463F` / `#33302B` |

Typographie : **Syne** (titres, boutons), **Archivo** (corps), **Space Mono** (labels, liens mono).

Deux animations pilotées au scroll, toutes deux neutralisées sous `prefers-reduced-motion` :
- `components/Projets.tsx` — les cartes Missions défilent horizontalement pendant que la section est épinglée (repli en drag horizontal sous 860px).
- `components/TrailFooter.tsx` — un profil de dénivelé SVG se remplit en jaune au scroll et allume les CTA en bas de page.

## Contenu

Tout le texte visible vit dans `messages/*.json`. Ajouter une chaîne implique de la renseigner dans les trois fichiers.
Les tags de compétences de la section Expertise sont volontairement en dur dans `components/Expertise.tsx` (noms propres, non traduits).
