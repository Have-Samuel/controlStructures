const ATTACK_VALUE = 10;
const STRONG_MONSTER_ATTACK = 17;
const ATTACK_MONSTER_VALUE = 14;
const HEAL_VALUE = 20;

let maxChoosenLife = 100;
let currentMonsterHealth = maxChoosenLife;
let currentPlayerHealth = maxChoosenLife;

adjustHealthBars(maxChoosenLife) // Adjust maxLife both Monster and player

function endRound() {
  const playerDamge = dealPlayerDamage(ATTACK_MONSTER_VALUE);
  currentPlayerHealth -= playerDamge;
  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    // Checking if Monster life in <= 0
    alert('You Won!');
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert('You Lost!');
  } else if (currentMonsterHealth < 0 && currentPlayerHealth < 0) {
    alert('You have a draw!');
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
  roundUp();
}

function attackHandler() { // Attack Function
  monsterAttack('ATTACK');
}

function strongMonsterHandler() {
  monsterAttack('STRONG_ATTACK');
}

function healPlayerHandler() {
  increasePlayerHealth(HEAL_VALUE);
  endRound();
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongMonsterHandler);
healBtn.addEventListener('click', healPlayerHandler);