import { Path, Pyramid } from "@/_types";
import findSolutions from "@/_utilities/findSolutions";


/**
 * Creates a pyramid structure ensuring it has at least one valid solution.
 * @param dimension - The dimension of the pyramid to be created.
 * @returns A pyramid structure with a valid solution path.
 */
export default function createPyramid(dimension: number): Pyramid {
    let pyramid: Pyramid;
    let solutions: Path[] = [];

    do {
        pyramid = generatePyramid(dimension);
        solutions = findSolutions(pyramid, dimension);
    } while (solutions.length === 0);

    return pyramid;
}

/**
 * Generates a random pyramid structure for the given dimension.
 * @param dimension - The dimension of the pyramid to be generated.
 * @returns A random pyramid structure.
 */
 function generatePyramid(dimension: number): Pyramid {
    const randomPath = createRandomPath(dimension);
    const pyramid: Pyramid = [];
    let prevIndex: number = -1;

    for (let row = 1; row <= dimension; row++) {
        const level: number[] = Array(row).fill(0).map(() => getRandomIntInRange(1, dimension));

        const lowerBound: number = (prevIndex === -1) ? 0 : Math.max(0, prevIndex - 1);
        const upperBound: number = Math.min(row - 1, prevIndex + 1);
        const randomIndex: number = getRandomIntInRange(lowerBound, upperBound);

        level[randomIndex] = randomPath[row - 1];
        prevIndex = randomIndex;

        pyramid.push(level);
    }

    return pyramid;
}

/**
 * Creates a random path of numbers based on the given dimension.
 * @param dimension - The number of elements in the random path.
 * @returns A randomized array of numbers ranging from 1 to the provided dimension.
 */
function createRandomPath(dimension: number): number[] {
    const numbers: number[] = Array.from({ length: dimension }, (_, i) => i + 1);
    return numbers.sort(() => Math.random() - 0.5);
}

/**
 * Generates a random integer within the specified range.
 * @param min - The minimum value of the range.
 * @param max - The maximum value of the range.
 * @returns A random integer between min and max (inclusive).
 */
function getRandomIntInRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

