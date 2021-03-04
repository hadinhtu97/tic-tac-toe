import styles from '../styles/Home.module.css'
import Head from 'next/head'
import React, { useState, useEffect } from 'react'

const Home = () => {

    const [board, setBoard] = useState(Array(9).fill(null))
    const [myChoose, setMyChoose] = useState(null)
    const [computerChoose, setComputerChoose] = useState(null)
    const [isGameStop, setIsGameStop] = useState(false)

    useEffect(() => {
        init()
    }, [])

    const init = () => {

        let boardNow = Array(9).fill(null)
        let chooseNow = ''

        let confirmChoose = window.confirm('Would you choose X ?')
        if (confirmChoose) {
            setMyChoose('X')
            setComputerChoose('O')
            chooseNow = 'O'
        } else {
            setMyChoose('O')
            setComputerChoose('X')
            chooseNow = 'X'
        }

        let confirmMoveFirst = window.confirm('Do you want to go first ?')
        if (!confirmMoveFirst) {
            computerMove(boardNow, chooseNow)
        }
    }

    const isSomeOneWin = (board) => {
        let lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]
        for (let i = 0; i < lines.length; i++) {
            let [a, b, c] = lines[i]
            if (board[a] && board[a] == board[b] && board[a] == board[c]) {
                return board[a]
            }
        }
        return false
    }

    const isBoardFull = (board) => board.filter(value => value == null).length == 0

    const isValueNull = (i) => board[i] == null

    const computerMove = (board, choose) => {
        if (isSomeOneWin(board) || isBoardFull(board)) {
            setBoard(board)
            setIsGameStop(true)
            if (isSomeOneWin(board)) {
                alert(isSomeOneWin(board) == myChoose ? 'You win!' : 'Computer win!')
            } else {
                alert('That was a fair game!')
            }
        } else {
            let boardCopy = [...board]
            let randomIndex = 0
            do {
                randomIndex = Math.floor(Math.random() * 9)
            } while (boardCopy[randomIndex] != null)
            boardCopy[randomIndex] = choose
            setBoard(boardCopy)
        }
    }

    const move = (i) => {
        if (!isGameStop) {
            if (isSomeOneWin(board) || isBoardFull(board)) {
                setIsGameStop(true)
                if (isSomeOneWin(board)) {
                    alert(isSomeOneWin(board) == myChoose ? 'You win!' : 'Computer win!')
                } else {
                    alert('That was a fair game!')
                }
            } else {
                if (isValueNull) {
                    let boardCopy = [...board]
                    boardCopy[i] = myChoose
                    computerMove(boardCopy, computerChoose)
                } else {
                    return
                }
            }
        } else {
            return
        }
    }

    const reset = () => {
        setBoard(Array(9).fill(null))
        setIsGameStop(false)
        init()
    }

    return (
        <>
            <Head>
                <title>Tic Tac Toe</title>
            </Head>
            <main className={styles.contents}>
                <div className={styles.board}>
                    {board.map((value, i) =>
                        <button className={styles.square} key={i} style={value == myChoose ? { color: '#14bdac' } : {color: '#bd3914'}} onClick={() => move(i)}>{value}</button>
                    )}
                </div>
                <div className={styles.info}>
                    {myChoose == null ? <></> : <button className={styles.myChoose} onClick={(e) => e.preventDefault()}>{myChoose}</button>}
                    <button className={styles.resetButton} onClick={reset}>reset</button>
                </div>
            </main>
        </>
    )
}

export default Home