import { repositoriesQuantity } from "/src/javascript/variables.js"; // Importando a variável para ser usada no ${} abaixo

async function getRepositories(userName) {
  const url = `https://api.github.com/users/${userName}/repos?per_page=${repositoriesQuantity}`;
  const response = await fetch(url);
  return await response.json();
}

export { getRepositories }; 