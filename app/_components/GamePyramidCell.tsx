import useGame from "@/_providers/game/useGame";
import { memo, useCallback, useMemo } from "react";
import { Position } from "@/_types";

interface Props {
    cell: number,
    position: Position,
}

const GamePyramidCell = ({ cell, position }: Props) => {
    const { gameState, setGameState } = useGame();
    const selectedCellIndex = gameState.gamerPath.findIndex(path => path.position.row == position.row && path.position.col == position.col)
    const hasSelectedCell = selectedCellIndex != -1
    const className = hasSelectedCell ? "!bg-indigo-700 text-white" : "bg-indigo-300 text-gray-900";

    const calculateCellSize = useMemo(() => {
        if (gameState.dimension >= 11) {
            return "w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-[10px] sm:text-xs md:text-sm xl:text-base";
        }
        if (gameState.dimension >= 9) {
            return "w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-[10px] sm:text-xs md:text-sm xl:text-base";
        }

        return "w-10 h-10 lg:w-12 lg:h-12 text-[10px] sm:text-xs md:text-sm xl:text-base";
    }, [ gameState.dimension ]);

    const isValidMove = useCallback((): boolean => {
        if (position.row === 0) return true;
        const prevCell = gameState.gamerPath[position.row - 1];
        if (!prevCell?.position) return false;

        const prevCol = prevCell.position.col;

        return (position.col == prevCol) || (position.col == prevCol + 1);
    }, [ position, gameState.gamerPath ]);

    const handleCellClick = useCallback(() => {
        if (!isValidMove() || gameState.isGameCompleted) return;

        const newPath = gameState.gamerPath.slice(0, position.row)

        if (hasSelectedCell) {
            return setGameState(prevState => ({ ...prevState, gamerPath: newPath }));
        }

        newPath[position.row] = {
            cell,
            position
        };

        setGameState(prevState => ({ ...prevState, gamerPath: newPath }));
    }, [ position, gameState.gamerPath,gameState.isGameCompleted, cell, setGameState, isValidMove, hasSelectedCell ])

    return (
        <div
            onClick={handleCellClick}
            className={`${className} ${calculateCellSize} ${!gameState.isGameCompleted ? "hover:bg-indigo-400 hover:text-gray-200 active:bg-indigo-500 active:text-gray-200" : ""} grid place-items-center rounded-full transition cursor-pointer`}>{cell}</div>
    );
};

export default memo(GamePyramidCell);