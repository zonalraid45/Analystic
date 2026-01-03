let chess;

document.addEventListener("DOMContentLoaded", () => {
  if (typeof Chess !== "function") {
    alert("chess.js failed to load");
    return;
  }

  chess = new Chess();

  const button = document.querySelector("button");
  if (button) button.addEventListener("click", importGame);
});

function importGame() {
  const pgnInput = document.getElementById("pgnInput");
  const movesDiv = document.getElementById("moves");

  chess.reset();
  movesDiv.innerHTML = "";

  const text = pgnInput.value.trim();
  if (!text) {
    movesDiv.textContent = "Paste PGN and click Import";
    return;
  }

  const loaded = chess.load_pgn(text, { sloppy: true });

  if (!loaded) {
    movesDiv.textContent = "Invalid PGN";
    return;
  }

  const history = chess.history();
  if (!history.length) {
    movesDiv.textContent = "No moves parsed";
    return;
  }

  let html = "<table>";
  for (let i = 0; i < history.length; i += 2) {
    html += `<tr>
      <td class="num">${i / 2 + 1}.</td>
      <td class="white">${history[i] || ""}</td>
      <td class="black">${history[i + 1] || ""}</td>
    </tr>`;
  }
  html += "</table>";

  movesDiv.innerHTML = html;
}
