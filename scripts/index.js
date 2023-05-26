let profileEditButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup_type_edit-profile');
let profileCloseButton = document.querySelector(
  '.popup__close-button_type_profile'
);
let profileName = document.querySelector('.profile__name');
let profileDescr = document.querySelector('.profile__description');
let popupName = document.querySelector('.popup__input_type_name');
let popupDescr = document.querySelector('.popup__input_type_descr');
let popupFormProfile = document.querySelector('.popup__form_type_profile');
let addButton = document.querySelector('.profile__add-button');

let newCardPopup = document.querySelector('.popup_type_add-card');
let popupFormNewCard = document.querySelector('.popup__form_type_add-card');
let inputCardTitle = document.querySelector('.popup__input_type_card-title');
let inputCardImgLink = document.querySelector('.popup__input_type_card-img');
let cardCloseButton = document.querySelector('.popup__close-button_type_card');

cardTemplate = document.querySelector('.card-template');
cardTemplateContent = cardTemplate.content;
cards = document.querySelector('.cards');

profileEditButton.addEventListener('click', openProfileToEdit);
profileCloseButton.addEventListener('click', closeProfile);
popupFormProfile.addEventListener('submit', profileSubmitHandler);

popupFormNewCard.addEventListener('submit', newCardSubmitHandler);
addButton.addEventListener('click', addCard);
cardCloseButton.addEventListener('click', closeCard);

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

initialCards.forEach(function (cardItem) {
  const newCardCreated = createCard(cardItem);
  cards.prepend(newCardCreated);
});

function createCard(card) {
  const newCard = cardTemplateContent.cloneNode(true);
  const newCardImage = newCard.querySelector('.card__image');
  const newCardTitle = newCard.querySelector('.card__title');
  const newCardLikeIcon = newCard.querySelector('.card__like-icon');

  newCardLikeIcon.addEventListener('click', function (event) {
    event.target.classList.toggle('card__like-icon_active');
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
