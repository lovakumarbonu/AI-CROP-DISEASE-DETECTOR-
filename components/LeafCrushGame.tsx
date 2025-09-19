import React, { useState, useEffect, useCallback, useMemo, FC } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { CloseIcon, LeafIconGame1, LeafIconGame2, LeafIconGame3, LeafIconGame4, LeafIconGame5, LeafIconGame6 } from './Icons';

interface LeafCrushGameProps {
  isOpen: boolean;
  onClose: () => void;
}

const GRID_SIZE = 8;
const LEAF_TYPES = [
    '#4ade80', // green-400
    '#facc15', // amber-400
    '#60a5fa', // blue-400
    '#f87171', // red-400
    '#fb923c', // orange-400
    '#c084fc', // purple-400
];

const LeafComponents: Record<string, FC<{ className?: string }>> = {
    [LEAF_TYPES[0]]: LeafIconGame1,
    [LEAF_TYPES[1]]: LeafIconGame2,
    [LEAF_TYPES[2]]: LeafIconGame3,
    [LEAF_TYPES[3]]: LeafIconGame4,
    [LEAF_TYPES[4]]: LeafIconGame5,
    [LEAF_TYPES[5]]: LeafIconGame6,
};

const LeafCrushGame: React.FC<LeafCrushGameProps> = ({ isOpen, onClose }) => {
    const { translations } = useLanguage();
    const [grid, setGrid] = useState<string[][]>([]);
    const [score, setScore] = useState(0);
    const [isChecking, setIsChecking] = useState(false);

    const [draggedItem, setDraggedItem] = useState<{ row: number, col: number } | null>(null);
    const [replacedItem, setReplacedItem] = useState<{ row: number, col: number } | null>(null);

    const createGrid = useCallback(() => {
        const newGrid: string[][] = [];
        for (let row = 0; row < GRID_SIZE; row++) {
            const newRow: string[] = [];
            for (let col = 0; col < GRID_SIZE; col++) {
                const randomLeaf = LEAF_TYPES[Math.floor(Math.random() * LEAF_TYPES.length)];
                newRow.push(randomLeaf);
            }
            newGrid.push(newRow);
        }

        // Ensure no matches on creation
        for (let row = 0; row < GRID_SIZE; row++) {
            for (let col = 0; col < GRID_SIZE; col++) {
                if (col > 1 && newGrid[row][col] === newGrid[row][col - 1] && newGrid[row][col] === newGrid[row][col - 2]) {
                    const allowedLeaves = LEAF_TYPES.filter(leaf => leaf !== newGrid[row][col]);
                    newGrid[row][col] = allowedLeaves[Math.floor(Math.random() * allowedLeaves.length)];
                }
                if (row > 1 && newGrid[row][col] === newGrid[row - 1][col] && newGrid[row][col] === newGrid[row - 2][col]) {
                     const allowedLeaves = LEAF_TYPES.filter(leaf => leaf !== newGrid[row][col]);
                    newGrid[row][col] = allowedLeaves[Math.floor(Math.random() * allowedLeaves.length)];
                }
            }
        }
        setGrid(newGrid);
        setScore(0);
    }, []);

    useEffect(() => {
        createGrid();
    }, [createGrid]);

    const checkMatches = useCallback((currentGrid: string[][]) => {
        const matches = new Set<string>(); // "row-col"

        // Check horizontal matches
        for (let row = 0; row < GRID_SIZE; row++) {
            for (let col = 0; col < GRID_SIZE - 2; col++) {
                const checkLeaves = [currentGrid[row][col], currentGrid[row][col + 1], currentGrid[row][col + 2]];
                if (checkLeaves.every(leaf => leaf && leaf === checkLeaves[0])) {
                    matches.add(`${row}-${col}`);
                    matches.add(`${row}-${col + 1}`);
                    matches.add(`${row}-${col + 2}`);
                }
            }
        }

        // Check vertical matches
        for (let col = 0; col < GRID_SIZE; col++) {
            for (let row = 0; row < GRID_SIZE - 2; row++) {
                const checkLeaves = [currentGrid[row][col], currentGrid[row + 1][col], currentGrid[row + 2][col]];
                 if (checkLeaves.every(leaf => leaf && leaf === checkLeaves[0])) {
                    matches.add(`${row}-${col}`);
                    matches.add(`${row + 1}-${col}`);
                    matches.add(`${row + 2}-${col}`);
                }
            }
        }
        return matches;
    }, []);

    const processTurn = useCallback(async (currentGrid: string[][]) => {
        setIsChecking(true);
        let newGrid = [...currentGrid.map(row => [...row])];
        let totalScoreThisTurn = 0;
        
        while (true) {
            const matches = checkMatches(newGrid);
            if (matches.size === 0) break;
            
            totalScoreThisTurn += matches.size * 10;
            
            // Remove matched leaves
            matches.forEach(match => {
                const [row, col] = match.split('-').map(Number);
                newGrid[row][col] = '';
            });

            setGrid(newGrid);
            await new Promise(resolve => setTimeout(resolve, 200));

            // Gravity
            for (let col = 0; col < GRID_SIZE; col++) {
                const column = [];
                for (let row = 0; row < GRID_SIZE; row++) {
                    if (newGrid[row][col] !== '') {
                        column.push(newGrid[row][col]);
                    }
                }
                const emptyCells = Array(GRID_SIZE - column.length).fill('');
                const newColumn = [...emptyCells, ...column];
                for (let row = 0; row < GRID_SIZE; row++) {
                    newGrid[row][col] = newColumn[row];
                }
            }
            
            // Refill
            for (let row = 0; row < GRID_SIZE; row++) {
                for (let col = 0; col < GRID_SIZE; col++) {
                    if (newGrid[row][col] === '') {
                        newGrid[row][col] = LEAF_TYPES[Math.floor(Math.random() * LEAF_TYPES.length)];
                    }
                }
            }
            setGrid(newGrid);
            await new Promise(resolve => setTimeout(resolve, 200));
        }

        if (totalScoreThisTurn > 0) {
            setScore(prev => prev + totalScoreThisTurn);
        }
        setIsChecking(false);

    }, [checkMatches]);


    const handleDragEnd = () => {
        if (draggedItem && replacedItem && !isChecking) {
            const { row: dragRow, col: dragCol } = draggedItem;
            const { row: replaceRow, col: replaceCol } = replacedItem;

            const isAdjacent = Math.abs(dragRow - replaceRow) + Math.abs(dragCol - replaceCol) === 1;
            
            if (isAdjacent) {
                const newGrid = [...grid.map(row => [...row])];
                [newGrid[dragRow][dragCol], newGrid[replaceRow][replaceCol]] = [newGrid[replaceRow][replaceCol], newGrid[dragRow][dragCol]];

                const matches = checkMatches(newGrid);
                if (matches.size > 0) {
                    setGrid(newGrid);
                    processTurn(newGrid);
                }
            }
        }
        setDraggedItem(null);
        setReplacedItem(null);
    };

    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-slate-900/90 backdrop-blur-sm z-50 flex flex-col justify-center items-center p-4 animate-fade-in"
            role="dialog"
            aria-modal="true"
            aria-labelledby="game-title"
        >
            <div className="w-full max-w-4xl text-center">
                <div className="flex justify-between items-center mb-4 px-4 py-2 bg-slate-800/50 rounded-lg">
                    <h1 id="game-title" className="text-2xl sm:text-3xl font-bold text-green-400">{translations.leafCrushTitle}</h1>
                    <div className="flex items-center gap-4">
                        <div className="text-lg">
                            <span className="font-semibold text-slate-300">{translations.score}: </span>
                            <span className="font-bold text-amber-400">{score}</span>
                        </div>
                         <button onClick={createGrid} className="px-4 py-2 text-sm font-semibold text-slate-200 bg-slate-700 rounded-lg hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500">
                           {translations.resetGame}
                        </button>
                        <button onClick={onClose} className="p-2 text-slate-300 bg-slate-700 rounded-full hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500">
                            <CloseIcon />
                        </button>
                    </div>
                </div>

                <div className="aspect-square w-full max-w-xl mx-auto bg-slate-800/50 p-2 rounded-lg grid grid-cols-8 gap-1">
                    {grid.map((row, rowIndex) => 
                        row.map((leaf, colIndex) => {
                            const LeafComponent = LeafComponents[leaf];
                            return (
                                <div
                                    key={`${rowIndex}-${colIndex}`}
                                    className="aspect-square flex justify-center items-center bg-slate-900/50 rounded-md"
                                    draggable={!isChecking}
                                    onDragStart={() => setDraggedItem({ row: rowIndex, col: colIndex })}
                                    onDragOver={(e) => e.preventDefault()}
                                    onDragEnter={(e) => {
                                        e.preventDefault();
                                        setReplacedItem({ row: rowIndex, col: colIndex });
                                    }}
                                    onDragEnd={handleDragEnd}
                                    onDrop={() => {}} // Drop is handled by onDragEnd
                                >
                                    {LeafComponent && (
                                        <div className={`w-full h-full p-1 transition-transform duration-300 ${isChecking ? 'animate-pulse' : 'hover:scale-110 cursor-grab'}`}>
                                            <LeafComponent className={`w-full h-full object-contain transition-opacity duration-200 ${leaf === '' ? 'opacity-0' : 'opacity-100'}`}/>
                                        </div>
                                    )}
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
};

export default LeafCrushGame;
