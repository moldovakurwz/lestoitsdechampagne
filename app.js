/* ==========================================================================
   APP.JS - INTERACTIONS & FORM VALIDATION
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Header Scroll Effect
    const header = document.querySelector('.main-header');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check in case page starts scrolled down
    
    
    // 2. Mobile Menu Toggle
    const menuToggle = document.querySelector('.mobile-nav-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('open');
            menuToggle.classList.toggle('active');
            
            // Toggle hamburger icon animation
            const bars = menuToggle.querySelectorAll('.bar');
            if (menuToggle.classList.contains('active')) {
                bars[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
        
        // Close menu when a link is clicked
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('open');
                menuToggle.classList.remove('active');
                const bars = menuToggle.querySelectorAll('.bar');
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            });
        });
    }
    
    
    // 3. Active Link Highlight on Scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const highlightNav = () => {
        let scrollPosition = window.scrollY + 120; // offset to match header height
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };
    
    window.addEventListener('scroll', highlightNav);
    
    
    // 4. Contact Form Submission Handling
    const quoteForm = document.getElementById('quote-form');
    const formFeedback = document.getElementById('form-feedback');
    
    if (quoteForm && formFeedback) {
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Display submitting feedback
            const submitBtn = quoteForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Envoi en cours...';
            
            // Collect form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                projectType: document.getElementById('project-type').value,
                message: document.getElementById('message').value
            };
            
            // Simulate API request delay
            setTimeout(() => {
                // Mock success
                formFeedback.className = 'form-feedback success';
                formFeedback.innerHTML = '<i class="fa-solid fa-circle-check"></i> Merci ! Votre demande de devis a bien été envoyée. Un artisan vous recontactera sous 48h.';
                
                // Reset form fields
                quoteForm.reset();
                
                // Re-enable button
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
                
                // Clear success message after 10 seconds
                setTimeout(() => {
                    formFeedback.innerHTML = '';
                    formFeedback.className = 'form-feedback';
                }, 10000);
                
            }, 15000 / 10); // Simulated 1.5 seconds network delay
        });
    }
});
