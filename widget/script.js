const characterPool = [
  "Test1", "Test2", "Test3"
];

let raceActive = false;
let raceGoal = 100;
let progress = [0, 0, 0];
let characters = [];

function updateUI() {
  // Avancement des personnages
  for (let i = 0; i < 3; i++) {
    const runner = document.getElementById(`runner${i+1}`);
    const info = document.getElementById(`progressInfo${i+1}`);
    const amount = progress[i];

    const percent = Math.min(100, (amount / raceGoal) * 100);
    runner.style.left = `calc(${percent}% - 30px)`;

    info.querySelector(".amount").textContent = `${amount}€ / ${raceGoal}€`;
    info.querySelector(".character-name").textContent = `🎮 ${characters[i]}`;
    runner.querySelector(".character-name-tag").textContent = characters[i];
  }
}

function startRace(goal) {
  raceGoal = goal;
  raceActive = true;
  progress = [0, 0, 0];
  characters = pickRandomCharacters(3);

  document.getElementById("goalDisplay").textContent = `🎯 Objectif : ${goal}€`;
  document.getElementById("statusDisplay").textContent = `Course lancée ! Premier à atteindre ${goal}€ gagne !`;

  updateUI();
}

function stopRace() {
  raceActive = false;
  document.getElementById("statusDisplay").textContent = "Course arrêtée.";
}

function resetRace() {
  raceActive = false;
  progress = [0, 0, 0];
  document.getElementById("statusDisplay").textContent = "En attente d'une nouvelle course...";
  updateUI();
}

function pickRandomCharacters(n) {
  const shuffled = [...characterPool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

function addDonation(character, amount) {
  if (!raceActive) return;

  const index = characters.findIndex(c => c.toLowerCase() === character.toLowerCase());
  if (index !== -1) {
    progress[index] += amount;
    showDonationAlert(character, amount);
    updateUI();

    if (progress[index] >= raceGoal) {
      raceActive = false;
      const runner = document.querySelector(`#runner${index+1} .character-avatar`);
      runner.classList.add("winner");
      document.getElementById("statusDisplay").textContent = `🏆 ${character} remporte la course !`;
    }
  }
}

function showDonationAlert(character, amount) {
  const alertBox = document.getElementById("donationAlert");
  alertBox.textContent = `💸 +${amount}€ pour ${character} !`;
  alertBox.classList.add("show");

  setTimeout(() => {
    alertBox.classList.remove("show");
  }, 3000);
}

// Gestion des events de StreamElements
window.addEventListener('onEventReceived', function (obj) {
  if (!obj.detail || !obj.detail.event) return;
  const listener = obj.detail.listener;
  const data = obj.detail.event;

  if (listener === "message") {
    const text = data.data.text.trim();
    if (text.startsWith("&start")) {
      const parts = text.split(" ");
      const goal = parseInt(parts[1]) || 100;
      startRace(goal);
    }
    else if (text === "&stop") {
      stopRace();
    }
    else if (text === "&reset") {
      resetRace();
    }
  }

  if (listener === "tip-latest" || listener === "donation-latest") {
    const message = data.message || "";
    const amount = parseFloat(data.amount) || 0;
    if (!amount || !raceActive) return;

    for (let char of characters) {
      if (message.toLowerCase().includes(char.toLowerCase())) {
        addDonation(char, amount);
        break;
      }
    }
  }
});

// --- MODE DEBUG ---
// Active pour tester en local, désactive avant le live
const DEBUG = true;

if (DEBUG) {
  console.log("Mode DEBUG actif : simulation des commandes...");
  setTimeout(() => {
    console.log("Simulation: &start 200");
    const fakeEvent = { detail: { 
      listener: "message", 
      event: { data: { text: "&start 200", displayName: "TestUser" } } 
    }};
    window.dispatchEvent(new CustomEvent("onEventReceived", fakeEvent));
  }, 2000);

  setTimeout(() => {
    console.log("Simulation: don 50€ pour Mario");
    addDonation("Test1", 50);
  }, 5000);

  setTimeout(() => {
    console.log("Simulation: don 200€ pour Luigi");
    addDonation("Test3", 200);
  }, 9000);
}

