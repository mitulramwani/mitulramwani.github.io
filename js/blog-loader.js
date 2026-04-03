// Blog loader — reads posts/index.json and renders blog cards dynamically
// To add a new post:
//   1. Write your post as posts/your-post-slug.md
//   2. Add an entry to posts/index.json
//   3. Run: node js/generate-rss.js
//   4. Push to GitHub — done!

async function loadBlogPosts() {
  const grid = document.getElementById('blog-grid');
  if (!grid) return;

  try {
    const res = await fetch('posts/index.json');
    if (!res.ok) throw new Error('Could not load posts/index.json');
    const posts = await res.json();

    const featured = posts
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 3);

    grid.innerHTML = featured.map(post => `
      <div class="blog-card" onclick="window.location.href='post.html?slug=${post.slug}'">
        <div class="blog-card-top" style="background: ${post.color};"></div>
        <div class="blog-card-body">
          <div class="blog-cat" style="color: ${post.color};">${post.category}</div>
          <div class="blog-title">${post.title}</div>
          <div class="blog-excerpt">${post.excerpt}</div>
          <div class="blog-meta">
            <span>${formatDate(post.date)} · ${post.readTime}</span>
            <a href="post.html?slug=${post.slug}" class="blog-read-more">Read →</a>
          </div>
        </div>
      </div>
    `).join('');

  } catch (err) {
    console.error('Blog loader error:', err);
    grid.innerHTML = '<div style="grid-column:1/-1; color: var(--ink-light); font-size:14px;">Posts coming soon.</div>';
  }
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric'
  });
}
