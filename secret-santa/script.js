const elementMessageWarning = document.querySelector('#element-message-warning');
const elementMessageSection = document.querySelector('#element-message-section');

let listFriendAdd = [];

function addFriend() {
    const nameFriend = document.querySelector('#name-friend').value;

    if (!validateField(nameFriend)) return;

    insertFriendInList(nameFriend);
}

function drawFriends() {
    elementMessageWarning.innerHTML = '';
    document.querySelector('#element-friend-draw').innerHTML = '';
    shuffleList(listFriendAdd);

    for (let i = 0; i < listFriendAdd.length; i++) {
        if (i === (listFriendAdd.length - 1)) {
            showMessageOnScreen(
                'element-friend-draw', 
                `${listFriendAdd[i]} -> ${listFriendAdd[0]}`,
                'green', 2
            );
        } else {
            showMessageOnScreen(
                'element-friend-draw',
                `${listFriendAdd[i]} -> ${listFriendAdd[i + 1]}`,
                'green', 2
            );
        }
    }

    document.querySelector('#button-restart-game').removeAttribute('disabled');
}

function restartGame() {
    elementMessageWarning.innerHTML = '';
    document.querySelector('#button-draw-friends').setAttribute('disabled', true);
    document.querySelector('#button-restart-game').setAttribute('disabled', true);
    showMessageInitialOnScreen();
    listFriendAdd = [];
}

function shuffleList(list) {
    list.sort(() => Math.random() - 0.5);
}

function insertFriendInList(nameFriend) {
    listFriendAdd.push(nameFriend);

    if (listFriendAdd.length > 3) {
        document.querySelector('#button-draw-friends').removeAttribute('disabled');
    }

    showMessageOnScreen(
        'element-friend-add', `${listFriendAdd.join(', ')}`, 
        'green', 1
    );
}

function validateField(nameFriend) {
    elementMessageWarning.innerHTML = '';
    document.querySelector('#name-friend').value = '';

    const listFriendLowerCase = listFriendAdd.join(',').toLowerCase();
    const nameFriendLowerCase = nameFriend.toLowerCase();

    if (nameFriend === '') {
        showMessageWarning('red', 'danger', 'Preencha corretamente o campo do amigo');
        return false;
    }

    if (listFriendLowerCase.includes(nameFriendLowerCase)) {
        showMessageWarning('red', 'danger', `O amigo ${nameFriend} já foi adicionado com as mesmas caracteres, tente outro`);
        return false;
    }

    return true;
}

function showMessageWarning(color, type, text) {
    elementMessageWarning.innerHTML = `
        <span class="container__message model__${color}-color container__${type}">
            ${text}.
        </span>
    `;
}

function showMessageOnScreen(idElement, messageElement, colorElement, idType) {
    const field = document.querySelector(`#${idElement}`);
    const messageSuccess = ` 
        <span class="container__message model__${colorElement}-color">
            ${messageElement}
        </span>`;

    if (idType === 1) {
        field.innerHTML = messageSuccess;
    }

    if (idType === 2) {
        field.innerHTML += messageSuccess;
    }
}

function showMessageInitialOnScreen() {
    elementMessageSection.innerHTML = `
        <div class="container__box model__vertical model__center">
            <h2 class="container__subtitle">Amigos adicionados</h2>
            <div class="model__vertical model__center" id="element-friend-add"></div>
        </div>

        <div class="container__box model__vertical model__center">
            <h2 class="container__subtitle">Amigos sorteados</h2>
            <div class="model__vertical model__center" id="element-friend-draw"></div>
        </div>
    `;

    showMessageOnScreen(
        'element-friend-add', 'Nenhum amigo adicionado até o momento.', 'red', 1
    );

    showMessageOnScreen(
        'element-friend-draw', 'Nenhum amigo adicionado até o momento.', 'red', 1
    );
}

showMessageInitialOnScreen();