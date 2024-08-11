async function getPhotographers() {
  try {
    const response = await fetch("data/photographers.json");
    const data = await response.json();
    console.log("Données récupérées :", data);
    return data; //Retourner les donnes récupérées
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la récupération des données :",
      error
    );
    throw error;
  }
}

// Fonction pour afficher les données des photographes
async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);

  // Ajouter l'écouteur d'événements au niveau global après l'initialisation
  document.addEventListener("keydown", handleGlobalKeyDown);
}

// Fonction pour gérer les événements clavier globaux
function handleGlobalKeyDown(event) {
  switch (event.key) {
    case "Enter":
      handleEnterKey();
      break;
    case "Escape":
      handleEscapeKey();
      break;
    case "ArrowRight":
      handleArrowRightKey();
      break;
    case "ArrowLeft":
      handleArrowLeftKey();
      break;
  }
}

// Fonction pour gérer la touche Enter
function handleEnterKey() {
  const activeElement = document.activeElement;

  if (activeElement.matches(".media-container img, .media-container video")) {
    const index = [
      ...document.querySelectorAll(
        ".media-container img, .media-container video"
      ),
    ].indexOf(activeElement);
    if (mediaArray && mediaArray[index]) {
      openLightbox(mediaArray[index].path, index, mediaArray[index].title);
    }
  }
}

// Fonction pour gérer la touche Escape
function handleEscapeKey() {
  if (typeof closeLightbox === "function") {
    closeLightbox();
  }
}

// Fonction pour gérer la touche ArrowRight
function handleArrowRightKey() {
  if (typeof nextMedia === "function") {
    nextMedia();
  }
}

// Fonction pour gérer la touche ArrowLeft
function handleArrowLeftKey() {
  if (typeof previousMedia === "function") {
    previousMedia();
  }
}

init();
