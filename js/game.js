
var memoryItems = [ 'PR I', 'PR I', 'PR II', 'PR II', 'PR III', 'PR III', 'ADS', 'ADS',
                     'RS I', 'RS I', 'RS II', 'RS II', 'WRD', 'WRD', 'BP I', 'BP I', 
                     'BP II', 'BP II', 'SMA', 'SMA', 'AR', 'AR', 'OS', 'OS', 'BI', 'BI', 
                     'ASP', 'ASP', 'EJ I', 'EJ I' ];
var selectedItemValue = null;
var selectedItemID = null;
var flippedTiles = 0;
var flipped = 0;

Array.prototype.randomizeTiles = function () {
    let i = 0;
    while (i != this.length) {
        let randomNumber = Math.floor(Math.random() * this.length);
        let temp = this[randomNumber];
        this[randomNumber] = this[i];
        this[i] = temp;
        i++;
    }
};


const flipTile = e => {
    var div = e.target;
    if (!(div.innerHTML == "" || div.innerHTML == null) && flipped < 2) {
        div.innerHTML = memoryItems[Math.floor(div.id)];
        div.classList.add("clicked");
        if (flipped == 0) {
            flipped++;
            selectedItemID = div.id;
            selectedItemValue = memoryItems[Math.floor(div.id)];
        } else if (flipped == 1) {
            flipped++;
            if (selectedItemValue == memoryItems[Math.floor(div.id)]) {
                flippedTiles += 2;
                flipped = 0;
                if (flippedTiles == memoryItems.length) {
                    alert("Congratulations...");
                    generateBoard();
                }
            } else {

                setTimeout( () => {
                    flipped = 0;
                    console.log(selectedItemID)
                    console.log(div);
                    let previousDiv = document.getElementById(selectedItemID);
                    previousDiv.classList.remove("clicked");
                    previousDiv.innerHTML = "";
                    div.classList.remove("clicked");
                    div.innerHTML = "";
                }, 800);
            }
        }
    }
};
const generateBoard = () => {
    console.log("Generating board...");
    flipped = 0;
    memoryItems.randomizeTiles();
    let board = document.getElementById("board");
    board.innerHTML = "";
    for (let i = 0; i < memoryItems.length; i++) {
        board.innerHTML += "<div id=\"" + i + "\"></div>";
    }
    let btns = board.getElementsByTagName("div");
    for (let i = 0; i < btns.length; i++) {
        btns[i].onclick = flipTile;
    }
};

generateBoard();
