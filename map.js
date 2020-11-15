import { mapData as oldData } from "./mapData.js";
// for safety reasons: working with a copy
// old data would be (permanently) overwritten only after validation
let mapData = [...oldData];
const map = document.getElementById("map");

// RENDERING

render();

function render() {
  map.innerHTML = "";
  for (let column of mapData) {
    let section = document.createElement("section");
    section.className = "column";
    for (let cellData of column.data) {
      // ignore the column ID for displaying the content of the column object
      let cell = document.createElement("figure");
      cell.classList.add("hex");
      cell.setAttribute("data-x", cellData.x);
      cell.setAttribute("data-y", cellData.y);
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
        else document.getElementById("label").value = "";
        if (cellData.terrain)
          document.getElementById("terrain").value = cellData.terrain;
        else document.getElementById("terrain").value = "";
        if (cellData.notes)
          document.getElementById("notes").value = cellData.notes;
        else document.getElementById("notes").value = "";
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
  let firstColID = mapData[0].col_ID;
  // adding two columns so the hex-field structure isn't destroyed
  for (let i = 1; i < 3; i++) {
    let newCellData = [];
    for (let j = 0; j < mapData[0].data.length; j++) {
      newCellData.push({
        x: firstColID - i,
        y: mapData[0].data[j].y,
        label: "",
        terrain: "",
        notes: "",
      });
    }
    mapData = [
      {
        col_ID: firstColID - i,
        data: newCellData,
      },
      ...mapData,
    ];
  }
  render();
}

// ADDING TWO ROWS ON THE RIGHT

document
  .querySelector("button#addColRight")
  .addEventListener("click", addColRight);

function addColRight() {
  let lastColID = mapData[mapData.length - 1].col_ID;
  // adding two columns so the hex-field structure isn't destroyed
  for (let i = 1; i < 3; i++) {
    let newCellData = [];
    for (let j = 0; j < mapData[0].data.length; j++) {
      newCellData.push({
        x: lastColID + i,
        y: mapData[0].data[j].y,
        label: "",
        terrain: "",
        notes: "",
      });
    }
    mapData = [
      ...mapData,
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
  let firstRowCell = mapData[0].data[0];
  let nrOfColumns = mapData.length;
  for (let i = 0; i < nrOfColumns; i++) {
    let newCellData = {
      x: mapData[i].data[0].x,
      y: firstRowCell.y - 1,
      label: "",
      terrain: "",
      notes: "",
    };
    mapData[i] = {
      col_ID: mapData[i].col_ID,
      data: [newCellData, ...mapData[i].data],
    };
  }
  render();
}

// ADDING ROW AT THE BOTTOM

document
  .querySelector("button#addRowDown")
  .addEventListener("click", addRowDown);

function addRowDown() {
  let lastRowCell = mapData[0].data[mapData[0].data.length - 1];
  let nrOfColumns = mapData.length;
  for (let i = 0; i < nrOfColumns; i++) {
    let newCellData = {
      x: mapData[i].data[0].x,
      y: lastRowCell.y + 1,
      label: "",
      terrain: "",
      notes: "",
    };
    mapData[i] = {
      col_ID: mapData[i].col_ID,
      data: [...mapData[i].data, newCellData],
    };
  }
  render();
}

// ---------- INTERFACE ----------

// SHOW/HIDE COORDINATES

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
    "export const mapData = " + JSON.stringify(mapData) + ";";
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
      mapData = JSON.parse(importString);
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

// SAVE CELL DATA

const formEditCell = document.getElementById("formEditCell");
formEditCell.addEventListener("submit", (e) => {
  let formData = new FormData(formEditCell);
  let newCellData = {
    x: parseInt(formData.get("cellID").split(",")[0]),
    y: parseInt(formData.get("cellID").split(",")[1]),
    label: formData.get("label"),
    terrain: formData.get("terrain"),
    notes: formData.get("notes"),
  };
  let replaceColIndex = getMapColIndexForX(newCellData.x);
  let replaceCellIndex = getMapCellIndexForY(replaceColIndex, newCellData.y);
  mapData[replaceColIndex].data[replaceCellIndex] = newCellData;
  render();
  e.preventDefault();
});

function getMapColIndexForX(searchX) {
  let index;
  for (let i = 0; i < mapData.length; i++) {
    if (mapData[i].col_ID === searchX) index = i;
  }
  return index;
}
function getMapCellIndexForY(indexX, searchY) {
  let index;
  for (let j = 0; j < mapData[indexX].data.length; j++) {
    if (mapData[parseInt(indexX)].data[j].y === searchY) index = j;
  }
  return index;
}
function getColAndCellIndexForXY(x, y) {
  let colIndex = getMapColIndexForX(parseInt(x));
  let cellIndex = getMapCellIndexForY(colIndex, parseInt(y));
  return { col: colIndex, cell: cellIndex };
}

// NOTES OVERLAY

document.addEventListener("mousemove", (e) => {
  const notesOverlay = document.getElementById("notesOverlay");
  let overlayOffsetX = 16;
  let overlayOffsetY = 16;
  if (
    e.target.classList.contains("hex") ||
    e.target.classList.contains("coords") ||
    e.target.tagName == "EM"
  ) {
    notesOverlay.style.display = "block";
    notesOverlay.style.top = e.clientY + overlayOffsetY + "px";
    notesOverlay.style.left = e.clientX + overlayOffsetX + "px";
  } else {
    notesOverlay.style.display = "none";
  }
  let x;
  let y;
  if (e.target.classList.contains("hex")) {
    x = e.target.getAttribute("data-x");
    y = e.target.getAttribute("data-y");
  } else if (
    e.target.classList.contains("coords") ||
    e.target.tagName == "EM"
  ) {
    x = e.target.parentElement.getAttribute("data-x");
    y = e.target.parentElement.getAttribute("data-y");
  }
  if (x && y) {
    let coords = getColAndCellIndexForXY(x, y);
    if (mapData[coords.col].data[coords.cell].notes) {
      let title = document.createElement("h3");
      title.innerHTML = mapData[coords.col].data[coords.cell].label
        .replace("<br/>", "")
        .replace("<br>", "");
      notesOverlay.innerText = mapData[coords.col].data[coords.cell].notes;
      notesOverlay.prepend(title);
    } else notesOverlay.style.display = "none";
  }
});
