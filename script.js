// script.js
// Compatible with chess.js 0.13.4
// GitHub Pages safe

const chess = new Chess();

function importGame() {
  const pgnInput = document.getElementById("pgnInput");
  const movesDiv = document.getElementById("moves");

  if (!pgnInput || !movesDiv) {
    console.error("Missing DOM elements");
    return;
  }

  const rawPGN = pgnInput.value.trim();
  movesDiv.innerHTML = "";
  chess.reset();

  if (!rawPGN) {
    movesDiv.textContent = "Paste PGN and click Import";
    return;
  }

  // --- SAN-only robust parser ---
  const moves = extractSANMoves(rawPGN);

  if (!moves.length) {
    movesDiv.textContent = "No valid moves found";
    return;
  }

  moves.forEach(move => {
    try {
      chess.move(move, { sloppy: true });
    } catch (e) {
      // ignore illegal / broken tokens
    }
  });

  const history = chess.history();
  if (!history.length) {
    movesDiv.textContent = "PGN parsed but no legal moves applied";
    return;
  }

  renderMoves(history);
}

function extractSANMoves(pgn) {
  return pgn
    // Remove headers
    .replace(/\[.*?\]/gs, "")
    // Remove comments
    .replace(/\{.*?\}/gs, "")
    // Remove variations
    .replace(/\([^)]*\)/gs, "")
    // Remove move numbers
    .replace(/\d+\.(\.\.)?/g, "")
    // Remove results
    .replace(/\b1-0\b|\b0-1\b|\b1\/2-1\/2\b|\*/g, "")
    // Normalize spaces
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    // Clean annotations
    .map(m => m.replace(/[\?!+#]+$/, ""))
    .filter(Boolean);
}

function renderMoves(history) {
  const movesDiv = document.getElementById("moves");

  let html = "<table>";
  for (let i = 0; i < history.length; i += 2) {
    html += `
      <tr>
        <td class="num">${Math.floor(i / 2) + 1}.</td>
        <td class="white">${history[i] || ""}</td>
        <td class="black">${history[i + 1] || ""}</td>
      </tr>
    `;
  }
  html += "</table>";

  movesDiv.innerHTML = html;
}
