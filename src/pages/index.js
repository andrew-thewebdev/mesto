import './index.css';
import Card from '../components/Card.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';

import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';

const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditPopup = document.querySelector('.popup_type_edit-profile');

const popupName = document.querySelector('.popup__input_type_name');
const popupDescr = document.querySelector('.popup__input_type_descr');
const addButton = document.querySelector('.profile__add-button');

const newCardPopup = document.querySelector('.popup_type_add-card');

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

addButton.addEventListener('click', addCard);

function openProfileToEdit() {
  popupProfile.open();
  const uInfo = userInfo.getUserInfo();
  popupName.value = uInfo.username;
  popupDescr.value = uInfo.userinfo;
}

const userInfo = new UserInfo('.profile__name', '.profile__description');

const popupProfile = new PopupWithForm(
  '.popup_type_edit-profile',
  (formData) => {
    userInfo.setUserInfo(formData);
    popupProfile.close();
  }
);
popupProfile.setEventListeners();

const popupWithImage = new PopupWithImage('.popup_type_photo');
popupWithImage.setEventListeners();

const popupAddNewCard = new PopupWithForm(
  '.popup_type_add-card',
  (formData) => {
    const newCard = new Card(formData, '#card-template', (evt) => {
      popupWithImage.open(evt);
    });
    const cardElement = newCard.generate();
    cardList.addItem(cardElement);

    popupAddNewCard.close();
  }
);
popupAddNewCard.setEventListeners();

const cardList = new Section(
  {
    items: initialCards,
    renderer: (cardItem) => {
      const newCard = new Card(cardItem, '#card-template', (evt) => {
        popupWithImage.open(evt);
      });
      const cardElement = newCard.generate();
      cardList.addItem(cardElement);
    },
  },
  '.cards'
);
cardList.renderItems();

function addCard() {
  popupAddNewCard.open();
}

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
