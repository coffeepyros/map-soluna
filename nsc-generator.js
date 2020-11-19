const abilities = ["str", "dex", "con", "int", "wis", "cha"];
for (let stat of abilities) {
  document
    .getElementById(stat)
    .addEventListener("change", (e) => changeAbility(e, stat));
}
function changeAbility(e, stat) {
  let ability = e.target.value;
  let bonus = Math.floor((ability - 10) / 2);
  let output = ability + " (";
  if (bonus >= 0) output += "+";
  output += bonus + ")";
  document.querySelector("td." + stat).innerText = output;
  changeHP(e);
}
const baseHP = {
  barbarian: 12,
  bard: 8,
  cleric: 8,
  druid: 8,
  fighter: 10,
  monk: 8,
  paladin: 10,
  ranger: 10,
  rogue: 8,
  sorcerer: 6,
  warlock: 8,
  wizard: 6,
};
document.getElementById("class").addEventListener("change", changeHP);
document.getElementById("level").addEventListener("change", changeHP);

let hp,
  level = 1,
  finalHP;
function changeHP(e) {
  if (e.target.id == "class") {
    hp = baseHP[e.target.value.toLowerCase()];
    document.querySelector("span.class").innerText = e.target.value;
  } else if (e.target.id == "level") {
    level = e.target.value;
    document.querySelector("span.level").innerText = level;
  }
  let con = document.getElementById("con").value;
  finalHP = level * (hp + Math.floor((con - 10) / 2));
  document.querySelector("span.hp").innerText = finalHP;
}
