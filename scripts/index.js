const cardTemplate = document.querySelector('#card-template').content;
const places_list = document.querySelector('.places__list');

const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

const editProfileButton = document.querySelector('.profile__edit-button');
const closeProfileButton = profilePopup.querySelector('.popup__close');
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

initialCards.forEach(card => places_list.append(createCard(card.name, card.link)));
editProfileButton.addEventListener('click', function () {
    openPopup(profilePopup);
});
closeProfileButton.addEventListener('click', function () {
    closePopup(profilePopup);
});
// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
