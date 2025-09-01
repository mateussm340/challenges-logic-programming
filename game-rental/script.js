const elementGame = document.querySelector('#games');
const elementQuantityTotalGame = document.querySelector('#quantity-total-game');

const listGames = [
    { id: 1, title: 'Grand Theft Auto V', imgLink: 'gta-five.png' },
    { id: 2, title: 'Elden Ring', imgLink: 'elden-ring.png' },
    { id: 3, title: 'God of War Ragnarök', imgLink: 'god-of-war.png' }
];

let quantityTotalGame = 0;

function rentGame(gameSelected) {
    const game = elementGame.querySelector(`#game-${gameSelected}`);

    const imageGame = game.querySelector('img');
    const imageGameClass = imageGame.classList;

    const titleGame = game.querySelector('h2').title;

    const tagGame = game.querySelector('span');
    const tagGameClass = tagGame.classList;

    const buttonGame = game.querySelector('button');
    const buttonGameClass = buttonGame.classList;

    if (buttonGameClass.contains('model__blue-color')) {
        imageGameClass.add('container__opacity-image');

        tagGameClass.remove('model__green-color');
        tagGameClass.add('model__red-color');
        tagGame.textContent = 'Alugado';

        buttonGameClass.remove('model__blue-color');
        buttonGameClass.add('model__gray-color');
        buttonGame.textContent = 'Devolver';

        quantityTotalGame++;
    } else {
        if (!validateDevolutionGame(titleGame)) return;

        imageGameClass.remove('container__opacity-image');

        tagGameClass.remove('model__red-color');
        tagGameClass.add('model__green-color');
        tagGame.textContent = 'Ninguém alugou';

        buttonGameClass.remove('model__gray-color');
        buttonGameClass.add('model__blue-color');
        buttonGame.textContent = 'Alugar';

        quantityTotalGame--;
    }

    elementQuantityTotalGame.textContent = quantityTotalGame;
}

function validateDevolutionGame(title) {
    const messageAlert = prompt(`Digite "${title}" para devolver o jogo (sem aspas)`);
    const checkMessage = messageAlert === title ? 'sim' : 'não';
    const responseMessage = `Você escolheu (${checkMessage}) para devolver o jogo ${title}.`;

    alert(responseMessage);

    if (messageAlert !== title) {
        return false;
    }

    return true;
}

function showGamesOnScreen() {
    listGames.forEach((game) => {
        elementGame.innerHTML += `
            <div class="game model__vertical model__center" id="game-${game.id}">
                <img src="../assets/games/${game.imgLink}" alt="Logo do jogo (${game.title})" class="container__image"/>

                <h2 class="container__subtitle" title="${game.title}">
                    ${returnTitleLimited(game.title)}
                </h2>
                <span class="container__tag model__green-color">
                    Ninguém alugou
                </span>

                <button onclick="rentGame(${game.id})" class="container__button model__blue-color">
                    Alugar
                </button>
            </div>
        `;
    });
}

function returnTitleLimited(title) {
    const numberInitial = 0;
    const numberLimit = 12;
    const shortenTitle = title.substring(numberInitial, numberLimit);

    if (title.length > numberLimit) {
        return shortenTitle.concat('...');
    } else {
        return shortenTitle;
    }
} 

showGamesOnScreen();