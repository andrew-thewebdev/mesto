export default class Card {
  constructor(data, selector, openModalWindow) {
    this._text = data.name;
    this._image = data.link;
    this._selector = selector;

    this._openModalWindow = openModalWindow;
  }

  _getElement() {
    const cardElement = document
      .querySelector(this._selector)
      .content.querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  generate() {
    this._element = this._getElement();

    this._cardImage = this._element.querySelector('.card__image');
    this._cardImage.src = this._image;
    this._cardImage.alt = this._text;

    this._buttonLike = this._element.querySelector('.card__like-icon');

    const newCardTitle = this._element.querySelector('.card__title');
    newCardTitle.textContent = this._text;

    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._cardImage.addEventListener('click', (evt) => {
      this._handleClickOnImage(evt);
    });

    this._buttonLike.addEventListener('click', () => {
      this._handleClickOnLike();
    });

    this._element
      .querySelector('.card__delete')
      .addEventListener('click', () => {
        this._handleClickOnDeleteButton();
      });
  }

  _handleClickOnImage(evt) {
    this._openModalWindow(document.querySelector('.popup_type_photo'));

    document.querySelector('.popup__photo').src = evt.target.src;
    document.querySelector('.popup__photo').alt = evt.target.alt;
    document.querySelector('.popup__photo-title').textContent = evt.target.alt;
  }

  _handleClickOnLike() {
    this._buttonLike.classList.toggle('card__like-icon_active');
  }

  _handleClickOnDeleteButton() {
    this._element.remove();
    this._element = null;
  }
}
