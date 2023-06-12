const showInputError = (formElement, inputElement, errorMessage, props) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(props.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(props.errorClass);
};

const hideInputError = (formElement, inputElement, props) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(props.inputErrorClass);
  errorElement.classList.remove(props.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, props) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      props
    );
  } else {
    hideInputError(formElement, inputElement, props);
  }
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement, props) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(props.inactiveButtonClass);
  } else buttonElement.classList.remove(props.inactiveButtonClass);
}

const setEventListeners = (formElement, props) => {
  const inputList = Array.from(
    formElement.querySelectorAll(props.inputSelector)
  );
  const buttonElement = formElement.querySelector(props.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, props);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      toggleButtonState(inputList, buttonElement, props);
      checkInputValidity(formElement, inputElement, props);
    });
  });
};

const enableValidation = (props) => {
  const formList = Array.from(document.querySelectorAll(props.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, props);
  });
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
});