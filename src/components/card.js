import {openPopup, closePopup} from './modal.js'

import { myId } from './index.js';
import { deleteCard, likeCard } from './api.js';

const cardTemplate = document.querySelector('#card-template').content;

const imagePopup = document.querySelector('.popup_type_image');
const imagePopupItem = imagePopup.querySelector('.popup__image');
const imagePopupText = imagePopup.querySelector('.popup__caption');
const imagePopupClose = imagePopup.querySelector('.popup__close');

function handlelikebutton(_id, likeCount, evt) {
    if(evt.target.classList.contains('card__like-button_is-active')) {
        const method = 'DELETE';
        likeCard(method, _id)
            .then((card) => {
                likeCount.textContent = card.likes.length;
                evt.target.classList.remove('card__like-button_is-active');
            })
            .catch(err => console.log(err))
    }
    else {
        const method = 'PUT';
        likeCard(method, _id)
            .then((card) => {
                likeCount.textContent = card.likes.length;
                evt.target.classList.add('card__like-button_is-active');
            })
            .catch(err => console.log(err))
    }
}

function createCard(card_info) {
    const card = cardTemplate.querySelector('.places__item').cloneNode(true);
    const card_image = card.querySelector('.card__image');
    const card_name = card.querySelector('.card__title');
    const likebutton = card.querySelector('.card__like-button');
    const likeCount = card.querySelector('.card__likes_count');
    const deletebutton = card.querySelector('.card__delete-button');

    card_image.src = card_info.link;
    card_image.alt = card_info.name;
    card_name.textContent = card_info.name;
    likeCount.textContent = card_info.likes.length;

    if (card_info.likes.some((inf) => {return inf._id === myId})) {
        likebutton.classList.add('card__like-button_is-active');
    }
    if (card_info.owner._id !== myId) {
        deletebutton.classList.add('card__delete-button_noactive');
    }
    likebutton.addEventListener('click', evt => handlelikebutton(card_info._id, likeCount, evt));

    deletebutton.addEventListener('click', () => {
        deleteCard(card_info._id)
            .then(() => {
                card.remove();
            })
            .catch((err) => console.log(err))
    })

    card_image.addEventListener('click', function () {
        imagePopupItem.src = card_info.link;
        imagePopupItem.alt = card_info.name;
        imagePopupText.textContent = card_info.name;
        imagePopupClose.addEventListener('click', function () {
            closePopup(imagePopup);
        });
        openPopup(imagePopup);
    });
    return card;
}

export {createCard};