import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(selector, handleFormSubmit) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._element.querySelectorAll('.popup__input');
    this._form = this._element.querySelector('.popup__form');
    this._saveButton = this._element.querySelector('.popup__save-button');
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(
      (input) => (this._formValues[input.name] = input.value)
    );

    //Добавляем нулевой массив лайков
    this._formValues['likes'] = [];

    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._element.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._saveButton.textContent = 'Сохранение...';
    } else if (!isLoading) {
      this._saveButton.textContent = 'Сохранить';
      this._saveButton.classList.add('popup__save-button_inactive');
      this._saveButton.disabled = true;
    }
  }

  close() {
    super.close();
    this._saveButton.classList.add('popup__save-button_inactive');
    this._saveButton.disabled = true;
    this._form.reset();
  }
}
