let boxes = document.querySelectorAll(".box");
let turn = "X";
let isGameover = false;

boxes.forEach(e => {
    e.innerHTML = "";
    e.addEventListener("click", () => {
        if (!isGameover && e.innerHTML === "") {
            e.innerHTML = turn;
            checkWin();
            checkDraw();
            if (!isGameover) changeTurn();
        }
    });
});

function changeTurn() {
    if (turn === "X") {
        turn = "O";
        document.querySelector(".bg").style.left = "85px";
    } else {
        turn = "X";
        document.querySelector(".bg").style.left = "0";
    }
}

function checkWin() {
    let winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < winConditions.length; i++) {
        let [a, b, c] = winConditions[i];
        let v0 = boxes[a].innerHTML;
        let v1 = boxes[b].innerHTML;
        let v2 = boxes[c].innerHTML;

        if (v0 !== "" && v0 === v1 && v0 === v2) {
            isGameover = true;
            document.querySelector("#result").innerHTML = turn + " wins!";
            document.querySelector("#play-again").style.display = "inline";
            [a, b, c].forEach(index => {
                boxes[index].style.backgroundColor = "#08D9D6";
                boxes[index].style.color = "#000";
            });
            return;
        }
    }
}

function checkDraw() {
    if (!isGameover && Array.from(boxes).every(box => box.innerHTML !== "")) {
        isGameover = true;
        document.querySelector("#result").innerHTML = "It's a Draw!";
        document.querySelector("#play-again").style.display = "inline";
    }
}

document.querySelector("#play-again").addEventListener("click", () => {
    boxes.forEach(box => {
        box.innerHTML = "";
        box.style.backgroundColor = "";
        box.style.color = "";
    });
    turn = "X";
    isGameover = false;
    document.querySelector("#result").innerHTML = "";
    document.querySelector("#play-again").style.display = "none";
    document.querySelector(".bg").style.left = "0";
});
