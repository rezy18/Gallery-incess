document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const mainPhoto = document.getElementById('mainPhotoContainer');
    const gallery = document.getElementById('gallery');
    const closeGallery = document.getElementById('closeGallery');
    const musicToggle = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    const heartsContainer = document.getElementById('heartsContainer');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const flipCards = document.querySelectorAll('.flip-card');
    
    // Music Control
    let isMusicPlaying = false;
    
    // Auto-play music when clicking main photo
    mainPhoto.addEventListener('click', function() {
        // Try to play music (may be blocked by browser autoplay policies)
        bgMusic.play().then(() => {
            isMusicPlaying = true;
            musicToggle.innerHTML = '<i class="fas fa-pause text-pink-600"></i>';
        }).catch(error => {
            console.log("Autoplay was prevented:", error);
            // Show play button to let user start music manually
            musicToggle.innerHTML = '<i class="fas fa-music text-pink-600"></i>';
        });
        
        // Show gallery
        gallery.classList.remove('hidden');
        gallery.style.animation = 'fadeIn 0.5s ease-in-out';
        document.body.style.overflow = 'hidden';
    });
    
    // Music toggle button
    musicToggle.addEventListener('click', function() {
        if (isMusicPlaying) {
            bgMusic.pause();
            musicToggle.innerHTML = '<i class="fas fa-music text-pink-600"></i>';
        } else {
            bgMusic.play();
            musicToggle.innerHTML = '<i class="fas fa-pause text-pink-600"></i>';
        }
        isMusicPlaying = !isMusicPlaying;
    });
    
    // Close gallery button
    closeGallery.addEventListener('click', function() {
        // Pause all videos when closing gallery
        document.querySelectorAll('video').forEach(video => {
            video.pause();
        });
        
        gallery.style.animation = 'fadeOut 0.5s ease-in-out';
        setTimeout(() => {
            gallery.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }, 450);
    });
    
    // Tab functionality
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Hide all tab contents
            tabContents.forEach(content => content.classList.add('hidden'));
            // Show selected tab content
            const tabId = this.getAttribute('data-tab') + '-tab';
            document.getElementById(tabId).classList.remove('hidden');
        });
    });
    
    // Initialize first tab as active
    document.querySelector('.tab-btn[data-tab="photos"]').click();
    
    // Flip card functionality
    flipCards.forEach(card => {
        card.addEventListener('click', function() {
            this.classList.toggle('flipped');
        });
    });
    
    // Video control
    document.querySelectorAll('video').forEach(video => {
        // Add poster if video doesn't have one
        if (!video.getAttribute('poster')) {
            video.setAttribute('poster', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiBmaWxsPSJub25lIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmNlNGVjIi8+PHRleHQgeD0iNTAiIHk9IjUwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiNmNDhmYjEiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiPlZpZGVvPC90ZXh0Pjwvc3ZnPg==');
        }
        
        video.addEventListener('play', function() {
            // Pause other videos when one is playing
            document.querySelectorAll('video').forEach(v => {
                if (v !== video && !v.paused) {
                    v.pause();
                }
            });
        });
    });
    
    // Create floating hearts
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        
        // Random properties
        const size = Math.random() * 20 + 10;
        const posX = Math.random() * window.innerWidth;
        const color = `hsl(${Math.random() * 60 + 320}, 70%, 75%)`;
        const duration = Math.random() * 3 + 2;
        
        heart.style.width = `${size}px`;
        heart.style.height = `${size}px`;
        heart.style.left = `${posX}px`;
        heart.style.color = color;
        heart.style.animationDuration = `${duration}s`;
        heart.innerHTML = '❤️';
        
        heartsContainer.appendChild(heart);
        
        // Remove heart after animation
        setTimeout(() => {
            heart.remove();
        }, duration * 1000);
    }
    
    // Generate hearts periodically
    setInterval(createHeart, 300);
    
    // Add initial hearts
    for (let i = 0; i < 10; i++) {
        setTimeout(createHeart, i * 300);
    }
});