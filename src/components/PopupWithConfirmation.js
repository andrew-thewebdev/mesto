import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(selector, handleConfirmation) {
    super(selector);
    this._handleConfirmation = handleConfirmation;
    this._form = this._element.querySelector('.popup__form');
  }

  setEventListeners() {
    super.setEventListeners();
    this._element.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleConfirmation(this._cardId, this._cardElement);
    });
  }

  open(cardId, cardElement) {
    super.open();
    this._cardId = cardId;
    this._cardElement = cardElement;
  }

  close() {
    super.close();

    this._form.reset();
  }
}
