/* ============ THEME TOGGLE ============ */
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;
const themeIcon = themeToggle.querySelector('i');

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
updateIcon(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateIcon(next);
});

function updateIcon(theme) {
  themeIcon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
}

/* ============ MOBILE MENU ============ */
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('open');
  const icon = menuToggle.querySelector('i');
  icon.className = navMenu.classList.contains('open') ? 'fas fa-times' : 'fas fa-bars';
});

// Close menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    menuToggle.querySelector('i').className = 'fas fa-bars';
  });
});

/* ============ TYPING EFFECT ============ */
const typingEl = document.getElementById('typing');
const texts = [
  'Physics Graduate',
  'Data & Administration',
  'Python & Machine Learning (Dasar)',
  'SQL Learner (Dasar)'
];
let textIndex = 0, charIndex = 0, isDeleting = false;

function type() {
  const current = texts[textIndex];
  typingEl.textContent = isDeleting
    ? current.substring(0, charIndex--)
    : current.substring(0, charIndex++);

  let speed = isDeleting ? 50 : 100;

  if (!isDeleting && charIndex === current.length + 1) {
    speed = 1500;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
    speed = 300;
  }

  setTimeout(type, speed);
}
type();

/* ============ REVEAL ON SCROLL ============ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      // Animate skill bars when skills section appears
      /* ============ REVEAL ON SCROLL ============ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


/* ============ NAVBAR ACTIVE LINK ============ */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 100;
    if (window.scrollY >= top) current = sec.id;
  });

  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });

  // Back to top visibility
  const backTop = document.getElementById('backTop');
  backTop.classList.toggle('show', window.scrollY > 500);
});

/* ============ BACK TO TOP ============ */
document.getElementById('backTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ============ YEAR ============ */
document.getElementById('year').textContent = new Date().getFullYear();

/* ============ SMOOTH SCROLL (fallback) ============ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ============ PROJECT SLIDER ============ */
document.querySelectorAll('.project-image.slider').forEach(slider => {
  const track = slider.querySelector('.slider-track');
  const slides = track.querySelectorAll('img');
  const prevBtn = slider.querySelector('.slider-btn.prev');
  const nextBtn = slider.querySelector('.slider-btn.next');
  const dotsWrap = slider.querySelector('.slider-dots');

  let index = 0;
  const total = slides.length;

  // Buat dot indicator
  slides.forEach((_, i) => {
    const dot = document.createElement('span');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });

  const dots = dotsWrap.querySelectorAll('span');

  function goTo(i) {
    index = (i + total) % total;
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((d, di) => d.classList.toggle('active', di === index));
  }

  prevBtn.addEventListener('click', () => goTo(index - 1));
  nextBtn.addEventListener('click', () => goTo(index + 1));

  // Swipe support (mobile)
  let startX = 0, isDragging = false;
  slider.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
    isDragging = true;
  });
  slider.addEventListener('touchend', e => {
    if (!isDragging) return;
    const diff = e.changedTouches[0].clientX - startX;
    if (diff > 40) goTo(index - 1);
    else if (diff < -40) goTo(index + 1);
    isDragging = false;
  });
});

/* ============ CV SCROLL + AUTO DOWNLOAD ============ */
const cvScrollBtn = document.getElementById('cvScrollBtn');
const cvDownloadBtn = document.getElementById('cvDownloadBtn');

if (cvScrollBtn && cvDownloadBtn) {
  cvScrollBtn.addEventListener('click', (e) => {
    e.preventDefault();

    // 1. Scroll halus ke tombol download di bawah
    cvDownloadBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // 2. Tunggu scroll selesai, baru trigger download
  });
}
