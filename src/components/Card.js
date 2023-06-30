export default class Card {
  constructor(data, selector, handleCardClick) {
    this._text = data.name;
    this._image = data.link;
    this._selector = selector;

    this._handleCardClick = handleCardClick;
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
      this._handleCardClick(evt);
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

  _handleCardClick(evt) {
    console.log('card clicked');
  }

  _handleClickOnLike() {
    this._buttonLike.classList.toggle('card__like-icon_active');
  }

  _handleClickOnDeleteButton() {
    this._element.remove();
    this._element = null;
  }
}
