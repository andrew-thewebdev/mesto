export default class FormValidator {
  constructor(settings, formToValidate) {
    this._settings = settings;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._form = document.querySelector(formToValidate);
    this._form.addEventListener('submit', this._formSubmit.bind(this));
    this._inputList = Array.from(
      this._form.querySelectorAll(settings.inputSelector)
    );
  }

  _disableButton(buttonElement) {
    buttonElement.classList.add(this._settings.inactiveButtonClass);
    buttonElement.disabled = true;
  }

  _enableButton(buttonElement) {
    buttonElement.classList.remove(this._settings.inactiveButtonClass);
    buttonElement.disabled = false;
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      this._disableButton(buttonElement);
    } else {
      this._enableButton(buttonElement);
    }
  }

  _formSubmit(evt) {
    evt.preventDefault();
    const submitButton = this._form.querySelector(this._submitButtonSelector);
    this._disableButton(submitButton);
  }

  _showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._settings.errorClass);
  };

  _hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._settings.inputErrorClass);
    errorElement.classList.remove(this._settings.errorClass);
    errorElement.textContent = '';
  };

  _checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage
      );
    } else {
      this._hideInputError(formElement, inputElement);
    }
  };

  _setEventListeners = (formElement) => {
    const buttonElement = formElement.querySelector(
      this._settings.submitButtonSelector
    );
    this._toggleButtonState(this._inputList, buttonElement);

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._toggleButtonState(this._inputList, buttonElement);
        this._checkInputValidity(formElement, inputElement);
      });
    });
  };

  enableValidation() {
    this._setEventListeners(this._form);
  }
}
