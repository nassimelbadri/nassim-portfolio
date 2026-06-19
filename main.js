// Smooth scroll for anchor links with optimized performance
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Close mobile menu if open
            const nav = document.querySelector('.desktop-nav');
            if (nav && nav.classList.contains('active')) {
                nav.classList.remove('active');
                const menuBtn = document.querySelector('.mobile-menu-btn');
                if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
            }

            // Scroll to element with accessibility
            const scrollOffset = 80;
            window.scrollTo({
                top: targetElement.offsetTop - scrollOffset,
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect with debounce
const header = document.querySelector('.glass-nav');

function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

const handleScroll = () => {
  if (header) {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
};

window.addEventListener('scroll', debounce(handleScroll, 100));

// Mobile menu toggle with accessibility support
const menuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('.desktop-nav');

if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
        const isActive = nav.classList.toggle('active');
        menuBtn.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    });

    // Close menu on link click
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            menuBtn.setAttribute('aria-expanded', 'false');
        });
    });
}

// Intersection Observer for fade-up animations with better performance
const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with .fade-up class
document.querySelectorAll('.fade-up').forEach((element) => {
    observer.observe(element);
});

// Add staggered delay to skill categories for better visual hierarchy
const skillCategories = document.querySelectorAll('.skill-category');
skillCategories.forEach((category, index) => {
    if (!category.style.transitionDelay) {
        category.style.transitionDelay = `${index * 100}ms`;
    }
});

// Copy to Clipboard functionality with improved UX
const copyBtn = document.getElementById('copy-email-btn');
const toast = document.getElementById('toast');

if (copyBtn && toast) {
    copyBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        
        try {
            await navigator.clipboard.writeText('nassimelbadri19@gmail.com');
            
            // Show success state
            toast.classList.remove('hidden');
            toast.classList.add('show');
            copyBtn.setAttribute('aria-label', 'Email copied to clipboard!');
            
            // Hide toast after 3 seconds
            setTimeout(() => {
                toast.classList.remove('show');
                copyBtn.setAttribute('aria-label', 'Copy email address');
            }, 3000);
        } catch (err) {
            console.error('Failed to copy email:', err);
            // Fallback: open email client
            window.location.href = 'mailto:nassimelbadri19@gmail.com';
        }
    });
}

// ─── Download CV functionality with improved error handling ────────────────
// Inject spinner keyframe once for animations
(function injectSpinKeyframe() {
    if (document.getElementById('cv-spin-style')) return;
    const style = document.createElement('style');
    style.id = 'cv-spin-style';
    style.textContent = `
        @keyframes spin { 
            to { transform: rotate(360deg); } 
        }
        .btn-disabled {
            opacity: 0.65;
            cursor: not-allowed;
            pointer-events: none;
        }
    `;
    document.head.appendChild(style);
})();

const downloadCVBtn = document.getElementById('download-cv');

if (downloadCVBtn) {
    // SVG icons for different states
    const ICONS = {
        download: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>`,
        spinner: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation:spin .8s linear infinite;" aria-hidden="true"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>`,
        check: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`
    };

    downloadCVBtn.addEventListener('click', async (e) => {
        e.preventDefault();

        const cvPath = downloadCVBtn.getAttribute('data-cv-path');
        const fileName = 'Nassim_Elbadri_CV.pdf';

        // Set loading state
        downloadCVBtn.disabled = true;
        downloadCVBtn.classList.add('btn-disabled');
        downloadCVBtn.setAttribute('aria-busy', 'true');
        downloadCVBtn.setAttribute('aria-label', 'Downloading CV…');
        downloadCVBtn.innerHTML = `${ICONS.spinner} Downloading…`;

        try {
            // Fetch CV file
            const response = await fetch(cvPath);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const blob = await response.blob();
            const blobUrl = URL.createObjectURL(blob);

            // Create download link and trigger
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = fileName;
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Clean up blob URL
            setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);

            // Show success state
            downloadCVBtn.innerHTML = `${ICONS.check} Downloaded!`;
            downloadCVBtn.setAttribute('aria-label', 'CV downloaded successfully');
            downloadCVBtn.setAttribute('aria-busy', 'false');

            // Reset button after 2.5 seconds
            setTimeout(() => {
                downloadCVBtn.innerHTML = `${ICONS.download} Download CV`;
                downloadCVBtn.setAttribute('aria-label', 'Download my CV as PDF');
                downloadCVBtn.disabled = false;
                downloadCVBtn.classList.remove('btn-disabled');
            }, 2500);

        } catch (error) {
            console.warn('Download failed, attempting fallback:', error);

            try {
                // Fallback: open in new tab
                window.open(cvPath, '_blank', 'noopener,noreferrer');
                
                downloadCVBtn.innerHTML = `${ICONS.check} Download Started!`;
                downloadCVBtn.setAttribute('aria-label', 'CV opened in new tab');
                
                setTimeout(() => {
                    downloadCVBtn.innerHTML = `${ICONS.download} Download CV`;
                    downloadCVBtn.setAttribute('aria-label', 'Download my CV as PDF');
                    downloadCVBtn.disabled = false;
                    downloadCVBtn.classList.remove('btn-disabled');
                }, 2500);

            } catch (fallbackError) {
                console.error('Both download methods failed:', fallbackError);
                
                // Reset to original state and show error
                downloadCVBtn.innerHTML = `${ICONS.download} Download CV`;
                downloadCVBtn.setAttribute('aria-label', 'Download my CV as PDF');
                downloadCVBtn.disabled = false;
                downloadCVBtn.classList.remove('btn-disabled');
                
                // Show user-friendly error message
                alert('Unable to download CV. Please try again or contact via email.');
            }
        }
    });
}
