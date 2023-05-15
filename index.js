let profileEditButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let profileCloseButton = document.querySelector('.popup__close-button');
let profileName = document.querySelector('.profile__name');
let profileDescr = document.querySelector('.profile__description');
let popupName = document.querySelector('.popup__name');
let popupDescr = document.querySelector('.popup__description');
let popupForm = document.querySelector('.popup__form');

profileEditButton.addEventListener('click', openProfileToEdit);
profileCloseButton.addEventListener('click', closeProfile);
popupForm.addEventListener('submit', profileSubmitHandler);

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
