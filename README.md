# Zubair Jalal — Portfolio

A static portfolio site built with Next.js (App Router), TypeScript and Tailwind CSS,
deployed to GitHub Pages. There is no CMS or database — every piece of content on the
site lives in a typed data file under `src/content/`. Updating the site means editing
those files, never the page components.

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). To produce the static export that
GitHub Pages serves:

```bash
npm run build
```

The output goes to `out/`.

## Where content lives

| Page / section | Edit this file |
| --- | --- |
| Name, headline, positioning, contact links, CV path, home page stats, "beyond the work" note | `src/content/profile.ts` |
| Education (MSc, BSc, A-Levels) and the short two-line education summary shown on Home | `src/content/education.ts` |
| Work / non-work experience and achievement bullets | `src/content/experience.ts` |
| Core skills, grouped by category | `src/content/skills.ts` |
| Projects grid | `src/content/projects.ts` |
| Certifications & credentials | `src/content/certifications.ts` |
| Shared TypeScript types for all of the above | `src/lib/types.ts` |

Nothing outside `src/content/` needs to change for a routine content update. Pages in
`src/app/` just import from these files and render what they find.

## Adding a project

Add an entry to the `projects` array in `src/content/projects.ts`:

```ts
{
  id: "unique-slug",
  title: "Project title",
  startDate: "Jan 2027",
  endDate: "Jan 2027",       // same as startDate for a single-month project
  context: "MSc individual project", // or team size / distinction / module rank
  tools: ["Python", "scikit-learn"],
  description: "One paragraph describing the problem, method and result.",
  tags: ["Python", "classification"],
  image: "/images/projects/your-screenshot.jpg",
  featured: false,           // true gives it the larger, two-column treatment
}
```

Put the screenshot at the path you referenced under `public/images/projects/`. If the
file isn't there yet, the card shows a neutral placeholder instead of a broken image —
the build never fails because an asset is missing.

### Adding a `liveUrl` later

Once the Tableau dashboards are published to Tableau Public, add a `liveUrl` (and/or
`repoUrl`) field to the relevant project object:

```ts
liveUrl: "https://public.tableau.com/app/profile/...",
repoUrl: "https://github.com/Zubair-Jalal/...",
```

Both fields are optional. A project with neither renders as a clean card with no link
row at all — no empty or disabled buttons. As soon as one is present, the corresponding
link appears automatically.

## Adding a certification

Add an entry to the `certifications` array in `src/content/certifications.ts`:

```ts
{
  id: "unique-slug",
  name: "Certification name",
  issuer: "Issuing organisation",
  dateEarned: "March 2027",   // or just a year, e.g. "2027"
  category: "Job Simulations", // must match a value in `certificationCategories`
  description: "One or two sentences on what the credential covers.",
  expiryDate: "March 2029",   // optional — shows a quiet "Expired" state once past
  credentialId: "ABC123",     // optional
  verificationUrl: "https://...", // optional — takes priority over certificateFile
  certificateFile: "/certificates/your-file.pdf", // optional
}
```

If you supply `certificateFile`, drop the PDF in `public/certificates/`. Use either
`verificationUrl` or `certificateFile`, not both — if both are present, the
verification link is shown. An entry with neither renders as a finished card with no
link, which is intentional for the awards that have nothing to link to.

### Adding a new category

1. Add the new category name to `CertificationCategory` in `src/lib/types.ts`.
2. Add it to the `certificationCategories` array in `src/content/certifications.ts`.
3. Give at least one certification that `category` value.

The Certifications page reads `certificationCategories` to build both the section
headings and the filter buttons, so this is the only change needed — no component code
to touch.

## Replacing the CV

Overwrite `public/cv/zubair-jalal-cv.pdf` with the new file, keeping the same filename
(`profile.cvPath` in `src/content/profile.ts` points at it). If you rename the file,
update `cvPath` to match.

## Images and missing assets

Every image on the site (portrait, project screenshots) goes through
`src/components/ImageWithFallback.tsx`. If the referenced file 404s in the browser, the
component swaps in a neutral bordered placeholder instead of a broken image icon — so
the site always looks finished, asset or no asset. CV and certificate links are plain
`<a>` tags: they render normally whether or not the target file exists yet.

## Deployment

`.github/workflows/deploy.yml` builds the site with `npm run build` (which runs
`next build` with `output: "export"` in `next.config.ts`) and publishes the contents of
`out/` to GitHub Pages via `actions/upload-pages-artifact` and `actions/deploy-pages`.
It runs on every push to `main`.

Because this repository is `Zubair-Jalal.github.io`, the site is served from the domain
root — `next.config.ts` deliberately does not set `basePath` or `assetPrefix`. If you
ever fork this into a project-page repo (not a `<user>.github.io` repo), you'll need to
add both.

`public/.nojekyll` prevents GitHub Pages from running the output through Jekyll, which
would otherwise ignore files and folders starting with an underscore (Next's `_next/`
build assets).
