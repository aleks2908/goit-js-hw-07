import { galleryItems } from "./gallery-items.js";

const gallery = document.querySelector(".gallery");
gallery.addEventListener("click", showModalWindow);

const galleryMarkup = galleryItems
  .map(
    ({ preview, original, description }) =>
      `<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`
  )
  .join("");

gallery.innerHTML = galleryMarkup;

/**
 * open/close modal window
 * @param {Object evt}
 * @returns -
 */
function showModalWindow(evt) {
  evt.preventDefault();
  if (evt.target.nodeName !== "IMG") {
    return;
  }

  const instance = basicLightbox.create(
    `<img src="${evt.target.dataset.source}">`,
    {
      onShow: () => {
        document.addEventListener("keydown", onEscapeKeyDown);
      },
      onClose: () => {
        document.removeEventListener("keydown", onEscapeKeyDown);
      },
    }
  );
  instance.show();

  /**
   * checks the condition for closing the modal window
   * @param {Object evt}
   * @returns function
   */
  function onEscapeKeyDown(evt) {
    if (evt.code !== "Escape") {
      return;
    }
    instance.close();
  }
}
