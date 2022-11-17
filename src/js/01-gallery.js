import { galleryItems } from './gallery-items';

import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';

const listGalery = document.querySelector('.gallery');

function createGaleryTemplate(items) {
  return items
    .map(({ preview, description, original }) => {
      return `<a class="gallery__item" href="${original}">
                <img class="gallery__image lazyload blur-up" loading="lazy" data-src="${preview}" src="${preview}" alt="${description}" />
            </a>`;
    })
    .join('');
}

const galleryMarkup = createGaleryTemplate(galleryItems);
listGalery.insertAdjacentHTML('beforeend', galleryMarkup);

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  scrollZoomFactor: 0.05,
  enableKeyboard: true,
  disableScroll: true,
  fadeSpeed: 250,
});
