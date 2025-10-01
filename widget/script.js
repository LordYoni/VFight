// --- Liste des personnages ---
const characterPool = [
  "Agnes_Tachyon", "Air_Groove", "Cheval_Grand", "Daiwa_Scarlet", "El_Condor_Pasa",
  "Gold_Ship", "Grass_Wonder", "Haru_Urara", "Hishi_Akebono",
  "Hishi_Amazon", "Kitasan_Black", "Matikane_Fukukitaru", "Matikane_Tannhauser",
  "Mayano_Top_Gun", "Mejiro_Mcqueen", "Mejiro_Ryan", "Mihono_Bourbon",
  "Neo_Universe", "Nice_Nature", "Oguri_Cap", "Rice_Shower",
  "Sakura_Bakushin_O", "Satono_Diamond", "Silence_Suzuka", "Special_Week",
  "Symboli_Rudolf", "T_M_Opera_O", "Taiki_Shuttle", "Tokai_Teio",
  "Twin_Turbo", "Vodka", "Zenno_Rob_Roy"
];

// --- Mapping personnages → images ---
const characterImages = {
  "Agnes_Tachyon": "https://raw.githubusercontent.com/LordYoni/VFight/main/Chibi/Agnes_Tachyon.webp",
  "Air_Groove": "https://raw.githubusercontent.com/LordYoni/VFight/main/Chibi/Air_Groove.webp",
  "Cheval_Grand": "https://raw.githubusercontent.com/LordYoni/VFight/main/Chibi/Cheval_Grand.webp",
  "Daiwa_Scarlet": "https://raw.githubusercontent.com/LordYoni/VFight/main/Chibi/Daiwa_Scarlet.webp",
  "El_Condor_Pasa": "https://raw.githubusercontent.com/LordYoni/VFight/main/Chibi/El_Condor_Pasa.webp",
  "Gold_Ship": "https://raw.githubusercontent.com/LordYoni/VFight/main/Chibi/Gold_Ship.webp",
  "Grass_Wonder": "https://raw.githubusercontent.com/LordYoni/VFight/main/Chibi/Grass_Wonder.webp",
  "Haru_Urara": "https://raw.githubusercontent.com/LordYoni/VFight/main/Chibi/Haru_Urara.webp",
  "Hishi_Akebono": "https://raw.githubusercontent.com/LordYoni/VFight/main/Chibi/Hishi_Akebono.webp",
  "Hishi_Amazon": "https://raw.githubusercontent.com/LordYoni/VFight/main/Chibi/Hishi_Amazon.webp",
  "Kitasan_Black": "https://raw.githubusercontent.com/LordYoni/VFight/main/Chibi/Kitasan_Black.webp",
  "Matikane_Fukukitaru": "https://raw.githubusercontent.com/LordYoni/VFight/main/Chibi/Matikane_Fukukitaru.webp",
  "Matikane_Tannhauser": "https://raw.githubusercontent.com/LordYoni/VFight/main/Chibi/Matikane_Tannhauser.webp",
  "Mayano_Top_Gun": "https://raw.githubusercontent.com/LordYoni/VFight/main/Chibi/Mayano_Top_Gun.webp",
  "Mejiro_Mcqueen": "https://raw.githubusercontent.com/LordYoni/VFight/main/Chibi/Mejiro_Mcqueen.webp",
  "Mejiro_Ryan": "https://raw.githubusercontent.com/LordYoni/VFight/main/Chibi/Mejiro_Ryan.webp",
  "Mihono_Bourbon": "https://raw.githubusercontent.com/LordYoni/VFight/main/Chibi/Mihono_Bourbon.webp",
  "Neo_Universe": "https://raw.githubusercontent.com/LordYoni/VFight/main/Chibi/Neo_Universe.webp",
  "Nice_Nature": "https://raw.githubusercontent.com/LordYoni/VFight/main/Chibi/Nice_Nature.webp",
  "Oguri_Cap": "https://raw.githubusercontent.com/LordYoni/VFight/main/Chibi/Oguri_Cap.webp",
  "Rice_Shower": "https://raw.githubusercontent.com/LordYoni/VFight/main/Chibi/Rice_Shower.webp",
  "Sakura_Bakushin_O": "https://raw.githubusercontent.com/LordYoni/VFight/main/Chibi/Sakura_Bakushin_O.webp",
  "Satono_Diamond": "https://raw.githubusercontent.com/LordYoni/VFight/main/Chibi/Satono_Diamond.webp",
  "Silence_Suzuka": "https://raw.githubusercontent.com/LordYoni/VFight/main/Chibi/Silence_Suzuka.webp",
  "Special_Week": "https://raw.githubusercontent.com/LordYoni/VFight/main/Chibi/Special_Week.webp",
  "Symboli_Rudolf": "https://raw.githubusercontent.com/LordYoni/VFight/main/Chibi/Symboli_Rudolf.webp",
  "T_M_Opera_O": "https://raw.githubusercontent.com/LordYoni/VFight/main/Chibi/T_M_Opera_O.webp",
  "Taiki_Shuttle": "https://raw.githubusercontent.com/LordYoni/VFight/main/Chibi/Taiki_Shuttle.webp",
  "Tokai_Teio": "https://raw.githubusercontent.com/LordYoni/VFight/main/Chibi/Tokai_Teio.webp",
  "Twin_Turbo": "https://raw.githubusercontent.com/LordYoni/VFight/main/Chibi/Twin_Turbo.webp",
  "Vodka": "https://raw.githubusercontent.com/LordYoni/VFight/main/Chibi/Vodka.webp",
  "Zenno_Rob_Roy": "https://raw.githubusercontent.com/LordYoni/VFight/main/Chibi/Zenno_Rob_Roy_.webp"
};

// --- Variables globales ---
let raceActive = false;
let raceGoal = 100;
let progress = [0, 0, 0];
let characters = [];
let currentCharacterColors = ["#ff6b6b", "#4ecdc4", "#45b7d1"]; // Couleurs par défaut

// --- Mise à jour de l'interface ---
function updateUI() {
  console.log("updateUI appelé - characters:", characters, "progress:", progress); // Debug
  
  // Mettre à jour la barre de progression colorée
  updateProgressBar();
  
  for (let i = 0; i < 3; i++) {
    const runner = document.getElementById(`runner${i+1}`);
    const info = document.getElementById(`progressInfo${i+1}`);
    const amount = progress[i] || 0;
    const character = characters[i] || `Personnage ${i+1}`;
    const color = currentCharacterColors[i] || "#ffffff";

    if (!runner || !info) {
      console.log(`Éléments manquants pour runner ${i+1}`); // Debug
      continue;
    }

    // Déplacement du runner
    const percent = Math.min(100, (amount / raceGoal) * 100);
    runner.style.left = `calc(${percent}% - 30px)`; // Ajusté pour la nouvelle position

    // Infos de progression avec couleurs
    const amountElement = info.querySelector(".amount");
    const characterNameElement = info.querySelector(".character-name");
    const nameTagElement = runner.querySelector(".character-name-tag");
    
    // Remplacer les underscores par des espaces pour l'affichage
    const displayName = character.replace(/_/g, ' ');
    
    if (amountElement) {
      amountElement.textContent = `${amount}€ / ${raceGoal}€`;
      amountElement.style.color = color;
    }
    if (characterNameElement) {
      characterNameElement.textContent = `🎮 ${displayName}`;
      characterNameElement.style.color = color;
    }
    if (nameTagElement) {
      nameTagElement.textContent = displayName;
      nameTagElement.style.backgroundColor = color;
      nameTagElement.style.color = "#000";
    }

    // Avatar sans bordures
    const avatarDiv = runner.querySelector(".character-avatar");
    if (avatarDiv) {
      const imgSrc = characterImages[character] || "";
      if (imgSrc) {
        avatarDiv.innerHTML = `<img src="${imgSrc}" alt="${character}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;" />`;
      } else {
        avatarDiv.textContent = "🎮";
      }
    }
  }
}

// --- Mettre à jour la barre de progression colorée ---
function updateProgressBar() {
  const progressBar = document.querySelector('.main-progress-bar');
  if (!progressBar) return;
  
  // Vider la barre avant de la reconstruire
  progressBar.innerHTML = '';
  
  // Créer les segments de progression pour chaque personnage
  for (let i = 0; i < 3; i++) {
    const amount = progress[i] || 0;
    const percent = Math.min(100, (amount / raceGoal) * 100);
    const color = currentCharacterColors[i] || "#ffffff";
    
    if (percent > 0) {
      const segment = document.createElement('div');
      segment.className = 'progress-segment';
      segment.style.cssText = `
        position: absolute;
        left: 0;
        top: 0;
        width: ${percent}%;
        height: 100%;
        background: linear-gradient(90deg, ${color}CC, ${color}80);
        border-radius: 20px;
        z-index: ${10 - i};
        transition: width 0.8s ease-out;
        border: 1px solid ${color};
      `;
      progressBar.appendChild(segment);
    }
  }
}

// --- Commencer une course ---
function startRace(goal) {
  console.log(`startRace appelé avec goal: ${goal}`); // Debug
  
  raceGoal = goal;
  raceActive = true;
  progress = [0, 0, 0];
  characters = pickRandomCharacters(3);
  
  // Assigner des couleurs aléatoires différentes pour chaque personnage
  const availableColors = ["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#ffeaa7", "#dda0dd", "#98d8c8", "#f7dc6f", "#bb8fce", "#85c1e9"];
  currentCharacterColors = [];
  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * availableColors.length);
    currentCharacterColors.push(availableColors.splice(randomIndex, 1)[0]);
  }
  
  console.log(`Course démarrée avec objectif ${goal}€. Personnages:`, characters); // Debug
  console.log(`Couleurs assignées:`, currentCharacterColors); // Debug

  const goalDisplay = document.getElementById("goalDisplay");
  if (goalDisplay) goalDisplay.textContent = `🎯 Objectif : ${goal}€`;
  const statusDisplay = document.getElementById("statusDisplay");
  if (statusDisplay) statusDisplay.textContent = `Course lancée ! Premier à atteindre ${goal}€ gagne !`;

  updateUI();
}

// --- Arrêter la course ---
function stopRace() {
  raceActive = false;
  const statusDisplay = document.getElementById("statusDisplay");
  if (statusDisplay) statusDisplay.textContent = "Course arrêtée.";
}

// --- Réinitialiser la course ---
function resetRace() {
  raceActive = false;
  progress = [0, 0, 0];
  
  // Repositionner tous les coureurs au début
  for (let i = 0; i < 3; i++) {
    const runner = document.getElementById(`runner${i+1}`);
    if (runner) {
      runner.style.left = "0px"; // Remettre au début
      const avatar = runner.querySelector(".character-avatar");
      if (avatar) {
        avatar.classList.remove("winner"); // Supprimer l'animation de victoire
      }
    }
  }
  
  const statusDisplay = document.getElementById("statusDisplay");
  if (statusDisplay) statusDisplay.textContent = "En attente d'une nouvelle course...";
  updateUI();
}

// --- Choisir des personnages aléatoires ---
function pickRandomCharacters(n) {
  const shuffled = [...characterPool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

// --- Ajouter une donation ---
function addDonation(character, amount) {
  console.log(`Tentative donation: ${amount}€ pour ${character}. Course active: ${raceActive}`); // Debug
  if (!raceActive) {
    console.log("Course inactive, donation ignorée"); // Debug
    return;
  }

  const index = characters.findIndex(c => c.toLowerCase() === character.toLowerCase());
  console.log(`Index trouvé pour ${character}: ${index}. Personnages actuels:`, characters); // Debug
  
  if (index !== -1) {
    progress[index] += amount;
    console.log(`Nouveau progress[${index}]: ${progress[index]}/${raceGoal}`); // Debug
    showDonationAlert(character, amount);
    updateUI();

    // Vérifier le gagnant
    if (progress[index] >= raceGoal) {
      raceActive = false;
      const runnerAvatar = document.querySelector(`#runner${index+1} .character-avatar`);
      if (runnerAvatar) runnerAvatar.classList.add("winner");
      const statusDisplay = document.getElementById("statusDisplay");
      const displayName = character.replace(/_/g, ' '); // Remplacer les underscores par des espaces
      if (statusDisplay) statusDisplay.textContent = `🏆 ${displayName} remporte la course ! Tapez &restart pour relancer.`;
      console.log(`${displayName} a gagné la course!`); // Debug
    }
  } else {
    console.log(`Personnage ${character} non trouvé dans la course actuelle`); // Debug
  }
}

// --- Afficher l'alerte de donation ---
function showDonationAlert(character, amount) {
  const alertBox = document.getElementById("donationAlert");
  const displayName = character.replace(/_/g, ' '); // Remplacer les underscores par des espaces
  alertBox.textContent = `💸 +${amount}€ pour ${displayName} !`;
  alertBox.classList.add("show");
  setTimeout(() => alertBox.classList.remove("show"), 3000);
}

// --- Redémarrer avec nouvel objectif aléatoire ---
function restartWithRandomGoal() {
  // Générer un objectif aléatoire entre 100€ et 500€ (multiples de 50)
  const possibleGoals = [100, 150, 200, 250, 300, 350, 400, 450, 500];
  const randomGoal = possibleGoals[Math.floor(Math.random() * possibleGoals.length)];
  
  console.log(`Redémarrage avec objectif aléatoire: ${randomGoal}€`); // Debug
  startRace(randomGoal);
}

// --- Gestion des events StreamElements/Streamlabs ---
window.addEventListener('onEventReceived', function (obj) {
  console.log('Event reçu:', obj.detail); // Debug
  if (!obj.detail || !obj.detail.event) return;
  const listener = obj.detail.listener;
  const data = obj.detail.event;

  if (listener === "message") {
    const text = (data.data && data.data.text) ? data.data.text.trim() : '';
    console.log('Message reçu:', text); // Debug
    if (text.startsWith("&start")) {
      const parts = text.split(" ");
      const goal = parseInt(parts[1]) || 100;
      console.log('Démarrage course avec objectif:', goal); // Debug
      startRace(goal);
    } else if (text === "&stop") {
      stopRace();
    } else if (text === "&reset") {
      resetRace();
    } else if (text === "&restart") {
      console.log('Commande restart reçue'); // Debug
      restartWithRandomGoal();
    }
  }

  // Gestion des donations normales et des donations de charité
  if (listener === "tip-latest" || listener === "donation-latest" || listener === "charity-latest") {
    let message = "";
    let amount = 0;
    
    // Gestion spécifique pour Streamlabs Charity
    if (listener === "charity-latest") {
      message = data.message || data.comment || "";
      amount = parseFloat(data.amount) || parseFloat(data.donation_amount) || 0;
      console.log('Donation Charity reçue:', { message, amount, data }); // Debug
    } else {
      // Gestion normale pour tips/donations
      message = data.message || "";
      amount = parseFloat(data.amount) || 0;
      console.log('Donation normale reçue:', { message, amount, data }); // Debug
    }
    
    if (!amount || !raceActive) {
      console.log('Donation ignorée - montant:', amount, 'course active:', raceActive);
      return;
    }

    // Chercher le personnage mentionné dans le message
    for (let char of characters) {
      if (message.toLowerCase().includes(char.toLowerCase().replace(/_/g, ' ')) || 
          message.toLowerCase().includes(char.toLowerCase())) {
        addDonation(char, amount);
        break;
      }
    }
  }
});

// --- MODE DEBUG ---
// Active pour tester en local, désactive avant le live
const DEBUG = true;

// --- Initialisation au chargement de la page ---
document.addEventListener('DOMContentLoaded', function() {
  console.log("DOM Content Loaded - Initialisation..."); // Debug
  
  // Initialiser l'interface avec des personnages par défaut
  characters = ["Air_Groove", "Gold_Ship", "Special_Week"];
  console.log("Personnages initiaux:", characters); // Debug
  
  updateUI();
  
  if (DEBUG) {
    console.log("Mode DEBUG actif : simulation des commandes...");
    
    // Démarrer une course après 2 secondes
    setTimeout(() => {
      console.log("Tentative de démarrage de course...");
      startRace(200);
    }, 2000);

    // Simulation de donations
    setTimeout(() => {
      if (raceActive && characters.length > 0) {
        console.log(`Simulation: don 50€ pour ${characters[0]}`);
        addDonation(characters[0], 50);
      }
    }, 5000);

    setTimeout(() => {
      if (raceActive && characters.length > 1) {
        console.log(`Simulation: don 75€ pour ${characters[1]}`);
        addDonation(characters[1], 75);
      }
    }, 7000);

    setTimeout(() => {
      if (raceActive && characters.length > 2) {
        console.log(`Simulation: don 200€ pour ${characters[2]} (gagnant!)`);
        addDonation(characters[2], 200);
      }
    }, 9000);

    // Reset complet après 10 secondes (quand la course est finie)
    setTimeout(() => {
      console.log("DEBUG: Reset complet de la course...");
      resetRace();
      console.log("DEBUG: Tout a été remis à zéro");
    }, 15000);
  }
});

