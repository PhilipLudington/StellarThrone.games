// Post Haven RSS feed URL - Update this with your actual feed URL
const POST_HAVEN_FEED_URL = 'https://blog.mrphilgames.com/posts.atom';

// Function to fetch and display posts
async function loadPostHavenFeed() {
    const feedContainer = document.getElementById('post-haven-feed');
    
    try {
        // Using a CORS proxy for RSS feeds (you may need to adjust based on your setup)
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(POST_HAVEN_FEED_URL)}`;
        
        const response = await fetch(proxyUrl);
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error('Failed to fetch feed');
        }
        
        // Parse the Atom feed
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data.contents, 'text/xml');
        
        // Get all entries from the feed (Atom uses 'entry' instead of 'item')
        let items = xmlDoc.querySelectorAll('entry');
        
        // Fallback to RSS if no Atom entries found
        if (items.length === 0) {
            items = xmlDoc.querySelectorAll('item');
        }
        
        if (items.length === 0) {
            feedContainer.innerHTML = '<div class="error">No posts found in the feed.</div>';
            return;
        }
        
        // Clear loading message
        feedContainer.innerHTML = '';
        
        // Process each post
        items.forEach((item, index) => {
            if (index < 10) { // Limit to 10 most recent posts
                // Handle both Atom and RSS formats
                const title = item.querySelector('title')?.textContent || 'Untitled';
                
                // For Atom feeds, link is an attribute
                let link = item.querySelector('link')?.getAttribute('href') || 
                          item.querySelector('link')?.textContent || '#';
                
                // Atom uses 'summary' or 'content', RSS uses 'description'
                const description = item.querySelector('summary')?.textContent || 
                                  item.querySelector('content')?.textContent ||
                                  item.querySelector('description')?.textContent || '';
                
                // Atom uses 'updated' or 'published', RSS uses 'pubDate'
                const pubDate = item.querySelector('updated')?.textContent || 
                               item.querySelector('published')?.textContent ||
                               item.querySelector('pubDate')?.textContent || '';
                
                // Create post card
                const postCard = createPostCard(title, link, description, pubDate);
                feedContainer.appendChild(postCard);
            }
        });
        
    } catch (error) {
        console.error('Error loading feed:', error);
        feedContainer.innerHTML = `
            <div class="error">
                <p>Unable to load posts. Please check your Post Haven feed URL.</p>
                <p style="font-size: 0.9rem; margin-top: 10px;">Make sure to update the POST_HAVEN_FEED_URL in script.js</p>
            </div>
        `;
    }
}

// Function to create a post card element
function createPostCard(title, link, description, pubDate) {
    const card = document.createElement('div');
    card.className = 'post-card';
    
    // Format date
    const date = pubDate ? new Date(pubDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }) : '';
    
    // Clean and truncate description
    const cleanDescription = stripHtml(description);
    const excerpt = cleanDescription.length > 200 
        ? cleanDescription.substring(0, 200) + '...' 
        : cleanDescription;
    
    card.innerHTML = `
        <h3>${escapeHtml(title)}</h3>
        ${date ? `<div class="post-date">${date}</div>` : ''}
        <div class="post-excerpt">${escapeHtml(excerpt)}</div>
        <a href="${escapeHtml(link)}" target="_blank" rel="noopener noreferrer" class="read-more">
            Read more →
        </a>
    `;
    
    return card;
}

// Helper function to strip HTML tags
function stripHtml(html) {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
}

// Helper function to escape HTML
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// Alternative method using native fetch without CORS proxy
// This will only work if the Post Haven feed supports CORS
async function loadPostHavenFeedDirect() {
    const feedContainer = document.getElementById('post-haven-feed');
    
    try {
        const response = await fetch(POST_HAVEN_FEED_URL);
        const text = await response.text();
        
        // Parse the feed
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, 'text/xml');
        
        // Get all entries from the feed (Atom uses 'entry' instead of 'item')
        let items = xmlDoc.querySelectorAll('entry');
        
        // Fallback to RSS if no Atom entries found
        if (items.length === 0) {
            items = xmlDoc.querySelectorAll('item');
        }
        
        if (items.length === 0) {
            throw new Error('No posts found in feed');
        }
        
        // Clear loading message
        feedContainer.innerHTML = '';
        
        // Process each post (same as proxy method)
        items.forEach((item, index) => {
            if (index < 10) {
                const title = item.querySelector('title')?.textContent || 'Untitled';
                let link = item.querySelector('link')?.getAttribute('href') || 
                          item.querySelector('link')?.textContent || '#';
                const description = item.querySelector('summary')?.textContent || 
                                  item.querySelector('content')?.textContent ||
                                  item.querySelector('description')?.textContent || '';
                const pubDate = item.querySelector('updated')?.textContent || 
                               item.querySelector('published')?.textContent ||
                               item.querySelector('pubDate')?.textContent || '';
                
                const postCard = createPostCard(title, link, description, pubDate);
                feedContainer.appendChild(postCard);
            }
        });
        
    } catch (error) {
        console.error('Direct feed fetch failed, trying with proxy...', error);
        // Fall back to proxy method
        loadPostHavenFeed();
    }
}

// Load feed when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Try direct fetch first, fall back to proxy if needed
    loadPostHavenFeedDirect();
});