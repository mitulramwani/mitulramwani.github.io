// Section loader — fetches each HTML section and injects it into the page
const sections = [
  { id: 'nav-slot',       file: 'sections/nav.html' },
  { id: 'hero-slot',      file: 'sections/hero.html' },
  { id: 'about-slot',     file: 'sections/about.html' },
  { id: 'career-slot',    file: 'sections/career.html' },
  { id: 'expertise-slot', file: 'sections/expertise.html' },
  { id: 'blog-slot',      file: 'sections/blog.html' },
  { id: 'contact-slot',   file: 'sections/contact.html' },
];

async function loadSection({ id, file }) {
  const slot = document.getElementById(id);
  if (!slot) return; // slot not present on this page — skip
  try {
    const res = await fetch(file);
    if (!res.ok) throw new Error(`Failed to load ${file}`);
    const html = await res.text();
    slot.innerHTML = html;
  } catch (err) {
    console.error(`Error loading section [${id}]:`, err);
  }
}

// Load all sections, then trigger blog loader if present
Promise.all(sections.map(loadSection)).then(() => {
  if (typeof loadBlogPosts === 'function') loadBlogPosts();
});
