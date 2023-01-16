const ATTACK_VALUE = 10;
const STRONG_MONSTER_ATTACK = 17;
const ATTACK_MONSTER_VALUE = 14;
const HEAL_VALUE = 20;

const MODE_ATTACK = 'ATTACK';
const MODE_STRONG_ATTACK = 'STRONG_ATTACK';
const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_STRONG_PLAYER_ATTACK = 'STRONG_PLAYER_ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_GAME_OVER = 'GAME_OVER';

const enteredValue = prompt('Maximum life for you and the monster.', '100');

let maxChoosenLife = parseInt(enteredValue);
let battleToLog = [];

if (isNaN(enteredValue) || enteredValue < 0) {
  maxChoosenLife = 100;
}

let currentMonsterHealth = maxChoosenLife;
let currentPlayerHealth = maxChoosenLife;
let hasBonusLife = true;

adjustHealthBars(maxChoosenLife) // Adjust maxLife both Monster and player

function writeToLog(ev, val, monsterHealth, playerHealth) {
  let logEntry = {
    event: ev,
    value: val,
    finalMonsterHealth: monsterHealth,
    finalPlayerHealth: playerHealth,
  };
  if ((ev === LOG_EVENT_PLAYER_ATTACK)) {
    logEntry.target = 'MONSTER';
  } else if (ev === LOG_EVENT_STRONG_PLAYER_ATTACK) {
    logEntry = {
      event: ev,
      value: val,
      target: 'MONSTER',
      finalMonsterHealth: monsterHealth,
      finalPlayerHealth: playerHealth,
    };
  } else if (ev === LOG_EVENT_MONSTER_ATTACK) {
    logEntry = {
      event: ev,
      value: val,
      target: 'PLAYER',
      finalMonsterHealth: monsterHealth,
      finalPlayerHealth: playerHealth,
    };
  } else if (ev === LOG_EVENT_PLAYER_HEAL) {
    logEntry = {
      event: ev,
      value: val,
      target: 'PLAYER',
      finalMonsterHealth: monsterHealth,
      finalPlayerHealth: playerHealth,
    };
  } else if (ev === LOG_EVENT_GAME_OVER) {
    logEntry = {
      event: ev,
      value: val,
      finalMonsterHealth: monsterHealth,
      finalPlayerHealth: playerHealth,
    };
  }
  battleToLog.push(logEntry);
}

function reset() {
  currentMonsterHealth = maxChoosenLife;
  currentPlayerHealth = maxChoosenLife;
  resetGame(maxChoosenLife);
}

function endRound() {
  const initialPlayerHealth = currentPlayerHealth;
  const playerDamge = dealPlayerDamage(ATTACK_MONSTER_VALUE);
  currentPlayerHealth -= playerDamge;
  writeToLog(
    LOG_EVENT_MONSTER_ATTACK,
    playerDamge,
    currentMonsterHealth,
    currentPlayerHealth
  );

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
    writeToLog(
      LOG_EVENT_PLAYER_ATTACK,
      'PLAYER_ATTACK',
      currentMonsterHealth,
      currentPlayerHealth
    );
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert('You Lost!');
    writeToLog(
      LOG_EVENT_MONSTER_ATTACK,
      'MONSTER_ATTACK',
      currentMonsterHealth,
      currentPlayerHealth
    );
  } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
    alert('You have a draw!');
    writeToLog(
      LOG_EVENT_GAME_OVER,
      'A DRAW',
      currentMonsterHealth,
      currentPlayerHealth
    );
  }

  if (
    currentMonsterHealth <= 0 || currentPlayerHealth <= 0
  ) {
    reset();
  }
}

function monsterAttack(mode) {
  let logEvent;
  let maxDamage;
  if (mode === MODE_ATTACK) {
    maxDamage = ATTACK_VALUE;
    logEvent = LOG_EVENT_PLAYER_ATTACK
  } else if (mode === MODE_STRONG_ATTACK) {
    maxDamage = STRONG_MONSTER_ATTACK;
    logEvent =LOG_EVENT_STRONG_PLAYER_ATTACK
  }
  const damage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= damage;
  writeToLog(
    logEvent,
    damage,
    currentMonsterHealth,
    currentPlayerHealth
  );
  endRound();
}

function attackHandler() { // Attack Function
  monsterAttack(MODE_ATTACK);
}

function strongMonsterHandler() {
  monsterAttack(MODE_STRONG_ATTACK);
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
  writeToLog(
    LOG_EVENT_PLAYER_HEAL,
    healValue,
    currentMonsterHealth,
    currentPlayerHealth
  );
  endRound();
}

function logToWriteHandler() {
  console.log(battleToLog);
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongMonsterHandler);
healBtn.addEventListener('click', healPlayerHandler);
logBtn.addEventListener('click', logToWriteHandler)