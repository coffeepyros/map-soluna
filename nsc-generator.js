let nscData = {};

function render() {
  document.querySelector("#statblock .name").innerText = nscData.name;
  document.querySelector("#statblock .bloodline").innerText = nscData.bloodline;
}

function handleChange(e) {
  nscData = { ...nscData, [e.target.id]: e.target.value };
  render();
}

const inputArray = ["name", "bloodline"];

inputArray.map((id) =>
  document.getElementById(id).addEventListener("keyup", handleChange)
);

// CLASS CHANGE

function handleClassChange(e) {
  let nscClass,
    nscLevel = parseInt(document.getElementById("level").value);
  if (e.target.id === "class") {
    nscClass = e.target.value;
  } else if (e.target.id === "level") {
    nscLevel = e.target.value;
  }

  if (nscClass != "NSC" && nscClass != "Monster") {
    // CLASS RELATED SAVING THROWS
    let url;
    url = "https://www.dnd5eapi.co/api/classes/" + e.target.value.toLowerCase();
    axios({
      method: "GET",
      url: url,
    })
      .then((apiRes) => {
        //  console.log(apiRes.data);
        let output = [];
        apiRes.data.saving_throws.map((st) => output.push(st.name));
        document.getElementById("saving_throws").innerHTML =
          "<strong>Saving Throws:</strong> " + output.join(", ");
      })
      .catch((err) => console.error(err.message));

    // CLASS RELATED FEATURES
    url =
      "https://www.dnd5eapi.co/api/classes/" +
      e.target.value.toLowerCase() +
      "/levels";
    axios({
      method: "GET",
      url: url,
    })
      .then((apiRes) => {
        // console.log(apiRes.data);
        let output = "";
        let features = apiRes.data.filter((feat) => feat.level <= nscLevel);
        // for each level
        features.map((featureArray) => {
          output += `<p><strong>Level ${featureArray.level}:</strong> `;
          let temp = [];
          featureArray.features.map((featureByLevels) => {
            temp.push(featureByLevels.name);
          });
          output += `${temp.join(", ")}</p>`;
        });
        console.log(features);
        document.getElementById("class_levels").innerHTML = output;
      })
      .catch((err) => console.error(err.message));
  }
}

document.getElementById("class").addEventListener("change", handleClassChange);

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
