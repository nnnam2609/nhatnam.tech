# NhatNam Tech

A single-page, static website for NhatNam Tech, an independent AI research and engineering studio founded in 2026 by Nhat-Nam Nguyen in Nancy, France, at [nhatnam.tech](https://nhatnam.tech).

## Local development

Use Node.js 24 LTS (minimum 22.12) with npm installed.

```sh
npm install
npm run dev
```

Open the local address printed by Astro, normally `http://localhost:4321`.

```sh
npm run check    # Astro and TypeScript diagnostics
npm run build    # Type check, then generate the static site in dist/
npm run preview  # Serve the production build locally
```

Commit `package-lock.json` alongside `package.json`. The official Astro deployment action detects npm from this lockfile and installs the dependencies before running the build script.

## Implementation

- Astro, strict TypeScript, and Tailwind CSS 4 via its Vite plugin.
- One route with semantic sections and native anchor navigation.
- Self-hosted Inter; fonts and CSS are served from the same domain.
- No client JavaScript, external runtime requests, analytics, cookies, backend, or contact form.
- Keyboard focus states, a skip link, reduced-motion support, and a simple mobile navigation row.
- Canonical and OpenGraph metadata, SVG/ICO favicons, Apple touch icon, a 1200 × 630 sharing image, `robots.txt`, and an automatically generated sitemap.

The supplied [Astro portfolio starter](https://github.com/BracoZS/astro-starter-portfolio) was inspected as a technical reference. Its lean Astro/Tailwind/strict-TypeScript approach fits this project; its multi-page portfolio, content collections, and dark-mode features do not. No template code or assets were copied. The page and design are original, based on the supplied studio brief.

The page leads with NhatNam Tech and its early-development research engineering tools. Research directions, a factual About section, selected consulting, and direct email contact follow. The existing minimal design, reading typography, underlined links, and responsive layouts are preserved.

### Editing content

- `src/data/site.ts`: organization name, founder, founding year, email, location, and SEO copy.
- `src/pages/index.astro`: studio introduction, development focus, research directions, About, consulting, and contact prose.
- `src/layouts/BaseLayout.astro`: metadata, Organization JSON-LD, and document shell.
- `src/styles/global.css`: design tokens, typography, and responsive layouts.
- `src/components/Logo.astro` and `LogoMark.astro`: accessible inline SVG header lockup and reusable mark, inheriting CSS color.
- `src/data/brand.ts`: original N/T mark geometry and asset palette.

### Visual identity

The geometric N/T symbol uses one filled path with a shared upright and four-unit strokes. It is original artwork, paired with the existing Inter typography. The warm paper, near-black ink, neutral rules, and deep blue accent are defined in CSS variables. The mark is 28px in the header; the hero keeps its typographic hierarchy.

Public assets: `logo.svg` (horizontal), `logo-mark.svg` (symbol), `logo-monochrome.svg` (black/currentColor), and `logo-reversed.svg` (off-white for dark backgrounds). These SVGs are self-contained; the exported wordmarks use Inter glyph outlines. The inline components use real text for the wordmark. The SVG favicon adapts to the browser's light/dark preference, and the ICO and Apple icon use a solid blue background with a light mark.

`og-image.svg` is the editable sharing-image master; `og-image.png` is served to social crawlers. Organization JSON-LD points to `/logo.svg`. Regenerate PNG/ICO exports after editing the SVG master or mark with Node.js 24:

```sh
node scripts/render-brand-assets.mjs
```

The exporter uses Sharp supplied by Astro; no additional project dependencies or client JavaScript are introduced. Keep generated assets committed so deployment does not require a separate rendering step. Inter's license is included in its font package.

The tools are explicitly described as being in early development. The organization name, founding year, founder, development focus, and PhD statement come from the supplied brief. No customers, commercial launch, results, institutions, legal identifier, or street address are inferred. Organization JSON-LD uses the same identity fields as the visible page.

The contact is `contact@nhatnam.tech` throughout.

Tailwind supplies small layout utilities. The copyright year is generated at build time; rebuild after the year changes.

## GitHub Pages deployment

The workflow at `.github/workflows/deploy.yml` follows [Astro's official GitHub Pages deployment approach](https://docs.astro.build/en/guides/deploy/github/): `actions/checkout@v7`, `withastro/action@v6` to install, build, and upload the static artifact, then `actions/deploy-pages@v5` to publish it. Node.js 24 is specified, and the build command is `npm run build`, which includes Astro/TypeScript checks. It runs on pushes to `main`, or can be started from the Actions tab. Source repository: [nnnam2609/nhatnam.tech](https://github.com/nnnam2609/nhatnam.tech). GitHub Pages and domain configuration remain manual.

1. Keep future changes, including `package-lock.json`, on the `main` branch of this repository. If you rename the default branch, update `branches` in the workflow.
2. In the repository's **Settings → Pages → Build and deployment**, choose **GitHub Actions** as the source. Enable Actions if disabled. The repository must be eligible for Pages under your GitHub plan.
3. Recommended: verify ownership of `nhatnam.tech` in your GitHub account or organization Pages settings, using the TXT record GitHub supplies.
4. In the repository's **Settings → Pages → Custom domain**, enter `nhatnam.tech` and save **before changing DNS**.
5. Add the Name.com DNS records below.
6. In **Actions → Deploy to GitHub Pages**, choose **Run workflow → main** (or push to `main`) and wait for the `github-pages` deployment to finish. If the `github-pages` environment requires approval, approve that deployment in GitHub.
7. After the DNS check and certificate provisioning succeed, enable **Enforce HTTPS** in Pages settings. DNS propagation and certificate availability can take up to 24 hours.

`astro.config.mjs` uses `https://nhatnam.tech` as `site`, with root-relative assets and no repository subpath, because this deployment uses a custom apex domain. `public/CNAME` is included in the build for portability. With a custom Actions deployment, GitHub uses the Pages **Custom domain** setting; the CNAME file does not configure that setting for you.

### Name.com DNS records

If Name.com is your authoritative DNS provider, open **My Domains → nhatnam.tech → Manage DNS Records**. If another provider hosts your nameservers, configure these records there instead.

For the apex domain, Name.com uses an **empty Host field** (shown as “blank” below). Add each A record separately. Use the default TTL, or 3600 seconds.

| Type | Host | Answer |
| --- | --- | --- |
| A | blank | `185.199.108.153` |
| A | blank | `185.199.109.153` |
| A | blank | `185.199.110.153` |
| A | blank | `185.199.111.153` |
| CNAME | `www` | `nnnam2609.github.io` |

The `www` target is the repository owner's GitHub Pages hostname. Do not include `https://` or the repository name. Once configured, GitHub Pages redirects `www.nhatnam.tech` to `nhatnam.tech`.

Optional IPv6 support: add these four AAAA records with the Host field empty, alongside the A records.

| Type | Host | Answer |
| --- | --- | --- |
| AAAA | blank | `2606:50c0:8000::153` |
| AAAA | blank | `2606:50c0:8001::153` |
| AAAA | blank | `2606:50c0:8002::153` |
| AAAA | blank | `2606:50c0:8003::153` |

Replace conflicting apex web-hosting/parking A or AAAA records and conflicting `www` records. Preserve mail-related MX, SPF, DKIM, DMARC, and unrelated TXT records so `contact@nhatnam.tech` keeps working. Do not create an apex CNAME or wildcard record.

On Windows, you can inspect propagation with:

```powershell
Resolve-DnsName nhatnam.tech -Type A
Resolve-DnsName www.nhatnam.tech -Type CNAME
```

No DNS or GitHub account settings are modified by this project.

Official references: [Astro on GitHub Pages](https://docs.astro.build/en/guides/deploy/github/), [GitHub custom domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site), [Name.com A records](https://www.name.com/support/articles/205188538-pointing-your-domain-to-hosting-with-a-records), and [Name.com CNAME records](https://www.name.com/support/articles/115004895548-adding-a-cname-record).
