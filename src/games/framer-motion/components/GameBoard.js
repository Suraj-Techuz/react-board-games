import React, { useState, useEffect } from 'react';
import Card from './Card';
import { generateCardPairs } from '../utils/gameUtils';
import { Container, Button, Dropdown } from 'react-bootstrap';
import './GameBoard.css';
import { useNavigate } from 'react-router-dom';

const GameBoard = () => {
    const [difficulty, setDifficulty] = useState('Easy');
    const [cards, setCards] = useState(generateCardPairs(16));
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedPairs, setMatchedPairs] = useState([]);
    const [moves, setMoves] = useState(0);
    const [timer, setTimer] = useState(0);
    const [intervalId, setIntervalId] = useState(null);
    const navigate = useNavigate();

    const handleDifficultyChange = (newDifficulty) => {
        setDifficulty(newDifficulty);
        const size = getGridSize(newDifficulty);
        setCards(generateCardPairs(size));
        setFlippedCards([]);
        setMatchedPairs([]);
        setMoves(0);
        setTimer(0);
        clearInterval(intervalId);
        const id = setInterval(() => setTimer((prev) => prev + 1), 1000);
        setIntervalId(id);
    };

    const getGridSize = (difficulty) => {
        switch (difficulty) {
            case 'Medium':
                return 36;
            default:
                return 16;
        }
    };

    useEffect(() => {
        const id = setInterval(() => setTimer((prev) => prev + 1), 1000);
        setIntervalId(id);
        return () => clearInterval(id);
    }, []);

    useEffect(() => {
        if (matchedPairs.length === cards.length / 2) {
            clearInterval(intervalId);
        }
    }, [matchedPairs, cards, intervalId]);

    const handleCardClick = (card) => {
        if (flippedCards.length === 2 || flippedCards.includes(card) || matchedPairs.includes(card.number)) {
            return;
        }

        setFlippedCards((prev) => [...prev, card]);

        if (flippedCards.length === 1) {
            setMoves((prev) => prev + 1);
            if (flippedCards[0].number === card.number) {
                setMatchedPairs((prev) => [...prev, card.number]);
                setFlippedCards([]);
            } else {
                setTimeout(() => setFlippedCards([]), 1000);
            }
        }
    };

    const handleRestart = () => {
        const size = getGridSize(difficulty);
        setCards(generateCardPairs(size));
        setFlippedCards([]);
        setMatchedPairs([]);
        setMoves(0);
        setTimer(0);
        clearInterval(intervalId);
        const id = setInterval(() => setTimer((prev) => prev + 1), 1000);
        setIntervalId(id);
    };

    const handleBackClick = () => {
        navigate(-1);
    };

    const numCols = Math.sqrt(cards.length);

    return (
        <Container className="game-board">
            <Dropdown onSelect={handleDifficultyChange}>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {difficulty}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item eventKey="Easy">Easy</Dropdown.Item>
                    <Dropdown.Item eventKey="Medium">Medium</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <div className="game-grid" style={{ gridTemplateColumns: `repeat(${numCols}, 1fr)` }}>
                {cards.map((card) => (
                    <Card
                        key={card.id}
                        card={card}
                        onClick={handleCardClick}
                        isFlipped={flippedCards.includes(card) || matchedPairs.includes(card.number)}
                    />
                ))}
            </div>
            <div className="game-info">
                <p>Moves: {moves}</p>
                <p>Time: {timer}s</p>
                <Button
                    variant="primary"
                    onClick={handleRestart}
                    className="me-2"
                >
                    Restart
                </Button>
                <Button
                    onClick={handleBackClick}
                    className="btn btn-secondary"
                >
                    Back
                </Button>
            </div>
        </Container>
    );
};

export default GameBoard;
