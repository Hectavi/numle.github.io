let intentos = 6;
let claveSecreta = [];
let filaActual = [];

// Funcionamiento del juego
generateSecretCode();
document.getElementById("attempts").innerHTML = "Intentos: " + intentos;
createTable();
let buttons = document.querySelectorAll("#buttons button");
addNumberButtonListeners();
document.getElementById("submit-button").addEventListener("click", checkGuess);
document.getElementById("delete-button").addEventListener("click", deleteNumber);

// Función que te devuelva un array con la clave secreta sin que se repitan los numeros y que sean cinco cifras
function generateSecretCode() {
  while (claveSecreta.length < 5) {
    let digit = Math.floor(Math.random() * 10);
    if (!claveSecreta.includes(digit)) {
      claveSecreta.push(digit);
    }
  }
  return claveSecreta;
}

// Función que se dedica a borrar numeros de la fila actual
function deleteNumber() {
  filaActual.pop();
  const currentRow = document.querySelector(`.fila${6 - intentos}`);
  const cells = currentRow.querySelectorAll("td");
  for (let i = cells.length - 1; i >= 0; i--) {
    if (cells[i].hasChildNodes()) {
      cells[i].innerHTML = "";
      const submitButton = document.getElementById("submit-button");
      submitButton.classList.add("disabled");
      submitButton.disabled = true;
      break;
    }
  }
}

// Función que se dedica a crear la tabla
function createTable() {
  const table = document.getElementById("maintable");
  for (let i = 0; i < intentos; i++) {
    const row = document.createElement("tr");
    row.classList.add(`fila${i}`);
    for (let j = 0; j < 5; j++) {
      const cell = document.createElement("td");
      row.appendChild(cell);
    }
    table.appendChild(row);
  }
}

// Función que se dedica a añadir los numeros a la fila actual
function enterNumber() {
  let number = this.innerHTML;
  if (filaActual.length < 5) {
    filaActual.push(number);
    console.log(filaActual);
    const currentRow = document.querySelector(`.fila${6 - intentos}`);
    const cells = currentRow.querySelectorAll("td");
    let allFilled = true;
    for (const element of cells) {
      if (!element.hasChildNodes()) {
        element.innerHTML = number;
        allFilled = false;
        break;
      }
    }
    if (allFilled || cells[4].hasChildNodes()) {
      const submitButton = document.getElementById("submit-button");
      submitButton.classList.remove("disabled");
      submitButton.disabled = false;
    }
  }
}

// Función que compara la fila actual con la clave secreta y comprueba si has ganado o perdido
function checkGuess() {
  let result = [];
  for (let i = 0; i < 5; i++) {
    if (filaActual[i] == claveSecreta[i]) {
      result.push(1);
    } else if (claveSecreta.includes(parseInt(filaActual[i]))) {
      result.push(2);
    } else {
      result.push(3);
    }
  }
  const currentRow = document.querySelector(`.fila${6 - intentos}`);
  const cells = currentRow.querySelectorAll("td");
for (const [index, element] of cells.entries()) {
    element.classList.add(`result${result[index]}`);
}
if (result.every((value) => value == 1)) {
    document.getElementById("message").innerHTML = `<br>¡Has ganado!<br><br>La clave secreta era: ${claveSecreta.join("")}`;
    document.getElementById("submit-button").disabled = true;
} else if (intentos == 1) {
    document.getElementById("message").innerHTML = `<br>¡Has perdido!<br><br>La clave secreta era: ${claveSecreta.join("")}`;
    document.getElementById("submit-button").disabled = true;
}
intentos--;
filaActual = [];
if (intentos == 0) {
    document.getElementById("submit-button").disabled = true;
} else {
    document.getElementById("submit-button").classList.add("disabled");
    document.getElementById("submit-button").disabled = true;
}
document.getElementById("attempts").innerHTML = `Intentos: ${intentos}`;
document.getElementById("submit-button").disabled = true;
}

// Función que se dedica a resetear el juego
function resetGame() {
  let reply = confirm("¿Estás seguro de que quieres reiniciar la partida?");
  if (reply) {
    intentos = 6;
    claveSecreta = generateSecretCode();
    filaActual = [];
    const table = document.getElementById("maintable");
    while (table.firstChild) {
      table.removeChild(table.firstChild);
    }
    createTable();
    const submitButton = document.getElementById("submit-button");
    submitButton.classList.add("disabled");
    submitButton.disabled = true;
    document.getElementById("attempts").innerHTML = "Intentos: " + intentos;
    document.getElementById("message").innerHTML = "";
  }
}

// Añadimos los listeners a los botones
function addNumberButtonListeners() {
  const buttons = document.querySelectorAll(".number-button");
  for (const button of buttons) {
    button.addEventListener("click", enterNumber);
  }

  document.addEventListener("keydown", (event) => {
    if (event.key >= "0" && event.key <= "9") {
      enterNumber.call({ innerHTML: event.key });
    }
  });
  document.getElementById("delete-button").addEventListener("click", deleteNumber);
  document.getElementById("submit-button").addEventListener("click", checkGuess);
  document.getElementById("reset-button").addEventListener("click", resetGame);
}

let numberButtons = document.getElementsByClassName("number-button");
for (let button of numberButtons) {
  button.addEventListener("click", enterNumber);
}

// Añadimos el listener al boton de reset
const resetButton = document.getElementById("reset-button");
resetButton.addEventListener("click", resetGame);

// Añadimos los listeners a las teclas
document.addEventListener("keydown", (event) => {
  const key = event.key;
  if (key === "Backspace") {
    deleteNumber();
  } else if (key === "Enter" && !document.getElementById("submit-button").disabled) {
    checkGuess();
  }
});
