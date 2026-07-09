/* === App.js - Plomberie Abel === */

/* === Animation d’apparition (fade-in) === */
const fadeElements = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

fadeElements.forEach(el => observer.observe(el));

/* === Année automatique dans le footer === */
const yearEl = document.getElementById('y');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* === Menu mobile (hamburger) === */
const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('main-nav');
if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* === Bannière cookies === */
const cookieBanner = document.getElementById('cookie-banner');
const acceptCookiesBtn = document.getElementById('accept-cookies');
const settingsCookiesBtn = document.getElementById('settings-cookies');
if (cookieBanner) {
  try {
    if (!localStorage.getItem('pa_cookies_ack')) {
      setTimeout(() => { cookieBanner.style.display = 'block'; }, 800);
    }
  } catch (err) { /* stockage indisponible, on ignore la bannière */ }
}
if (acceptCookiesBtn) {
  acceptCookiesBtn.addEventListener('click', () => {
    try { localStorage.setItem('pa_cookies_ack', '1'); } catch (err) {}
    cookieBanner.style.display = 'none';
  });
}
if (settingsCookiesBtn) {
  settingsCookiesBtn.addEventListener('click', () => {
    window.location.href = 'confidentialite.html';
  });
}

/* === Galerie (slider) === */
const slider = document.querySelector(".slider");
const leftBtn = document.querySelector(".slide-btn.left");
const rightBtn = document.querySelector(".slide-btn.right");

if (slider && leftBtn && rightBtn) {
  let scrollAmount = 0;
  const scrollStep = 350; // largeur de défilement par clic

  leftBtn.addEventListener("click", () => {
    slider.scrollBy({
      left: -scrollStep,
      behavior: "smooth"
    });
  });

  rightBtn.addEventListener("click", () => {
    slider.scrollBy({
      left: scrollStep,
      behavior: "smooth"
    });
  });
}


/* === Formulaire de contact avec EmailJS === */
/*
  ⚙️ Configuration requise :
  1. Crée un compte sur https://www.emailjs.com/
  2. Crée un "Email Service" (par exemple service_plomberieabel)
  3. Crée un "Email Template" (par exemple template_contact)
  4. Récupère ton USER_ID, SERVICE_ID et TEMPLATE_ID
  5. Remplace ci-dessous les valeurs par les tiennes
*/

(function() {
  // ⚠️ Remplace "YOUR_USER_ID" par ta clé publique EmailJS (Account > General)
  try {
    emailjs.init("YOUR_USER_ID");
  } catch (err) {
    console.warn("EmailJS n'est pas configuré — le formulaire de contact n'enverra pas encore de courriel.", err);
  }

  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
      e.preventDefault();

      const formData = {
        from_name: this.name.value,
        from_email: this.email.value,
        from_phone: this.phone && this.phone.value ? this.phone.value : "Non fourni",
        message: this.message.value
      };

      // ⚠️ Remplace "YOUR_SERVICE_ID" et "YOUR_TEMPLATE_ID" par tes IDs réels
      emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", formData)
        .then(() => {
          alert("✅ Merci ! Votre message a été envoyé avec succès.");
          this.reset();
        })
        .catch(() => {
          alert("❌ Une erreur est survenue. Veuillez réessayer plus tard.");
        });
    });
  }
})();
