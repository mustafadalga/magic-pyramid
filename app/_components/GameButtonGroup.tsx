import useGame from "@/_providers/game/useGame";
import findSolutions from "@/_utilities/findSolutions";
import { Path } from "@/_types";

export default function GameButtonGroup() {
    const {
        gameState,
        setGameState,
        newGame,
    } = useGame();
    const handleShowSolution = () => {
        if (gameState.isGameCompleted) return;

        const solution = findSolutions(gameState.pyramid, gameState.dimension);
        const firstSolution: Path = solution[0];

        setGameState(prevState => ({
            ...prevState,
            gamerPath: firstSolution,
            isShowSolution: true,
            isGameCompleted: true
        }));

    }
    const handleExit = () => {
        setGameState(prevState => ({ ...prevState, gamerPath: [], pyramid: [], showGame: false }));
    }
    return (
        <div className="grid grid-cols-3 justify-center gap-3">
            <button type="button"
                    onClick={newGame}
                    className="bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 text-white text-center text-xs sm:text-sm gap-3 min-w-[5rem] lg:min-w-0 px-3 py-1.5 rounded-md shadow transition-all truncate">
                <span>New Game</span>
            </button>
            <button type="button"
                    onClick={handleShowSolution}
                    className="bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 text-white text-center text-xs sm:text-sm gap-3 min-w-[5rem] lg:min-w-0 px-3 py-1.5 rounded-md shadow transition-all truncate">
                <span>Show Solution</span>
            </button>
            <button type="button"
                    onClick={handleExit}
                    className="bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 text-white text-center text-xs sm:text-sm gap-3 min-w-[5rem] lg:min-w-0 px-3 py-1.5 rounded-md shadow transition-all truncate">
                <span>Exit</span>
            </button>
        </div>
    );
};