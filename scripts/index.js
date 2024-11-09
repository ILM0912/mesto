const cardTemplate = document.querySelector('#card-template').content;
const places_list = document.querySelector('.places__list');

const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

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

const inputNameCard = cardPopup.querySelector('.popup__input_type_card-name');
const inputLinkCard = cardPopup.querySelector('.popup__input_type_url');

function createCard(name, link) {
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const card_image = card.querySelector('.card__image');
    card_image.src = link;
    card_image.alt = name;
    const card_title = card.querySelector('.card__title');
    card_title.textContent = name;
    return card;
}

function openPopup(popup) {      
    popup.classList.add('popup_is-opened');
}

function closePopup(popup) {      
    popup.classList.remove('popup_is-opened');
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    nameProfile.textContent = inputNameProfile.value;
    descriptionProfile.textContent = inputDescriptionProfile.value;
    closePopup(profilePopup);
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

function handleCardFormSubmit(evt) {
    evt.preventDefault();
    places_list.prepend(createCard(inputNameCard.value, inputLinkCard.value));
    cardForm.reset();
    closePopup(cardPopup);
}
cardForm.addEventListener('submit', handleCardFormSubmit);

initialCards.forEach(card => places_list.append(createCard(card.name, card.link)));

// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
