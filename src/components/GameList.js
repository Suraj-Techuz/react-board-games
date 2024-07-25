import React from 'react';
import { Link } from 'react-router-dom';

const GameList = () => {
  return (
    <div>
      <h2>Select a Game</h2>
      <ul>
        <li>
          <Link to="/tic-tac-toe">Tic Tac Toe</Link>
        </li>
        <li>
          <Link to="/framer-motion">Framer Motion</Link>
        </li>
        <li>
          <Link to="/minesweeper">Minesweeper</Link>
        </li>
      </ul>
    </div>
  );
};

export default GameList;
