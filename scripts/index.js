const profileEditButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup_type_edit-profile');
const profileCloseButton = document.querySelector(
  '.popup__close-button_type_profile'
);
const profileName = document.querySelector('.profile__name');
const profileDescr = document.querySelector('.profile__description');
const popupName = document.querySelector('.popup__input_type_name');
const popupDescr = document.querySelector('.popup__input_type_descr');
const popupFormProfile = document.querySelector('.popup__form_type_profile');
const addButton = document.querySelector('.profile__add-button');

const newCardPopup = document.querySelector('.popup_type_add-card');
const popupFormNewCard = document.querySelector('.popup__form_type_add-card');
const inputCardTitle = document.querySelector('.popup__input_type_card-title');
const inputCardImgLink = document.querySelector('.popup__input_type_card-img');
const cardCloseButton = document.querySelector(
  '.popup__close-button_type_card'
);

const cardTemplate = document.querySelector('#card-template');
const cardTemplateContent = cardTemplate.content;
const cardArticle = cardTemplateContent.querySelector('.card');

const cards = document.querySelector('.cards');

const popupPhoto = document.querySelector('.popup-photo');
const popupPhotoImg = document.querySelector('.popup-photo__img');
const popupPhotoTitle = document.querySelector('.popup-photo__title');
const popupPhotoCloseButton = document.querySelector(
  '.popup-photo__close-button'
);

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

profileEditButton.addEventListener('click', openProfileToEdit);
profileCloseButton.addEventListener('click', closeProfile);
popupFormProfile.addEventListener('submit', profileSubmitHandler);

popupFormNewCard.addEventListener('submit', newCardSubmitHandler);
addButton.addEventListener('click', addCard);
cardCloseButton.addEventListener('click', closeCard);

popupPhotoCloseButton.addEventListener('click', closePopupImage);

function openProfileToEdit() {
  popup.classList.add('popup_opened');
  popupName.value = profileName.textContent;
  popupDescr.value = profileDescr.textContent;
}

function closeProfile() {
  popup.classList.remove('popup_opened');
}

function profileSubmitHandler(event) {
  event.preventDefault();
  profileName.textContent = popupName.value;
  profileDescr.textContent = popupDescr.value;

  closeProfile();
}

initialCards.forEach(function (cardItem) {
  const newCardCreated = createCard(cardItem);
  cards.prepend(newCardCreated);
});

function createCard(card) {
  const newCard = cardArticle.cloneNode(true);
  const newCardImage = newCard.querySelector('.card__image');
  const newCardTitle = newCard.querySelector('.card__title');
  const newCardLikeIcon = newCard.querySelector('.card__like-icon');
  const newCardDeleteButton = newCard.querySelector('.card__delete');

  newCardLikeIcon.addEventListener('click', function (event) {
    event.target.classList.toggle('card__like-icon_active');
  });

  newCardDeleteButton.addEventListener('click', function (event) {
    cards.removeChild(newCard);
  });

  newCardImage.addEventListener('click', function (event) {
    popupPhoto.classList.add('popup-photo_opened');
    popupPhotoImg.src = event.target.src;
    popupPhotoImg.alt = event.target.alt;
    popupPhotoTitle.textContent = event.target.alt;
  });

  newCardImage.src = card.link;
  newCardImage.alt = card.name;
  newCardTitle.textContent = card.name;

  return newCard;
}

function addCard() {
  newCardPopup.classList.add('popup_opened');
}

function closeCard() {
  newCardPopup.classList.remove('popup_opened');
}

function newCardSubmitHandler(event) {
  event.preventDefault();
  const newCardObj = {
    name: inputCardTitle.value,
    link: inputCardImgLink.value,
  };
  const form = event.target;

  const newCard = createCard(newCardObj);
  cards.prepend(newCard);

  form.reset();
  closeCard();
}

function closePopupImage() {
  popupPhoto.classList.remove('popup-photo_opened');
}
