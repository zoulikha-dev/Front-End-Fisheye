// Récupération de la référence de la lightbox
const lightboxContainer = document.querySelector(".lightbox_container");

// Fonction pour ouvrir la lightbox
function openLightbox() {
  lightboxContainer.classList.add("open");
}

// Fonction pour fermer la lightbox
function closeLightbox() {
  lightboxContainer.classList.remove("open");
}
