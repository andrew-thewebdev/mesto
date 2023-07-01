import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._popupPhoto = document.querySelector('.popup__photo');
    this._popupPhotoTitle = document.querySelector('.popup__photo-title');
  }

  open(evt) {
    super.open();

    this._popupPhoto.src = evt.target.src;
    this._popupPhoto.alt = evt.target.alt;
    this._popupPhotoTitle.textContent = evt.target.alt;
  }
}
