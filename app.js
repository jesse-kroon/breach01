const intro = document.getElementById("intro");
const terminal = document.getElementById("terminal");
const breached = document.getElementById("breached");
const patch = document.getElementById("patch");
const complete = document.getElementById("complete");
const phase = document.getElementById("phase");
const vaultStatus = document.getElementById("vault-status");
const output = document.getElementById("terminal-output");
const commandInput = document.getElementById("command");
const hints = document.getElementById("hints");
const instruction = document.getElementById("terminal-instruction");
const operatorInput = document.getElementById("operator");
const testResults = document.getElementById("test-results");
const testSummary = document.getElementById("test-summary");
const testDetails = document.getElementById("test-details");
const securityScan = document.getElementById("security-scan");
const vaultPanel = document.querySelector(".vault-panel");
const patchExplanation = document.getElementById("patch-explanation");
let progress;
let hintCount;

function appendLine(text, type = "") {
  const line = document.createElement("div");
  line.className = `terminal-line ${type}`;
  line.textContent = text;
  output.appendChild(line);
  output.scrollTop = output.scrollHeight;
}

function resetTerminal() {
  progress = { help: false, scan: false, inspect: false };
  hintCount = 0;
  output.replaceChildren();
  hints.replaceChildren();
  commandInput.value = "";
  operatorInput.value = "||";
  testResults.replaceChildren();
  document.getElementById("complete-results").replaceChildren();
  complete.querySelector("details").open = false;
  testSummary.textContent = "";
  testSummary.className = "test-summary";
  testDetails.hidden = true;
  testDetails.open = false;
  securityScan.hidden = true;
  securityScan.classList.remove("unsafe");
  vaultPanel.classList.remove("scan-pass", "scan-fail");
  patchExplanation.hidden = true;
  document.getElementById("patch-hint").setAttribute("aria-expanded", "false");
  instruction.textContent = "Onderzoek het systeem. Begin met help.";
  vaultStatus.classList.remove("breached", "secured");
  vaultStatus.innerHTML = '<span class="status-dot"></span> LOCKED';
  appendLine("BREACH_01 SECURITY TERMINAL\nCONNECTED TO BLACK_VAULT (SIMULATION)\nTyp 'help' om te beginnen.");
}

function showScreen(screen) {
  const isIntro = screen === "intro";
  document.body.classList.toggle("intro-active", isIntro);
  intro.hidden = !isIntro;
  terminal.hidden = screen !== "terminal";
  breached.hidden = screen !== "breached";
  patch.hidden = screen !== "patch";
  complete.hidden = screen !== "complete";
  const labels = { intro: "01 / 04 <span>BRIEFING</span>", terminal: "02 / 04 <span>ONDERZOEK</span>", breached: "03 / 04 <span>BREACH</span>", patch: "04 / 04 <span>REPARATIE</span>", complete: "04 / 04 <span>VOLTOOID</span>" };
  phase.innerHTML = labels[screen];
  if (isIntro) {
    resetTerminal();
    document.getElementById("start").focus();
  } else if (screen === "terminal") {
    commandInput.focus();
  } else if (screen === "breached") {
    vaultStatus.classList.add("breached");
    vaultStatus.innerHTML = '<span class="status-dot"></span> BREACHED';
    document.getElementById("breached-title").focus();
  } else if (screen === "patch") {
    document.getElementById("patch-title").focus();
  } else {
    vaultStatus.classList.remove("breached");
    vaultStatus.classList.add("secured");
    vaultStatus.innerHTML = '<span class="status-dot"></span> SECURED';
    document.getElementById("complete-title").focus();
  }
}

function authenticate(username, password, operator) {
  const usernameValid = username === "admin";
  const passwordValid = password === "secret123";
  return operator === "&&" ? usernameValid && passwordValid : usernameValid || passwordValid;
}

function runCommand(raw) {
  const text = raw.trim();
  if (!text) return;
  const previousStage = hintStage();
  appendLine(`visitor@black_vault:~$ ${text}`, "command");
  const parts = text.split(/\s+/);
  const command = parts.map(part => part.toLowerCase()).join(" ");
  let response;
  if (command === "help") {
    response = "BESCHIKBARE COMMANDO'S\n  help          Toon deze uitleg\n  scan          Onderzoek beschikbare systemen\n  inspect auth  Bekijk het authenticatielog\n  login <gebruikersnaam> <wachtwoord>  Probeer in te loggen\n  clear         Wis de terminalgeschiedenis";
    progress.help = true;
  } else if (command === "scan") {
    response = "[FOUND] BLACK_VAULT — digitale kluis\n[FOUND] AUTH_GATE — toegangssysteem\n[INFO] Bekend account: admin";
    progress.scan = true;
  } else if (command === "inspect auth") {
    response = "[LOG] Gebruikersnaam: JUIST\n[LOG] Wachtwoord: ONJUIST\n[LOG] Beslissing: TOEGANG VERLEEND\n[WARNING] Verdacht gedrag: toegang met een fout wachtwoord.";
    progress.inspect = true;
  } else if (command === "clear") {
    output.replaceChildren();
    return;
  } else if (parts[0].toLowerCase() === "login") {
    if (parts.length !== 3) {
      response = "Gebruik: login <gebruikersnaam> <wachtwoord>";
    } else {
      if (authenticate(parts[1], parts[2], "||")) {
        showScreen("breached");
        return;
      }
      response = "[AUTH] Gebruikersnaam: ONJUIST\n[AUTH] Wachtwoord: ONJUIST\n[AUTH] ACCESS DENIED — toegang geweigerd.";
    }
  } else {
    response = "Onbekend commando. Typ help voor de mogelijkheden.";
  }
  appendLine(response);
  if (hintStage() !== previousStage) {
    hintCount = 0;
    hints.replaceChildren();
  }
  if (progress.scan && progress.inspect) {
    instruction.textContent = "Probeer in te loggen met de bekende gebruiker en een verzonnen wachtwoord.";
  } else if (progress.help) {
    instruction.textContent = "Onderzoek het systeem met scan en inspect auth.";
  }
}

function hintStage() {
  return !progress.help ? "start" : !progress.scan || !progress.inspect ? "research" : "done";
}

function showHint() {
  const stage = hintStage();
  const messages = {
    start: ["Ontdek welke opdrachten bestaan.", "Probeer help.", "help"],
    research: ["Welke diensten zijn actief?", "Gebruik scan en inspect auth.", !progress.scan ? "scan" : "inspect auth"],
    done: ["Moet een fout wachtwoord altijd toegang weigeren?", "Probeer de bekende gebruiker admin met een verzonnen wachtwoord.", "login admin 1234"]
  };
  if (hintCount >= 3) return;
  const message = messages[stage][hintCount];
  const line = document.createElement("p");
  if (hintCount === 2) {
    line.append("Probeer: ");
    const example = document.createElement("button");
    example.type = "button";
    example.className = "hint-example";
    example.textContent = message;
    example.addEventListener("click", () => {
      runCommand(message);
      if (!terminal.hidden) commandInput.focus();
    });
    line.appendChild(example);
  } else {
    line.textContent = message;
  }
  hints.appendChild(line);
  hintCount += 1;
}

document.getElementById("start").addEventListener("click", () => showScreen("terminal"));
document.getElementById("restart").addEventListener("click", () => showScreen("intro"));
document.getElementById("terminal-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const command = commandInput.value;
  commandInput.value = "";
  runCommand(command);
  if (!terminal.hidden) commandInput.focus();
});
document.getElementById("hint").addEventListener("click", showHint);
document.getElementById("open-editor").addEventListener("click", () => showScreen("patch"));
document.getElementById("new-mission").addEventListener("click", () => showScreen("intro"));
document.getElementById("patch-hint").addEventListener("click", (event) => {
  patchExplanation.hidden = !patchExplanation.hidden;
  event.currentTarget.setAttribute("aria-expanded", String(!patchExplanation.hidden));
});
document.getElementById("test-patch").addEventListener("click", () => {
  testResults.replaceChildren();
  testDetails.hidden = true;
  testDetails.open = false;
  securityScan.hidden = true;
  vaultPanel.classList.remove("scan-pass", "scan-fail");
  const operator = operatorInput.value.trim();
  if (operator !== "||" && operator !== "&&") {
    testSummary.className = "test-summary test-fail";
    testSummary.textContent = "Ongeldige operator. Gebruik || of && en probeer opnieuw.";
    return;
  }
  const scenarios = [
    { name: "admin + verkeerd wachtwoord", username: "admin", password: "wrong", expected: false },
    { name: "verkeerde gebruiker + juist wachtwoord", username: "guest", password: "secret123", expected: false },
    { name: "admin + juist wachtwoord", username: "admin", password: "secret123", expected: true }
  ];
  let passed = 0;
  for (const scenario of scenarios) {
    const actual = authenticate(scenario.username, scenario.password, operator);
    const success = actual === scenario.expected;
    if (success) passed += 1;
    const line = document.createElement("p");
    line.className = success ? "test-pass" : "test-fail";
    const result = value => value ? "GRANTED" : "DENIED";
    line.textContent = `${success ? "GESLAAGD" : "GEFAALD"} — ${scenario.name}: verwacht ${result(scenario.expected)}, werkelijk ${result(actual)}.`;
    testResults.appendChild(line);
  }
  const allPassed = passed === scenarios.length;
  testSummary.className = `test-summary ${allPassed ? "test-pass" : "test-fail"}`;
  testSummary.textContent = allPassed ? "Alle tests geslaagd! De reparatie werkt in deze simulatie." : `${passed} van ${scenarios.length} tests geslaagd. Pas de operator aan en probeer opnieuw.`;
  testDetails.hidden = false;
  securityScan.classList.toggle("unsafe", !allPassed);
  document.getElementById("scan-state").textContent = allPassed ? "CHECKS GESLAAGD" : "LEK GEVONDEN";
  securityScan.hidden = false;
  vaultPanel.classList.add(allPassed ? "scan-pass" : "scan-fail");
  if (allPassed) {
    const completeResults = document.getElementById("complete-results");
    completeResults.replaceChildren(...Array.from(testResults.children, line => line.cloneNode(true)));
    showScreen("complete");
  }
});
resetTerminal();
