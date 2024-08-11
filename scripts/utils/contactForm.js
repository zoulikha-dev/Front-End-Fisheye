// contactForm.js

function displayModal() {
  const modal = document.getElementById("contact_modal");
  const modalTitle = modal.querySelector("h2");

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
          modal.setAttribute("aria-hidden", "false"); // Met à jour l'attribut ARIA
          modal.querySelector("input").focus(); // Focus sur le premier champ de formulaire
          document.addEventListener("keydown", handleKeydown); // Ajoute un gestionnaire d'événements clavier
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
  modal.style.display = "none"; // Cache la modal
  modal.setAttribute("aria-hidden", "true"); // Met à jour l'attribut ARIA
  document.removeEventListener("keydown", handleKeydown); // Supprime le gestionnaire d'événements clavier
}

function handleKeydown(event) {
  if (event.key === "Escape") {
    closeModal(); // Ferme la modal si la touche Escape est pressée
  }
}
