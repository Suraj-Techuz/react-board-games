import React from 'react';
import Tile from './Tile';

const Grid = ({ size, tiles, onTileClick, onTileRightClick }) => {
    if (!tiles || tiles.length === 0) return null;

    return (
        <div
            className="grid"
            style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}
        >
            {tiles.map(tile => (
                <Tile
                    key={tile.id}
                    tile={tile}
                    onClick={() => onTileClick(tile.id)}
                    onContextMenu={(event) => onTileRightClick(event, tile.id)}
                />
            ))}
        </div>
    );
};

export default Grid;
