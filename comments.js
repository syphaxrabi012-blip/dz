// === Firebase configuration ===
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

// 🧩 Ton projet Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD0gdKdq1Uea33xqdyttiZbRj2spr1SKto",
  authDomain: "plomberie-abel.firebaseapp.com",
  databaseURL: "https://plomberie-abel-default-rtdb.firebaseio.com",
  projectId: "plomberie-abel",
  storageBucket: "plomberie-abel.firebasestorage.app",
  messagingSenderId: "931213243721",
  appId: "1:931213243721:web:54737e00ad859ce8045698",
  measurementId: "G-2NB1FQM443"
};

// === Initialisation ===
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const avisRef = ref(db, "avis");

// === Fonction pour afficher les avis ===
const avisList = document.getElementById("avis-list");

onValue(avisRef, (snapshot) => {
  avisList.innerHTML = ""; // Nettoyer
  const data = snapshot.val();
  if (data) {
    const avisArray = Object.values(data).reverse(); // Les plus récents en premier
    avisArray.forEach(avis => {
      const div = document.createElement("div");
      div.className = "testimonial";
      div.innerHTML = `
        <p>« ${avis.message} »</p>
        <h4>— ${avis.nom}</h4>
      `;
      avisList.appendChild(div);
    });
  } else {
    avisList.innerHTML = "<p>Aucun avis pour le moment. Soyez le premier à commenter !</p>";
  }
});

// === Soumission du formulaire ===
const form = document.getElementById("avis-form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const nom = document.getElementById("avis-nom").value.trim();
  const message = document.getElementById("avis-message").value.trim();
  const honeypot = document.getElementById("avis-site").value.trim();

  // Un champ honeypot rempli = très probablement un robot, on ignore silencieusement
  if (honeypot) return;

  if (nom.length > 60 || message.length > 600) {
    alert("Merci de rester sous 60 caractères pour le nom et 600 pour le message.");
    return;
  }

  if (nom && message) {
    push(avisRef, { nom, message, date: Date.now() });
    form.reset();
    alert("Merci pour votre avis ! Il vient d’être publié 💬");
  }
});
