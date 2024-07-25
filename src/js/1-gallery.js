import { galleryItems } from './gallery-items';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryBox = document.querySelector('.gallery');
const galleryMarkup = createGalleryMarkup(galleryItems);

galleryBox.addEventListener('click', event => event.preventDefault());

function createGalleryMarkup(galleryItems) {
  const images = galleryItems.map(({ preview, original, description }) => {
    return `
      <li class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img
            class="gallery__image"
            src="${preview}"
            alt="${description}" /* Ensure the alt attribute contains the full description */
          />
        </a>
      </li>
    `;
  }).join('');

  return images;
}

galleryBox.insertAdjacentHTML('afterbegin', galleryMarkup);

const lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',  
  captionDelay: 250,
  captionPosition: 'bottom',  
});