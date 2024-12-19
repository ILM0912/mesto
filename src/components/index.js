import '../pages/index.css';

import { getCards, getUserInfo, changeProfile, createNewCard, changeAvatar } from './api.js';
import { openPopup, closePopup } from './modal.js';
import { createCard } from './card.js';
import { enableValidation } from './validate.js';

const places_list = document.querySelector('.places__list');

const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const avatarPopup = document.querySelector('.popup_type_avatar');

const popupButton = document.querySelectorAll('.popup__button');

const editProfileButton = document.querySelector('.profile__edit-button');
const closeProfileButton = profilePopup.querySelector('.popup__close');
const profileForm = profilePopup.querySelector('.popup__form');

const addCardButton = document.querySelector('.profile__add-button');
const closeCardButton = cardPopup.querySelector('.popup__close');
const cardForm = cardPopup.querySelector('.popup__form');

const inputNameProfile = profilePopup.querySelector('.popup__input_type_name');
const inputDescriptionProfile = profilePopup.querySelector('.popup__input_type_description');
const nameProfile = document.querySelector('.profile__title');
const descriptionProfile = document.querySelector('.profile__description');

const avatarProfile = document.querySelector('.profile__image-container');
const avatarPhoto = document.querySelector('.profile__image');
const avatarForm = avatarPopup.querySelector('.popup__form');
const closeAvatarButton = avatarPopup.querySelector('.popup__close');
const inputNameCard = cardPopup.querySelector('.popup__input_type_card-name');
const inputLinkCard = cardPopup.querySelector('.popup__input_type_url');

let myId;

getUserInfo()
    .then((res) => {
        nameProfile.textContent = res.name;
        descriptionProfile.textContent = res.about;
        avatarPhoto.style.backgroundImage = `url(${res.avatar})`;
        myId = res._id;
    })
    .catch((err) => {console.log(err)});
export {myId};

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    const name = inputNameProfile.value;
    const job = inputDescriptionProfile.value;
    popupButton[0].textContent = 'Сохранение...';
    changeProfile(name, job)
        .then((res) => {
            nameProfile.textContent = res.name;
            descriptionProfile.textContent = res.about;
            closePopup(profilePopup);
        })
        .catch(err => {console.log(err);})
        .finally(() => {
            popupButton[0].textContent = "Сохранить";
        });
}
profileForm.addEventListener('submit', handleProfileFormSubmit);

editProfileButton.addEventListener('click', function () {
    inputNameProfile.value = nameProfile.textContent;
    inputDescriptionProfile.value = descriptionProfile.textContent;
    openPopup(profilePopup);
});

closeProfileButton.addEventListener('click', function () {
    closePopup(profilePopup);
});

addCardButton.addEventListener('click', function () {
    openPopup(cardPopup);
});

closeCardButton.addEventListener('click', function () {
    cardForm.reset();
    closePopup(cardPopup);
});

closeAvatarButton.addEventListener('click', function () {
    avatarForm.reset();
    closePopup(avatarPopup);
});

function handleCardFormSubmit(evt) {
    evt.preventDefault();
    const locate = inputNameCard.value;
    const url = inputLinkCard.value;
    popupButton[1].textContent = 'Создание...';
    createNewCard(locate, url)
        .then((newcard) => {
            const card = createCard(newcard);
        
            places_list.prepend(card);
            closePopup(cardPopup);
            cardForm.reset();
        })
        .catch(err => console.log(err))
        .finally(() => {
            popupButton[1].textContent = 'Создать';
        })
}
cardForm.addEventListener('submit', handleCardFormSubmit);

avatarProfile.addEventListener('click', function () {
    openPopup(avatarPopup);
});

function handleAvatarFormSubmit(evt) {
    evt.preventDefault();
    const link = document.getElementById('url-input_avatar').value;
    popupButton[2].textContent = 'Сохранeние...';
    changeAvatar(link)
        .then((res) => {
            avatarPhoto.style.backgroundImage = `url(${res.avatar})`;
            closePopup(avatarPopup);
            avatarForm.reset();
        })
        .catch(err => console.log(err))
        .finally(() => {
            popupButton[2].textContent = 'Сохранить';
        })
}
avatarForm.addEventListener('submit', handleAvatarFormSubmit);

cardPopup.classList.add('popup_is-animated');
imagePopup.classList.add('popup_is-animated');
profilePopup.classList.add('popup_is-animated');
avatarPopup.classList.add('.popup_is-animated');

getCards()
    .then((res) => {
        res.forEach((item) => {
            places_list.append(createCard(item));
        });
    })
    .catch((err) => console.log(err));

const validationSettings = {
    formClass: '.popup__form',
    inputClass: '.popup__input',
    inputErrorClass: 'popup__input_error',
    buttonClass: '.popup__button',
    buttonInactiveClass: 'popup__button_inactive',
    errorClass: 'popup__error-text_active'
}

enableValidation(validationSettings);