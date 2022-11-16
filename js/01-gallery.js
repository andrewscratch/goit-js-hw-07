import { galleryItems } from "./gallery-items.js";

const galleryContainer = document.querySelector(".gallery");
galleryContainer.insertAdjacentHTML(
  "beforeend",
  makeGalleryMarkup(galleryItems)
);

if ("loading" in HTMLImageElement.prototype) {
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  lazyImages.forEach((img) => {
    img.src = img.dataset.src;
  });
} else {
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
      <div class="gallery__item">
        <a class="gallery__link" href="${original}">
        <img class="gallery__image lazyload"
            loading="lazy"
            data-src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </div>`;
    })
    .join("");
}

const galleryContainerClick = galleryContainer.addEventListener(
  "click",
  getRightClick
);

function getRightClick(evt) {
  evt.preventDefault();

  const targetClick = evt.target;
  if (!targetClick.classList.contains("gallery__image")) {
    return;
  }

  onModalOriginalPicture(targetClick);
}

function onModalOriginalPicture(targetClick) {
  const linkContainer = document.querySelectorAll(".gallery__image");
  const urlOriginalSizePicture = targetClick.dataset.source;

  const instance = basicLightbox.create(
    ` <div class="modal"> <img src="${urlOriginalSizePicture}" alt="Big Pictures"/> </div> `,
    {
      onShow: (instance) => {
        galleryContainer.addEventListener("keydown", onEscapeButton);
      },

      onClose: (instance) => {
        galleryContainer.removeEventListener("keydown", onEscapeButton);
      },
    }
  );

  instance.show();

  function onEscapeButton(evt) {
    if (evt.key === "Escape") {
      instance.close();
    }
  }
}
