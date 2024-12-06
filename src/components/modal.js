function openPopup(popup) {      
    popup.classList.add('popup_is-opened');

    popup.addEventListener('click', handleOverlayClose)
    document.addEventListener('keydown', handleEscClose);
}

function closePopup(popup) {      
    popup.classList.remove('popup_is-opened');

    popup.removeEventListener('click', handleOverlayClose);
    document.removeEventListener('keydown', handleEscClose);
}

function handleOverlayClose(evt) {
    if (evt.target === evt.currentTarget) {
        closePopup(evt.currentTarget);
    }
}

function handleEscClose(evt) {
    if (evt.key === "Escape") {
        const popup = document.querySelector('.popup_is-opened');
        closePopup(popup);
    }
}

export {openPopup, closePopup};