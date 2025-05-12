import { useState, useEffect } from 'react'
import confetti from 'canvas-confetti'

import { Board } from "./components/board/Board.jsx"
import { WinnerModal } from './components/winnerModal/WinnerModal.jsx'
import { TurnDisplayer } from './components/turnDisplayer/TurnDisplayer.jsx'
import { checkWinnerFrom, checkEndGame } from './logic/board.js'
import { TURNS } from './components/turnDisplayer/constants.js';
import { saveGameToStorage, resetGameStorage } from './logic/localStorage/storage.js'

import "./Game.css";

export const Game = () => {
  const [board, setBoard] = useState(() => {
    return Array(9).fill(null)
  })

  const [turn, setTurn] = useState(() => {
    return TURNS.X;
  })

  // null es que no hay ganador, false es que hay un empate
  const [winner, setWinner] = useState(null)

  useEffect(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    if (boardFromStorage) {
      const parsedBoard = JSON.parse(boardFromStorage)
      setBoard(parsedBoard)
    }
    const turnFromStorage = window.localStorage.getItem('turn')
    if (turnFromStorage) {
      setTurn(turnFromStorage)
    }
  }
  , [])


  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    resetGameStorage()
  }

  const updateGame = (index)=>{
    if (board[index] || winner) return
    // actualizar el tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    // cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    // guardar aqui partida
    saveGameToStorage({
      board: newBoard,
      turn: newTurn
    })
    // revisar si hay ganador
    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false) // empate
    }
    setTurn(newTurn)
  }

  return (
    <main className='game'>
      <h1 translate="no">Tic tac toe</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <Board board={board} updateGame={updateGame} />
      <TurnDisplayer turn={turn} />
      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  )
}