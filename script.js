const projectListElement = document.querySelector('#project-list-element'); 

const projectsList = [
    { id: 1, title: 'Base Project' },
    { id: 2, title: 'Secret Number' }
];

function displayProjectList() {
    projectsList.forEach((project) => {
        projectListElement.innerHTML += `
            <div class="project model__vertical model__center">
                    <h2 class="container__subtitle">
                        ${shortenTitle(project.title)}
                    </h2>
                    <span class="container__tag model__green-color">
                        ${returnTagTitle(project.title)}
                    </span>

                    <a href="${returnTagTitle(project.title)}/" target="_blank" class="container__button model__blue-color">
                        Acessar
                    </a>
                </div>
        `;
    });
}

function returnTagTitle(title) {
    return title.split(' ').join('-').toLowerCase();
}

function shortenTitle(title) {
    const maximumLimit = 12;
    const minimumLimit = 0;
    const intervalBetweenStrings = title.substring(minimumLimit, maximumLimit);

    if (title.length > maximumLimit) {
        return intervalBetweenStrings.concat('...');
    } else {
        return intervalBetweenStrings;
    }
}

displayProjectList();