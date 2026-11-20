# Dr. Sohaib Abbas Malik — website

A single, self-contained static page: fonts and photos are embedded inside
`index.html`, so there is **no build step and no dependency** — Vercel serves
the file as-is.

```
index.html        ← the finished site (deploy this)
source/           ← editable source (optional, for future changes)
  src/app.jsx     ← all content and components
  src/styles.css  ← design system
  build.js        ← inlines images/fonts into index.html   (node build.js)
  img/            ← original photos
```

## 1 — Put it on GitHub

Create an empty repository on github.com (name suggestion: `drsohaib-site`,
Public or Private — Vercel works with both), then run:

```bash
cd site-deploy
git init
git add .
git commit -m "Dr. Sohaib site — initial release"
git branch -M main
git remote add origin https://github.com/<your-username>/drsohaib-site.git
git push -u origin main
```

## 2 — Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) → **Sign up / Log in with GitHub**
   (this is what connects the two).
2. Dashboard → **Add New… → Project** → find `drsohaib-site` → **Import**.
3. Configuration — leave everything at the defaults:
   - Framework Preset: **Other** (it auto-detects a static site)
   - Build Command / Output Directory: **empty** (the file is pre-built)
4. Click **Deploy**. You get a live URL like
   `https://drsohaib-site.vercel.app` in under a minute.

From now on, every `git push` to `main` redeploys the site automatically, and
every pull request gets its own preview URL.

## 3 — Custom domain (drsohaib.com)

1. In the Vercel project: **Settings → Domains → Add** → `drsohaib.com`, then
   also add `www.drsohaib.com`.
2. At your domain registrar (where you bought the domain), set DNS to one of:
   - **Simplest — nameservers:** `ns1.vercel-dns.com` and `ns2.vercel-dns.com`
   - **Or records:** A record `@ → 76.76.21.21`, CNAME `www → cname.vercel-dns.com`
3. HTTPS (Let's Encrypt) is provisioned automatically. DNS can take a few
   hours to propagate.

## Editing later

Change something in `source/src/app.jsx`, rebuild, push:

```bash
cd source && node build.js           # writes ../index.html
cd .. && git add index.html source && git commit -m "update" && git push
```

Requires only Node.js (no npm install — build.js has zero dependencies).

## Alternative without GitHub

```bash
npm i -g vercel
cd site-deploy && vercel --prod
```
