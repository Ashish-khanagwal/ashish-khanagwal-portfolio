const themeRoot = document.documentElement;
const themeToggle = document.querySelector('.theme-toggle');
const themeStorageKey = 'portfolio-theme';

const applyTheme = (theme) => {
  themeRoot.setAttribute('data-theme', theme);

  if (themeToggle) {
    themeToggle.setAttribute('aria-pressed', String(theme === 'light'));
    themeToggle.setAttribute(
      'aria-label',
      `Switch to ${theme === 'light' ? 'dark' : 'light'} mode`
    );
  }
};

const getPreferredTheme = () => {
  const savedTheme = localStorage.getItem(themeStorageKey);
  if (savedTheme === 'light' || savedTheme === 'dark') {
    return savedTheme;
  }

  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
};

applyTheme(getPreferredTheme());

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const nextTheme = themeRoot.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    applyTheme(nextTheme);
    localStorage.setItem(themeStorageKey, nextTheme);
  });
}

// Intersection observer for reveal animations
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // stagger children if any
    }
  });
}, { threshold: 0.1 });

reveals.forEach(el => observer.observe(el));

// Smooth active state on nav
const sections = document.querySelectorAll('section[id], div[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === `#${current}`) {
      link.style.color = 'var(--text)';
    }
  });
});
