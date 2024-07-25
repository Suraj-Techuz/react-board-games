import React, { useState, useEffect, useCallback } from 'react';
import Grid from './Grid';
import './Minesweeper.css';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import { FaInfoCircle } from 'react-icons/fa';

const MinesweeperGame = () => {
    const [gridSize] = useState(5);
    const [tiles, setTiles] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [gameWon, setGameWon] = useState(false);
    const [minesTriggered, setMinesTriggered] = useState(0);
    const [showGameOverMessage, setShowGameOverMessage] = useState(false);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const getNumMines = useCallback(() => {
        return Math.floor((gridSize * gridSize) * 0.2); // Default to 10% of the tiles
    }, [gridSize]);

    useEffect(() => {
        if (gameOver) {
            const showTimer = setTimeout(() => {
                setShowGameOverMessage(true);

                const hideTimer = setTimeout(() => {
                    setShowGameOverMessage(false);
                }, 1000);

                return () => clearTimeout(hideTimer);
            }, 1000);

            return () => clearTimeout(showTimer);
        } else {
            setShowGameOverMessage(false);
        }
    }, [gameOver]);

    const initializeGrid = useCallback(() => {
        const size = gridSize;
        const numMines = getNumMines();
        const newTiles = Array(size * size).fill(null).map((_, index) => ({
            id: index,
            hasMine: false,
            revealed: false,
            flagged: false,
            exploded: false,
            adjacentMines: 0,
        }));

        for (let i = 0; i < numMines; i++) {
            let index;
            do {
                index = Math.floor(Math.random() * newTiles.length);
            } while (newTiles[index].hasMine);
            newTiles[index].hasMine = true;
        }

        newTiles.forEach((tile, index) => {
            const adjacentIndices = getAdjacentIndices(index, size);
            const numAdjacentMines = adjacentIndices.filter(i => newTiles[i]?.hasMine).length;
            tile.adjacentMines = numAdjacentMines;
        });

        setTiles(newTiles);
    }, [gridSize, getNumMines]);

    useEffect(() => {
        initializeGrid();
    }, [initializeGrid]);

    useEffect(() => {
        if (tiles.length > 0 && tiles.every(tile => tile.revealed || tile.hasMine)) {
            const won = tiles.every(tile => (tile.hasMine && !tile.revealed) || (!tile.hasMine && tile.revealed));
            setGameWon(won);
            setGameOver(true);
        }
    }, [tiles]);

    const handleTileClick = (id) => {
        if (gameOver) return;

        setTiles(prevTiles => {
            const newTiles = [...prevTiles];
            const tile = newTiles[id];
            if (tile.revealed || tile.flagged) return newTiles;

            tile.revealed = true;
            if (tile.hasMine) {
                tile.exploded = true;
                setMinesTriggered(prevCount => {
                    const newCount = prevCount + 1;
                    if (newCount >= 3) {
                        setGameOver(true);
                    }
                    return newCount;
                });
                console.log(minesTriggered)
                setTimeout(() => {
                    setTiles(prevTiles => prevTiles.map(t => {
                        if (t.id === id) t.exploded = false;
                        return t;
                    }));
                }, 600); // Time should match the CSS animation duration
                return newTiles;
            }

            if (tile.adjacentMines === 0) {
                getAdjacentIndices(id, gridSize).forEach(i => {
                    if (!newTiles[i].revealed) {
                        newTiles[i].revealed = true;
                    }
                });
            }
            return newTiles;
        });
    };

    const handleTileRightClick = (event, id) => {
        event.preventDefault();
        if (gameOver) return;

        setTiles(prevTiles => {
            const newTiles = [...prevTiles];
            const tile = newTiles[id];
            if (tile.revealed) return newTiles;

            tile.flagged = !tile.flagged;
            return newTiles;
        });
    };

    const handleReset = () => {
        initializeGrid();
        setGameOver(false);
        setGameWon(false);
        setMinesTriggered(0);
        setShowGameOverMessage(false);
    };

    const handleBack = () => {
        navigate(-1); // Navigate back to the previous page
    };

    return (
        <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
            <div className="container">
                <h1 className="text-center my-4">Minesweeper Game
                    <FaInfoCircle
                        className="ms-2 text-primary"
                        style={{ cursor: 'pointer', fontSize: '1.5rem' }}
                        onClick={handleShow}
                    />
                </h1>
                <div className="minesweeper-game">
                    <Grid
                        size={gridSize}
                        tiles={tiles || []}
                        onTileClick={handleTileClick}
                        onTileRightClick={handleTileRightClick}
                    />
                    <div className="controls mt-3">
                        <button className="btn btn-primary me-2" onClick={handleReset}>Reset</button>
                        <button className="btn btn-secondary" disabled onClick={handleBack}>Back</button>
                    </div>
                    {showGameOverMessage && (
                        <div className={`overlay ${gameWon ? 'game-won' : 'game-over'}`}>
                            {gameWon ? 'You Won!' : 'Game Over'}
                        </div>
                    )}
                </div>
                <Modal show={showModal} onHide={handleClose} centered>
                    <Modal.Header closeButton className="bg-primary text-white">
                        <Modal.Title>Game Instructions</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="text-center">
                        <p className="mb-3">
                            <strong>The goal is to clear the grid without detonating any bombs.</strong>
                        </p>
                        <p className="mb-3">
                            Click on a cell to reveal what is underneath. If you click on a bomb, the game is over.
                        </p>
                        <p className="mb-3">
                            <strong>Grid:</strong> The grid is a 5x5 grid with 5 hidden bombs. Your task is to reveal all the safe cells.
                        </p>
                        <p className="mb-3">
                            <strong>Safe Cells:</strong> When you click on a cell that does not contain a bomb, it will reveal a number indicating how many bombs are adjacent to that cell.
                        </p>
                        <p className="mb-3">
                            <strong>Winning the Game:</strong> You win the game by revealing all the safe cells without clicking on any bombs.
                        </p>
                    </Modal.Body>
                    <Modal.Footer className="justify-content-center">
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
};

const getAdjacentIndices = (index, size) => {
    const adjacentIndices = [];
    const row = Math.floor(index / size);
    const col = index % size;

    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;

            const newRow = row + i;
            const newCol = col + j;
            if (newRow >= 0 && newRow < size && newCol >= 0 && newCol < size) {
                adjacentIndices.push(newRow * size + newCol);
            }
        }
    }

    return adjacentIndices;
};

export default MinesweeperGame;
