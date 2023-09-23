import { createContext, Dispatch, SetStateAction } from "react";
import { Path, Pyramid } from "@/_types";

export interface GameState {
    pyramid: Pyramid,
    gamerPath: Path,
    dimension: number,
    showGame: boolean,
    isGameCompleted: boolean,
    isShowSolution: boolean,
    isGameWon: boolean
}

interface GameContextContextType {
    gameState: GameState;
    handleDimension: (dimension: number) => void,
    setGameState: Dispatch<SetStateAction<GameState>>;
    newGame: () => void,
}

export default createContext<GameContextContextType | null>(null);