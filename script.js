// =============================================
//  Scroll-triggered fade-in for cards & stills
// =============================================

document.addEventListener('DOMContentLoaded', () => {

  // Observe elements that should animate on scroll
  const targets = document.querySelectorAll('.video-item, .about-bts-img');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger the delay for a cascade effect
        const delay = (entry.target.dataset.index || 0) * 80;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  targets.forEach((el, i) => {
    el.dataset.index = i;
    observer.observe(el);
  });


  // =============================================
  //  Smooth active nav highlighting on scroll
  // =============================================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav ul li a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.style.color = link.getAttribute('href') === `#${id}`
            ? 'var(--text)'
            : '';
        });
      }
    });
  }, { threshold: 0, rootMargin: '-80px 0px -40% 0px' });

  sections.forEach(s => sectionObserver.observe(s));


  // =============================================
  //  Nav background blur on scroll
  // =============================================
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      nav.style.backdropFilter = 'blur(12px)';
      nav.style.background = 'rgba(12,12,11,0.92)';
    } else {
      nav.style.backdropFilter = 'blur(0px)';
      nav.style.background = 'linear-gradient(to bottom, rgba(12,12,11,0.95) 0%, transparent 100%)';
    }
  });

});
