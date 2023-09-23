import { Cell, Path, Pyramid } from "@/_types";


export default function findSolutions(pyramid: Pyramid, dimension: number): Path[] {
    const solutions: Set<string> = new Set();

    processLevel(pyramid, dimension, 0, -1, solutions, [], new Set());

    return Array.from(solutions).map(jsonStr => JSON.parse(jsonStr));  // Convert the Set back to an Array and parse the JSON strings
}


function isValidMove(prevIndex: number, currentIndex: number): boolean {
    return (prevIndex == currentIndex) || (prevIndex + 1 == currentIndex);
}

function isNumberUnused(num: number, usedNumbers: Set<number>): boolean {
    return !usedNumbers.has(num);
}

function makeMove(cell: Cell, path: Path, usedNumbers: Set<number>): void {
    path.push(cell);
    usedNumbers.add(cell.cell);
}

function undoMove(num: number, path: Path, usedNumbers: Set<number>): void {
    path.pop();
    usedNumbers.delete(num);
}

function processLevel(pyramid: Pyramid, dimension: number, level: number, index: number, solutions: Set<string>, path: Path, usedNumbers: Set<number>): void {
    if (level === pyramid.length && usedNumbers.size === dimension) {
        solutions.add(JSON.stringify(path));
        return;
    }

    for (let row = 0; row < pyramid[level].length; row++) {
        const num = pyramid[level][row];

        if (isValidMove(index, row) && isNumberUnused(num, usedNumbers)) {

            const cell: Cell = {
                cell: pyramid[level][row],
                position: { row: level, col: row },
            };

            makeMove(cell, path, usedNumbers);
            processLevel(pyramid, dimension, level + 1, row, solutions, path, usedNumbers);
            undoMove(cell.cell, path, usedNumbers);
        }
    }
}