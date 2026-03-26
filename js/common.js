// common.js
document.addEventListener("DOMContentLoaded", () => {

  /* ================================
     Hamburger & Mobile Nav
  ================================ */
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  const navLinks = document.querySelectorAll('.mobile-nav a');

  if (hamburger && mobileNav) {
    const toggleMenu = () => {
      const isOpen = hamburger.classList.toggle('active');
      mobileNav.classList.toggle('active');
      hamburger.setAttribute('aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く');
    };
    hamburger.addEventListener('click', toggleMenu);
    hamburger.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleMenu();
      }
    });

    navLinks.forEach(link => {
      link.addEventListener('click', e => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            hamburger.classList.remove('active');
            mobileNav.classList.remove('active');
            hamburger.setAttribute('aria-label','メニューを開く');
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });
  }

  /* ================================
     IntersectionObserver 共通処理
  ================================ */
  const observeElements = (selector, options = {threshold:0.15, rootMargin:"0px 0px -5% 0px"}, callback) => {
    const elements = document.querySelectorAll(selector);
    if (!elements.length || !("IntersectionObserver" in window)) {
      elements.forEach(el => el.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (callback) callback(entry);
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, options);
    elements.forEach(el => observer.observe(el));
  };

  // Footer
  const footer = document.querySelector(".footerSection");
  if (footer) {
    const footerObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          footer.classList.add("is-visible");
          footerObserver.unobserve(footer);
        }
      });
    });
    footerObserver.observe(footer);
  }

  // fade-in elements & news items individually
  observeElements("[data-animate]");
  observeElements(".news-item");

  /* ================================
     Menu waveText animation (indexのみ)
  ================================ */
  document.querySelectorAll('.menu-subtext.wave').forEach(el => {
    const text = el.textContent.trim();
    el.textContent = '';
    [...text].forEach((char,i)=>{
      const wrapper = document.createElement('span');
      wrapper.className = 'wave-wrapper';
      const charSpan = document.createElement('span');
      charSpan.className = 'wave-char';
      charSpan.textContent = char;
      charSpan.style.animationDelay = `${i*0.05}s`;
      wrapper.appendChild(charSpan);
      el.appendChild(wrapper);
    });
  });

}); // DOMContentLoaded

/* ================================
   Loading Screen
=============================== */
window.addEventListener("load", () => {
  const loadingScreen = document.getElementById("loadingScreen");
  const colorLogo = document.getElementById("loadingLogoColor");
  const baseLogo = document.getElementById("loadingLogoBase");
  const body = document.body;

  const waitImages = Promise.all([
    new Promise(res=> baseLogo.complete?res(): baseLogo.onload=res),
    new Promise(res=> colorLogo.complete?res(): colorLogo.onload=res)
  ]);

  waitImages.then(() => {
    colorLogo.addEventListener("animationend", () => {
      loadingScreen.classList.add("loaded");
      body.classList.add("loaded");
    });
  });

  loadingScreen.addEventListener("transitionend", (e) => {
    if (e.propertyName !== "opacity") return;
    loadingScreen.style.display = "none";
  });
});