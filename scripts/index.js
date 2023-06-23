import Card from './Card.js';
import FormValidator from './FormValidator.js';

const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditPopup = document.querySelector('.popup_type_edit-profile');
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

const cardsContainer = document.querySelector('.cards');

const popupPhoto = document.querySelector('.popup_type_photo');
const popupPhotoCloseButton = document.querySelector(
  '.popup__close-button_type_photo'
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

function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closeModalWindow(popupOpened);
  }
}

function openModalWindow(modalWindow) {
  modalWindow.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
}

function closeModalWindow(modalWindow) {
  modalWindow.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
}

function openProfileToEdit() {
  openModalWindow(profileEditPopup);

  popupName.value = profileName.textContent;
  popupDescr.value = profileDescr.textContent;
}

function closeProfile() {
  closeModalWindow(profileEditPopup);
}

function profileSubmitHandler(event) {
  event.preventDefault();
  profileName.textContent = popupName.value;
  profileDescr.textContent = popupDescr.value;

  closeProfile();
}

function createCard(cardData) {
  const newCard = new Card(cardData, '#card-template', openModalWindow);
  const cardElement = newCard.generate();
  return cardElement;
}

initialCards.forEach((item) => {
  const cardElement = createCard(item);

  cardsContainer.prepend(cardElement);
});

function addCard() {
  const newCardForm = newCardPopup.querySelector('.popup__form');
  newCardForm.reset();

  openModalWindow(newCardPopup);
}

function closeCard() {
  closeModalWindow(newCardPopup);
}

function closePopupImage() {
  closeModalWindow(popupPhoto);
}

function newCardSubmitHandler(event) {
  event.preventDefault();
  const newCardObj = {
    name: inputCardTitle.value,
    link: inputCardImgLink.value,
  };

  const cardElement = createCard(newCardObj);

  cardsContainer.prepend(cardElement);

  closeCard();
}

const enablePopupCloseByOverlayClick = () => {
  const overlayList = Array.from(document.querySelectorAll('.popup'));
  overlayList.forEach((overlay) => {
    overlay.addEventListener('click', function (evt) {
      if (evt.target.classList.contains('popup')) {
        closeModalWindow(overlay);
      }
    });
  });
};

enablePopupCloseByOverlayClick();

const profileValidator = new FormValidator(
  {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active',
  },
  profileEditPopup
);

profileValidator.enableValidation();

const newPlaceValidator = new FormValidator(
  {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active',
  },
  newCardPopup
);

newPlaceValidator.enableValidation();
