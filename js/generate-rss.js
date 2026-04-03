// RSS Feed Generator
// Run this script locally with Node.js whenever you publish a new post:
//   node js/generate-rss.js
// It reads posts/index.json and writes feed.xml to the site root.
// Commit feed.xml to GitHub — ConvertKit will detect new posts via this feed.

const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://mitulramwani.github.io';
const SITE_TITLE = 'Mitul Ramwani — Engineering Leader';
const SITE_DESC = 'Writing on engineering leadership, distributed systems, and career growth.';
const AUTHOR = 'Mitul Ramwani';

const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '../posts/index.json'), 'utf8'));

// Sort newest first
const sorted = posts.sort((a, b) => new Date(b.date) - new Date(a.date));

const items = sorted.map(post => `
  <item>
    <title><![CDATA[${post.title}]]></title>
    <link>${SITE_URL}/post.html?slug=${post.slug}</link>
    <guid isPermaLink="true">${SITE_URL}/post.html?slug=${post.slug}</guid>
    <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    <category><![CDATA[${post.category}]]></category>
    <description><![CDATA[${post.excerpt}]]></description>
    <author>${AUTHOR}</author>
  </item>`).join('');

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_TITLE}</title>
    <link>${SITE_URL}</link>
    <description>${SITE_DESC}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

fs.writeFileSync(path.join(__dirname, '../feed.xml'), rss.trim());
console.log(`✓ feed.xml generated with ${sorted.length} post(s)`);
