import { baseUrl, repositoriesQuantity } from "../variables.js"; // Importando a variável para ser usada no ${} abaixo

async function getEvents(userName) {
  const response = await fetch(
    `${baseUrl}/${userName}/events?per_page=${repositoriesQuantity}`
  );
  return await response.json();
}

export { getEvents };
