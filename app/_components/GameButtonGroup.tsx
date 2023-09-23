import useGame from "@/_providers/game/useGame";
import findSolutions from "@/_utilities/findSolutions";
import { Path } from "@/_types";

export default function GameButtonGroup() {
    const { pyramid, dimension, setPyramid, newGame, setShowGame, setGamerPath } = useGame();
    const handleShowSolution = () => {
        const solution = findSolutions(pyramid, dimension);
        const firstSolution: Path = solution[0];
        if (firstSolution) {
            setGamerPath(firstSolution)
        }
    }
    const handleExit = () => {
        setGamerPath([]);
        setPyramid([]);
        setShowGame(false)
    }
    return (
        <div className="flex justify-center gap-3">
            <button type="button"
                    onClick={newGame}
                    className="bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 text-white text-center text-xs sm:text-sm gap-3 min-w-[5rem] lg:min-w-0 px-3 py-1 rounded-md shadow transition-all truncate">
                <span>New Game</span>
            </button>
            <button type="button"
                    onClick={handleShowSolution}
                    className="bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 text-white text-center text-xs sm:text-sm gap-3 min-w-[5rem] lg:min-w-0 px-3 py-1 rounded-md shadow transition-all truncate">
                <span>Show Solution</span>
            </button>
            <button type="button"
                    onClick={handleExit}
                    className="bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 text-white text-center text-xs sm:text-sm gap-3 min-w-[5rem] lg:min-w-0 px-3 py-1 rounded-md shadow transition-all truncate">
                <span>Exit</span>
            </button>
        </div>
    );
};