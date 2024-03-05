function photographerTemplate(data) {
  const { name, portrait, city, country, tagline, price, id } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    // Attribution d'un identifiant unique à l'article
    article.id = `photographer-${id}`;

    const lien = document.createElement("a");
    lien.setAttribute("href", `photographer.html?id=${id}`);

    //Creation de la div pour l'image
    const divImg = document.createElement("div");
    divImg.classList.add("image-container");

    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", "portrait du photographe");

    const h2 = document.createElement("h2");
    h2.textContent = name;

    lien.appendChild(img);
    lien.appendChild(h2);

    // Ajouter l'image et le titre dans le lien
    divImg.appendChild(img);
    divImg.appendChild(h2);

    const h3Location = document.createElement("h3");
    h3Location.textContent = `${city}, ${country}`;

    const pTagline = document.createElement("p");
    pTagline.textContent = tagline;
    pTagline.classList.add("taglinePhotographer");

    const prices = document.createElement("p");
    prices.textContent = price + "€/jours";
    prices.classList.add("pricePhotographer");

    // Ajout du lien dans l'article
    article.appendChild(lien);
    lien.appendChild(divImg);
    article.appendChild(h3Location);
    article.appendChild(pTagline);
    article.appendChild(prices);

    return article;
  }
  return { name, picture, id, getUserCardDOM };
}
