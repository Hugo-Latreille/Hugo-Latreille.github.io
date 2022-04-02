const nombreEssais = 6;
let essaisRestants = nombreEssais;
let wordToFind = "";
let essaisEnCours = [];
let nextLetter = 0;
let rowNumber = 0;
let board = document.querySelector(".grilleContainer");
import { words } from "./mots.js";

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
let lowKb = ["W", "X", "C", "V", "B", "N", "Enter", "<<"];

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
		virtualKeyboardEvents(key);

		parent.appendChild(key);
	}
};

const virtualKeyboardEvents = (key) => {
	key.addEventListener("click", (e) => {
		if (e.target.textContent === "Enter") {
			//submitGuess()
			return;
		}

		if (e.target.textContent === "<<") {
			deleteKey();
			return;
		}

		if (nextLetter < 7) {
			insertLetter(e.target.textContent);
			// nextLetter++;
			// essaisEnCours.push(e.target.textContent);
			// checkLetter();
		} else {
			// nextLetter = 0;
			// rowNumber < 6 ? rowNumber++ : (rowNumber = 0);
			// insertLetter(e.target.textContent);
			// checkLetter();
			// nextLetter++;
			return;
		}
	});
	key.addEventListener("mousedown", () => {
		key.classList.add("clicked");
	});
	key.addEventListener("mouseup", () => {
		key.classList.remove("clicked");
	});
	document.addEventListener("keydown", (e) => {
		let keyMatched = document.querySelector(`.${e.key.toUpperCase()}`);
		keyMatched.classList.add("clicked");
	});
	document.addEventListener("keyup", (e) => {
		let keyMatched = document.querySelector(`.${e.key.toUpperCase()}`);
		keyMatched.classList.remove("clicked");
	});
};

//TODO ajouter touches enter et delete et accents au clavier virtuel + physique /
//TODO ajouter logique 1 ligne puis enter pour vérification puis ligne 2

const keyboardEvent = () => {
	document.addEventListener("keyup", (e) => {
		const regex = /^[A-Z]$/;
		let input = e.key.toUpperCase().match(regex);

		if (e.key === "Enter") {
			checkWord();
			return;
		}
		if (e.key === "Backspace") {
			deleteKey();
			return;
		}
		if (e.key.match(/^[a-z]$/)) {
			if (nextLetter < 7 && input) {
				insertLetter(input);
				// essaisEnCours.push(input);
				// nextLetter++;
			} else {
				// nextLetter = 0;
				// rowNumber < 6 ? rowNumber++ : (rowNumber = 0);
				// insertLetter(input);
				// essaisEnCours.push(input);
				// nextLetter++;
				return;
			}
		}
	});
};

//?vérification lettre par lettre
const checkLetter = () => {
	for (let i = 0; i < essaisEnCours.length; i++) {
		wordToFind = wordToFind.toString().toUpperCase();
		// [0][i].toUpperCase();
		console.log(wordToFind);
		console.log(essaisEnCours[i]);
		console.log(wordToFind[i]);
		if (essaisEnCours[i] === wordToFind[i]) {
			console.log("match");
		}
	}
};

const checkWord = () => {
	const activeBoxes = [...getActiveBoxes()];
	if (activeBoxes.length !== wordToFind.length) {
		showAlert("Pas assez de lettres !");
		shakeBoxes(activeBoxes);
		return;
	}
};

const showAlert = (message, duration = 1000) => {
	const alertContainer = document.querySelector(".alertContainer");
	const alert = document.createElement("div");
	alert.textContent = message;
	alert.classList.add("alert");
	alertContainer.prepend(alert);
	if (duration == null) return;
	setTimeout(() => {
		alert.classList.add("hide");
		alert.addEventListener("transitionend", () => {
			alert.remove();
		});
	}, duration);
};

const shakeBoxes = (boxes) => {
	boxes.forEach((box) => {
		box.classList.add("shake");
		box.addEventListener("animationend", () => {
			box.classList.remove("shake");
		});
	});
};

const insertLetter = (pressedKey) => {
	const activesBoxes = getActiveBoxes();
	const rows = document.querySelectorAll(".row");
	const boxes = rows[rowNumber]?.querySelectorAll(".box");
	if (activesBoxes.length >= 7) return;
	const nextBox = rows[rowNumber]?.querySelector(":not([data-state])");
	nextBox.classList.add("selectedLetter");
	nextBox.dataset.state = "active";
	nextBox.textContent = pressedKey;

	// boxes[nextLetter].classList.add("selectedLetter");
	// boxes[nextLetter].dataset.state = "active";
	// boxes[nextLetter].textContent = pressedKey;
};

const deleteKey = () => {
	const activesBoxes = getActiveBoxes();
	const lastBox = activesBoxes[activesBoxes.length - 1];
	if (lastBox === null) return;
	lastBox.textContent = "";
	delete lastBox.dataset.state;
	lastBox.classList.remove("selectedLetter");
};

const getActiveBoxes = () => {
	const rows = document.querySelectorAll(".row");
	return rows[rowNumber]?.querySelectorAll('[data-state="active"]');
};

const chooseRandomWord = () => {
	const randomIndex = Math.floor(Math.random() * words.length);
	wordToFind = words[randomIndex].toUpperCase();
	// return wordToFind.push(words[randomIndex]);
	return wordToFind;
};

//? puis vérification après validation ligne avec délais
//* random dans une liste de mots --> afficher la première lettre du mot --> décomposer système de vérification
//? mise en place du système de couleurs

drawBoard();
createKeyboard(topKb, "topKbDiv");
createKeyboard(middleKb, "middleKbDiv");
createKeyboard(lowKb, "lowKbDiv");
keyboardEvent();
chooseRandomWord();
console.log(wordToFind);
