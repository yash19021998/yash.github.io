// Mobile navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when link is clicked
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.nav');
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(255, 255, 255, 0.98)';
        nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
        nav.style.boxShadow = 'none';
    }
});

// Animate skill bars on scroll
const animateSkillBars = () => {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        const rect = bar.getBoundingClientRect();
        
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            setTimeout(() => {
                bar.style.width = progress + '%';
            }, 200);
        }
    });
};

// Scroll animations
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.skill-category, .tech-category, .timeline-item, .stat');
    
    elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initialize animations
const initAnimations = () => {
    const elements = document.querySelectorAll('.skill-category, .tech-category, .timeline-item, .stat');
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
    });
};

// Typing animation for hero section
const typeWriter = (element, text, speed = 100) => {
    let i = 0;
    element.innerHTML = '';
    
    const timer = setInterval(() => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, speed);
};

// Form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name') || e.target.querySelector('input[type="text"]').value;
        const email = formData.get('email') || e.target.querySelector('input[type="email"]').value;
        const message = formData.get('message') || e.target.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Simulate form submission
        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('Thank you for your message! I\'ll get back to you soon.');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Tech category hover effects
document.querySelectorAll('.tech-category').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Certificate card hover effects
document.querySelectorAll('.certificate-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

const highlightActiveSection = () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
};

// Parallax effect for hero section
const parallaxEffect = () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
};

// Counter animation for stats
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat h3');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + (counter.textContent.includes('+') ? '+' : '');
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target + (counter.textContent.includes('+') ? '+' : '');
            }
        };
        
        const rect = counter.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0 && !counter.dataset.animated) {
            counter.dataset.animated = 'true';
            updateCounter();
        }
    });
};

// Event listeners
window.addEventListener('scroll', () => {
    animateSkillBars();
    animateOnScroll();
    highlightActiveSection();
    parallaxEffect();
    animateCounters();
});

window.addEventListener('load', () => {
    initAnimations();
    
    // Add some delay to ensure all elements are loaded
    setTimeout(() => {
        animateSkillBars();
        animateOnScroll();
    }, 500);
});

// Smooth reveal animation on page load
window.addEventListener('DOMContentLoaded', () => {
    const heroElements = document.querySelectorAll('.hero-avatar, .hero-title, .hero-subtitle, .hero-description, .hero-buttons');
    
    heroElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.8s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// Add CSS class for active nav link
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #3b82f6 !important;
    }
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);