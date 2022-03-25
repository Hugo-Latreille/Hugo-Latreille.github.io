const nombreEssais = 6;
let essaisRestant = nombreEssais;
let essaisEnCours = [];
let nextLetter = 0;
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

const createKeyboard = () => {
	let topKb = "AZERTYUIOP";
	let middleKb = "QSDFGHJKLM";
	let lowKb = "WXCVBN";
	let keyboard = document.createElement("div");
	keyboard.classList.add("keyboardContainer");
};

drawBoard();
//* créer des rangées div
//* chaque rangée, boucle pour div chaque touche
//* mise en forme CSS
//* chaque touche, event mouse

//* fonction event clavier => chaque frappe écrit dans une box puis suivante une seule ligne. Valider envoie la donnée.

//? puis s'occuper logique choix aléatoire du mot et vérification
//? mise en place du système de couleurs
