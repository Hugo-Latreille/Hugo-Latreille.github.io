const nombreEssais = 6;
let essaisRestants = nombreEssais;
let wordToFind = [];
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
		virtualKeyboardEvents(key);

		parent.appendChild(key);
	}
};

const virtualKeyboardEvents = (key) => {
	key.addEventListener("click", (e) => {
		if (nextLetter < 7) {
			insertLetter(e.target.textContent);
			nextLetter++;
			essaisEnCours.push(e.target.textContent);
			checkWord();
		} else {
			nextLetter = 0;
			rowNumber < 6 ? rowNumber++ : (rowNumber = 0);
			insertLetter(e.target.textContent);
			nextLetter++;
		}
	});
	key.addEventListener("mousedown", () => {
		key.classList.add("clicked");
	});
	key.addEventListener("mouseup", () => {
		key.classList.remove("clicked");
	});
	document.addEventListener("keydown", (e) => {
		let keyMatched = document.querySelector(`.${e.key.toLocaleUpperCase()}`);
		keyMatched.classList.add("clicked");
	});
	document.addEventListener("keyup", (e) => {
		let keyMatched = document.querySelector(`.${e.key.toLocaleUpperCase()}`);
		keyMatched.classList.remove("clicked");
	});
};

//?vérification lettre par lettre
const checkWord = () => {
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

const insertLetter = (pressedKey) => {
	// pressedKey.toLowerCase();
	let rows = document.querySelectorAll(".row");
	let boxes = rows[rowNumber]?.querySelectorAll(".box");
	boxes[nextLetter].classList.add("selectedLetter");
	boxes[nextLetter].textContent = pressedKey;
	// console.log(nextLetter, rowNumber);
};

//TODO ajouter touches enter et delete et accents au clavier virtuel + physique /
//TODO ajouter logique 1 ligne puis enter pour vérification puis ligne 2
const keyboardEvent = () => {
	document.addEventListener("keyup", (e) => {
		const regex = /[A-zÀ-ú]/;
		let input = e.key.toUpperCase().match(regex);
		console.log(input);

		if (nextLetter < 7 && input) {
			insertLetter(input);
			essaisEnCours.push(input);
			nextLetter++;
		} else {
			nextLetter = 0;
			rowNumber < 6 ? rowNumber++ : (rowNumber = 0);
			insertLetter(input);
			essaisEnCours.push(input);
			nextLetter++;
		}
		console.log(essaisEnCours[0]);
	});
};

const chooseRandomWord = () => {
	const randomIndex = Math.floor(Math.random() * words.length);
	return wordToFind.push(words[randomIndex]);
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
console.log(wordToFind[0].toUpperCase());
