const chess = new Chess();

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("importBtn");
  if (btn) btn.addEventListener("click", importGame);
});

function importGame() {
  const pgnInput = document.getElementById("pgnInput");
  const movesDiv = document.getElementById("moves");

  if (!pgnInput || !movesDiv) return;

  chess.reset();
  movesDiv.innerHTML = "";

  const pgn = pgnInput.value.trim();
  if (!pgn) {
    movesDiv.textContent = "Paste PGN and click Import";
    return;
  }

  const ok = chess.load_pgn(pgn);
  if (!ok) {
    movesDiv.textContent = "Invalid PGN";
    return;
  }

  const history = chess.history();
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
