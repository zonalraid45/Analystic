const chess = new Chess();

document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("importBtn");
  if (button) button.addEventListener("click", importGame);
});

function importGame() {
  const pgnInput = document.getElementById("pgnInput");
  const movesDiv = document.getElementById("moves");

  if (!pgnInput || !movesDiv) return;

  chess.reset();
  movesDiv.innerHTML = "";

  const text = pgnInput.value.trim();
  if (!text) {
    movesDiv.textContent = "Paste PGN and click Import";
    return;
  }

  const moves = text
    .replace(/\u00A0/g, " ")
    .replace(/\[.*?\]/gs, "")
    .replace(/\{.*?\}/gs, "")
    .replace(/\([^)]*\)/gs, "")
    .replace(/\d+\.(\.\.)?/g, "")
    .replace(/\b1-0\b|\b0-1\b|\b1\/2-1\/2\b|\*/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .map(m => m.replace(/[\?!+#]+$/, ""))
    .filter(Boolean);

  for (const m of moves) {
    try { chess.move(m, { sloppy: true }); } catch {}
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
