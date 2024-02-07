function photographerTemplate(data) {
  const { name, portrait, city, country, tagline, price, id } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    // Attribution d'un identifiant unique à l'article
    article.id = `photographer-${id}`;
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", "portrait du photographe");
    const h2 = document.createElement("h2");
    h2.textContent = name;
    const h3Location = document.createElement("h3");
    h3Location.textContent = `${city}, ${country}`;
    const pTagline = document.createElement("p");
    pTagline.textContent = tagline;
    pTagline.classList.add("taglinePhotographer");
    const prices = document.createElement("p");
    prices.textContent = price + "€/jours";
    prices.classList.add("pricePhotographer");
    article.appendChild(img);
    article.appendChild(h2);
    article.appendChild(h3Location);
    article.appendChild(pTagline);
    article.appendChild(prices);
    return article;
  }
  return { name, picture, id, getUserCardDOM };
}
