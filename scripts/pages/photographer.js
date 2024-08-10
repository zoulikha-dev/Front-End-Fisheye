// Récupération de l'id du photographe à partir de l'url
const urlParams = new URLSearchParams(window.location.search);
const photographerId = urlParams.get("id");

// Construction de l'url de l'api
const apiUrl = `data/photographers.json`;

// Variables pour stocker les médias associés au photographe sélectionné et les détails du photographe
let photographerMedia = [];
let selectedPhotographer = null;

// Récupération des données du photographe à partir de l'api
fetch(apiUrl)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des données.");
    }
    return response.json();
  })
  .then((data) => {
    // Trouver le photographe avec l'id qui correspond
    const photographer = data.photographers.find(
      (photographer) => photographer.id === parseInt(photographerId)
    );

    if (photographer) {
      // Afficher les détails du photographe
      photographerDetails(photographer);

      // Filtrer les médias pour obtenir ceux du photographe sélectionné
      const photographerMedia = data.media.filter(
        (media) => media.photographerId === photographer.id
      );

      // Afficher les détails des médias du photographe
      photographerMediaDetails(photographerMedia, photographer);
    } else {
      console.error("Photographe non trouvé");
    }
  })
  .catch((error) => {
    console.error("Erreur lors de la récupération des données:", error);
  });

// Fonction pour afficher les détails du photographe
function photographerDetails(photographer) {
  const photographHeaderDiv = document.querySelector(".photograph-header");

  // Création des différentes divs pour organiser les éléments
  const photographerDetailsDiv = document.createElement("div");
  photographerDetailsDiv.classList.add("photographer-details");
  photographerDetailsDiv.innerHTML = `
    <h2>${photographer.name}</h2> 
    <h3>${photographer.city}, ${photographer.country}</h3>
    <p>${photographer.tagline}</p>
    <img src="assets/photographers/${photographer.portrait}" alt="Portrait du photographe">
  `;

  photographHeaderDiv.appendChild(photographerDetailsDiv);

  // Mettre à jour le prix
  updatePrice(photographer.price);
}

// Fonction pour afficher les médias du photographe
function photographerMediaDetails(mediaArray, photographer) {
  selectedPhotographer = photographer;
  photographerMedia = mediaArray;
  const mediaContainer = document.getElementById("photographer-media");
  mediaContainer.innerHTML = "";

  // Créer un tableau avec les chemins des médias et les titres
  const mediaPaths = mediaArray.map((media) => {
    const mediaPath = media.image
      ? `assets/images/${photographer.name.replace("_", " ")}/${media.image}`
      : `assets/images/${photographer.name.replace("_", " ")}/${media.video}`;
    return {
      path: mediaPath,
      title: media.title,
    };
  });

  mediaArray.forEach((media, index) => {
    const mediaContainerDiv = document.createElement("div");
    mediaContainerDiv.classList.add("media-container");

    const mediaElement = document.createElement(media.image ? "img" : "video");
    const mediaPath = media.image
      ? `assets/images/${photographer.name.replace("_", " ")}/${media.image}`
      : `assets/images/${photographer.name.replace("_", " ")}/${media.video}`;

    if (media.image) {
      mediaElement.src = mediaPath;
      mediaElement.alt = media.title;
    } else {
      mediaElement.src = mediaPath;
      mediaElement.type = "video/mp4";
      mediaElement.controls = true;
    }
    mediaElement.classList.add("media-item");
    mediaElement.addEventListener("click", () =>
      openLightbox(mediaElement.src, index, media.title)
    );
    mediaContainerDiv.appendChild(mediaElement);

    // Créer un élément pour afficher le bloc de titre, icône de cœur et nombre de likes
    const mediaInfoDiv = document.createElement("div");
    mediaInfoDiv.classList.add("media-info");

    // Créer un élément pour afficher le titre du média
    const mediaTitle = document.createElement("p");
    mediaTitle.textContent = media.title; // Utilisation du titre du média
    mediaTitle.classList.add("mediaTitle");
    mediaInfoDiv.appendChild(mediaTitle);

    // Créer une div pour contenir le nombre de likes et l'icône de cœur
    const likesContainer = document.createElement("div");
    likesContainer.classList.add("likes-container");

    // Créer un élément pour afficher le nombre de likes du média
    const mediaLikes = document.createElement("p");
    mediaLikes.textContent = media.likes + " ";
    mediaLikes.classList.add("mediaLikes");
    likesContainer.appendChild(mediaLikes);

    // Créer un élément pour afficher l'icône de cœur
    const heartIcon = document.createElement("span");
    heartIcon.classList.add("heart-icon");
    heartIcon.classList.add("heart-icon", "fas", "fa-heart");
    // Définir la couleur de l'icône et l'arrière-plan directement en JavaScript
    heartIcon.style.color = "#901C1C";
    heartIcon.style.fontSize = "24px"; // Taille de l'icône
    likesContainer.appendChild(heartIcon);

    // Ajouter les éléments à mediaInfoDiv
    mediaInfoDiv.appendChild(likesContainer);
    mediaContainerDiv.appendChild(mediaInfoDiv);

    // Ajouter le mediaContainerDiv à mediaContainer
    mediaContainer.appendChild(mediaContainerDiv);
  });

  // Initialiser la lightbox après avoir ajouté les médias
  initLightbox(mediaPaths);

  // Mettre à jour le total des likes
  const initialTotalLikes = mediaArray.reduce(
    (total, media) => total + media.likes,
    0
  );
  totalLikes = initialTotalLikes;
  updateTotalLikes();

  // Ajouter des écouteurs d'événements pour tous les boutons de like après avoir ajouté les médias
  document.querySelectorAll(".heart-icon").forEach((heartIcon) => {
    heartIcon.addEventListener("click", (event) => {
      event.stopPropagation(); // Empêche la propagation de l'événement vers les éléments parents
      incrementLikes(event); // Fonction pour incrémenter les likes
    });
  });
}

// Fonction pour trier les médias selon le critère sélectionné
function sortMedia(criteria) {
  let sortedMedia;

  switch (criteria) {
    case "popularity":
      sortedMedia = photographerMedia.sort((a, b) => b.likes - a.likes);
      break;
    case "date":
      sortedMedia = photographerMedia.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      break;
    case "title":
      sortedMedia = photographerMedia.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
      break;
    default:
      sortedMedia = photographerMedia;
  }

  console.log("Médias triés:", sortedMedia);

  // Réafficher les médias triés
  photographerMediaDetails(sortedMedia, selectedPhotographer);
}

// Fonction pour gérer l'événement de tri
function handleSortChange(event) {
  const selectedCriteria = event.detail;
  sortMedia(selectedCriteria);
}

// Ajouter un écouteur d'événement pour l'événement personnalisé
document.addEventListener("sortChanged", handleSortChange);
