import { galleryItems } from "./gallery-items.js";

const galleryContainer = document.querySelector(".gallery");

galleryContainer.innerHTML = makeGalleryMarkup(galleryItems);

if ("loading" in HTMLImageElement.prototype) {
  addSrcElementForLazyLoading();
} else {
  addLazySizesScript();
}

new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
});

const galleryContainerClick = galleryContainer.addEventListener(
  "click",
  getRightClick
);

/** functions */

function addSrcElementForLazyLoading() {
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  lazyImages.forEach((img) => {
    img.src = img.dataset.src;
  });
}

function addLazySizesScript() {
  const script = document.createElement("script");
  script.src =
    "https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js";
  script.integrity =
    "sha512-q583ppKrCRc7N5O0n2nzUiJ+suUv7Et1JGels4bXOaMFQcamPk9HjdUknZuuFjBNs7tsMuadge5k9RzdmO+1GQ==";
  script.crossOrigin = "anonymous";
  script.referrerPolicy = "no-referrer";
  document.body.appendChild(script);
}

function makeGalleryMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
         <a class="gallery__item" href="${original}">
            <img class="gallery__image lazyload" loading="lazy" data-src="${preview}" alt="${description}" />
        </a>`;
    })
    .join("");
}

function getRightClick(evt) {
  evt.preventDefault();

  const targetClick = evt.target;

  if (!targetClick.classList.contains("gallery__image")) {
    return;
  }
}