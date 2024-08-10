// Fonction pour créer le sélecteur de tri
function createSortSelect() {
  const sortContainer = document.getElementById("sort-container");

  // Assurez-vous que l'élément sort-container existe
  if (!sortContainer) {
    console.error("Le conteneur de tri n'a pas été trouvé.");
    return;
  }

  // Ajouter le texte "Trier par " seulement s'il n'est pas déjà présent
  if (!sortContainer.querySelector("label")) {
    const sortLabel = document.createElement("label");
    sortLabel.setAttribute("for", "sort-select");
    sortLabel.textContent = "Trier par";
    sortLabel.classList.add("trie-label");
    sortContainer.appendChild(sortLabel);
  }

  // Créer un conteneur pour le select et la flèche
  const selectWrapper = document.createElement("div");
  selectWrapper.setAttribute("id", "select-wrapper");
  selectWrapper.style.position = "relative"; // Assure que le conteneur a un positionnement relatif

  // Créer l'élément select
  const select = document.createElement("div");
  select.setAttribute("id", "sort-select");
  select.setAttribute("class", "custom-select");

  // Ajouter l'élément select au conteneur
  selectWrapper.appendChild(select);

  // Ajouter la flèche (icône SVG) au conteneur
  const arrow = document.createElement("div");
  arrow.setAttribute("class", "select-arrow down");
  arrow.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="9.88" viewBox="0 0 16 9.88" fill="none">
  <path d="M1 1L8 8L15 1" stroke="white" stroke-width="2"/>
</svg>`;
  selectWrapper.appendChild(arrow);

  // Créer le conteneur pour les options
  const optionsContainer = document.createElement("div");
  optionsContainer.setAttribute("id", "options-container");
  optionsContainer.style.display = "none"; // Masquer par défaut

  // Ajouter les options (y compris "Popularité")
  const options = [
    { value: "popularity", text: "Popularité" },
    { value: "date", text: "Date" },
    { value: "title", text: "Titre" },
  ];

  // Par défaut, afficher la première option ("Popularité") comme texte par défaut
  const selectText = document.createElement("span");
  selectText.textContent = options[0].text;
  select.appendChild(selectText);

  options.forEach((option) => {
    const optionElement = document.createElement("div");
    optionElement.classList.add("custom-select-option");
    optionElement.textContent = option.text;
    optionElement.setAttribute("data-value", option.value);
    optionsContainer.appendChild(optionElement);
  });

  selectWrapper.appendChild(optionsContainer);
  sortContainer.appendChild(selectWrapper);

  // Gérer le clic sur le select pour ouvrir/fermer le menu
  let isOpen = false;
  select.addEventListener("click", function () {
    isOpen = !isOpen;
    optionsContainer.style.display = isOpen ? "block" : "none";
    arrow.classList.toggle("up", isOpen);
    arrow.classList.toggle("down", !isOpen);

    // Masquer l'option actuellement sélectionnée
    const currentText = selectText.textContent;
    const options = optionsContainer.querySelectorAll(".custom-select-option");
    options.forEach((option) => {
      if (option.textContent === currentText) {
        option.style.display = "none"; // Masquer l'option déjà sélectionnée
      } else {
        option.style.display = "block"; // Afficher les autres options
      }
    });
  });

  // Gérer la sélection d'une option
  optionsContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("custom-select-option")) {
      const selectedValue = e.target.getAttribute("data-value");
      selectText.textContent = e.target.textContent; // Mettre à jour le texte selon l'option sélectionnée
      optionsContainer.style.display = "none";
      arrow.classList.remove("up");
      arrow.classList.add("down");

      isOpen = false; // Fermer le menu

      // Émettre un événement personnalisé pour signaler la sélection
      const sortEvent = new CustomEvent("sortChanged", {
        detail: selectedValue,
      });
      document.dispatchEvent(sortEvent);
    }
  });

  // Fermer le menu lorsque l'utilisateur clique en dehors
  document.addEventListener("click", (event) => {
    if (!selectWrapper.contains(event.target)) {
      if (isOpen) {
        isOpen = false;
        optionsContainer.style.display = "none";
        arrow.classList.remove("up");
        arrow.classList.add("down");
      }
    }
  });
}

// Ajouter un écouteur d'événement pour exécuter la fonction createSortSelect lorsque le DOM est entièrement chargé
document.addEventListener("DOMContentLoaded", createSortSelect);
