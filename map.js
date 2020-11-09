import { mapData } from "./mapData.js";
// for safety reasons: working with a copy
// old data would be (permanently) overwritten only after validation
let newMapData = [...mapData];
const map = document.getElementById("map");

// RENDERING

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
      if (cellData.terrain) cell.classList.add(cellData.terrain);
      cell.innerHTML =
        `<span class="coords">(${cellData.x},${cellData.y})</span>` +
        cellData.label;
      // cell.innerHTML = cellData.label; // without coordinates
      cell.addEventListener("click", (e) => {
        if (e.target.classList.contains("hex"))
          e.target.classList.toggle("edit");
        else e.target.parentElement.classList.toggle("edit");
        document.getElementById("cellID").value = cellData.x + "," + cellData.y;
        if (cellData.label)
          document.getElementById("label").value = cellData.label;
        if (cellData.terrain)
          document.getElementById("terrain").value = cellData.terrain;
      });
      section.append(cell);
    }
    map.append(section);
  }
}

// ---------- ADDING CELLS ----------

// ADDING TWO ROWS ON THE LEFT

document
  .querySelector("button#addColLeft")
  .addEventListener("click", addColLeft);

function addColLeft() {
  let firstColID = newMapData[0].col_ID;
  // adding two columns so the hex-field structure isn't destroyed
  for (let i = 1; i < 3; i++) {
    let newCellData = [];
    for (let j = 0; j < newMapData[0].data.length; j++) {
      newCellData.push({
        x: firstColID - i,
        y: newMapData[0].data[j].y,
        label: "",
        terrain: "",
        notes: "",
      });
    }
    newMapData = [
      {
        col_ID: firstColID - i,
        data: newCellData,
      },
      ...newMapData,
    ];
  }
  render();
}

// ADDING TWO ROWS ON THE RIGHT

document
  .querySelector("button#addColRight")
  .addEventListener("click", addColRight);

function addColRight() {
  let lastColID = newMapData[newMapData.length - 1].col_ID;
  // adding two columns so the hex-field structure isn't destroyed
  for (let i = 1; i < 3; i++) {
    let newCellData = [];
    for (let j = 0; j < newMapData[0].data.length; j++) {
      newCellData.push({
        x: lastColID + i,
        y: newMapData[0].data[j].y,
        label: "",
        terrain: "",
        notes: "",
      });
    }
    newMapData = [
      ...newMapData,
      {
        col_ID: lastColID + i,
        data: newCellData,
      },
    ];
  }
  render();
}

// ADDING ROW AT THE TOP

document.querySelector("button#addRowUp").addEventListener("click", addRowUp);

function addRowUp() {
  let firstRowCell = newMapData[0].data[0];
  let nrOfColumns = newMapData.length;
  for (let i = 0; i < nrOfColumns; i++) {
    let newCellData = {
      x: newMapData[i].data[0].x,
      y: firstRowCell.y - 1,
      label: "",
      terrain: "",
      notes: "",
    };
    newMapData[i] = {
      col_ID: newMapData[i].col_ID,
      data: [newCellData, ...newMapData[i].data],
    };
  }
  render();
}

// ADDING ROW AT THE BOTTOM

document
  .querySelector("button#addRowDown")
  .addEventListener("click", addRowDown);

function addRowDown() {
  let lastRowCell = newMapData[0].data[newMapData[0].data.length - 1];
  let nrOfColumns = newMapData.length;
  for (let i = 0; i < nrOfColumns; i++) {
    let newCellData = {
      x: newMapData[i].data[0].x,
      y: lastRowCell.y + 1,
      label: "",
      terrain: "",
      notes: "",
    };
    newMapData[i] = {
      col_ID: newMapData[i].col_ID,
      data: [...newMapData[i].data, newCellData],
    };
  }
  render();
}

// INTERFACE

const hideCoordsButton = document.querySelector("button#hideCoords");
hideCoordsButton.addEventListener("click", hideCoords);

function hideCoords(e) {
  e.preventDefault();
  let coords = document.querySelectorAll(".coords");
  for (let span of coords) {
    span.classList.toggle("hidden");
    if (hideCoordsButton.innerText === "Hide Coordinates")
      hideCoordsButton.innerText = "Show Coordinates";
    else if (hideCoordsButton.innerText === "Show Coordinates")
      hideCoordsButton.innerText = "Hide Coordinates";
  }
}

// IMPORT/EXPORT MAP -- SETUP

const overlay = document.getElementById("overlay");
const overlayOutput = document.querySelector("#overlay textarea");

// EXPORT MAP

document.getElementById("btnExport").addEventListener("click", (e) => {
  e.preventDefault();
  overlayOutput.value =
    "export const mapData = " + JSON.stringify(newMapData) + ";";
  const overlayImportBtn = document.getElementById("overlayImportBtn");
  if (overlayImportBtn) overlayImportBtn.classList.add("hidden");
  overlay.classList.toggle("hidden");
});

// IMPORT MAP

document.getElementById("btnImport").addEventListener("click", (e) => {
  e.preventDefault();

  overlayOutput.value = "";
  overlay.classList.toggle("hidden");
  const overlayImportBtn = document.getElementById("overlayImportBtn");
  if (overlayImportBtn) overlayImportBtn.classList.remove("hidden");
  else {
    let overlayImportBtn = document.createElement("button");
    overlayImportBtn.id = "overlayImportBtn";
    overlayImportBtn.innerText = "Import";
    overlayImportBtn.addEventListener("click", (e) => {
      let importString = overlayOutput.value;
      // removing leading JavaScript
      importString = importString.replace("export const mapData =", "");
      // removing last character (;)
      if (importString[importString.length - 1] === ";")
        importString = importString.substr(0, importString.length - 1);
      overlayOutput.value = importString;
      newMapData = JSON.parse(importString);
      render();
      overlay.classList.toggle("hidden");
    });
    overlay.append(overlayImportBtn);
  }
});

// CLOSE LINK FOR OVERLAY

document.querySelector("#overlay a").addEventListener("click", (e) => {
  overlay.classList.toggle("hidden");
});
