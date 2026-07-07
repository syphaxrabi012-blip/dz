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
document.getElementById('y').textContent = new Date().getFullYear();

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
  // ⚠️ Remplace "YOUR_USER_ID" par ton identifiant EmailJS réel
  emailjs.init("YOUR_USER_ID");

  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
      e.preventDefault();

      const formData = {
        from_name: this.name.value,
        from_email: this.email.value,
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
