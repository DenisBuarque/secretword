import { useCallback, useState, useEffect } from 'react';
// Data
import { wordlist } from './data/words';
// components
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

import './App.css';

const stages = [
    { id: 1, name: "start" },
    { id: 2, name: "game" },
    { id: 3, name: "end" },
];

function App() {

    const [gameStart, setGameStart] = useState(stages[0].name);
    const [words] = useState(wordlist);

    const [pickedWord, setPickedWord] = useState("");
    const [pickedCategory, setPickedCategory] = useState("");
    const [letters, setLetters] = useState([]);

    const [guessedLetters, setGuessedLetters] = useState([]);
    const [wrongLetters, setWrongLetters] = useState([]);
    const [guesses, setGuesses] = useState(3);
    const [score, setScore] = useState(0);

    const pickedWordAndCategory = useCallback(() => {
        // pega o array com todas as chaves
        const categories = Object.keys(words);
        // pega uma catgoria aleatoria
        const category = categories[Math.floor(Math.random() * Object.keys(categories).length)];
        // pega um palavra aleatoria
        const word = words[category][Math.floor(Math.random() * words[category].length)];

        return {category, word};
        
    },[words]);

    // inicia o joge
    const startGame = useCallback(() => {

        setGuessedLetters([]);
        setWrongLetters([]);

        const { category, word } = pickedWordAndCategory();
        //cria um array de letras
        let wordLetters = word.split("");
        wordLetters = wordLetters.map((l) => l.toLowerCase());

        setPickedWord(word);
        setPickedCategory(category);
        setLetters(wordLetters);

        setGameStart(stages[1].name);

    },[pickedWordAndCategory]);

    // verifica a letar
    const verifyLetter = (letter) => {
        // pega a letra digitada e coloca em minuscula
        const normalizeLetter = letter.toLowerCase();
        // se a letra digitada ja esta entre as letras certas ou erradas  
        if (guessedLetters.includes(normalizeLetter) || wrongLetters.includes(normalizeLetter)) {
            return false;
        }
        // se a letra digital estiver correta com a da palavra
        if (letters.includes(normalizeLetter)) {
            setGuessedLetters((actualGuessedLetter) => [...actualGuessedLetter, normalizeLetter]);
        } else { // se a letra digitada estive incorreta

            setWrongLetters((actualWrongLetter) => [...actualWrongLetter, normalizeLetter]);

            setGuesses((actualGuesses) => actualGuesses - 1);

        }
    }

    // se as tentativas terminar
    useEffect(() => {

        if (guesses <= 0) {
            setGuessedLetters([]);
            setWrongLetters([]);
            setGameStart(stages[2].name);
        }

    },[guesses]);

    useEffect(() => {
        // separa as letras individualmente
        const uniqueLetters = [... new Set(letters)];
        // se o total de letras escolhidas for igual ao total de letras da palavra
        if (guessedLetters.length === uniqueLetters.length) {
            // soma a pontuação
            setScore((actualScore) => (actualScore += 100));
            // chama a funação para iniciar o jogo
            startGame();
        }
    },[guessedLetters, letters, startGame]);

    // reinici o jogo
    const retry = () => {

        setScore(0);
        setGuesses(3);

        setGameStart(stages[0].name);
    }

    return (
        <div className="App">
            {gameStart === "start" && <StartScreen startGame={startGame} />}

            {gameStart === "game" && <Game verifyLetter={verifyLetter} 
                                           pickedWord={pickedWord} 
                                           pickedCategory={pickedCategory} 
                                           letters={letters} 
                                           guessedLetters={guessedLetters} 
                                           wrongLetters={wrongLetters} 
                                           guesses={guesses} 
                                           score={score} />}

            {gameStart === "end" && <GameOver retry={retry} score={score} />}
        </div>
    );
}

export default App;
