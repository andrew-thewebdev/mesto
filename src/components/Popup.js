export default class Popup {
  constructor(selector) {
    this._selector = selector;
    this._element = document.querySelector(this._selector);
  }

  open() {
    this._element.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose.bind(this));
  }

  close() {
    this._element.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._element
      .querySelector('.popup__close-button')
      .addEventListener('click', () => {
        this.close();
      });

    this._element.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup')) {
        this.close();
      }
    });
  }
}
