function displayModal() {
  const modal = document.getElementById("contact_modal");
  const modalTitle = modal.querySelector("h2"); // Sélectionne l'élément h2 à l'intérieur de la modal

  // Assurez-vous que photographerId est défini
  if (photographerId !== null) {
    // Charger les données JSON pour les photographes
    fetch("data/photographers.json")
      .then((response) => response.json())
      .then((data) => {
        // Recherche du photographe avec l'ID correspondant
        const photographer = data.photographers.find(
          (p) => p.id === parseInt(photographerId)
        );
        if (photographer) {
          modalTitle.textContent = "Contactez " + photographer.name; // Ajoute le nom du photographe au titre de la modal
          modal.style.display = "block"; // Affiche la modal
        } else {
          console.error("Photographe non trouvé avec l'ID :", photographerId);
        }
      })
      .catch((error) =>
        console.error("Erreur lors du chargement du fichier JSON :", error)
      );
  } else {
    console.error("L'ID du photographe n'est pas défini.");
  }
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}
