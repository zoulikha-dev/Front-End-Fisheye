// Récupération des éléments de la lightbox
const lightboxContainer = document.querySelector(".lightbox_container");
const lightboxImage = document.querySelector(".lightbox_img");
const lightboxVideo = document.querySelector(".lightbox_video");
const btnNext = document.querySelector(".btn_next");
const btnPrevious = document.querySelector(".btn_previous");

let currentMediaIndex = 0;
let mediaArray = [];

// Fonction pour ouvrir la lightbox
function openLightbox(src, index) {
  currentMediaIndex = index;
  displayMedia();
  lightboxContainer.classList.add("open");
}

// Fonction pour fermer la lightbox
function closeLightbox() {
  lightboxContainer.classList.remove("open");
  lightboxVideo.src = "";
  lightboxImage.src = "";
}

// Fonction pour afficher le média actuel
function displayMedia() {
  const media = mediaArray[currentMediaIndex];
  if (media.endsWith(".mp4")) {
    lightboxVideo.src = media;
    lightboxVideo.style.display = "block";
    lightboxImage.style.display = "none";
  } else {
    lightboxImage.src = media;
    lightboxImage.style.display = "block";
    lightboxVideo.style.display = "none";
  }
}

// Fonction pour afficher le média suivant
function nextMedia() {
  currentMediaIndex = (currentMediaIndex + 1) % mediaArray.length;
  displayMedia();
}

// Fonction pour afficher le média précédent
function previousMedia() {
  currentMediaIndex =
    (currentMediaIndex - 1 + mediaArray.length) % mediaArray.length;
  displayMedia();
}

// Fonction pour initialiser les médias
function initLightbox(mediaList) {
  mediaArray = mediaList;
  document
    .querySelectorAll(".media-container img, .media-container video")
    .forEach((element, index) => {
      element.addEventListener("click", () => openLightbox(element.src, index));
    });
}

// Ajouter des événements pour les boutons "Suivant" et "Précédent"
btnNext.addEventListener("click", nextMedia);
btnPrevious.addEventListener("click", previousMedia);

// Événements pour fermer la lightbox
document.querySelector(".btn_close").addEventListener("click", closeLightbox);
lightboxContainer.addEventListener("click", (e) => {
  if (e.target === lightboxContainer) {
    closeLightbox();
  }
});
