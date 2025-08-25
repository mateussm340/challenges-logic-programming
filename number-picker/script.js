const elementNumberDraw = document.querySelector('#element-number-draw');
const elementMessageWarning = document.querySelector('#element-message-warning');

function drawInterval() {
    const optionsList = parseInt(document.querySelector('#options-list').value);
    const numberMinimum = parseInt(document.querySelector('#number-minimum').value);
    const numberMaximum = parseInt(document.querySelector('#number-maximum').value);
    const numberQuantity = parseInt(document.querySelector('#number-quantity').value);

    if (!validateField(optionsList, numberMinimum, numberMaximum, numberQuantity)) return;

    let randomNumberList = [];
    let randomNumber = 0;

    for (let i = numberMinimum; i <= numberQuantity; i++) {
        randomNumber = getNumberDrawnInRange(numberMaximum, numberMinimum);

        while (randomNumberList.includes(randomNumber) || !checkChosenOption(randomNumber, optionsList)) {
            randomNumber = getNumberDrawnInRange(numberMaximum, numberMinimum);
        }

        randomNumberList.push(randomNumber);
    }

    randomNumberList.sort(compareToNumbers);
    showMessageWarningOnScreen('green', 'success', `Números sorteados: ${randomNumberList.join(', ')}`);
    showSelectionNumberDrawOnScreen(numberMinimum, numberMaximum, randomNumberList);
    document.querySelector('#button-restart-game').removeAttribute('disabled', true);
} 

function checkChosenOption(randomNumber, optionsList) {
    const numberCompareOperation = randomNumber % 2;

    if (optionsList === 2) {
        return (numberCompareOperation) === 0;
    }

    if (optionsList === 3) {
        return (numberCompareOperation) !== 0;
    }

    return true;
}

function restartGame() {
    document.querySelector('#button-restart-game').setAttribute('disabled', true);
    elementMessageWarning.innerHTML = '';
    showMessageInitialOnScreen();
    clearFields();
}

function clearFields() {
    document.querySelector('#options-list').value = '1';
    document.querySelector('#number-minimum').value = '';
    document.querySelector('#number-maximum').value = '';
    document.querySelector('#number-quantity').value = '';
}

function showSelectionNumberDrawOnScreen(numberMinimum, numberMaximum, randomNumberList) {
    elementNumberDraw.innerHTML = '';

    let checkColorNumber = 'red';

    for (let i = numberMinimum; i <= numberMaximum; i++) {
        checkColorNumber = randomNumberList.includes(i) ? 'green' : 'red';

        elementNumberDraw.innerHTML += `
            <div class="container__box model__${checkColorNumber}-color">
                0${i}
            </div>
        `;
    }
}

function compareToNumbers(numberInitial, numberFinal) {
    return numberInitial - numberFinal;
}

function validateField(optionsList, numberMinimum, numberMaximum, numberQuantity) {
    showMessageInitialOnScreen();
    document.querySelector('#number-quantity').value = '';

    const limitCommon = numberMaximum - numberMinimum + 1;
    const limitDerivate = parseInt(numberMaximum) / 2;

    if (isNaN(optionsList) || isNaN(numberMinimum) || isNaN(numberMaximum) || isNaN(numberQuantity)) {
        showMessageWarningOnScreen(
            'red', 'danger', 'Preencha corretamente todos os campos'
        );
        return false;
    }

    if (numberQuantity > (limitCommon)) {
        showMessageWarningOnScreen(
            'red', 'danger', messageDefaultLimit(numberQuantity, optionsList, limitCommon)
        );
        return false;
    }

    if (optionsList !== 1 && numberQuantity > limitDerivate) {
        showMessageWarningOnScreen(
            'red', 'danger', messageDefaultLimit(numberQuantity, optionsList, limitDerivate)
        );
        return false;
    }

    return true;
}

function messageDefaultLimit(numberQuantity, optionsList, limitVariable) {
    return `Você escolheu a opção (0${optionsList}), ou seja, não é possível selecionar [${numberQuantity}] como quantidade, limite para quantidade: ${limitVariable}`;
}

function showMessageWarningOnScreen(color, type, text) {
    elementMessageWarning.innerHTML = `
        <span class="container__message model__${color}-color container__${type}">
            ${text}.
        </span>
    `;
}

function getNumberDrawnInRange(numberMaximum, numberMinimum) {
    return parseInt(Math.random() * (numberMaximum - numberMinimum + 1) + numberMinimum);
}

function showMessageInitialOnScreen() {
    elementNumberDraw.innerHTML = `
        <p class="container__text container__emphasis">
            Esperando o sorteio...
        </p>
    `;
}

showMessageInitialOnScreen();