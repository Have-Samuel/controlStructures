const ATTACK_VALUE = 10;
const STRONG_MONSTER_ATTACK = 17;
const ATTACK_MONSTER_VALUE = 14;
const HEAL_VALUE = 20;

let maxChoosenLife = 100;
let currentMonsterHealth = maxChoosenLife;
let currentPlayerHealth = maxChoosenLife;
let hasBonusLife = true;

adjustHealthBars(maxChoosenLife) // Adjust maxLife both Monster and player

function reset() {
  currentMonsterHealth = maxChoosenLife;
  currentPlayerHealth = maxChoosenLife;
  resetGame();
}

function endRound() {
  const initialPlayerHealth = currentPlayerHealth;
  const playerDamge = dealPlayerDamage(ATTACK_MONSTER_VALUE);
  currentPlayerHealth -= playerDamge;

  if (currentPlayerHealth <= 0 && hasBonusLife) { // Remove bonusLife n setPlayerHealth
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealth = initialPlayerHealth;
    setPlayerHealth(initialPlayerHealth);
    alert('You were to die but the bonus life saved you!');
  }

  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    // Checking if Monster life in <= 0
    alert('You Won!');
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert('You Lost!');
  } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
    alert('You have a draw!');
  }

  if (
    currentMonsterHealth <= 0 && currentPlayerHealth > 0 ||
    currentPlayerHealth <= 0 && currentMonsterHealth > 0 ||
    currentMonsterHealth <= 0 && currentPlayerHealth <= 0
  ) {
    reset();
  }
}

function monsterAttack(mode) {
  let maxDamage;
  if (mode === 'ATTACK') {
    maxDamage = ATTACK_VALUE;
  } else if (mode === 'STRONG_ATTACK') {
    maxDamage = STRONG_MONSTER_ATTACK;
  }
  const damage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= damage;
  endRound();
}

function attackHandler() { // Attack Function
  monsterAttack('ATTACK');
}

function strongMonsterHandler() {
  monsterAttack('STRONG_ATTACK');
}

function healPlayerHandler() {
  let healValue;
  if (currentPlayerHealth >= maxChoosenLife - HEAL_VALUE) { // To update PlayerHealth
    alrert("You can't heal more than your max initial health.");
    healValue = maxChoosenLife - currentPlayerHealth;
  } else {
    healValue = HEAL_VALUE;
  }
  increasePlayerHealth(healValue);
  currentPlayerHealth += healValue; 
  endRound();
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongMonsterHandler);
healBtn.addEventListener('click', healPlayerHandler);