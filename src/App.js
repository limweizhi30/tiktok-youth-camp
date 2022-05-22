import React, {useState , useEffect} from 'react';
import Header from './components/Header';
import Figure from './components/Figure';
import WrongLetters from './components/WrongLetters';
import Word from './components/Word';
import Notification from './components/Notification';
import Popup from './components/Popup';
import {showNotification as show, checkWin} from './helpers/helpers';
import './App.css';

//Npm install random words -> You need to install it first? I am not sure
//Randomly generated words
var wordList = require('random-words');
// Generate one word
let word = wordList(1);
// Taking out the word from an array
let selectedWord = word[0];


function App() {
  const [playable , setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  //It is meant to be a side effect of the app, 
  // Everytime the app re-renders it will add the event listener
  useEffect(() =>{
    const handleKeyDown = event =>{
      const {key , keyCode} = event;
      // The number 65 and 90 correspond to the alphabet
        if (playable && keyCode >= 65 && keyCode <= 90) {
          const letter = key.toLowerCase();
    
          if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
              // Take our current letter and create a new array by spreading
                setCorrectLetters(currentLetters => [...currentLetters , letter])
            } 
            
            else {
              show(setShowNotification);
            }
          } 

          else {
            if (!wrongLetters.includes(letter)) {
              setWrongLetters(wrongLetters => [...wrongLetters , letter])
            } 
            else {
              show(setShowNotification);
            }
          }
        }
    }
    
  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown' , handleKeyDown);
//If you include an empty array like this, it will only be called in the initial render

//Or you can add dependencies 
},[correctLetters,wrongLetters, playable]);

  function playAgain(){
    setPlayable(true);

    //empty arrays:
    setCorrectLetters([]);
    setWrongLetters([]);
    

    var wordList = require('random-words');
    word = wordList(1);
    selectedWord = word[0];
  
  }

  return (
    <>
      <Header />
      <div className= 'game-container'>
        <Figure wrongLetters = {wrongLetters}  />
        <WrongLetters wrongLetters = {wrongLetters} />
        <Word selectedWord = {selectedWord} correctLetters={correctLetters} />
      </div>

      <Popup correctLetters={correctLetters} wrongLetters={wrongLetters} selectedWord = {selectedWord} setPlayable = {setPlayable}
      playAgain ={playAgain}/>
      <Notification showNotification={showNotification}/>
    </>
  );
}

export default App;
