const nombreEssais = 6;
let essaisRestants = nombreEssais;
let essaisEnCours = [];
let nextLetter = 0;
let rowNumber = 0;
let board = document.querySelector(".grilleContainer");

const drawBoard = () => {
	createRow();
};

const createRow = () => {
	for (let i = 0; i < nombreEssais; i++) {
		let row = document.createElement("div");
		row.classList.add("row");
		board.appendChild(row);
	}
	createBox();
};

const createBox = () => {
	let rows = document.querySelectorAll(".row");
	for (let row of rows) {
		for (let i = 0; i < 7; i++) {
			let box = document.createElement("div");
			box.classList.add("box");
			row.appendChild(box);
		}
	}
};

const keyboard = document.querySelector(".keyboard");
let topKb = "AZERTYUIOP";
let middleKb = "QSDFGHJKLM";
let lowKb = "WXCVBN";

const createKeyboard = (layout, className) => {
	let keyRow = document.createElement("div");
	keyRow.classList.add("keyRows");
	keyRow.classList.add(className);
	keyboard.appendChild(keyRow);

	createKeyboardKeys(className, layout);
};

const createKeyboardKeys = (className, layer) => {
	const parent = document.querySelector(`.${className}`);
	for (let i = 0; i < layer.length; i++) {
		let key = document.createElement("div");
		key.classList.add("key");
		key.classList.add(`${layer[i]}`);
		key.textContent = layer[i];
		key.addEventListener("click", (e) => {
			insertLetter(e.target.textContent);
			console.log(nextLetter, rowNumber);
		});
		parent.appendChild(key);
	}
};

//* ajouter hover lors clic kb

const insertLetter = (pressedKey) => {
	let rows = document.querySelectorAll(".row");
	let boxes = rows[rowNumber].querySelectorAll(".box");
	pressedKey.toLowerCase();
	rowNumber < 6 ? rows[rowNumber].classList.add("selectedRow") : "";
	if (nextLetter < 7) {
		boxes[nextLetter].classList.add("selectedLetter");
		boxes[nextLetter].textContent = pressedKey;
		nextLetter++;
	} else {
		nextLetter = 0;
		rowNumber++;
	}
};

// if (nextLetter < 6) {
// 	nextLetter++;
// } else {
// 	nextLetter = 0;
// 	rowNumber++;
// }

//* kb event général ==> afficher lettre dans le board, sur une ligne

//? puis s'occuper logique choix aléatoire du mot et vérification
//* random dans une liste de mots --> afficher la première lettre du mot --> décomposer système de vérification
//? mise en place du système de couleurs

drawBoard();
createKeyboard(topKb, "topKbDiv");
createKeyboard(middleKb, "middleKbDiv");
createKeyboard(lowKb, "lowKbDiv");
