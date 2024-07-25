import React from 'react';

const DifficultySelector = ({ gridSize, setGridSize, setDifficulty }) => {
    const handleSizeChange = (e) => setGridSize(parseInt(e.target.value));
    const handleDifficultyChange = (e) => setDifficulty(e.target.value);

    return (
        <div className="difficulty-selector">
            <label>
                Grid Size:
                <select value={gridSize} onChange={handleSizeChange}>
                    <option value={8}>8x8</option>
                    <option value={16}>16x16</option>
                </select>
            </label>
            <label>
                Difficulty:
                <select onChange={handleDifficultyChange}>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                </select>
            </label>
        </div>
    );
};

export default DifficultySelector;
