// Typing Animation
(function() {
    const typedTextElement = document.getElementById('typed-text');
    const fullText = "Senior Web Developer & UI Engineer";
    
    if (typedTextElement) {
        let i = 0;
        let isDeleting = false;
        let waitCount = 0;
        const waitTime = 20; // Wait 2 seconds (20 * 100ms) at full text
        
        function typeText() {
            if (!isDeleting && i < fullText.length) {
                // Typing forward
                typedTextElement.textContent = fullText.slice(0, i + 1);
                i++;
            } else if (!isDeleting && i === fullText.length) {
                // Wait at full text before deleting
                waitCount++;
                if (waitCount >= waitTime) {
                    isDeleting = true;
                    waitCount = 0;
                }
            } else if (isDeleting && i > 0) {
                // Deleting backward
                i--;
                typedTextElement.textContent = fullText.slice(0, i);
            } else if (isDeleting && i === 0) {
                // Restart typing
                isDeleting = false;
            }
        }
        
        setInterval(typeText, 100);
    }
})();

// Smooth Scroll Function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Intersection Observer for Animations
(function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all elements with slide-up class
    document.querySelectorAll('.slide-up').forEach(el => {
        observer.observe(el);
    });

    // Observe skill bars
    document.querySelectorAll('.skill-bar-item').forEach(el => {
        observer.observe(el);
    });
})();

// Animate Skill Bars on Scroll
(function() {
    const skillBars = document.querySelectorAll('.skill-bar-fill');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.style.width;
                entry.target.style.width = '0%';
                setTimeout(() => {
                    entry.target.style.width = width;
                }, 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    skillBars.forEach(bar => {
        observer.observe(bar);
    });
})();

// Contact Form Handler
(function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = new FormData(contactForm);
            const firstName = contactForm.querySelector('input[placeholder="First Name"]').value;
            const lastName = contactForm.querySelector('input[placeholder="Last Name"]').value;
            const email = contactForm.querySelector('input[type="email"]').value;
            const subject = contactForm.querySelector('input[placeholder="Subject"]').value;
            const message = contactForm.querySelector('textarea').value;
            
            // Basic validation
            if (!firstName || !lastName || !email || !subject || !message) {
                alert('Please fill in all fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Here you would typically send the data to a server
            // For now, we'll just show a success message
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }
})();

// Add hover effects to badges
(function() {
    const badges = document.querySelectorAll('.badge');
    
    badges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        badge.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
})();

// Add smooth scroll behavior for anchor links
(function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
})();

// Initialize animations on page load
window.addEventListener('DOMContentLoaded', function() {
    // Trigger fade-in for hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.classList.add('fade-in');
    }
    
    // Initialize skill bars with delay
    setTimeout(() => {
        const skillBarItems = document.querySelectorAll('.skill-bar-item');
        skillBarItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
            }, index * 100);
        });
    }, 500);
});

// Add parallax effect to hero section (optional enhancement)
(function() {
    const heroSection = document.querySelector('.hero-section');
    
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.5;
            heroSection.style.backgroundPosition = `center ${rate}px`;
        });
    }
})();

// Add active section highlighting in navigation (if you add navigation later)
(function() {
    const sections = document.querySelectorAll('section[id]');
    
    function highlightActiveSection() {
        const scrollPosition = window.pageYOffset + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // You can add navigation highlighting logic here
            }
        });
    }
    
    window.addEventListener('scroll', highlightActiveSection);
})();




import React, { useEffect } from 'react';

const LiquidCursor = () => {
  useEffect(() => {
    const numDots = 30;
    const dots: HTMLDivElement[] = [];
    let mousex = 0;
    let mousey = 0;

    // Create dots
    for (let i = 0; i < numDots; i++) {
      const dot = document.createElement('div');
      dot.className = 'neon-dot';
      // Set initial position
      dot.style.left = '0px';
      dot.style.top = '0px';
      document.body.appendChild(dot);
      dots.push(dot);
    }

    function moveDots() {
      let nextx = mousex;
      let nexty = mousey;

      dots.forEach((dot, index) => {
        const currentX = dot.style.left ? parseFloat(dot.style.left) : 0;
        const currentY = dot.style.top ? parseFloat(dot.style.top) : 0;

        dot.style.left = nextx + 'px';
        dot.style.top = nexty + 'px';

        nextx += (currentX - nextx) * 0.3;
        nexty += (currentY - nexty) * 0.3;
      });

      requestAnimationFrame(moveDots);
    }

    const handleMouseMove = (e: MouseEvent) => {
      mousex = e.clientX;
      mousey = e.clientY;
    };

    document.addEventListener('mousemove', handleMouseMove);
    moveDots();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      dots.forEach(dot => {
        if (dot.parentNode) {
          dot.parentNode.removeChild(dot);
        }
      });
    };
  }, []);

  return null;
};

export default LiquidCursor;
