import GamePyramidCell from "./GamePyramidCell";
import useGame from "@/_providers/game/useGame";

export default function GamePyramid() {
    const { pyramid } = useGame()
    return (
        <div className="grid">
            {pyramid.map((level, row) => (
                <div key={row} className="flex justify-center">
                    {level.map((cell, col) => (
                        <GamePyramidCell key={`${row}-${col}`} cell={cell} position={{row,col}}/>
                    ))}
                </div>
            ))}
        </div>
    );
};