const ATTACK_VALUE = 10;

let maxChoosenLife = 100;
let currentMonsterHealth = maxChoosenLife;
let currentPlayerHealth = maxChoosenLife;

adjustHealthBars(maxChoosenLife) // Adjust maxLife both Monster and player

function attackHandler() { // Attack Function
  const damage = dealMonsterDamage(ATTACK_VALUE);
  currentMonsterHealth -= damage;
}

attackBtn.addEventListener('click', attackHandler);