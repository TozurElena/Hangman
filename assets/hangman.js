let turnCount = 11;
let counterOfConfirmActions = 0;
const words = ["informatique", "branche", "ordinateur", "école", "université", "application", "dossier", "fichier", "licence", "logiciel", "matériel", "multimédia", "raccourcis", "serveur", "curseur", "arborescence", "corbeille", "environnement", "freeware", "interactif", "interface", "internaute", "bluetooth", "manuel", "langage", "lecteur", "mémoire", "moniteur", "multimédia", "navigateur", "document", "pirate", "processeur", "raccourci", "redémarrer", "réseau", "télémaintenance", "téléphone", "imprimante", "algorithme", "balise", "cybersécurité", "framework", "hackathon", "multiplateforme", "programmation", "résolution", "responsive", "robotique", "script", "software", "tutoriel", "unicode"];


function greeting(turnCount, answerArray) {
    document.getElementById('guessOfPlayer').style.visibility = 'hidden';
    document.getElementById("displayStatus").innerHTML = "\"Hangman\" –  un jeu de devinette de mots.  " +
    "L'ordinateur crée le mot, et vous le devinerez par lettres. <br> <br> Vous avez " + turnCount + " chances.<br><br>" +
    "Mot généré par ordinateur:<br>" + answerArray.join(" ") + "<br><br>Cliquez  Next, pour commencer.";  // полностью описать правила
}

function pickWord(words) {
    return words[Math.floor(Math.random() * words.length)];
}

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
            if (correctLetter == false) {
                turnCount--;
                document.getElementById('guessOfPlayer').style.visibility = 'hidden';
                document.getElementById("displayStatus").innerHTML = "К сожалению, данной буквы в слове нет:<br>"+answerArray.join(" ")
                 + "<br>У Вас осталось попыток: " + turnCount;
                 document.getElementById("showAlreadyUsedLetters").innerHTML = 'Использованные буквы:<br>' + alreadyUsedLetters.join(', ');;
            } else {
                document.getElementById('guessOfPlayer').style.visibility = 'hidden';
                document.getElementById("displayStatus").innerHTML = "Введённая Вами буква верна:<br>" + answerArray.join(" ")
                 +  "<br>У Вас осталось попыток: " + turnCount;
                 document.getElementById("showAlreadyUsedLetters").innerHTML = 'Использованные буквы:<br>' + alreadyUsedLetters.join(', ');;
        }
        }
    }
    return newGameState = {
        newRemainingLetters: remainingLetters,
        newTurnCount: turnCount,
    };

}

function showAnswerAndRatePlayer(turnCount, word) {
    if (turnCount == 0) {
        document.getElementById("displayStatus").innerHTML = "Malheureusement, les tentatives sont épuisées ! Il y a eu un mot perplexe : \""
         + word + "\".";
    } else {
        document.getElementById("displayStatus").innerHTML = "Victoire!  Il y a eu un mot perplexe : \"" + word + "\".";
    }
    document.getElementById("guessOfPlayer").style.display = 'none';
    document.getElementById("interactWithPlayer").style.display = 'none';
    document.getElementById("confirmActions").style.display = 'none';
    document.getElementById("exitButton").style.display = 'none';
    document.getElementById("restartGame").style.visibility = 'visible';
    document.getElementById('stopButton').style.visibility = 'visible';
}

function confirmActions(word, answerArray) {
    document.getElementById('guessOfPlayer').style.visibility = 'visible';
    document.getElementById('guessOfPlayer').focus();
    if (counterOfConfirmActions % 2 == 0) {
        
        document.getElementById("displayStatus").innerHTML = "Введите букву, которая по-вашему мнению есть в слове: ";
        document.getElementById("showAlreadyUsedLetters").innerHTML = 'Использованные буквы:<br>' + alreadyUsedLetters.join(', ');
        counterOfConfirmActions += 1;
    } else {
        var guess = document.getElementById("guessOfPlayer").value.toLowerCase();
        if (guess == "" || guess == " " ) {
            document.getElementById("displayStatus").innerHTML = "Введите только <b>одну букву</b>: ";
            document.getElementById("showAlreadyUsedLetters").innerHTML = 'Использованные буквы:<br>' + alreadyUsedLetters.join(', ');
        } else if (alreadyUsedLetters.includes(guess)) {
            document.getElementById("displayStatus").innerHTML = "Вы <b>уже использовали</b> эту букву. Введите новую: ";
            document.getElementById("showAlreadyUsedLetters").innerHTML = 'Использованные буквы:<br>' + alreadyUsedLetters.join(', ');
        } else {
            openLettersAndNotify(guess, word, answerArray, remainingLetters, turnCount);
            remainingLetters = newGameState.newRemainingLetters;
            turnCount = newGameState.newTurnCount;
            counterOfConfirmActions += 1;
        }
    }
    document.getElementById('guessOfPlayer').value = '';
    

}

let alreadyUsedLetters = [];
let word = pickWord(words);
let remainingLetters = word.length;
let answerArray = setupAnswerArray(word);

function startGame(turnCount, answerArray) {
    greeting(turnCount, answerArray);
}

function exitGame(word) {
    document.getElementById("displayStatus").innerHTML = "C'est dommage que tu aies mis fin au jeu. Il y a eu un mot perplexe : " + word + ".";
    document.getElementById("guessOfPlayer").style.visibility = 'hidden';
    document.getElementById("interactWithPlayer").style.visibility = 'hidden';
    document.getElementById("confirmActions").style.display = 'none';
    document.getElementById("exitButton").style.display = 'none';
    document.getElementById("restartGame").style.visibility = 'visible';
    document.getElementById('stopButton').style.visibility = 'visible';
}

document.getElementById('stopButton').addEventListener('click', () => {
    let result = confirm ('Voulez-vous quitter?');
    if (result) {alert('Aurevoir!'); window.close();} 
        else alert('merci que rester');
})
    
