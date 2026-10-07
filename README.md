# NhatNam Tech

A single-page, static personal website for Nhat-Nam Nguyen, AI researcher and engineer, and his independent technical practice, NhatNam Tech, at [nhatnam.tech](https://nhatnam.tech).

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
- Canonical and OpenGraph metadata, SVG favicon, `robots.txt`, and an automatically generated sitemap.

The supplied [Astro portfolio starter](https://github.com/BracoZS/astro-starter-portfolio) was inspected as a technical reference. Its lean Astro/Tailwind/strict-TypeScript approach fits this project; its multi-page portfolio, content collections, and dark-mode features do not. No template code or assets were copied. The page and design are original, based on the supplied studio brief.

The page introduces Nhat-Nam personally and puts work before consulting. It uses normal reading text, underlined links, project notes, a factual About section, a compact consulting list, and a direct email contact. There are no section numbers, service cards, process diagram, display slogan, or CTA banner.

### Editing content

- `src/data/site.ts`: name, practice, email, location, and SEO copy.
- `src/data/work.ts`: typed work entries and optional public paper/code links.
- `src/pages/index.astro`: introduction, About, consulting, and contact prose.
- `src/components/WorkEntry.astro`: project-note markup.
- `src/layouts/BaseLayout.astro`: metadata and document shell.
- `src/styles/global.css`: design tokens, typography, and responsive layouts.

**Selected work says “Coming soon,” as requested.** `src/data/work.ts` is intentionally empty, and the page shows the research interests as prose rather than completed projects. Add real entries with a title, specific description/contribution, research area, and optional `links` array when ready. The project-note layout automatically replaces the coming-soon text. If an entry is unfinished, give it a `draftNote`; the page will explicitly disclose draft entries. No publications, results, clients, or dates are invented.

The PhD statement comes from the supplied redesign brief. No institution or affiliation is inferred. The contact remains `nam@nhatnam.tech`, the previously confirmed address; the `hello@` address in the redesign brief was an illustrative example.

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

Replace conflicting apex web-hosting/parking A or AAAA records and conflicting `www` records. Preserve mail-related MX, SPF, DKIM, DMARC, and unrelated TXT records so `nam@nhatnam.tech` keeps working. Do not create an apex CNAME or wildcard record.

On Windows, you can inspect propagation with:

```powershell
Resolve-DnsName nhatnam.tech -Type A
Resolve-DnsName www.nhatnam.tech -Type CNAME
```

No DNS or GitHub account settings are modified by this project.

Official references: [Astro on GitHub Pages](https://docs.astro.build/en/guides/deploy/github/), [GitHub custom domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site), [Name.com A records](https://www.name.com/support/articles/205188538-pointing-your-domain-to-hosting-with-a-records), and [Name.com CNAME records](https://www.name.com/support/articles/115004895548-adding-a-cname-record).
