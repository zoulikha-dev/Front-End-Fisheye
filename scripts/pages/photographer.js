//Récupération de l'id du photographe a partir de l'url
const urlParams = new URLSearchParams(window.location.search);
const photographerId = urlParams.get("id");

//Construction de l'url de l'api avec l'ID du photographe
const apiUrl = `data/photographers.json`;

//Récupération des données du photographe a partir de l'api
fetch(apiUrl)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Erreur");
    }
    //Convertion de la réponse en JSON
    return response.json();
  })
  .then((data) => {
    //Trouver le photographe avec l'id qui correspond
    const photographer = data.photographers.find(
      (photographer) => photographer.id === parseInt(photographerId)
    );

    if (photographer) {
      //Afficher les détails du photographe
      photographerDetails(photographer);

      //Filtrer les médias pour obtenir ceux du photographe sélectionné
      const photographerMedia = data.media.filter(
        (media) => media.photographerId === photographer.id
      );

      photographerMediaDetails(photographerMedia, photographer);
    } else {
      console.error("Photographe non trouvé");
    }
  })
  .catch((error) => {
    //gerer les erreurs
    console.error("Erreur lors de la récupération des données fetch:", error);
  });

//Fonction pour afficher les détails du photographe
function photographerDetails(photographer) {
  const photographHeaderDiv = document.querySelector(".photograph-header");

  // Création des différentes divs pour organiser les éléments
  const photographerDetailsDiv = document.createElement("div");
  photographerDetailsDiv.classList.add("photographer-details");
  photographerDetailsDiv.innerHTML = `
    <h2>${photographer.name}</h2> 
    <h3>${photographer.city}, ${photographer.country}</h3>
    <p>${photographer.tagline}
    <img src="assets/photographers/${photographer.portrait}" alt="Portrait du photographe">`;

  console.log(photographer);
  photographHeaderDiv.appendChild(photographerDetailsDiv);
}

// Fonction pour afficher les medias du photographe
function photographerMediaDetails(photographerMedia, photographer) {
  // Convertir le nom du photographe en un format utilisable pour le dossier
  const photographerFolder = photographer.name.replace("_", " ");

  const photographerDetailsMediaDiv = document.createElement("div");
  photographerDetailsMediaDiv.classList.add("pictures");

  photographerMedia.forEach((media) => {
    const mediaElement = document.createElement(media.image ? "img" : "video");
    if (media.image) {
      mediaElement.src = `assets/images/${photographerFolder}/${media.image}`;
      mediaElement.alt = media.title;
    } else {
      mediaElement.src = `assets/images/${photographerFolder}/${media.video}`;
      mediaElement.type = "video/mp4";
      mediaElement.controls = true; //ajout des controle de lecture pour les vidéos
    }
    photographerDetailsMediaDiv.appendChild(mediaElement);
  });

  const mainElement = document.getElementById("main");
  mainElement.appendChild(photographerDetailsMediaDiv);
}
