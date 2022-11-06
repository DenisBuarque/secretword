import { useState, useRef } from "react";
import "./Game.css";

function Game({ verifyLetter, pickedWord, pickedCategory, letters, guessedLetters, wrongLetters, guesses, score }) {

   const [letter, setLetter] = useState("");
   const inputRef = useRef(null);

   function handleSubmit(e) {

      e.preventDefault();

      verifyLetter(letter);

      setLetter("");
      inputRef.current.focus(); // focus no input com useRef()
   }

   return (
      <div className="game">
         <p className="points">
            <span>Pontuação: {score}</span>
         </p>
         <h1>Adivinhe a palavra:</h1>
         <h3 className="tip">Dica sobre a palavra: <span>{pickedCategory}</span></h3>
         <p>Você ainda tem {guesses} tentativas.</p>
         <div className="wordContainer">
            {letters.map((letter, i) =>
               guessedLetters.includes(letter) ? (
                  <span key={i} className="letter">{letter}</span>
               ) : (
                  <span key={i} className="blankSquare"></span>
               )
            )}
         </div>
         <div className="letterContainer">
            <p>Tente adivinha uma letra da palavra:</p>
            <form onSubmit={handleSubmit}>
               <input type="text"
                  name="letter"
                  value={letter}
                  onChange={(e) => setLetter(e.target.value)}
                  ref={inputRef}
                  maxLength="1"
                  required
               />
               <button type="submit">Jogar!</button>
            </form>
         </div>
         <div className="wrongLettersContainer">
            <p>Letras já utilizadas:</p>
            {wrongLetters.map((letter, i) => (
               <span key={i}>{letter}, </span>
            ))}
         </div>
      </div>
   )
}

export default Game;