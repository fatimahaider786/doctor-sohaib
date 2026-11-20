/* Build: bundle React app, embed images as base64, assemble single self-contained HTML */
const esbuild = require("esbuild");
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const ROOT = __dirname;
const OUT = "/home/z/my-project/download/index.html";

// 1) bundle the JSX
esbuild.buildSync({
  entryPoints: [path.join(ROOT, "src/app.jsx")],
  bundle: true,
  minify: true,
  outfile: path.join(ROOT, "dist/app.js"),
  jsx: "automatic",
  define: { "process.env.NODE_ENV": '"production"' },
  loader: { ".jsx": "jsx" },
  target: ["es2018"],
});
console.log("bundled app.js", fs.statSync(path.join(ROOT, "dist/app.js")).size, "bytes");

// 2) prepare images (resize with python PIL, cache in dist/)
function prepImage(src, outName, width, quality) {
  const out = path.join(ROOT, "dist", outName);
  if (!fs.existsSync(out)) {
    execSync(
      `python3 - <<'EOF'
from PIL import Image
im = Image.open("${src}")
im = im.convert("RGB")
w, h = im.size
if w > ${width}:
    im = im.resize((${width}, round(h * ${width} / w)), Image.LANCZOS)
im.save("${out}", "JPEG", quality=${quality}, optimize=True, progressive=True)
print("saved", im.size)
EOF`,
      { stdio: "inherit" }
    );
  }
  const b64 = fs.readFileSync(out).toString("base64");
  return "data:image/jpeg;base64," + b64;
}

const portraitImg = prepImage(
  path.join(ROOT, "img/portrait.png"),
  "portrait.jpg", 760, 82
);
const moranImg = prepImage(
  path.join(ROOT, "img/moran.png"),
  "moran.jpg", 900, 80
);
const clinicImg = prepImage(
  path.join(ROOT, "img/clinic.png"),
  "clinic.jpg", 900, 80
);
console.log("images embedded:", portraitImg.length, moranImg.length, clinicImg.length, "chars");

const appJs = fs.readFileSync(path.join(ROOT, "dist/app.js"), "utf8");
const css = fs.readFileSync(path.join(ROOT, "src/styles.css"), "utf8");

// 3) favicon — aperture mark
const favicon =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34 34"><circle cx="17" cy="17" r="16" fill="none" stroke="#B98A2F" stroke-width="1.6"/><circle cx="17" cy="17" r="10.5" fill="#B98A2F"/><circle cx="17" cy="17" r="6" fill="#0A1B22"/><circle cx="19" cy="15" r="1.3" fill="#F1F4F3"/></svg>`
  );

const jsonld = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Dr. Sohaib Abbas Malik",
  jobTitle: "Consultant Ophthalmologist & Laser Eye Surgeon",
  description:
    "Consultant ophthalmic surgeon; sub-specialty uveitis and ocular inflammation — the only formally trained uveitis consultant in Pakistan. Head of the Uveitis Division, LRBT Eye Hospital, Lahore.",
  url: "https://drsohaib.com",
  telephone: ["+92 321 488 1054", "+92 300 801 6669"],
  email: "eyedoc786@gmail.com",
  address: { "@type": "PostalAddress", addressLocality: "Lahore", addressCountry: "PK" },
  knowsAbout: ["Uveitis", "Ocular Inflammation", "Vitreoretinal Surgery", "Cataract Surgery", "LASIK", "Glaucoma", "Cornea Transplant"],
};

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Dr. Sohaib Abbas Malik — Consultant Uveitis Specialist, Lahore</title>
<meta name="description" content="Dr. Sohaib Abbas Malik — consultant ophthalmic surgeon and the only formally trained uveitis and ocular inflammation consultant in Pakistan. Cataract, retina, LASIK and glaucoma care at LRBT and Medeast Hospitals, Lahore.">
<link rel="icon" href="${favicon}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..600;1,9..144,300..600&family=Instrument+Sans:ital,wght@0,400..700;1,400..700&display=swap" rel="stylesheet">
<script type="application/ld+json">${JSON.stringify(jsonld)}</script>
<style>
${css}
</style>
</head>
<body>
<div id="root"></div>
<script>window.__IMG_PORTRAIT__="${portraitImg}";window.__IMG_MORAN__="${moranImg}";window.__IMG_CLINIC__="${clinicImg}";</script>
<script>
${appJs}
</script>
</body>
</html>`;

fs.writeFileSync(OUT, html);
console.log("written", OUT, fs.statSync(OUT).size, "bytes");
