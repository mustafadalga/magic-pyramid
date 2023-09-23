import useGame from "@/_providers/game/useGame";
import { memo, useCallback, useMemo } from "react";
import { Position } from "@/_types";

interface Props {
    cell: number,
    position: Position,
}

const GamePyramidCell = ({ cell, position }: Props) => {
    const { gamerPath, dimension, setGamerPath } = useGame();
    const selectedCellIndex = gamerPath.findIndex(path => path.position.row == position.row && path.position.col == position.col)
    const hasSelectedCell = selectedCellIndex != -1
    const className = hasSelectedCell ? "!bg-indigo-700 text-white" : "bg-indigo-300 text-gray-900";

    const calculateCellSize = useMemo(() => {
        if (dimension >= 11) {
            return "w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-[10px] sm:text-xs md:text-sm xl:text-base";
        }
        if (dimension >= 9) {
            return "w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-[10px] sm:text-xs md:text-sm xl:text-base";
        }

        return "w-10 h-10 lg:w-12 lg:h-12 text-[10px] sm:text-xs md:text-sm xl:text-base";
    }, [ dimension ]);

    const isValidMove = useCallback((): boolean => {
        if (position.row === 0) return true;
        const prevCell = gamerPath[position.row - 1];
        if (!prevCell?.position) return false;

        const prevCol = prevCell.position.col;

        return (position.col == prevCol) || (position.col == prevCol + 1);
    }, [ position, gamerPath ]);

    const handleCellClick = useCallback(() => {
        if (!isValidMove()) return;

        const newPath = gamerPath.slice(0, position.row)

        if (hasSelectedCell) {
            return setGamerPath(newPath);
        }

        newPath[position.row] = {
            cell,
            position
        };

        return setGamerPath(newPath);
    }, [ position, gamerPath, cell, setGamerPath, isValidMove, hasSelectedCell ])

    return (
        <div
            onClick={handleCellClick}
            className={`${className} ${calculateCellSize} grid place-items-center rounded-full transition hover:bg-indigo-400 hover:text-gray-200 active:bg-indigo-500 active:text-gray-200 cursor-pointer`}>{cell}</div>
    );
};

export default memo(GamePyramidCell);