const elementProduct = document.querySelector('#product');
const elementListProduct = document.querySelector('#element-list-product');
const elementMessageWarning = document.querySelector('#element-message-warning');
const elementPriceTotal = document.querySelector('#element-price-total');
const elementProductAdd = document.querySelector('#element-product-add');

const listProduct = [
    { id: 1, title: 'Celular', price: 1400, amount: 4 },
    { id: 2, title: 'Notebook', price: 5400, amount: 9 },
    { id: 3, title: 'Tablet', price: 2400, amount: 11 }
];

let priceTotalProduct = 0;

function addProductToShoppingCart() {
    const amount = parseInt(document.querySelector('#amount').value);
    const product = document.querySelector('#product').value;

    const SEPARATOR_LIST = product.split(' ');
    const priceProduct = parseInt(SEPARATOR_LIST[1]);
    const nameProduct = SEPARATOR_LIST[3];
    const idProduct = parseInt(SEPARATOR_LIST[5]);

    if (!validateField(amount, product)) return;

    checkProdutoAddToShoppingCart(priceProduct, nameProduct, idProduct, amount);
}

function checkProdutoAddToShoppingCart(priceProduct, nameProduct, idProduct, amount) {
    const checkAmount = amount > 1 ? 'quantidades disponíveis' : 'quantidade disponível';

    listProduct.forEach((product) => {
        if (product.id === idProduct) {

            if (amount > product.amount) {
                showMessageWarning(
                    'red', 'danger', `Não temos ${amount} ${checkAmount} para ${nameProduct}, apenas ${product.amount}`
                );
                return false;
            } else {
                product.amount -= amount;
                updatePriceTotalProduct(priceProduct, amount);
                showListProductAdd(amount, nameProduct, priceProduct);
            }

            if (product.amount === 0) {
                const searchProductRemove = listProduct.findIndex((product) => product.id === idProduct);

                if (searchProductRemove != -1) {
                    listProduct.splice(searchProductRemove, 1);
                }
            }
        }

        showListProductOnScreen();
    });
}

function showListProductAdd(amountProduct, nameProduct, priceProduct) {
    let listProductAdd = [];
    listProductAdd.push({
        title: nameProduct, price: priceProduct, amount: amountProduct
    });

    listProductAdd.forEach((product) => {
        elementProductAdd.innerHTML += `
            <div class="container__box">
                <p class="container__text">
                    <span class="container__emphasis">${product.amount}x</span>
                    - ${product.title} 
                    <span class="container__emphasis">${product.price}</span>
                </p>
            </div>
        `;
    });
}

function updatePriceTotalProduct(priceProduct, amount) {
    const productByPrice = priceProduct * amount;
    
    priceTotalProduct += productByPrice;
    elementPriceTotal.textContent = priceTotalProduct;
}

function validateField(amount, product) {
    elementMessageWarning.innerHTML = '';
    document.querySelector('#amount').value = '';

    if (isNaN(amount) || product === '') {
        showMessageWarning(
            'red', 'danger', 'Preencha corretamente todos os campos');
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

function showListProductOnScreen() {
    elementProduct.innerHTML = '';
    elementListProduct.innerHTML = '';

    listProduct.forEach((product) => {
        elementProduct.innerHTML += `
            <option value="R$ ${product.price} - ${product.title} - ${product.id}">
                R$ ${product.price} - ${product.title}
            </option>
        `;

        elementListProduct.innerHTML += `
            <div class="product container__box model__vertical model__center">
                <h2 class="container__subtitle">${product.title}</h2>
                <p class="container__text">R$ ${product.price}</p>
                <span class="container__tag model__green-color">
                    Quantidade: ${product.amount}
                </span>
            </div>
        `;
    });

    checkListProductExistence();
}

function checkListProductExistence() {
    if (listProduct.length === 0) {
        elementProduct.innerHTML = `
            <option value="0">
                Nenhum produto disponível :(
            </option>
        `;
        
        elementListProduct.innerHTML = `
            <span class="container__message model__red-color">
                Nenhum produto disponível até o momento.
            </span>
        `;

        document.querySelector('#button-add-product').setAttribute('disabled', true);
    }
}

showListProductOnScreen();