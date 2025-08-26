const elementAvailableChair = document.querySelector('#element-available-chair');
const elementChosenChair = document.querySelector('#element-chosen-chair');
const elementTicketPurchase = document.querySelector('#element-ticket-purchase');
const elementPriceByBuy = document.querySelector('#element-price-buy');
const elementPriceTicket = document.querySelector('#element-price-ticket');
const elementMessageWarning = document.querySelector('#element-message-warning');

let priceTotalBuy = 0;
let priceChair = 35;
let totalChair = 16;

let listChairChosen = [];
let listTotalChairChosen = [];
let listBuyers = [];

function buyTicket() {
    const nameBuyer = document.querySelector('#name-buyer').value;

    if (!validateField(nameBuyer)) return;

    protectiveLayerChairs(listChairChosen);
    showBuyersInsertInList(nameBuyer, listChairChosen);
    updatePriceTotalChair(0);
    listChairChosen = [];
    checkExistenceListChair();
    checkExistenceListTotalChair();
}

function restartGame() {
    document.querySelector('#button-buy-ticket').removeAttribute('disabled');
    document.querySelector('#button-restart-game').setAttribute('disabled', true);
    listBuyers = [];
    listTotalChairChosen = [];
    showMessageInitialOnScreen();
    showTotalChairsAvailableOnScreen();
}

function validateField(nameBuyer) {
    elementMessageWarning.innerHTML = '';

    if (nameBuyer == '') {
        showMessageWarning('red', 'danger', 'Preencha corretamente o campo nome do comprador');
        return false;
    }

    if (listChairChosen.length === 0) {
        showMessageWarning('red', 'danger', 'Escolha no mínimo 1 assento');
        return false;
    }

    document.querySelector('#name-buyer').value = '';

    return true;
}

function showMessageWarning(color, type, text) {
    elementMessageWarning.innerHTML = `
        <span class="container__message model__${color}-color container__${type}">
            ${text}.
        </span>
    `;
}

function showBuyersInsertInList(nameBuyer, listChairChosen) {
    elementTicketPurchase.innerHTML = '';

    listBuyers.push({
        buyer: nameBuyer, listChair: listChairChosen
    });

    listBuyers.forEach((ticket) => {
        elementTicketPurchase.innerHTML += `
            <div class="container__box">
                <p class="container__text">
                    Comprador: <span class="container__emphasis">${ticket.buyer}</span> | Cadeiras: ${ticket.listChair.join(', ')}
                </p>
            </div>
        `;
    });
}

function protectiveLayerChairs(listChairChosen) {
    listChairChosen.forEach((chair) => {
        defaultChairChosen(
            chair, 
            'model__red-color', 
            'model__protected', 
            'checkProtectedChair'
        );
    });
}

function checkProtectedChair(chair) {
    showMessageWarning('red', 'danger', `A cadeira ${chair} já foi escolhida`);
}

function reserveChair(chair) {
    listChairChosen.push(chair);
    listTotalChairChosen.push(chair);
    priceTotalBuy += priceChair;

    defaultChairChosen(
        chair, 
        'model__green-color',
        'model__red-color', 
        'cancelChairChosen'
    );
}

function cancelChairChosen(chair) {
    removeItemChairList(chair, listChairChosen);
    removeItemChairList(chair, listTotalChairChosen);

    priceTotalBuy -= priceChair;

    defaultChairChosen(
        chair, 
        'model__red-color',
        'model__green-color', 
        'reserveChair'
    );
}

function removeItemChairList(chair, list) {
    const searchChair = list.indexOf(chair);

    if (searchChair != -1) {
        list.splice(searchChair, 1);
    }
}

function defaultChairChosen(chair, modelRemove, modelAdd, newFunction) {
    const elementChair = document.querySelector(`#element-chair-${chair}`);
    const elementChairClass = elementChair.classList;

    elementChairClass.remove(modelRemove);
    elementChairClass.add(modelAdd);

    elementChair.removeAttribute('onclick');
    elementChair.setAttribute('onclick', `${newFunction}(${chair})`);

    elementPriceByBuy.textContent = priceTotalBuy;
    checkExistenceListChair();
}

function checkExistenceListChair() {
    if (listChairChosen.length === 0) {
        showMessageOnScreen(
            'element-chosen-chair',
            'Nenhum assento escolhido.'
        );
    } else {
        showMessageOnScreen(
            'element-chosen-chair',
            `Assento(s): ${listChairChosen.join(', ')}`
        );
    }
}

function checkExistenceListTotalChair() {
    if (listTotalChairChosen.length === totalChair) {
        document.querySelector('#button-buy-ticket').setAttribute('disabled', true);
        document.querySelector('#button-restart-game').removeAttribute('disabled');
    }
}

function showTotalChairsAvailableOnScreen() {
    elementAvailableChair.innerHTML = '';

    for (let i = 1; i <= totalChair; i++) {
        elementAvailableChair.innerHTML += `
            <div onclick="reserveChair(${i})" class="container__box model__green-color" id="element-chair-${i}">
                0${i}
            </div>
        `;
    }

    elementPriceTicket.textContent = priceChair;
}

function updatePriceTotalChair(priceChair) {
    priceTotalBuy = priceChair;
    elementPriceByBuy.textContent = priceChair;
}

function showMessageOnScreen(id, text) {
    const field = document.querySelector(`#${id}`);
    field.textContent = text;
}

function showMessageInitialOnScreen() {
    showMessageOnScreen(
        'element-chosen-chair',
        'Nenhum assento escolhido.'
    );

    showMessageOnScreen(
        'element-ticket-purchase',
        'Nenhum ingresso comprado.'
    );
}

showTotalChairsAvailableOnScreen();
showMessageInitialOnScreen();