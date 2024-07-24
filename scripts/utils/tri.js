function createSortSelect() {
  const sortContainer = document.getElementById("sort-container");

  // Assurez-vous que l'élément sort-container existe
  if (!sortContainer) {
    console.error("Le conteneur de tri n'a pas été trouvé.");
    return;
  }

  const select = document.createElement("select");
  select.setAttribute("id", "sort-select");

  // Options pour le tri
  const options = [
    { value: "popularity", text: "Popularité" },
    { value: "date", text: "Date" },
    { value: "title", text: "Titre" },
  ];

  options.forEach((option) => {
    const optionElement = document.createElement("option");
    optionElement.value = option.value;
    optionElement.textContent = option.text;
    select.appendChild(optionElement);
  });

  sortContainer.appendChild(select);
}

document.addEventListener("DOMContentLoaded", createSortSelect);
