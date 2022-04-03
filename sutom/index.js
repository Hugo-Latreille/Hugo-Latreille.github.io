const nombreEssais = 6;
let wordToFind = "";
let nextLetter = 0;
let rowNumber = 0;
let board = document.querySelector(".grilleContainer");
const flipDuration = 500;
const danceDuration = 500;
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
	const handleClick = (e) => {
		if (e.target.textContent === "Enter") {
			checkWord();
			return;
		}

		if (e.target.textContent === "<<") {
			deleteKey();
			return;
		}
		console.log(nextLetter);
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
	};

	key.addEventListener("click", handleClick);
	key.addEventListener("mousedown", () => {
		key.classList.add("clicked");
	});
	key.addEventListener("mouseup", () => {
		key.classList.remove("clicked");
	});
	// document.addEventListener("keydown", (e) => {
	// 	let keyMatched = document.querySelector(`.${e.key.toUpperCase()}`);
	// 	keyMatched.classList.add("clicked");
	// });
	// document.addEventListener("keyup", (e) => {
	// 	let keyMatched = document.querySelector(`.${e.key.toUpperCase()}`);
	// 	keyMatched.classList.remove("clicked");
	// });
};
const keyboardEvent = () => {
	document.addEventListener("keyup", handleKeyboard);
};

const handleKeyboard = (e) => {
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
};
//! réparer, logique ok
// const stopInteractions = (key) => {
// 	document.removeEventListener("keyup", handleKeyboard);
// 	key.removeEventListener("click", handleClick);
// };

//?vérification lettre par lettre
//! vérifier si logique réalisable
// const checkLetter = () => {
// 	for (let i = 0; i < essaisEnCours.length; i++) {
// 		wordToFind = wordToFind.toString().toUpperCase();
// 		// [0][i].toUpperCase();
// 		console.log(wordToFind);
// 		console.log(essaisEnCours[i]);
// 		console.log(wordToFind[i]);
// 		if (essaisEnCours[i] === wordToFind[i]) {
// 			console.log("match");
// 		}
// 	}
// };

const checkWord = () => {
	const activeBoxes = [...getActiveBoxes()];
	const key = keyboard.querySelectorAll(`.key`);
	if (activeBoxes.length !== wordToFind.length) {
		showAlert("Pas assez de lettres !");
		shakeBoxes(activeBoxes);
		return;
	}
	const guess = activeBoxes.reduce((word, box) => {
		return word + box.textContent;
	}, "");
	// if (!dictionay.includes(guess)) {
	// 	showAlert("Le mot n'est pas dans le dictionnaire");
	// 	shakeBoxes(activeBoxes);
	// 	return;
	// }
	// stopInteractions(key);
	activeBoxes.forEach((box, index, array) => flipBox(box, index, array, guess));
	rowNumber++;
};

const flipBox = (box, index, array, guess) => {
	const letter = box.textContent;
	const keyboard = document.querySelector(".keyboard");
	const key = keyboard.querySelectorAll(`.${letter}`);
	console.log(key);
	setTimeout(() => {
		box.classList.add("flip");
	}, (index * flipDuration) / 2);
	box.addEventListener("transitionend", () => {
		box.classList.remove("flip");
		if (wordToFind[index] === letter) {
			box.dataset.state = "right";
			key[0].classList.add("right");
		} else if (wordToFind.includes(letter)) {
			box.dataset.state = "wrongLocation";
			key[0].classList.add("wrongLocation");
		} else {
			box.dataset.state = "wrong";
			key[0].classList.add("wrong");
		}
		if (index === array.length - 1) {
			box.addEventListener("transitionend", () => {
				winLoose(guess, array);
			});
		}
	});
};

const winLoose = (guess, boxes) => {
	const grilleContainer = document.querySelector(".grilleContainer");

	if (guess === wordToFind) {
		showAlert("C'est gagné !", 5000);
		danceBoxes(boxes);
	}

	const remainingBoxes = grilleContainer.querySelectorAll(
		":not(.selectedLetter)"
	);
	if (remainingBoxes.length === 0) {
		showAlert(wordToFind, null);
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

const danceBoxes = (boxes) => {
	boxes.forEach((box, index) => {
		setTimeout(() => {
			box.classList.add("dance");
			box.addEventListener("animationend", () => {
				box.classList.remove("dance");
			});
		}, (index * danceDuration) / 5);
	});
};

const insertLetter = (pressedKey) => {
	const activesBoxes = getActiveBoxes();
	const rows = document.querySelectorAll(".row");
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
