// import {openPopup} from './modal.js'

const cardTemplate = document.querySelector('#card-template').content;

const imagePopup = document.querySelector('.popup_type_image');
const imagePopupItem = imagePopup.querySelector('.popup__image');
const imagePopupText = imagePopup.querySelector('.popup__caption');
const imagePopupClose = imagePopup.querySelector('.popup__close');

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
        imagePopupItem.src = link;
        imagePopupItem.alt = name;
        imagePopupText.textContent = name;
        imagePopupClose.addEventListener('click', function () {
            closePopup(imagePopup);
        });
        openPopup(imagePopup);
    });
    return card;
}