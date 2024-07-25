import React from 'react';
import './Minesweeper.css';

const Tile = ({ tile, onClick, onContextMenu }) => {
    const { hasMine, revealed, flagged, exploded } = tile;

    let tileClass = 'tile';
    if (revealed) tileClass += ' revealed';
    if (hasMine) tileClass += ' mine';
    if (exploded) tileClass += ' exploded';

    return (
        <div
            className={tileClass}
            onClick={onClick}
            onContextMenu={onContextMenu}
        >
            {revealed && hasMine && <span>💣</span>}
            {revealed && !hasMine && tile.adjacentMines > 0 && <span>{tile.adjacentMines}</span>}
            {flagged && <span>🚩</span>}
        </div>
    );
};

export default Tile;
