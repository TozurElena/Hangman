let turnCount = 11;
let counterOfConfirmActions = 0;
const words = ["informatique", "branche", "ordinateur", "école", "université", "application", "dossier", "fichier", "licence", "logiciel", "matériel", "multimédia", "raccourcis", "serveur", "curseur", "arborescence", "corbeille", "environnement", "freeware", "interactif", "interface", "internaute", "bluetooth", "manuel", "langage", "lecteur", "mémoire", "moniteur", "multimédia", "navigateur", "document", "pirate", "processeur", "raccourci", "redémarrer", "réseau", "télémaintenance", "téléphone", "imprimante", "algorithme", "balise", "cybersécurité", "framework", "hackathon", "multiplateforme", "programmation", "résolution", "responsive", "robotique", "script", "software", "tutoriel", "unicode"];
let alreadyUsedLetters = [];
let img =  document.getElementById('imgReaction');


function startGame(turnCount, answerArray) {
    greeting(turnCount, answerArray);
}

function greeting(turnCount, answerArray) {
    img.style.visibility = 'hidden';
    document.getElementById('guessOfPlayer').style.visibility = 'hidden';
    document.getElementById("displayStatus").innerHTML = "\"Hangman\" –  un jeu de devinette de mots.  " +
    "L'ordinateur crée le mot, et vous le devinez lettre par lettre. <br> <br> Vous avez " + turnCount + " essais.<br><br>" +
    "Mot généré par ordinateur:<br>" + answerArray.join(" ") + "<br><br>Cliquez  Next, pour commencer.";  // полностью описать правила
}

function pickWord(words) {
    return words[Math.floor(Math.random() * words.length)];
}

let word = pickWord(words);
let remainingLetters = word.length;
let answerArray = setupAnswerArray(word);

function setupAnswerArray(word) {
    let answerArray = [];
    for (var i = 0; i < word.length; i++) {
        answerArray[i] = "_";
    }
    return answerArray;
}

function openLettersAndNotify(guess, word, answerArray, remainingLetters) {
    let correctLetter = false;
    alreadyUsedLetters.push(guess);
    for (let j = 0; j < word.length; j++) {
        if (word[j] === guess && answerArray[j] == "_") {
            answerArray[j] = guess;
            remainingLetters--;
            correctLetter = true;
        }
    }
    if (remainingLetters == 0) {
        showAnswerAndRatePlayer(turnCount, word);
    } else if (remainingLetters > 0) {
        if (turnCount == 1) {
            if (correctLetter == true) {
                    showAnswerAndRatePlayer(turnCount, word);
            } else {
                turnCount--;
                showAnswerAndRatePlayer(turnCount, word);
            }
        } else {
            img.style.visibility = 'visible';
            if (correctLetter == false) {
                turnCount--;
                document.getElementById('guessOfPlayer').style.visibility = 'hidden';
                img.src = "assets/img/smileErreur.webp";
                document.getElementById("displayStatus").innerHTML = "Malhereusement, ce mot ne contient pas cette lettre:<br>"+answerArray.join(" ")
                 + "<br>Il vous reste essais: " + turnCount;
                
            } else {
                document.getElementById('guessOfPlayer').style.visibility = 'hidden';
                img.src = 'assets/img/smileCorrect.jpg';
                document.getElementById("displayStatus").innerHTML = "La lettre est correcte:<br>" + answerArray.join(" ")
                 +  "<br>Il vous reste essais: " + turnCount;
                
        }
        document.getElementById("showAlreadyUsedLetters").innerHTML = 'Les lettres utilisées:<br>' + alreadyUsedLetters.join(', ');;
        }
    }
    return newGameState = {
        newRemainingLetters: remainingLetters,
        newTurnCount: turnCount,
    };

}

function showAnswerAndRatePlayer(turnCount, word) {
    img.style.visibility = 'visible';
    if (turnCount <= 0) {
        img.src = 'assets/img/smileTrist.jpg';
        document.getElementById("displayStatus").innerHTML = "Malheureusement, les tentatives sont épuisées ! Un mot perplexe : \""
         + word + "\".";
    } else {
        img.src = 'assets/img/victoire.jpg';
        document.getElementById("displayStatus").innerHTML = "Victoire!  Bravo à vous! Un mot perplexe : \"" + word + "\".";
    }
    document.getElementById("guessOfPlayer").style.display = 'none';
    // document.getElementById("interactWithPlayer").style.display = 'none';
    document.getElementById("confirmActions").style.display = 'none';
    document.getElementById("exitButton").style.display = 'none';
    document.getElementById("restartGame").style.visibility = 'visible';
    document.getElementById('stopButton').style.visibility = 'visible';
}

function confirmActions(word, answerArray) {
    document.getElementById('guessOfPlayer').style.visibility = 'visible';
    img.style.visibility = 'hidden';
    document.getElementById('guessOfPlayer').focus();
    if (counterOfConfirmActions % 2 == 0) {
        
        document.getElementById("displayStatus").innerHTML = "Tapez une lettre à l'aide de clavier, laquelle, à votre avis, ce mot peut contenir: ";
        document.getElementById("showAlreadyUsedLetters").innerHTML = 'Les lettres utilisées:<br>' + alreadyUsedLetters.join(', ');
        counterOfConfirmActions += 1;
    } else {
        var guess = document.getElementById("guessOfPlayer").value.toLowerCase();
        if (guess == "" || guess == " " ) {
            document.getElementById("displayStatus").innerHTML = "Tapez seulement <b>une lettre</b>: ";
            document.getElementById("showAlreadyUsedLetters").innerHTML = 'Les lettres déjà utilisées:<br>' + alreadyUsedLetters.join(', ');
        } else if (alreadyUsedLetters.includes(guess)) {
            document.getElementById("displayStatus").innerHTML = "Vous avez <b>déjà utilisé</b> cette lettre. Tapez une autre: ";
            document.getElementById("showAlreadyUsedLetters").innerHTML = 'Les lettres utilisées::<br>' + alreadyUsedLetters.join(', ');
        } else {
            openLettersAndNotify(guess, word, answerArray, remainingLetters, turnCount);
            remainingLetters = newGameState.newRemainingLetters;
            turnCount = newGameState.newTurnCount;
            counterOfConfirmActions += 1;
        }
    }
    document.getElementById('guessOfPlayer').value = '';
    

}

function exitGame(word) {
    document.getElementById("displayStatus").innerHTML = "C'est dommage de vous voir partir. Un mot perplexe : " + word + ".";
    document.getElementById("guessOfPlayer").style.visibility = 'hidden';
    document.getElementById("interactWithPlayer").style.visibility = 'hidden';
    document.getElementById("confirmActions").style.display = 'none';
    document.getElementById("exitButton").style.display = 'none';
    document.getElementById("restartGame").style.visibility = 'visible';
    document.getElementById('stopButton').style.visibility = 'visible';
    img.src = 'assets/img/smileTrist.jpg';
}

document.getElementById('stopButton').addEventListener('click', () => {
    let result = confirm ('Voulez-vous quitter ce jeu?');
    if (result) {alert('Au revoir!'); window.close();} 
        else alert('Merci de rester');
})
    
