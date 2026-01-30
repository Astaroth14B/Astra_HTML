/* =========================================
   LEVEL 2 POLISH - CORE INTERACTIVITY
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    initCursor();
    initLoader();
    initAudio();
    initTilt();
    initPageTransitions();
    initDataFetching();
});

/* --- 6. Data Fetching (Gallery & Reviews) --- */
function initDataFetching() {
    const galleryGrid = document.querySelector('.gallery-full-grid');
    const reviewsList = document.querySelector('#reviews-list');

    if (galleryGrid) loadGallery(galleryGrid);
    if (reviewsList) loadReviews(reviewsList);
}

async function loadGallery(container) {
    try {
        const res = await fetch('/api/v1/art');
        const artData = await res.json();

        container.innerHTML = ''; // Clear loading/static content

        artData.forEach(art => {
            const div = document.createElement('div');
            div.className = 'gallery-item';
            div.innerHTML = `<img src="${art.imageUrl}" alt="${art.title}" loading="lazy">`;
            div.onclick = () => openImageModal(art.imageUrl, art.title); // Use title as desc for now
            container.appendChild(div);
        });

        // Re-init tilt for new items
        initTilt();
    } catch (err) {
        console.error("Failed to load gallery:", err);
        container.innerHTML = '<p class="error">> ERROR LOADING ARCHIVE DATA</p>';
    }
}

async function loadReviews(container) {
    try {
        const res = await fetch('/api/v1/reviews');
        const reviewsData = await res.json();

        container.innerHTML = '';

        reviewsData.forEach(review => {
            const block = document.createElement('blockquote');
            block.className = 'testimonial-box';
            block.style.cursor = 'pointer';
            block.innerHTML = `
                <span class="review-tag">VERIFIED</span>
                <p>${review.content.substring(0, 80)}...</p>
                <footer class="testimonial-author">
                   <span>${review.author}</span>
                </footer>
            `;
            block.onclick = () => openReviewPopup(review);
            container.appendChild(block);
        });

        initTilt();
    } catch (err) {
        console.error("Failed to load reviews:", err);
    }
}

/* Modals */
function openImageModal(src, desc) {
    const modal = document.getElementById("imageModal");
    if (!modal) return;

    const modalImg = document.getElementById("modalImage");
    const descText = document.getElementById("descriptionText");

    modal.style.display = "flex";
    modalImg.src = src;
    if (descText) descText.value = desc || "No description available.";

    // Close handlers
    const closeBtn = document.getElementById("closeBtn");
    if (closeBtn) closeBtn.onclick = () => modal.style.display = "none";
    modal.onclick = (e) => { if (e.target === modal) modal.style.display = "none"; };
}

function openReviewPopup(review) {
    const popup = document.getElementById('review-popup');
    if (!popup) return;

    document.getElementById('popup-title').textContent = review.author;
    document.getElementById('popup-content').textContent = review.content;
    document.getElementById('popup-rating').innerHTML =
        '<span style="color: #ffd700;">' + '★'.repeat(review.rating) + '</span>';

    popup.style.display = 'flex';

    document.getElementById('close-popup').onclick = () => popup.style.display = 'none';
    popup.onclick = (e) => { if (e.target === popup) popup.style.display = 'none'; };
}

/* --- 1. Custom Sci-Fi Cursor --- */
function initCursor() {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    const follower = document.createElement('div');
    follower.classList.add('cursor-follower');
    document.body.appendChild(follower);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';

        // Slight delay for follower
        setTimeout(() => {
            follower.style.left = e.clientX + 'px';
            follower.style.top = e.clientY + 'px';
        }, 50);
    });

    // Hover effects
    const clickables = document.querySelectorAll('a, button, .card, .gallery-item, input, textarea');
    clickables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hovering');
            follower.classList.add('hovering');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hovering');
            follower.classList.remove('hovering');
        });
    });
}

/* --- 2. System Boot Loader --- */
function initLoader() {
    // Check if loader exists, if not create it
    if (!document.querySelector('.system-loader')) {
        const loader = document.createElement('div');
        loader.className = 'system-loader';
        loader.innerHTML = `
            <div class="terminal-text">
                <p>> INITIALIZING CORE SYSTEMS...</p>
                <p>> LOADING ASSETS...</p>
                <p>> ESTABLISHING NEURAL LINK...</p>
                <p class="blink">> ACCESS GRANTED</p>
            </div>
        `;
        document.body.appendChild(loader);
    }

    const loader = document.querySelector('.system-loader');

    // Simulate loading time
    setTimeout(() => {
        loader.classList.add('loaded');
        setTimeout(() => loader.remove(), 1000); // Remove from DOM after transition
    }, 1500);
}

/* --- 3. UI Audio (Web Audio API) --- */
function initAudio() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    const ctx = new AudioContext();

    function playHoverSound() {
        if (ctx.state === 'suspended') ctx.resume();
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();

        osc.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.1);

        gainNode.gain.setValueAtTime(0.05, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

        osc.start();
        osc.stop(ctx.currentTime + 0.1);
    }

    // Attach to interactive elements
    const interactive = document.querySelectorAll('a, button, .nav-bar a');
    interactive.forEach(el => {
        el.addEventListener('mouseenter', playHoverSound);
    });
}

/* --- 4. Vanilla 3D Tilt Effect --- */
function initTilt() {
    const cards = document.querySelectorAll('.card, .gallery-item, .skill-card, .testimonial-box');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -10; // Max 10deg rotation
            const rotateY = ((x - centerX) / centerX) * 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
}

/* --- 5. Page Transitions --- */
function initPageTransitions() {
    const links = document.querySelectorAll('a[href]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            // Ignore anchors on same page or external links
            if (href.startsWith('#') || href.startsWith('http') || link.target === '_blank') return;

            e.preventDefault();
            document.body.classList.add('transition-out');

            setTimeout(() => {
                window.location.href = href;
            }, 500); // Wait for animation
        });
    });
}
