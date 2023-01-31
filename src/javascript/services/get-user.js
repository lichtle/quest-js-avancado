import { baseUrl } from "../variables.js"; // Importando a variável para ser usada no ${} abaixo

async function getUser(userName) {
  const response = await fetch(`${baseUrl}/${userName}`);
  return await response.json();
}

export { getUser };
