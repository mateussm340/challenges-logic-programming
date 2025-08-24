const elementDrawnNumber = document.querySelector('#element-drawn-number');
const elementMessageNotice = document.querySelector('#element-message-notice');

let randomNumberList = [];

const minimumNumber = 1;
const maximumNumber = 4;

let secretNumber = getSecretNumber();
let kick = 0;
let attempt = 1;

function kickNumber() {
    kick = parseInt(document.querySelector('#kick').value);

    if (!validateField(kick)) return;

    if (kick === secretNumber) {
        const attemptQuantity = attempt > 1 ? 'tentativas' : 'tentativa';

        showMessageOnScreen('h1', 'Acertou!');
        showMessageOnScreen('h2', `Você acertou o número secreto ${secretNumber} com ${attempt} ${attemptQuantity}`);

        document.querySelector('#button-kick-number').setAttribute('disabled', true);
        document.querySelector('#button-restart-game').removeAttribute('disabled');

        selectSecretNumber(kick);
    } else {
        if (kick > secretNumber) {
            showMessageOnScreen('h2', `O número secreto é menor que ${kick}`);
        } else {
            showMessageOnScreen('h2', `O número secreto é maior que ${kick}`);
        }

        attempt++;
    }
}

function restartGame() {
    secretNumber = getSecretNumber();
    attempt = 1;
    showMessageInitialOnScreen();
    document.querySelector('#button-kick-number').removeAttribute('disabled');
    document.querySelector('#button-restart-game').setAttribute('disabled', true);
}

function validateField(kick) {
    elementMessageNotice.innerHTML = '';
    document.querySelector('#kick').value = '';

    if (isNaN(kick)) {
        showMessageNoticeOnScreen(
            'danger', 'red', 'Preencha corretamente o campo de chute');
        return false;
    }

    if (kick < minimumNumber || kick > maximumNumber) {
        showMessageNoticeOnScreen(
            'danger', 'red', `O chute não pode ser menor ou maior que o intervalo estabelecido, por exemplo: ${minimumNumber} e ${maximumNumber} - O valor [${kick}] não é permitido nesse cenário`);
        return false;
    }

    return true;
}

function selectSecretNumber(secretNumber) {
    const elementSecretNumber = document.querySelector(`#element-number-${secretNumber}`);
    const classElementSecretNumber = elementSecretNumber.classList;

    classElementSecretNumber.remove('model__red-color');
    classElementSecretNumber.add('model__green-color');
}

function showMessageNoticeOnScreen(type, color, text) {
    elementMessageNotice.innerHTML = `
        <span class="container__message container__${type} model__${color}-color">
            ${text}.
        </span>
    `;
}

function showMessageOnScreen(tag, text) {
    const field = document.querySelector(tag);
    field.textContent = text;
}

function showMessageInitialOnScreen() {
    showMessageOnScreen('h1', 'Número Secreto');
    showMessageOnScreen('h2', `Digite um número entre ${minimumNumber} e ${maximumNumber}`);
}

function showElementDrawnNumberOnScreen() {
    elementDrawnNumber.innerHTML = '';

    for (let i = 1; i <= maximumNumber; i++) {
        elementDrawnNumber.innerHTML += `
            <div class="container__box model__red-color" id="element-number-${i}">
                0${i}
            </div>
        `;
    }
}

function getSecretNumber() {
    let randomNumber = parseInt(Math.random() * maximumNumber + minimumNumber);

    if (randomNumberList.length === maximumNumber) {
        randomNumberList = [];
        showElementDrawnNumberOnScreen();
    }

    if (randomNumberList.includes(randomNumber)) {
        return getSecretNumber();
    } else {
        randomNumberList.push(randomNumber);
        return randomNumber;
    }
}

showMessageInitialOnScreen();
showElementDrawnNumberOnScreen();