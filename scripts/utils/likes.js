// Variable pour suivre le total des likes
let totalLikes = 0;

// Fonction pour mettre à jour l'affichage du total des likes
function updateTotalLikes() {
  const totalLikesElement = document.getElementById("total-likes");
  totalLikesElement.textContent = totalLikes;
}

// Fonction pour mettre à jour le tarif
function updatePrice(price) {
  const priceTag = document.getElementById("price-tag");
  priceTag.textContent = `${price}€/ jour`;
}

// Fonction pour incrémenter les likes
function incrementLikes(event) {
  const likeButton = event.target;
  const likesCountElement = likeButton.previousElementSibling;
  let likesCount = parseInt(likesCountElement.textContent);

  console.log("Before click - likesCount: ", likesCount); // Vérifier la valeur avant l'incrémentation

  // Vérifier si le média a déjà été liké
  if (!likeButton.classList.contains("liked")) {
    likesCount += 1;
    totalLikes += 1;

    // Mettre à jour l'affichage des likes
    likesCountElement.textContent = likesCount;
    likeButton.classList.add("liked");
    updateTotalLikes();

    console.log("l'icône est bien cliquée!"); // Ajoute cette ligne pour vérifier que l'icône est bien cliquée
    console.log("New likes: ", likesCount); // Ajoute cette ligne pour vérifier le nombre de likes
    console.log("Total likes: ", totalLikes); // Ajoute cette ligne pour vérifier le total des likes
  } else {
    console.log("Already liked"); // Ajoute cette ligne pour vérifier si le média a déjà été liké
  }
}

// Initialiser le total des likes en chargeant la page
document.addEventListener("DOMContentLoaded", () => {
  updateTotalLikes();

  // Ajouter des écouteurs d'événement pour tous les boutons de like après le chargement de la page
  document.querySelectorAll(".heart-icon").forEach((heartIcon) => {
    heartIcon.addEventListener("click", incrementLikes);
  });
});
