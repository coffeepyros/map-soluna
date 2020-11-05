// TODO: put this into an external js file!

let mapData = [
    { 
        "col_ID": -4,
        "data": [
            { x: -4, y: -3, label: "", category: "", notes: ""},
            { x: -4, y: -2, label: "Sumpf (Untote)", category: "swamp", notes: ""},
            { x: -4, y: -1, label: "Zentauren-<br/>Paar", category: "steppe"},
            { x: -4, y: 0, label: "Wasserfall", category: "steppe"},
            { x: -4, y: 1, label: "", category: ""},
            { x: -4, y: 2, label: "", category: ""},
            { x: -4, y: 3, label: "", category: "", notes:""},
        ]
    },
    { 
        "col_ID": -3,
        "data": [
            { x: -3, y: -3, label: "Steinwald (Geister), Riss", category: "forest", notes: ""},
            { x: -3, y: -2, label: "Sova (Insel)", category: "steppe", notes: ""},
            { x: -3, y: -1, label: "", category: ""},
            { x: -3, y: 0, label: "Arena", category: "steppe"},
            { x: -3, y: 1, label: "", category: ""},
            { x: -3, y: 2, label: "", category: ""},
            { x: -3, y: 3, label: "Tränensee", category: "water", notes:""},
        ]
    },
    { 
        "col_ID": -2,
        "data": [
            { x: -2, y: -3, label: "", category: "", notes: ""},
            { x: -2, y: -2, label: "", category: "", notes: ""},
            { x: -2, y: -1, label: "", category: "", notes: ""},
            { x: -2, y: 0, label: "", category: "", notes: ""},
            { x: -2, y: 1, label: "", category: "hills", notes: ""},
            { x: -2, y: 2, label: "", category: "forest", notes:""},
            { x: -2, y: 3, label: "Pira", category: "mountains", notes: ""},
        ]
    },
    { 
        "col_ID": -1,
        "data": [
            { x: -1, y: -3, label: "", category: "", notes: ""},
            { x: -1, y: -2, label: "", category: "", notes: ""},
            { x: -1, y: -1, label: "", category: ""},
            { x: -1, y: 0, label: "", category: "steppe"},
            { x: -1, y: 1, label: "Torfabbau, Frostmoor", category: "grass"},
            { x: -1, y: 2, label: "Phandalin", category: "forest"},
            { x: -1, y: 3, label: "", category: "", notes:""},
        ]
    },
    {
        "col_ID": 0,
        "data": [
            { x: 0, y: -3, label: "", category: "", notes: ""},
            { x: 0, y: -2, label: "", category: "", notes: ""},
            { x: 0, y: -1, label: "", category: ""},
            { x: 0, y: 0, label: "Mythea, Weizenfelder", category: "city", notes: ""},
            { x: 0, y: 1, label: "Köhler, Sägemühle", category: "grass"},
            { x: 0, y: 2, label: "Frostwald", category: "forest"},
            { x: 0, y: 3, label: "", category: "", notes:""},
        ]
    },
    {
        "col_ID": 1,
        "data": [
            { x: 1, y: -3, label: "", category: "", notes: ""},
            { x: 1, y: -2, label: "", category: "", notes: ""},
            { x: 1, y: -1, label: "", category: ""},
            { x: 1, y: 0, label: "Obst- und Olivenhaine", category: "grass"},
            { x: 1, y: 1, label: "Holzfäller-<br/>Lager, Riss", category: "forest"},
            { x: 1, y: 2, label: "", category: ""},
            { x: 1, y: 3, label: "", category: "", notes:""},
        ]
    },
    {
        "col_ID": 2,
        "data": [
            { x: 2, y: -3, label: "", category: "", notes: ""},
            { x: 2, y: -2, label: "", category: "", notes: ""},
            { x: 2, y: -1, label: "", category: ""},
            { x: 2, y: 0, label: "", category: ""},
            { x: 2, y: 1, label: "", category: ""},
            { x: 2, y: 2, label: "", category: ""},
            { x: 2, y: 3, label: "", category: "", notes:""},
        ]
    },
    {
        "col_ID": 3,
        "data": [
            { x: 3, y: -3, label: "", category: "", notes: ""},
            { x: 3, y: -2, label: "", category: "", notes: ""},
            { x: 3, y: -1, label: "", category: ""},
            { x: 3, y: 0, label: "", category: ""},
            { x: 3, y: 1, label: "", category: ""},
            { x: 3, y: 2, label: "", category: ""},
            { x: 3, y: 3, label: "", category: "", notes:""},
        ]
    },
    {
        "col_ID": 4,
        "data": [
            { x: 4, y: -3, label: "", category: "", notes: ""},
            { x: 4, y: -2, label: "", category: "", notes: ""},
            { x: 4, y: -1, label: "", category: ""},
            { x: 4, y: 0, label: "", category: ""},
            { x: 4, y: 1, label: "", category: ""},
            { x: 4, y: 2, label: "", category: ""},
            { x: 4, y: 3, label: "", category: "", notes:""},
        ]
    },
    {
        "col_ID": 5,
        "data": [
            { x: 5, y: -3, label: "Argos", category: "capitol", notes: ""},
            { x: 5, y: -2, label: "", category: "", notes: ""},
            { x: 5, y: -1, label: "", category: ""},
            { x: 5, y: 0, label: "", category: ""},
            { x: 5, y: 1, label: "", category: ""},
            { x: 5, y: 2, label: "", category: ""},
            { x: 5, y: 3, label: "", category: "", notes:""},
        ]
    },
    {
        "col_ID": 6,
        "data": [
            { x: 6, y: -3, label: "", category: "", notes: ""},
            { x: 6, y: -2, label: "", category: "", notes: ""},
            { x: 6, y: -1, label: "", category: ""},
            { x: 6, y: 0, label: "", category: ""},
            { x: 6, y: 1, label: "", category: ""},
            { x: 6, y: 2, label: "", category: ""},
            { x: 6, y: 3, label: "", category: "", notes:""},
        ]
    },
];

let map = document.getElementById("map");

for (let column of mapData) {
    let output = document.getElementById("dev");
    let section = document.createElement("section");
    section.className = "column";
    for (let cellData of column.data) {
    // ignore the column ID for displaying the content of the column object
        let cell = document.createElement("figure");
        cell.classList.add("hex");
        if (cellData.category) cell.classList.add(cellData.category);
        cell.innerHTML = `<span class="coords">(${cellData.x},${cellData.y})</span>` + cellData.label;
        // cell.innerHTML = cellData.label; // without coordinates
        cell.addEventListener("click",(e)=> {
            e.target.classList.toggle("edit");
            document.getElementById("cellID").value = cellData.x + "," + cellData.y;
            document.getElementById("label").value = cellData.label;
            document.getElementById("category").value = cellData.category;
            console.log(e.target);
        })
        section.append(cell);
    }
    map.append(section);
}

function createCell(container,content) {
    let cell = document.createElement("figure");
    cell.classList.add("hex","add");
        cell.innerHTML = content;
    cell.addEventListener("click",(e)=> {
        e.target.classList.toggle("edit");
        console.log(e.target);
    })
    container.append(cell);
}

// ADDING MAP CELLS

document.getElementById("addLeft").addEventListener("click", (e) => {
    console.log("HELLO!");
    for (let column of mapData) {
        console.log(JSON.stringify(column.col_ID));
    }
});