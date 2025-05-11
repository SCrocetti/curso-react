import { useState } from 'react'
import confetti from 'canvas-confetti'

import { Board } from "./components/board/Board.jsx"
import { WinnerModal } from './components/winnerModal/WinnerModal.jsx'
import { TurnDisplayer } from './components/turnDisplayer/TurnDisplayer.jsx'
import { checkWinnerFrom, checkEndGame } from './logic/board.js'
import { TURNS } from './components/turnDisplayer/constants.js';

import "./Game.css";

export const Game = () => {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    if (boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(9).fill(null)
  })

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })

  // null es que no hay ganador, false es que hay un empate
  const [winner, setWinner] = useState(null)
  const saveGameToStorage = ({ board, turn }) => {
    // guardar aqui partida
    window.localStorage.setItem('board', JSON.stringify(board))
    window.localStorage.setItem('turn', turn)
  }
  
  const resetGameStorage = () => {
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }
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
    setTurn(newTurn)
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