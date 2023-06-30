import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
  }

  open(evt) {
    super.open();

    document.querySelector('.popup__photo').src = evt.target.src;
    document.querySelector('.popup__photo').alt = evt.target.alt;
    document.querySelector('.popup__photo-title').textContent = evt.target.alt;
  }
}
