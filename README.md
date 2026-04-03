# Mitul Ramwani — Personal Website

A personal website serving as an online resume and technical blog for Mitul Ramwani, Software Development Manager at Amazon with 15+ years of experience across Amazon, MathWorks, and GE Healthcare.

🌐 **Live site:** [mitulecer.github.io](https://mitulecer.github.io)

---

## About the Site

This site is built with plain HTML, CSS, and vanilla JavaScript — no frameworks, no build tools, no dependencies. It's intentionally lightweight and easy to maintain.

It covers:
- Professional background and career timeline
- Areas of expertise
- Featured writing and blog posts
- Contact information

---

## Project Structure

```
├── index.html              # Lean shell — loads all sections dynamically
├── css/
│   └── styles.css          # All styling (colors, typography, layout, responsive)
├── sections/               # Each page section as an independent HTML file
│   ├── nav.html            # Navigation bar
│   ├── hero.html           # Hero / landing screen
│   ├── about.html          # About me + stats
│   ├── career.html         # Career timeline (Amazon, MathWorks, GE Healthcare)
│   ├── expertise.html      # Expertise cards
│   ├── blog.html           # Featured blog posts
│   └── contact.html        # Contact links
└── js/
    └── loader.js           # Fetches each section file and injects into the page
```

---

## How It Works

`index.html` contains named `<div>` slots for each section. On page load, `loader.js` fetches each section file in parallel and injects the HTML into its slot. This keeps the codebase modular — each section is independently editable without touching any other part of the site.

---

## Local Development

Because `loader.js` uses `fetch()` to load section files, you need a local server to preview the site (browsers block local file fetches for security).

```bash
# Option 1 — Python (pre-installed on Mac/Linux)
python3 -m http.server 8000

# Option 2 — Node.js
npx serve .
```

Then open `http://localhost:8000` in your browser.

---

## Making Updates

| What you want to change | File to edit |
|---|---|
| Colors, fonts, spacing | `css/styles.css` |
| Navigation links | `sections/nav.html` |
| Tagline or hero text | `sections/hero.html` |
| Bio or stats | `sections/about.html` |
| Career history | `sections/career.html` |
| Expertise cards | `sections/expertise.html` |
| Blog posts | `sections/blog.html` |
| Contact info | `sections/contact.html` |
| Add a new section | Create `sections/new-section.html`, add a slot in `index.html`, add an entry in `js/loader.js` |

---

## Deployment

The site is hosted on **GitHub Pages** for free. Every commit to the `main` branch automatically deploys to the live site within ~60 seconds. No build step required.

---

## Roadmap

- [ ] Add GE Healthcare career details
- [ ] Publish first real blog post
- [ ] Add Education section
- [ ] Mobile hamburger navigation
- [ ] Custom domain (mitulramwani.com)
- [ ] SEO meta tags and Open Graph preview

---

## License

Personal site — content and design are not licensed for reuse.
