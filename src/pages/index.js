import './index.css';
import Card from '../components/Card.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';

import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';

import Api from '../components/Api.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation';

const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditPopup = document.querySelector('.popup_type_edit-profile');

const popupName = document.querySelector('.popup__input_type_name');
const popupDescr = document.querySelector('.popup__input_type_descr');
const addButton = document.querySelector('.profile__add-button');

const newCardPopup = document.querySelector('.popup_type_add-card');

profileEditButton.addEventListener('click', openProfileToEdit);

addButton.addEventListener('click', addCard);

const avatarUpdatePopup = document.querySelector('.popup_type_avatar-update');
const avatarUpdateButton = document.querySelector('.profile__avatar-container');
avatarUpdateButton.addEventListener('click', openAvatarUpdatePopup);

const popupAvatarUpdate = new PopupWithForm(
  '.popup_type_avatar-update',
  (updatedAvatarLink) => {
    popupAvatarUpdate.renderLoading(true);

    api
      .updateAvatar(updatedAvatarLink)
      .then((res) => {
        popupAvatarUpdate.close();
        userInfo.setUserAvatar(res.avatar);
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      })
      .finally(() => {
        popupAvatarUpdate.renderLoading(false);
      });
  }
);
popupAvatarUpdate.setEventListeners();

const avatarUpdateValidator = new FormValidator(
  {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active',
  },
  avatarUpdatePopup
);

avatarUpdateValidator.enableValidation();

function openAvatarUpdatePopup() {
  popupAvatarUpdate.open();
}

function openProfileToEdit() {
  popupProfile.open();
  const uInfo = userInfo.getUserInfo();
  popupName.value = uInfo.username;
  popupDescr.value = uInfo.userinfo;
}

const userInfo = new UserInfo(
  '.profile__name',
  '.profile__description',
  '.profile__avatar'
);

const popupProfile = new PopupWithForm(
  '.popup_type_edit-profile',
  (formData) => {
    popupProfile.renderLoading(true);

    api
      .updateProfile(formData)
      .then((updatedUserData) => {
        userInfo.setUserInfo(updatedUserData);
        popupProfile.close();
      })
      .catch((err) => {
        console.log(`Ошибка данных: ${err}`);
      })
      .finally(() => {
        popupProfile.renderLoading(false);
      });
  }
);
popupProfile.setEventListeners();

const popupWithImage = new PopupWithImage('.popup_type_photo');
popupWithImage.setEventListeners();

//Попап подтверждения удаления карточки
const popupWithDeleteConfirm = new PopupWithConfirmation(
  '.popup_type_delete-confirm',
  (cardId, cardElement) => {
    // console.log('hey i am deleting cardID ...', cardId);
    // console.log('hey i am deleting cardElement...', cardElement);
    api.deleteCard(cardId).then(() => {
      cardElement.remove();
      cardElement = null;
      popupWithDeleteConfirm.close();
    });
  }
);
popupWithDeleteConfirm.setEventListeners();

function createCard(item, curUser) {
  const newCard = new Card(
    item,
    '#card-template',
    curUser,
    (evt) => {
      popupWithImage.open(evt);
    },
    (cardId, cardElement) => {
      // console.log('confirm popup opening...to delete following ID:', cardId);
      popupWithDeleteConfirm.open(cardId, cardElement);
    },
    (cardId, cardElement, isLiked) => {
      // console.log('like clicking on following ID:', cardId);
      if (isLiked) {
        api.likeCard(cardId).then((res) => {
          cardElement.querySelector('.card__likes-num').textContent =
            res.likes.length;
        });
      } else {
        api.dislikeCard(cardId).then((res) => {
          cardElement.querySelector('.card__likes-num').textContent =
            res.likes.length;
        });
      }
    }
  );
  const cardElement = newCard.generate();
  return cardElement;
}

const popupAddNewCard = new PopupWithForm(
  '.popup_type_add-card',
  (formData) => {
    api.getUserInfo().then((userData) => {
      formData['owner'] = userData;

      popupAddNewCard.renderLoading(true);

      api
        .sendCard(formData)
        .then((data) => {
          formData['_id'] = data._id;
          const cardElement = createCard(formData, userData);
          cardList.prependItem(cardElement);
          popupAddNewCard.close();
        })
        .catch((err) => {
          console.log(`Ошибка данных: ${err}`);
        })
        .finally(() => {
          popupAddNewCard.renderLoading(false);
        });
    });
  }
);
popupAddNewCard.setEventListeners();

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

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-71',
  headers: {
    authorization: '40147b95-7947-4dd9-abfc-394e10acaef8',
    'Content-Type': 'application/json',
  },
});

let cardList;

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cardsData]) => {
    // console.log('user data:', userData);
    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData.avatar);

    // console.log('cards data:', cardsData);
    cardList = new Section(
      {
        items: cardsData,
        renderer: (cardItem) => {
          const cardElement = createCard(cardItem, userData);
          cardList.appendItem(cardElement);
        },
      },
      '.cards'
    );
    cardList.renderItems();
  })
  .catch((err) => {
    console.log(`Ошибка данных: ${err}`);
  });
