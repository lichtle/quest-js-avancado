const screen = {
  userProfile: document.querySelector(".profile-data"),
  renderUser(user) {
    // Perceba que o método user abaixo (previamente populado no arquivo objects/user.js) é acompanhado de uma instrução em Camel Case, pois é assim que está escrito no objeto user (do arquivo objects/user.js)
    this.userProfile.innerHTML = `<div class="info">
  <img src="${user.avatarUrl}" alt="Foto de perfil do usuário"> 
  <div class="data">
    <h1>${user.name ?? "Não possui nome de usuário. 😓"}</h1>
    <p>${user.bio ?? "Este usuário não possui bio. 😢"}</p>
    <br>
    <p><span class="follow">Seguidores:</span> ${
      user.followers ?? "Este usuário não tem seguidores. 😢"
    }</p>
    <p><span class="follow">Seguindo:</span> ${
      user.following ?? "Este usuário não segue ninguém. 😢"
    }</p>
  </div>
</div>`;

    let repositoriesItems = []; // Array a ser populado com repositórios

    user.repositories.forEach(
      (repo) =>
        (repositoriesItems += `<li><a href="${repo.html_url}" target="_blank">${
          repo.name
        }</a>
                                <ul>
                                  <li class="repo-info">🍴 Forks: ${
                                    repo.forks
                                  }</li>
                                  <li class="repo-info">⭐ Stars: ${
                                    repo.stargazers_count
                                  }</li>
                                  <li class="repo-info">👀 Watchers: ${
                                    repo.watchers
                                  }</li>
                                  <li class="repo-info">🖥️ Language: ${
                                    repo.language ?? "não definida"
                                  }</</li>
                                </ul>
                              </li>`)
    );

    if (user.repositories.length > 0) {
      // Condição para verificar se o usuário possui repositórios
      this.userProfile.innerHTML += ` <div class="repositories section">
                                        <h2>Repositórios</h2>
                                        <ul>${repositoriesItems}</ul>
                                      </div>`;
    }

    let eventsItems = ""; // Array a ser populado com eventos

    let filteredEvents = user.events.filter((event) => {
      // filteredEvents será um array populado apenas com os itens que nos interessam, através do método filter no array user.events (que são todos os eventos)
      return event.type === "CreateEvent" || event.type === "PushEvent"; // Itens de interesse (os que possuem type igual à CreateEvent ou igual à PushEvent)
    });

    filteredEvents.forEach((event) => {
      if (event.payload.commits) {
        eventsItems += `<li class="event">${event.repo.name} <span class="bold-event">~${event.payload.commits[0].message}<span></li>`;
        console.log(event);
      }
    });

    if (user.events.length > 0) {
      // Condição para verificar se o usuário possui eventos
      this.userProfile.innerHTML += `<div>
                                        <h2>Eventos</h2>
                                        <br>
                                        <ul>${eventsItems}</ul>
                                      </div>`;
    }
  },
  renderNotFound() {
    this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>";
  },
};

export { screen };
