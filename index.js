// table
let rowsNum = 20 , colsNum = 60;
let grid = document.createElement('table');
const tablebody = document.createElement('tbody');
grid.appendChild(tablebody);
for (let i = 0 ; i<rowsNum ; i++) {
    let row = document.createElement('tr');
    for (let j = 0 ; j<colsNum ; j++) {
        let cell = document.createElement('td');
        cell.classList.add("dead");
        cell.onclick = () => {
            if (cell.classList.contains("alive")) {
                cell.classList.remove("alive");
                cell.classList.add("dead");
            }
            else {
                cell.classList.remove("dead");
                cell.classList.add("alive");
            }
        };
        row.appendChild(cell);
    }
    grid.appendChild(row);
}
document.body.appendChild(grid);


// buttons
let barMaxSpeed = 1000 , barMinSpeed = 0 , barAvgValue = 500;
const buttonsdiv = document.createElement("div");
const startbutton = document.createElement("button");
startbutton.innerHTML = "start";
const stopbutton = document.createElement("button");
stopbutton.innerHTML = "stop";
const resetbutton = document.createElement("button");
resetbutton.innerHTML = "reset";
const slidebar = document.createElement("input");
slidebar.labels
slidebar.type = "range";
slidebar.min = barMinSpeed;
slidebar.max = barMaxSpeed;
slidebar.value = barAvgValue;
buttonsdiv.appendChild(startbutton);
buttonsdiv.appendChild(stopbutton);
buttonsdiv.appendChild(resetbutton);
buttonsdiv.appendChild(slidebar);
document.body.appendChild(buttonsdiv);


let isworking = -1;
startbutton.onclick = () => {
    let aliveNeighboursNum = document.getElementsByClassName("alive").length;
    if (isworking != -1 || aliveNeighboursNum<=0) return;
    let speed = barMaxSpeed - slidebar.value;
    isworking = setInterval(change , speed);
};

stopbutton.onclick = () => {
    if (isworking != -1) {
        clearInterval(isworking);
        isworking = -1;
    }
};

slidebar.addEventListener("change" , () => {
    if (isworking != -1) {
        let speed = barMaxSpeed - slidebar.value;
        clearInterval(isworking);
        isworking = setInterval(change , speed);
    }
});

resetbutton.onclick = () => {
    if (isworking == -1) {
        let aaliveNeighbours = document.getElementsByClassName("alive");
        for (let i = 0 ; i<aaliveNeighbours.length ; i++) {
            aaliveNeighbours[i].classList.add("dead");
        }
        for (let i = 0 ; i<aaliveNeighbours.length ; i++) {
            aaliveNeighbours[i].classList.remove("alive");
        }
    }
}

function change() {
    let cellschanged = [];
    let arrofRows = grid.children;
    for (let rowIndx = 1 ; rowIndx < arrofRows.length; rowIndx++) {
        let curRow = arrofRows[rowIndx].children;
        let rowBefore = [];
        let rowAfter = [];

        // checking for valid rows
        if (rowIndx - 1 >= 1) rowBefore = arrofRows[rowIndx - 1].children;
        if (rowIndx + 1 < arrofRows.length) rowAfter = arrofRows[rowIndx + 1].children;
        
        for (let cell = 0 ; cell < curRow.length ; cell++) {
            let validNeibours = [];
            
            // checking for valid validNeibours
            if (rowBefore.length>0) validNeibours.push(rowBefore[cell]);
            if (rowAfter.length>0) validNeibours.push(rowAfter[cell]);
            if (cell - 1 >= 0) {
                validNeibours.push(curRow[cell - 1]);
                if (rowBefore.length>0) validNeibours.push(rowBefore[cell - 1]);
                if (rowAfter.length>0) validNeibours.push(rowAfter[cell - 1]);
            }
            if (cell + 1 < curRow.length) {
                validNeibours.push(curRow[cell + 1]);
                if (rowBefore.length>0) validNeibours.push(rowBefore[cell + 1]);
                if (rowAfter.length>0) validNeibours.push(rowAfter[cell + 1]);
            }

            // counting alive neighbours
            let aliveNeighboursNum = 0;
            for (let neighbour = 0 ; neighbour < validNeibours.length ; neighbour++) {
                if (validNeibours[neighbour].classList.contains("alive")) aliveNeighboursNum++;
            }

            // pushing cells that need to be changed in cellschanged array
            if (curRow[cell].classList.contains("alive")) {
                if (aliveNeighboursNum < 2 || aliveNeighboursNum > 3) {
                    cellschanged.push(curRow[cell]);
                }
            }
            else {
                if (aliveNeighboursNum == 3) {
                    cellschanged.push(curRow[cell]);
                }
            }
        }
    }

    // actualy changing required cells
    for (let i = 0 ; i < cellschanged.length ; i++) {
        if (cellschanged[i].classList.contains("alive")) {
            cellschanged[i].classList.remove("alive");
            cellschanged[i].classList.add("dead");
        }
        else {
            cellschanged[i].classList.remove("dead");
            cellschanged[i].classList.add("alive");
        }
    }
}

