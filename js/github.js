const username = "lSiphonl";

const featuredRepositories = [
    {
        name: "GrahamRobert_CV",
        title: "Portfolio Website"
    },
    {
        name: "Employees-REST-API",
        title: "RESTful Employee API"
    },
    {
        name: "ApexMotorsport",
        title: "Apex Motorsport"
    },
    {
        name: "aquarium-website",
        title: "Aquarium Website"
    }
];

const profileSection = document.querySelector("#profile");

async function loadProfile() {

    try {

        const response = await fetch(`https://api.github.com/users/${username}`);

        if (!response.ok) {
            throw new Error("Unable to load GitHub profile.");
        }

        const user = await response.json();

        profileSection.innerHTML = `
            <div class="profile-card">

                <img
                    src="${user.avatar_url}"
                    alt="${user.name}"
                    class="profile-avatar"
                >

                <div class="profile-info">

                    <h2>${user.name}</h2>

                    <p class="username">@${user.login}</p>

                    <p>${user.bio ?? "No bio provided."}</p>

                    <div class="profile-stats">

                        <div>
                            <span>${user.public_repos}</span>
                            <small>Repositories</small>
                        </div>

                        <div>
                            <span>${user.followers}</span>
                            <small>Followers</small>
                        </div>

                        <div>
                            <span>${user.following}</span>
                            <small>Following</small>
                        </div>

                    </div>

                </div>

            </div>
        `;

    }

    catch (error) {

        profileSection.innerHTML = `
            <p>${error.message}</p>
        `;

        console.error(error);

    }

}

const repositoryList = document.querySelector("#repository-list");

async function getLanguages(url) {

    const response = await fetch(url);

    if (!response.ok) {
        return [];
    }

    const languages = await response.json();

    return Object.keys(languages);

}

async function loadRepositories() {

    try {

        const response = await fetch(
            `https://api.github.com/users/${username}/repos?per_page=100`
        );

        if (!response.ok) {
            throw new Error("Unable to load repositories.");
        }

        const repositories = await response.json();

        const filteredRepositories = featuredRepositories
            .map(featured => {

                const repository = repositories.find(repo =>
                    repo.name === featured.name
                );

                if (!repository) {
                    return null;
                }

                repository.displayTitle = featured.title;

                return repository;

            })
            .filter(repository => repository !== null);

        repositoryList.innerHTML = "";

        for (const repository of filteredRepositories) {

            const updated = new Date(repository.updated_at);
            const languages = await getLanguages(repository.languages_url);
            repositoryList.innerHTML += `
                <a
                    href="${repository.html_url}"
                    class="repository-link"
                    target="_blank"
                    rel="noopener noreferrer"
                >

                    <article class="portfolio-card">

                        <div class="portfolio-date">

                            ${updated.toLocaleDateString("en-ZA", {
                                day: "numeric",
                                month: "short",
                                year: "numeric"
                            })}

                        </div>

                        <div class="portfolio-content">
                            <h4>${repository.displayTitle}</h4>

                            <p>
                                ${repository.description ?? "No description provided."}
                            </p>

                            <ul class="tech-stack">
                                ${languages
                                    .map(language => `<li>${language}</li>`)
                                    .join("")}
                            </ul>
                        </div>
                    </article>
                </a>
            `;
        };

    }

    catch (error) {

        repositoryList.innerHTML =
            `<p>${error.message}</p>`;

        console.error(error);

    }

}

loadProfile();
loadRepositories();