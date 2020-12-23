import React, {useState, useEffect} from 'react'
import './App.css';
import Figure from './Components/Figure';
import Header from './Components/Header';
import Notification from './Components/Notification';
import Popup from './Components/Popup';
import Word from './Components/Word';
import WrongLetters from './Components/WrongLetters';
import {showNotification as show} from './Helpers/helpers'

const words = ['application','programmer','javascript', 'python'];

let selectedWord = words[Math.floor(Math.random() * words.length)];


function App() {

  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] =useState([]);
  const [wrongLetters, setWrongLetters] =useState([]);
  const [showNotification, setShowNotification] =useState(false);

useEffect(()=>{
  const handleKeyDown = event => {
  const {key, keyCode} = event;
    if(playable && keyCode >= 65 && keyCode <=90){

      const letter = key.toLowerCase();

      if(selectedWord.includes(letter)){
        if(!correctLetters.includes(letter)){
          setCorrectLetters(currentLetters => [...currentLetters, letter]);
        }
        else{
      
       show(setShowNotification);
        }
      }
      else{
        if(!wrongLetters.includes(letter)){
          
          setWrongLetters(wrongLetters => [...wrongLetters, letter]);

         
        }
        else{
     
         show(setShowNotification);
        }
      }



    }
  }
  window.addEventListener('keydown', handleKeyDown);

  return () => window.removeEventListener('keydown',handleKeyDown);
}, [correctLetters, wrongLetters, playable]);

function playAgain(){
  setPlayable(true);

  //Empty Arrays
  setCorrectLetters([]);
  setWrongLetters([]);

  const random = Math.floor(Math.random() * words.length);
  selectedWord = words[random];
}

  return (
    <>
      <Header></Header>
      <div className='game-container'>
        <Figure wrongLetters={wrongLetters}></Figure>
        <WrongLetters wrongLetters={wrongLetters}></WrongLetters>
        <Word selectedWord={selectedWord} correctLetters={correctLetters}></Word>
        
      </div>
      <Popup correctLetters={correctLetters} wrongLetters={wrongLetters} selectedWord={selectedWord} setPlayable={setPlayable}
      playAgain = {playAgain}
      ></Popup>
        <Notification showNotification={showNotification}></Notification>
      
    </>
  );
}

export default App;
