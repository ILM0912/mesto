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

const imagePopupItem = imagePopup.querySelector('.popup__image');
const imagePopupClose = imagePopup.querySelector('.popup__close');
const imagePopupText = imagePopup.querySelector('.popup__caption');

function createCard(name, link) {
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const card_image = card.querySelector('.card__image');
    card_image.src = link;
    card_image.alt = name;
    const card_title = card.querySelector('.card__title');
    card_title.textContent = name;

    const likeCard = card.querySelector('.card__like-button');
    const deleteCard = card.querySelector('.card__delete-button');
    likeCard.addEventListener('click', function() {
        likeCard.classList.toggle('card__like-button_is-active');
    });
    deleteCard.addEventListener('click', function() {
        card.remove();
    });
    card_image.addEventListener('click', function () {
        openPopup(imagePopup);
        imagePopupItem.src = link;
        imagePopupItem.alt = name;
        imagePopupText.textContent = name;
        imagePopupClose.addEventListener('click', function () {
            closePopup(imagePopup);
        });
    });
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


cardPopup.classList.add('popup_is-animated');
imagePopup.classList.add('popup_is-animated');
profilePopup.classList.add('popup_is-animated');
initialCards.forEach(card => places_list.append(createCard(card.name, card.link)));