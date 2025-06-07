const choices = document.querySelectorAll("[data-choice]");
const statusText = document.querySelector(".status");
const scoreText = document.querySelector(".score");
const restartBtn = document.querySelector(".restart");

let playerScore = 0;
let aiScore = 0;
let rounds = 0;

const options = ["rock", "paper", "scissors"];

function getComputerChoice() {
  return options[Math.floor(Math.random() * options.length)];
}

function playRound(player, computer) {
  if (player === computer) return "It's a draw!";
  if (
    (player === "rock" && computer === "scissors") ||
    (player === "paper" && computer === "rock") ||
    (player === "scissors" && computer === "paper")
  ) {
    playerScore++;
    return `You Win! ${player} beats ${computer}`;
  } else {
    aiScore++;
    return `You Lose! ${computer} beats ${player}`;
  }
}

function updateUI(message) {
  statusText.textContent = message;
  scoreText.textContent = `You ${playerScore} - ${aiScore} AI`;

  if (rounds >= 5) {
    const final =
      playerScore > aiScore ? "🎉 You won the game!" :
      playerScore < aiScore ? "😢 You lost the game!" :
      "🤝 It's a draw!";
    statusText.textContent = final;
    restartBtn.style.display = "inline-block";
    choices.forEach(btn => btn.disabled = true);
  }
}

choices.forEach(button => {
  button.addEventListener("click", () => {
    if (rounds >= 5) return;

    const playerChoice = button.dataset.choice;
    const aiChoice = getComputerChoice();
    const result = playRound(playerChoice, aiChoice);

    rounds++;
    updateUI(result);
  });
});

restartBtn.addEventListener("click", () => {
  playerScore = 0;
  aiScore = 0;
  rounds = 0;
  updateUI("Make your move!");
  restartBtn.style.display = "none";
  choices.forEach(btn => btn.disabled = false);
});
