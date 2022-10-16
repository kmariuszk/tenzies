import React from "react";
import Die from "./components/Die"
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

function App() {

  const [dice, setDice] = React.useState(allNewDice());

  const [tenzies, setTenzies] = React.useState({
    isFinished: false,
    rollsNumber: 0,
    startTime: Date.now()
  });

  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld);
    const sameValue = dice.every(die => die.value === dice[0].value);

    if (allHeld && sameValue) {
      setTenzies(oldTenzies => ({
        ...oldTenzies,
        isFinished: true
      }))
    }
  }, [dice]);

  function newDie() {
    return ({
      value: Math.floor((Math.random() * 6)) + 1,
      isHeld: false,
      id: nanoid()
    })
  }

  function allNewDice() {
    let newDice = [];

    for (let i = 0; i < 10; i++) {
      newDice.push(newDie());
    }

    return newDice;
  }

  function rollDices() {
    setTenzies(oldTenzies => ({
      ...oldTenzies,
      rollsNumber: oldTenzies.rollsNumber + 1
    }))

    setDice(prevDice => prevDice.map(
      die => die.isHeld ? die : newDie()
    ));
  }

  function holdDice(id) {
    setDice(prevDice => prevDice.map(
      die => die.id === id ? { ...die, isHeld: !die.isHeld } : die
    ))
  }

  function newGame() {
    setTenzies({
      isFinished: false,
      rollsNumber: 0,
      startTime: Date.now()
    });

    setDice(allNewDice());
  }

  const diceComponent = dice.map(die =>
    <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} />
  )

  const description = tenzies.isFinished ?
    `You won! 🎊 It took you ${Math.floor((Date.now() - tenzies.startTime) / 1000)} seconds and ${tenzies.rollsNumber} turns!` :
    "Roll until all dice are the same. Click each die to freeze it at its current value between rolls."

  return (
    <main>
      {tenzies.isFinished && <Confetti />}
      <p>{tenzies.gameTime}</p>
      <h1 className="title">Tenzies</h1>
      <p className="description">{description}</p>
      <div className="dice-container">
        {diceComponent}
      </div>
      <button className="roll-button" onClick={tenzies.isFinished ? newGame : rollDices}>
        {tenzies.isFinished ? "New game" : "Roll"}
      </button>
    </main>
  );
}

export default App;
