// Récupération des éléments de la lightbox
const overlay = document.querySelector(".overlay");
const lightboxContainer = document.querySelector(".lightbox_container");
const lightboxImage = document.querySelector(".lightbox_img");
const lightboxVideo = document.querySelector(".lightbox_video");
const lightboxTitle = document.querySelector(".lightbox_title");
const btnNext = document.querySelector(".btn_next");
const btnPrevious = document.querySelector(".btn_previous");
const btnClose = document.querySelector(".btn_close");

let currentMediaIndex = 0; // Index du média actuellement affiché
let mediaArray = []; // Tableau contenant tous les médias (images et vidéos)

// Fonction pour ouvrir la lightbox
function openLightbox(src, index, title) {
  currentMediaIndex = index; // Met à jour l'index du média actuel
  displayMedia(); // Affiche le média actuel
  lightboxTitle.textContent = title; // Met à jour le titre du média
  lightboxContainer.classList.add("open"); // Affiche la lightbox
  lightboxContainer.setAttribute("aria-hidden", "false"); // Déclare que la Lightbox est visible
  overlay.style.display = "block"; // Affiche l'overlay
  document.addEventListener("keydown", handleKeyDown);
}

// Fonction pour fermer la lightbox
function closeLightbox() {
  lightboxContainer.classList.remove("open"); // Masque la lightbox
  lightboxVideo.src = ""; // Réinitialise la source de la vidéo
  lightboxImage.src = ""; // Réinitialise la source de l'image
  lightboxTitle.textContent = ""; // Réinitialise le titre
  lightboxContainer.setAttribute("aria-hidden", "true"); // Déclare que la Lightbox est cachée
  overlay.style.display = "none"; // Cacher l'overlay
  document.removeEventListener("keydown", handleKeyDown);
}

// Fonction pour afficher le média actuel
function displayMedia() {
  const media = mediaArray[currentMediaIndex]; // Récupère le média actuel
  if (media) {
    if (media.path.endsWith(".mp4")) {
      lightboxVideo.src = media.path; // Met à jour la source de la vidéo
      lightboxVideo.style.display = "block"; // Affiche la vidéo
      lightboxImage.style.display = "none"; // Masque l'image
    } else {
      lightboxImage.src = media.path; // Met à jour la source de l'image
      lightboxImage.style.display = "block"; // Affiche l'image
      lightboxVideo.style.display = "none"; // Masque la vidéo
    }
    lightboxTitle.textContent = media.title; // Met à jour le titre
  } else {
    console.error("Media non trouvé:", media); // Affiche une erreur si le média n'est pas trouvé
  }
}

// Fonction pour afficher le média suivant
function nextMedia() {
  currentMediaIndex = (currentMediaIndex + 1) % mediaArray.length; // Met à jour l'index pour le média suivant
  displayMedia(); // Affiche le média suivant
}

// Fonction pour afficher le média précédent
function previousMedia() {
  currentMediaIndex =
    (currentMediaIndex - 1 + mediaArray.length) % mediaArray.length; // Met à jour l'index pour le média précédent
  displayMedia(); // Affiche le média précédent
}

// Fonction pour gérer les événements clavier
function handleKeyDown(event) {
  switch (event.key) {
    case "ArrowRight":
      nextMedia();
      break;
    case "ArrowLeft":
      previousMedia();
      break;
    case "Escape":
      closeLightbox();
      break;
  }
}

// Fonction pour initialiser les médias
function initLightbox(mediaList) {
  mediaArray = mediaList; // Assigne mediaList à mediaArray
  document
    .querySelectorAll(".media-container img, .media-container video")
    .forEach((element, index) => {
      element.addEventListener("click", () =>
        openLightbox(mediaArray[index].path, index, mediaArray[index].title)
      );
    });
}

// Ajouter des événements pour les boutons "Suivant" et "Précédent"
btnNext.addEventListener("click", nextMedia);
btnPrevious.addEventListener("click", previousMedia);

// Événements pour fermer la lightbox
btnClose.addEventListener("click", closeLightbox);

// Assurer que la Lightbox se ferme lorsqu'on clique en dehors de son contenu
lightboxContainer.addEventListener("click", (e) => {
  // Ferme la Lightbox seulement si le clic est sur le conteneur, mais pas sur les éléments à l'intérieur
  if (e.target === lightboxContainer) {
    closeLightbox();
  }
});
