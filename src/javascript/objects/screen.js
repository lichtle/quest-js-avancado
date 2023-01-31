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
        (repositoriesItems += `<li><a href="${repo.html_url}" target="_blank">${repo.name}</a></li>`)
    );

    if (user.repositories.length > 0) {
      // Condição para verificar se o usuário possui repositórios
      this.userProfile.innerHTML += ` <div class="repositories section">
                                        <h2>Repositórios</h2>
                                        <ul>${repositoriesItems}</ul>
                                      </div>`;
    }

    let eventsItems = [];

    let filteredEvents = user.events.filter((event) => {
      // Filtrando o array user.events - array acima populado somente com os itens que nos interessam (filtrados)
      return event.type === "CreateEvent" || event.type === "PushEvent"; // Itens de interesse (os que possuem type igual à CreateEvent ou igual à PushEvent)
    });

    filteredEvents.forEach((event) => {
      eventsItems += `<li><p>${event.repo.name} &#x2022; ${
        event.playload.commits[commits.length - 1].message
      }</p></li>`;
    });

    if (user.events.length > 0) {
      // Condição para verificar se o usuário possui eventos
      this.userProfile.innerHTML += `<div class="events">
                                        <h2>Eventos</h2>
                                        <ul>${filteredEvents}</ul>
                                      </div>`;
    }
  },
  renderNotFound() {
    this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>";
  },
};

export { screen };
