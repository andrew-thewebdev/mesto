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

    const newCardImage = this._element.querySelector('.card__image');
    newCardImage.src = this._image;
    newCardImage.alt = this._text;

    const newCardTitle = this._element.querySelector('.card__title');
    newCardTitle.textContent = this._text;

    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._element
      .querySelector('.card__image')
      .addEventListener('click', (evt) => {
        this._handleClickOnImage(evt);
      });

    this._element
      .querySelector('.card__like-icon')
      .addEventListener('click', () => {
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
    this._element
      .querySelector('.card__like-icon')
      .classList.toggle('card__like-icon_active');
  }

  _handleClickOnDeleteButton() {
    document.querySelector('.cards').removeChild(this._element);
  }
}
