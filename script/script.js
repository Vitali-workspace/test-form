import { initialCards } from './cards.js';
import { FormValidator } from './FormValidator.js';
import { Card } from './Card.js';

const container = document.querySelector('.root');
const profile = container.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileDescription = profile.querySelector('.profile__description');
const inputName = container.querySelector('#inputEditName');
const inputDescription = container.querySelector('#inputEditText');

const templateCard = document.querySelector('#tempCard').content;
const gallery = container.querySelector('.gallery'); // место вставки карточек

const newCardName = container.querySelector('#inputAddName');
const newCardLink = container.querySelector('#inputAddLink');

const formAddCard = container.querySelector('#formAdd');
const formEdit = document.querySelector('#formEdit');

const popupEdit = container.querySelector('#popupEdit');
const popupAddCard = container.querySelector('#popupAddCard');

const popupCardImg = container.querySelector('#popupCardImg');
const popupImage = container.querySelector('.popup__image');
const popupImageName = container.querySelector('.popup__image-name');

const objElements = {
  formSelector: '.form',
  inputSelector: '.popup__edit-input',
  submitButtonSelector: '.popup__btn-save',
  inactiveButtonClass: 'popup_btn-disable',
  inputErrorSelector: '.popup__input-error',
  errorClass: 'popup__input-error_active'
}

const validFormEdit = new FormValidator(objElements, formEdit);
const validFormAddCard = new FormValidator(objElements, formAddCard);
validFormEdit.enableValidation();
validFormAddCard.enableValidation();


function getReadyCard(parametersCard) {
  const newBuildCard = new Card(parametersCard, templateCard);
  return newBuildCard.createTemplateCard();
}

// отрисовка начальных карточек
function printCards() {
  initialCards.forEach(function (startingСard) {
    const resultCard = getReadyCard(startingСard);
    gallery.prepend(resultCard);
  });
}

function closePopupEscAndOverlay() {
  const openedPopup = document.querySelector('.popup_opened');
  closePopup(openedPopup);
}

function closePopupOnEsc(evt) {
  if (evt.key === 'Escape') {
    closePopupEscAndOverlay();
  }
}

function closePopupOnOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopupEscAndOverlay();
  }
}

function showPopup(popupName) {
  popupName.classList.toggle('popup_opened');
  popupName.classList.toggle('popup_close');
  popupName.addEventListener('mousedown', closePopupOnOverlay);
  document.addEventListener('keydown', closePopupOnEsc);
}

function closePopup(popupName) {
  popupName.classList.toggle('popup_opened');
  popupName.classList.toggle('popup_close');
  popupName.removeEventListener('mousedown', closePopupOnOverlay);
  document.removeEventListener('keydown', closePopupOnEsc);
}

// Функция добавления карточки через форму.
function submitFormAddCard(evt) {
  evt.preventDefault();
  const newCard = {
    name: newCardName.value,
    link: newCardLink.value
  }

  gallery.prepend(getReadyCard(newCard));
  formAddCard.reset();
  closePopup(popupAddCard);
  validFormAddCard.disabledSubmitAddCard();
}

// Копирование текста из профиля в edit input
function copyTextPopupEdit() {
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
}

function submitFormEdit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closePopup(popupEdit);
}

container.querySelector('#popupEdit .popup__btn-close').addEventListener('click', function () {
  closePopup(popupEdit);
});

container.querySelector('#popupAddCard .popup__btn-close').addEventListener('click', function () {
  closePopup(popupAddCard);
});
container.querySelector('#popupCardImg .popup__btn-close').addEventListener('click', function () {
  closePopup(popupCardImg);
});

container.querySelector('.profile__btn-add').addEventListener('click', function () {
  showPopup(popupAddCard);
});
container.querySelector('.profile__btn-edit').addEventListener('click', function () {
  showPopup(popupEdit);
  copyTextPopupEdit();
});

formAddCard.addEventListener('submit', submitFormAddCard);
container.querySelector('#formEdit').addEventListener('submit', submitFormEdit);
printCards();

export { popupImage, popupImageName, popupCardImg, showPopup };
