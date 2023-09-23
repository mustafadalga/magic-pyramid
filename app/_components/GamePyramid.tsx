import GamePyramidCell from "./GamePyramidCell";
import useGame from "@/_providers/game/useGame";
import IconTrophy from "@/_components/icons/IconTrophy";
import { CSSTransition } from 'react-transition-group';
import "./gamePyramid.css"

export default function GamePyramid() {
    const { gameState: { pyramid, isGameWon } } = useGame()
    return (
        <div className="grid relative">
            {pyramid.map((level, row) => (
                <div key={row} className="flex justify-center">
                    {level.map((cell, col) => (
                        <GamePyramidCell key={`${row}-${col}`} cell={cell} position={{ row, col }}/>
                    ))}
                </div>
            ))}

            <CSSTransition
                in={isGameWon}
                timeout={300}
                classNames="trophy"
                unmountOnExit>
                <IconTrophy
                    className="absolute -ml-10 -mt-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 animate-scale text-orange-400"/>
            </CSSTransition>
        </div>
    );
};