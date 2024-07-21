// Récupération de l'id du photographe à partir de l'url
const urlParams = new URLSearchParams(window.location.search);
const photographerId = urlParams.get("id");

// Construction de l'url de l'api avec l'ID du photographe
const apiUrl = `data/photographers.json`;

// Récupération des données du photographe à partir de l'api
fetch(apiUrl)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Erreur");
    }
    // Conversion de la réponse en JSON
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

      photographerMediaDetails(photographerMedia, photographer);
    } else {
      console.error("Photographe non trouvé");
    }
  })
  .catch((error) => {
    // Gérer les erreurs
    console.error("Erreur lors de la récupération des données fetch:", error);
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
}

// Fonction pour afficher les médias du photographe
function photographerMediaDetails(mediaArray, photographer) {
  const mediaContainer = document.getElementById("photographer-media");
  mediaContainer.innerHTML = "";

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
    heartIcon.textContent = "❤️"; // Utilisation de l'icône de cœur Unicode
    likesContainer.appendChild(heartIcon);

    // Ajouter les éléments à mediaInfoDiv
    mediaInfoDiv.appendChild(likesContainer);
    mediaContainerDiv.appendChild(mediaInfoDiv);

    // Ajouter le mediaContainerDiv à mediaContainer
    mediaContainer.appendChild(mediaContainerDiv);
  });

  // Initialiser la lightbox après avoir ajouté les médias
  initLightbox(mediaPaths);
}

// Fonction pour ouvrir la lightbox
function openLightbox(src, index, title) {
  const lightbox = document.getElementById("lightbox");
  const lightboxMedia = lightbox.querySelector(".lightbox-media");
  const lightboxTitle = lightbox.querySelector(".lightbox-title");

  lightboxMedia.src = src;
  lightboxTitle.textContent = title;
  lightbox.style.display = "block";

  // Fermer la lightbox au clic sur le bouton de fermeture
  const closeButton = lightbox.querySelector(".close-lightbox");
  closeButton.addEventListener("click", () => {
    lightbox.style.display = "none";
  });

  // Naviguer entre les médias
  const prevButton = lightbox.querySelector(".prev");
  const nextButton = lightbox.querySelector(".next");

  prevButton.addEventListener("click", () => {
    const prevIndex = (index - 1 + mediaPaths.length) % mediaPaths.length;
    openLightbox(
      mediaPaths[prevIndex].path,
      prevIndex,
      mediaPaths[prevIndex].title
    );
  });

  nextButton.addEventListener("click", () => {
    const nextIndex = (index + 1) % mediaPaths.length;
    openLightbox(
      mediaPaths[nextIndex].path,
      nextIndex,
      mediaPaths[nextIndex].title
    );
  });
}
