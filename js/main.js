// Hamburger mobile nav
const hamburger = document.getElementById('nav-hamburger');
const mobileNav = document.getElementById('nav-mobile');
const closeMobileNav = () => {
  hamburger.classList.remove('open');
  mobileNav.classList.remove('open');
  mobileNav.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
};
hamburger.addEventListener('click', () => {
  const isOpen = mobileNav.classList.toggle('open');
  hamburger.classList.toggle('open');
  mobileNav.setAttribute('aria-hidden', String(!isOpen));
  document.body.style.overflow = isOpen ? 'hidden' : '';
});
mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMobileNav));
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMobileNav(); });

// Nav scroll: transparent at top, dark + blur on scroll
const nav = document.getElementById('site-nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    nav.style.background = 'rgba(15,15,15,0.97)';
    nav.style.backdropFilter = 'blur(14px)';
    nav.style.webkitBackdropFilter = 'blur(14px)';
    nav.style.boxShadow = '0 1px 0 rgba(255,255,255,0.05)';
  } else {
    nav.style.background = 'transparent';
    nav.style.backdropFilter = 'none';
    nav.style.webkitBackdropFilter = 'none';
    nav.style.boxShadow = 'none';
  }
}, { passive: true });

// Scroll reveal via IntersectionObserver
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const delay = parseFloat(e.target.dataset.revealDelay || '0') * 1000;
    setTimeout(() => e.target.classList.add('revealed'), delay);
    io.unobserve(e.target);
  });
}, { threshold: 0.12 });

document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));

// Gallery lightbox
const lightbox = document.getElementById('coupe-lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');

const openLightbox = (src) => {
  lightboxImg.src = src;
  lightbox.style.display = 'flex';
  document.body.style.overflow = 'hidden';
};
const closeLightbox = () => {
  lightbox.style.display = 'none';
  lightboxImg.src = '';
  document.body.style.overflow = '';
};

lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
lightboxClose.addEventListener('click', closeLightbox);
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img.photo');
    if (img && img.src) openLightbox(img.src);
  });
});
