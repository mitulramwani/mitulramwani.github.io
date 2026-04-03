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
- Email newsletter subscription (powered by ConvertKit)
- Contact information

---

## Project Structure

```
├── index.html              # Lean shell — loads all sections dynamically
├── post.html               # Individual blog post page (renders any .md file)
├── feed.xml                # RSS feed — used by ConvertKit to auto-email subscribers
├── css/
│   └── styles.css          # All styling (colors, typography, layout, responsive)
├── sections/               # Each page section as an independent HTML file
│   ├── nav.html            # Navigation bar
│   ├── hero.html           # Hero / landing screen
│   ├── about.html          # About me + stats
│   ├── career.html         # Career timeline (Amazon, MathWorks, GE Healthcare)
│   ├── expertise.html      # Expertise cards
│   ├── blog.html           # Blog section (cards rendered dynamically)
│   ├── subscribe.html      # Email subscription section (ConvertKit embed)
│   └── contact.html        # Contact links
├── posts/
│   ├── index.json          # Blog manifest — one entry per post
│   ├── from-ic-to-manager.md
│   ├── lessons-from-s3.md
│   └── amazon-sdm-interview.md
└── js/
    ├── loader.js           # Fetches each section file and injects into the page
    ├── blog-loader.js      # Reads index.json and renders blog cards dynamically
    └── generate-rss.js     # Node.js script — regenerates feed.xml from index.json
```

---

## How It Works

`index.html` contains named `<div>` slots for each section. On page load, `loader.js` fetches each section file in parallel and injects the HTML into its slot.

`blog-loader.js` reads `posts/index.json` and dynamically renders blog cards on the homepage. When a card is clicked, `post.html` fetches the corresponding `.md` file and renders it using `marked.js`.

`feed.xml` is an RSS feed read by ConvertKit. When you publish a new post and push `feed.xml` to GitHub, ConvertKit detects the new entry and automatically emails your subscribers.

---

## Writing a New Blog Post

**Step 1 — Write your post**

Create a new Markdown file in the `posts/` folder:
```
posts/my-new-post.md
```

Use standard Markdown:
```markdown
# Your Post Title

Your opening paragraph here.

## A Section Heading

More content...
```

**Step 2 — Register it in the manifest**

Add one entry to `posts/index.json`:
```json
{
  "slug": "my-new-post",
  "title": "Your Post Title",
  "category": "Leadership",
  "date": "2025-04-01",
  "readTime": "6 min read",
  "excerpt": "A one or two sentence summary shown on the homepage card.",
  "color": "#8B4513"
}
```

Available category colors:
- Leadership: `#8B4513` (warm brown)
- Technical: `#1A6B8A` (steel blue)
- Career: `#4A7C59` (forest green)

**Step 3 — Regenerate the RSS feed**

Run this once from the site root (requires Node.js):
```bash
node js/generate-rss.js
```

This updates `feed.xml` so ConvertKit knows about the new post.

**Step 4 — Push to GitHub**

Commit and push all three files (`posts/my-new-post.md`, `posts/index.json`, `feed.xml`). Your post is live within ~60 seconds and subscribers are notified automatically.

---

## ConvertKit Setup

Subscribers sign up via the embedded ConvertKit form in the Subscribe section. ConvertKit is connected to the site's RSS feed (`https://mitulecer.github.io/feed.xml`) via an RSS automation, so new posts trigger automatic email notifications.

To update the ConvertKit form embed, edit `sections/subscribe.html`.

---

## Local Development

Because `loader.js` uses `fetch()` to load section files, you need a local server to preview the site:

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
| Subscribe section | `sections/subscribe.html` |
| Contact info | `sections/contact.html` |
| Add a blog post | See "Writing a New Blog Post" above |
| Add a new section | Create `sections/new.html`, add slot in `index.html`, add entry in `js/loader.js` |

---

## Deployment

Hosted on **GitHub Pages** for free. Every commit to `main` deploys automatically within ~60 seconds. No build step required.

---

## Roadmap

- [ ] Add GE Healthcare career details
- [ ] Add Education section
- [ ] Mobile hamburger navigation
- [ ] Custom domain (mitulramwani.com)
- [ ] SEO meta tags and Open Graph preview
- [ ] Blog post tags and filtering
- [ ] Full blog index page (all posts)

---

## License

Personal site — content and design are not licensed for reuse.
