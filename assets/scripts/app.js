const ATTACK_VALUE = 10;
const ATTACK_MONSTER_VALUE = 14;

let maxChoosenLife = 100;
let currentMonsterHealth = maxChoosenLife;
let currentPlayerHealth = maxChoosenLife;

adjustHealthBars(maxChoosenLife) // Adjust maxLife both Monster and player

function attackHandler() { // Attack Function
  const damage = dealMonsterDamage(ATTACK_VALUE);
  currentMonsterHealth -= damage;
  const playerDamge = dealPlayerDamage(ATTACK_MONSTER_VALUE);
  currentPlayerHealth -= playerDamge;
  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) { // Checking if Monster life in <= 0
    alert('You Won!');
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert('You Lost!');
  } else if (currentMonsterHealth < 0 && currentPlayerHealth < 0) {
    alert('You have a draw!');
  }
}

attackBtn.addEventListener('click', attackHandler);