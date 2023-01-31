// Imports de fetch

import { getUser } from "./services/get-user.js";
import { getRepositories } from "./services/get-repositories.js";
import { getEvents } from "./services/get-events.js";

// Imports de objeto

import { user } from "./objects/user.js";
import { screen } from "./objects/screen.js";

const button = document.getElementById("btn-search");
const input = document.getElementById("input-search");

button.addEventListener("click", () => {
  const userName = document.getElementById("input-search").value;
  if (validateEmptyInput(userName)) return; // Caso o retorno da função criada no final deste código seja realmente verdadeiro, este return serve para impedir que o código continue rodando e a função getUserData abaixo seja chamada mesmo assim
  getUserData(userName);
});

input.addEventListener("keyup", (event) => {
  const userName = event.target.value; // event.target diz respeito ao própro eventListener e value pega seu valor
  const key = event.which || event.keyCode;
  const isEnterKeyPressed = key === 13; // O código da tecla Enter é 13

  if (isEnterKeyPressed) {
    // Se isEnterKeyPressed for igual a true (key === 13), a função getUserData é disparada, assim como quando clicamos no botão de buscar
    if (validateEmptyInput(userName)) return;
    getUserData(userName);
  }
});

function validateEmptyInput(userName) {
  if (userName.length === 0) {
    // Verifica se algum nome de usuário foi escrito
    alert("Preencha o campo com o nome do usuário");
    return true; // Este return serve para impedir que o código continue rodando (mais infos no primeiro comentário do código)
  }
}

// >>> As funções de fetch se encontravam aqui antes da refatoração. Elas foram movidas para a pasta "src/javascript/services"

// >>> Com os dados em mão, agora criamos uma função para pegar o perfil do usuário:

async function getUserData(userName) {
  // Antigamente nomeada "getUserProfile", pois antes da refatoração era uma função para pegar os dados do usuário e outra função para pegar os repositórios (essas funções estão documentadas abaixo)
  const userResponse = await getUser(userName); // Ao invés de usar o then, na refatoração utilizamos o async e await e armazenamos a resposta em uma variável

  if (userResponse.message === "Not Found") {
    // Verifica se o usuário foi encontrado. Se não, a promise retornará um objeto com chave message e valor "Not Found" e irá disparar a função renderNotFound, criada no objeto screen do arquivo "objects/screen.js"
    screen.renderNotFound();
    return;
  }

  const repositoriesResponse = await getRepositories(userName);
  const eventsResponse = await getEvents(userName);

  user.setInfo(userResponse); // Invocando a função criada dentro do objeto importado "user" e colocando as informações retornadas da promise acima dentro dela. Se dermos um console.log(user) veremos que agora temos o objeto user preenchido somente com as informações necessárias determinadas no arquivo "src/javascript/objects/user.js"
  user.setRepositories(repositoriesResponse); // O comentário acima vale para esta função, que retorna os repositórios do usuário
  user.setEvents(eventsResponse);
  screen.renderUser(user); // Função para renderizar todas as infos dos usuários na tela
}

/* >>> A função getUserData acima é resultado da refatoração das funções abaixo (getUserProfile para informações do perfil e getUserRepositories para os repositórios):

  function getUserProfile(userName){
    getUser(userName).then((userData) => { // Aqui temos o retorno da promise, com as infos dos usuários. 
    let userInfo = `<div class="info">
                        <img src="${
                          userData.avatar_url
                        }" alt="Foto de perfil do usuário">
                        <div class="data">
                          <h1>${
                            userData.name ?? "Não possui nome de usuário. 😓"
                          }</h1>
                          <p>${
                            userData.bio ?? "Este usuário não possui bio. 😢"
                          }</p>
                        </div>
                    </div>`;
  const repositoriesResponse = await getRepositories(userName);

    document.querySelector(".profile-data").innerHTML = userInfo;
  user.setInfo(userResponse);
  user.setRepositories(repositoriesResponse);
  screen.renderUser(user);

    getUserRepositories(userName); // A função getUserProfile (disparada ao apertar Enter ou clicar no botão "Buscar") já chamava a getUserRepositories abaixo
  })
  console.log(userResponse);
}
function getUserRepositories(userName) {
  getRepositories(userName).then((repositoriesData) => {
    let repositories = "";
    repositoriesData.forEach((repo) => {
      // Esse parâmetro corresponde ao "item" do forEach
      repositories += `<li><a href="${repo.html_url}" target="_blank">${repo.name}</a></li>`; // Criará um li para cada item recebido
    });
    document.querySelector(
      ".profile-data"
    ).innerHTML += `<div class="repositories section">
                      <h2>Repositórios</h2>
                      <ul>${repositories}</ul>
                    </div>`;
    // += para concatenar com as informações já obtidas anteriormente pela função getUserProfile
  });
} */
