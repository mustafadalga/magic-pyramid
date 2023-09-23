import { Cell, Path, Pyramid } from "@/_types";


/**
 * Finds all possible solutions for the given pyramid puzzle.
 * @param pyramid - The pyramid puzzle structure.
 * @param dimension - The dimension of the pyramid.
 * @returns An array of all possible solution paths.
 */
export default function findSolutions(pyramid: Pyramid, dimension: number): Path[] {
    const solutions: Set<string> = new Set();

    processLevel(pyramid, dimension, 0, -1, solutions, [], new Set());

    return Array.from(solutions).map(jsonStr => JSON.parse(jsonStr));  // Convert the Set back to an Array and parse the JSON strings
}

/**
 * Checks if the move between two pyramid levels is valid.
 * @param prevIndex - The index in the previous level.
 * @param currentIndex - The index in the current level.
 * @returns True if the move is valid, false otherwise.
 */
function isValidMove(prevIndex: number, currentIndex: number): boolean {
    return (prevIndex == currentIndex) || (prevIndex + 1 == currentIndex);
}

/**
 * Checks if a number has been used before.
 * @param num - The number to check.
 * @param usedNumbers - The set of numbers that have been used.
 * @returns True if the number has not been used, false otherwise.
 */
function isNumberUnused(num: number, usedNumbers: Set<number>): boolean {
    return !usedNumbers.has(num);
}

/**
 * Adds a cell to the current path and its number to the set of used numbers.
 * @param cell - The cell to add.
 * @param path - The current path.
 * @param usedNumbers - The set of numbers that have been used.
 */
function makeMove(cell: Cell, path: Path, usedNumbers: Set<number>): void {
    path.push(cell);
    usedNumbers.add(cell.cell);
}

/**
 * Removes the last cell from the current path and its number from the set of used numbers.
 * @param num - The number of the cell to remove.
 * @param path - The current path.
 * @param usedNumbers - The set of numbers that have been used.
 */
function undoMove(num: number, path: Path, usedNumbers: Set<number>): void {
    path.pop();
    usedNumbers.delete(num);
}

/**
 * Recursively processes each level of the pyramid to find all possible solutions.
 * @param pyramid - The pyramid puzzle structure.
 * @param dimension - The dimension of the pyramid.
 * @param level - The current pyramid level.
 * @param index - The index in the current level.
 * @param solutions - The set of found solutions.
 * @param path - The current path.
 * @param usedNumbers - The set of numbers that have been used.
 */
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