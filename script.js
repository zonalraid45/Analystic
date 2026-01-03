const chess = new Chess();

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("importBtn").addEventListener("click", importGame);
});

function importGame() {
  const pgnInput = document.getElementById("pgnInput");
  const movesDiv = document.getElementById("moves");

  chess.reset();
  movesDiv.innerHTML = "";

  const pgn = pgnInput.value.trim();
  if (!pgn) {
    movesDiv.textContent = "Paste PGN";
    return;
  }

  chess.load_pgn(pgn, { sloppy: true });

  const history = chess.history();
  if (history.length === 0) {
    movesDiv.textContent = "PGN parsed but no legal moves";
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
