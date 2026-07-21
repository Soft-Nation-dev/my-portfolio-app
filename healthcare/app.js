document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu elements
  const menuToggle = document.getElementById('menu-toggle-btn');
  const navList = document.getElementById('navigation-list');
  const backdrop = document.getElementById('menu-backdrop');
  
  // Navigation buttons & links
  const navBtns = document.querySelectorAll('.nav-btn');
  const actionBtns = document.querySelectorAll('[data-target]');
  const brandLogo = document.getElementById('brand-logo');
  
  // Form elements
  const contactForm = document.getElementById('contact-form');
  const contactSuccess = document.getElementById('contact-success');
  
  // Scroll to Top button
  const scrollTopBtn = document.getElementById('scroll-top-btn');

  // Toggle mobile navigation
  function toggleMobileMenu() {
    menuToggle.classList.toggle('open');
    navList.classList.toggle('show');
    backdrop.classList.toggle('visible');
  }

  function closeMobileMenu() {
    menuToggle.classList.remove('open');
    navList.classList.remove('show');
    backdrop.classList.remove('visible');
  }

  menuToggle.addEventListener('click', toggleMobileMenu);
  backdrop.addEventListener('click', closeMobileMenu);

  // Smooth scroll helper
  function scrollToSection(targetId) {
    closeMobileMenu();
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }

  // Bind click listeners for smooth scroll
  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-target');
      scrollToSection(target);
    });
  });

  actionBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Avoid conflict if button is inside a form submit
      if (btn.type === 'submit') return;
      
      const target = btn.getAttribute('data-target');
      scrollToSection(target);
    });
  });

  brandLogo.addEventListener('click', () => {
    scrollToSection('home');
  });

  scrollTopBtn.addEventListener('click', () => {
    scrollToSection('home');
  });

  // Track scroll position to update active navigation item
  const sections = ['home', 'skills', 'projects', 'contact'];
  
  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY + 120;
    
    // Show/hide scroll-to-top button
    if (window.scrollY > 400) {
      scrollTopBtn.style.opacity = '1';
      scrollTopBtn.style.pointerEvents = 'auto';
    } else {
      scrollTopBtn.style.opacity = '0';
      scrollTopBtn.style.pointerEvents = 'none';
    }

    // Active nav tracking
    for (const sectionId of sections) {
      const el = document.getElementById(sectionId);
      if (el) {
        const top = el.offsetTop;
        const height = el.offsetHeight;
        if (scrollPosition >= top && scrollPosition < top + height) {
          navBtns.forEach(btn => {
            if (btn.getAttribute('data-target') === sectionId) {
              btn.classList.add('active-nav');
            } else {
              btn.classList.remove('active-nav');
            }
          });
          break;
        }
      }
    }
  });

  // Form submission handler
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('form-name').value;
      const email = document.getElementById('form-email').value;
      const message = document.getElementById('form-message').value;

      if (name && email && message) {
        // Hide form, show success
        contactForm.style.display = 'none';
        contactSuccess.style.display = 'block';

        // Reset and show form again after 3 seconds
        setTimeout(() => {
          contactForm.reset();
          contactForm.style.display = 'flex';
          contactSuccess.style.display = 'none';
        }, 3000);
      }
    });
  }
});
