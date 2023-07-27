export default class Card {
  constructor(
    data,
    selector,
    currentUser,
    handleCardClick,
    handleDeleteClick,
    handleLikeClick
  ) {
    this._cardId = data._id;
    this._text = data.name;
    this._image = data.link;
    this._likes = data.likes;

    this._isLikedByMe = this._likes.some((el) => {
      return el._id === currentUser._id;
    });

    this._cardOwner = data.owner;
    this._cardOwnerId = data.owner._id;
    this._currentUserId = currentUser._id;

    this._selector = selector;

    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
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

    this._cardDeleteButton = this._element.querySelector('.card__delete');
    if (this._cardOwnerId !== this._currentUserId) {
      this._cardDeleteButton.style.display = 'none';
    }

    this._buttonLike = this._element.querySelector('.card__like-icon');
    if (this._isLikedByMe) {
      this._buttonLike.classList.add('card__like-icon_active');
    }

    const newCardTitle = this._element.querySelector('.card__title');
    newCardTitle.textContent = this._text;

    this._likesCounter = this._element.querySelector('.card__likes-num');
    this._likesCounter.textContent = this._likes.length;

    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._cardImage.addEventListener('click', (evt) => {
      this._handleCardClick(evt);
    });

    this._buttonLike.addEventListener('click', () => {
      this._buttonLike.classList.toggle('card__like-icon_active');
      this._isLikedByMe = !this._isLikedByMe;
      this._handleLikeClick(this._cardId, this._element, this._isLikedByMe);
    });

    this._element
      .querySelector('.card__delete')
      .addEventListener('click', () => {
        this._handleDeleteClick(this._cardId, this._element);
      });
  }

  _handleCardClick(evt) {
    console.log('card clicked');
  }
}
