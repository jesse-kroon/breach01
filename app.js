const intro = document.getElementById("intro");
const terminal = document.getElementById("terminal");
const breached = document.getElementById("breached");
const patch = document.getElementById("patch");
const complete = document.getElementById("complete");
const bonus = document.getElementById("bonus");
const bonusComplete = document.getElementById("bonus-complete");
const network = document.getElementById("network");
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
let bonusIndex = 0;

function clearBonusFeedback(prefix) {
  document.getElementById(`${prefix}-results`).replaceChildren();
  const summary = document.getElementById(`${prefix}-summary`);
  summary.textContent = "";
  summary.className = "test-summary";
  const details = document.getElementById(`${prefix}-details`);
  details.hidden = true;
  details.open = false;
}

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
  bonusIndex = 0;
  document.getElementById("bonus-answer").value = "";
  clearBonusFeedback("bonus");
  document.getElementById("bonus-hint").hidden = true;
  document.getElementById("bonus-hint-button").setAttribute("aria-expanded", "false");
  document.getElementById("bonus-next").hidden = true;
  document.querySelectorAll('input[name="network-rule"]').forEach(input => { input.checked = false; });
  clearBonusFeedback("network");
  document.getElementById("network-traffic").hidden = true;
  document.getElementById("network-hint").hidden = true;
  document.getElementById("network-hint-button").setAttribute("aria-expanded", "false");
  testSummary.textContent = "";
  testSummary.className = "test-summary";
  testDetails.hidden = true;
  testDetails.open = false;
  securityScan.hidden = true;
  securityScan.classList.remove("unsafe");
  vaultPanel.classList.remove("scan-pass", "scan-fail", "breach-active", "scanning");
  patchExplanation.hidden = true;
  document.getElementById("patch-hint").setAttribute("aria-expanded", "false");
  instruction.textContent = "Onderzoek het systeem. Begin met help.";
  vaultStatus.classList.remove("breached", "secured");
  vaultStatus.innerHTML = '<span class="status-dot"></span> LOCKED';
  appendLine("BREACH_01 SECURITY TERMINAL");
  appendLine("[CONNECTED] BLACK_VAULT (SIMULATION)", "connection");
  appendLine("Typ 'help' om te beginnen.");
}

function showScreen(screen) {
  const isIntro = screen === "intro";
  document.body.classList.toggle("intro-active", isIntro);
  intro.hidden = !isIntro;
  terminal.hidden = screen !== "terminal";
  breached.hidden = screen !== "breached";
  patch.hidden = screen !== "patch";
  complete.hidden = screen !== "complete";
  bonus.hidden = screen !== "bonus";
  bonusComplete.hidden = screen !== "bonus-complete";
  network.hidden = screen !== "network";
  const labels = { intro: "01 / 04 <span>BRIEFING</span>", terminal: "02 / 04 <span>ONDERZOEK</span>", breached: "03 / 04 <span>BREACH</span>", patch: "04 / 04 <span>REPARATIE</span>", complete: "04 / 04 <span>VOLTOOID</span>", bonus: "BONUS <span>PYTHON</span>", "bonus-complete": "BONUS <span>VOLTOOID</span>", network: "BONUS <span>NETWERK</span>" };
  phase.innerHTML = labels[screen];
  if (isIntro) {
    resetTerminal();
    document.getElementById("start").focus();
  } else if (screen === "terminal") {
    commandInput.focus();
  } else if (screen === "breached") {
    vaultStatus.classList.add("breached");
    vaultPanel.classList.add("breach-active");
    vaultStatus.innerHTML = '<span class="status-dot"></span> BREACHED';
    document.getElementById("breached-title").focus();
  } else if (screen === "patch") {
    vaultPanel.classList.remove("breach-active");
    document.getElementById("patch-title").focus();
  } else if (screen === "complete") {
    vaultStatus.classList.remove("breached");
    vaultStatus.classList.add("secured");
    vaultStatus.innerHTML = '<span class="status-dot"></span> SECURED';
    document.getElementById("complete-title").focus();
  } else if (screen === "bonus") {
    document.getElementById("bonus-title").focus();
  } else if (screen === "network") {
    document.getElementById("network-title").focus();
  } else {
    document.getElementById("bonus-complete-title").focus();
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
    vaultPanel.classList.remove("scanning");
    void vaultPanel.offsetWidth;
    vaultPanel.classList.add("scanning");
  } else if (command === "inspect auth") {
    response = "[LOG] Gebruikersnaam: JUIST\n[LOG] Wachtwoord: ONJUIST\n[LOG] Beslissing: TOEGANG VERLEEND";
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
  if (command === "inspect auth") appendLine("[WARNING] Verdacht gedrag: toegang met een fout wachtwoord.", "warning");
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
document.getElementById("bonus-restart").addEventListener("click", () => showScreen("intro"));
document.getElementById("bonus-back").addEventListener("click", () => showScreen("complete"));
document.getElementById("start-network").addEventListener("click", () => showScreen("network"));
document.getElementById("network-back").addEventListener("click", () => showScreen("complete"));
document.getElementById("network-hint-button").addEventListener("click", (event) => {
  const hint = document.getElementById("network-hint");
  hint.hidden = !hint.hidden;
  event.currentTarget.setAttribute("aria-expanded", String(!hint.hidden));
});
document.querySelectorAll('input[name="network-rule"]').forEach(input => input.addEventListener("change", () => {
  clearBonusFeedback("network");
  document.getElementById("network-traffic").hidden = true;
}));
document.getElementById("network-test").addEventListener("click", () => {
  const results = document.getElementById("network-results");
  const traffic = document.getElementById("network-traffic");
  const selected = document.querySelector('input[name="network-rule"]:checked');
  clearBonusFeedback("network");
  traffic.hidden = true;
  if (!selected) {
    document.getElementById("network-summary").textContent = "Kies eerst een firewallregel om de verbindingen te testen.";
    return;
  }
  const tests = [
    { name: "Beheercomputer", trusted: true, expected: true },
    { name: "Onbekende computer", trusted: false, expected: false }
  ];
  let passed = 0;
  for (const test of tests) {
    const allowed = selected.value === "all" || (selected.value === "admin" && test.trusted);
    const suffix = test.trusted ? "admin" : "unknown";
    const packet = document.getElementById(`packet-${suffix}`);
    const state = document.getElementById(`state-${suffix}`);
    packet.className = "traffic-packet";
    state.className = `traffic-state ${allowed ? "allowed" : "blocked"}`;
    state.textContent = allowed ? "DOORGELATEN" : "GEBLOKKEERD";
    void packet.offsetWidth;
    packet.classList.add(allowed ? "allowed" : "blocked");
    const success = allowed === test.expected;
    if (success) passed += 1;
    const line = document.createElement("p");
    line.className = `network-result ${success ? "test-pass" : "test-fail"}`;
    line.textContent = `${test.name} → firewall → kluis: ${allowed ? "DOORGELATEN" : "GEBLOKKEERD"} — ${success ? "goed" : "niet de bedoeling"}.`;
    results.appendChild(line);
  }
  traffic.hidden = false;
  const summary = document.getElementById("network-summary");
  summary.className = `test-summary ${passed === tests.length ? "test-pass" : "test-fail"}`;
  summary.textContent = passed === tests.length ? "NETWERK BEVEILIGD — de beheercomputer kan erbij, andere computers niet. Goed gedaan!" : "Deze regel houdt de kluis nog niet veilig én bereikbaar. Pas de regel aan en test opnieuw.";
  document.getElementById("network-details").hidden = false;
});
document.getElementById("patch-hint").addEventListener("click", (event) => {
  patchExplanation.hidden = !patchExplanation.hidden;
  event.currentTarget.setAttribute("aria-expanded", String(!patchExplanation.hidden));
});

const bonusPuzzles = [
  {
    title: "CONTROLEER DE ROL",
    task: "Alleen gebruiker admin met de rol developer mag naar binnen. Vul de Python-operator in die beide controles verplicht maakt.",
    example: 'username = "admin"\nrole = "developer"',
    before: 'username == "admin" ',
    after: ' role == "developer"',
    hint: 'In Python betekent "and" dat beide voorwaarden waar moeten zijn; "or" betekent dat één genoeg is.',
    operators: ["and", "or"],
    cases: [
      { name: "admin + developer", username: "admin", role: "developer", expected: true },
      { name: "admin + guest", username: "admin", role: "guest", expected: false },
      { name: "guest + developer", username: "guest", role: "developer", expected: false }
    ],
    evaluate: (test, operator) => operator === "and" ? test.username === "admin" && test.role === "developer" : test.username === "admin" || test.role === "developer"
  },
  {
    title: "CONTROLEER DE PINCODE",
    task: "Alleen pincode 4826 geeft toegang. Vul de Python-vergelijking in die controleert of de pincode gelijk is aan 4826.",
    example: "pin = 4826",
    before: "pin ",
    after: " 4826",
    hint: 'In Python controleer je gelijkheid met twee gelijktekens: ==. Een enkel = geeft een waarde aan een variabele.',
    operators: ["==", "!=", "<", ">", "<=", ">="],
    cases: [
      { name: "pincode 4826", pin: 4826, expected: true },
      { name: "pincode 1234", pin: 1234, expected: false },
      { name: "pincode 9999", pin: 9999, expected: false }
    ],
    evaluate: (test, operator) => {
      switch (operator) {
        case "==": return test.pin === 4826;
        case "!=": return test.pin !== 4826;
        case "<": return test.pin < 4826;
        case ">": return test.pin > 4826;
        case "<=": return test.pin <= 4826;
        case ">=": return test.pin >= 4826;
      }
    }
  }
];

function renderBonus() {
  const puzzle = bonusPuzzles[bonusIndex];
  document.getElementById("bonus-progress").textContent = `PUZZEL ${bonusIndex + 1} / ${bonusPuzzles.length}`;
  document.getElementById("bonus-heading").textContent = puzzle.title;
  document.getElementById("bonus-task").textContent = puzzle.task;
  document.getElementById("bonus-code-before").textContent = puzzle.example;
  document.getElementById("bonus-condition-before").textContent = puzzle.before;
  document.getElementById("bonus-condition-after").textContent = puzzle.after;
  document.getElementById("bonus-answer").value = "";
  clearBonusFeedback("bonus");
  document.getElementById("bonus-next").hidden = true;
  document.getElementById("bonus-hint").textContent = puzzle.hint;
  document.getElementById("bonus-hint").hidden = true;
  document.getElementById("bonus-hint-button").setAttribute("aria-expanded", "false");
}

document.getElementById("start-bonus").addEventListener("click", () => {
  bonusIndex = 0;
  renderBonus();
  showScreen("bonus");
});
document.getElementById("bonus-hint-button").addEventListener("click", (event) => {
  const hint = document.getElementById("bonus-hint");
  hint.hidden = !hint.hidden;
  event.currentTarget.setAttribute("aria-expanded", String(!hint.hidden));
});
document.getElementById("bonus-answer").addEventListener("input", () => {
  clearBonusFeedback("bonus");
  document.getElementById("bonus-next").hidden = true;
});
document.getElementById("bonus-test").addEventListener("click", () => {
  const puzzle = bonusPuzzles[bonusIndex];
  const answer = document.getElementById("bonus-answer").value.trim();
  const results = document.getElementById("bonus-results");
  const next = document.getElementById("bonus-next");
  clearBonusFeedback("bonus");
  next.hidden = true;
  if (!puzzle.operators.includes(answer)) {
    const message = document.getElementById("bonus-summary");
    message.className = "test-summary test-fail";
    message.textContent = `Vul een ondersteunde operator in: ${puzzle.operators.join(", ")}. Probeer de hint als je hulp wilt.`;
    return;
  }
  let passed = 0;
  for (const test of puzzle.cases) {
    const actual = puzzle.evaluate(test, answer);
    const success = actual === test.expected;
    if (success) passed += 1;
    const line = document.createElement("p");
    line.className = success ? "test-pass" : "test-fail";
    const outcome = value => value ? "toegang verleend" : "toegang geweigerd";
    line.textContent = `${success ? "GESLAAGD" : "GEFAALD"} — ${test.name}: verwacht ${outcome(test.expected)}, resultaat ${outcome(actual)}.`;
    results.appendChild(line);
  }
  const summary = document.getElementById("bonus-summary");
  summary.className = `test-summary ${passed === puzzle.cases.length ? "test-pass" : "test-fail"}`;
  summary.textContent = passed === puzzle.cases.length ? "Alle tests geslaagd!" : `${passed} van ${puzzle.cases.length} tests geslaagd. Probeer het opnieuw.`;
  document.getElementById("bonus-details").hidden = false;
  if (passed === puzzle.cases.length) {
    next.textContent = bonusIndex === bonusPuzzles.length - 1 ? "BONUS AFRONDEN" : "VOLGENDE PUZZEL";
    next.hidden = false;
  }
});
document.getElementById("bonus-next").addEventListener("click", () => {
  if (bonusIndex === bonusPuzzles.length - 1) {
    showScreen("bonus-complete");
  } else {
    bonusIndex += 1;
    renderBonus();
    document.getElementById("bonus-title").focus();
  }
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
