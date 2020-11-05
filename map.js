import { mapData } from "./mapData.js";
let newMapData = [...mapData];
const map = document.getElementById("map");

render();

function render() {
  map.innerHTML = "";
  for (let column of newMapData) {
    let section = document.createElement("section");
    section.className = "column";
    for (let cellData of column.data) {
      // ignore the column ID for displaying the content of the column object
      let cell = document.createElement("figure");
      cell.classList.add("hex");
      if (cellData.category) cell.classList.add(cellData.category);
      cell.innerHTML =
        `<span class="coords">(${cellData.x},${cellData.y})</span>` +
        cellData.label;
      // cell.innerHTML = cellData.label; // without coordinates
      cell.addEventListener("click", (e) => {
        e.target.classList.toggle("edit");
        document.getElementById("cellID").value = cellData.x + "," + cellData.y;
        document.getElementById("label").value = cellData.label;
        document.getElementById("category").value = cellData.category;
        console.log(e.target);
      });
      section.append(cell);
    }
    map.append(section);
  }
}

document.querySelector("button#addLeft").addEventListener("click", addColLeft);

function addColLeft(e) {
  let firstColID = newMapData[0].col_ID;
  console.log(firstColID);
  // adding two columns so the hex-field structure isn't destroyed
  for (let i = 1; i < 3; i++) {
    let newCellData = [];
    for (let j = 0; j < newMapData[0].data.length; j++) {
      newCellData.push({
        x: firstColID - i,
        y: newMapData[0].data[j].y,
        label: "",
        category: "",
        notes: "",
      });
    }
    console.log();
    newMapData = [
      {
        col_ID: firstColID - i,
        data: newCellData,
      },
      ...newMapData,
    ];
  }
  console.log(newMapData);
  render();
}
