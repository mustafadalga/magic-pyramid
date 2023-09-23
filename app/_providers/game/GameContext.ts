import { createContext, Dispatch, SetStateAction } from "react";
import { Path, Pyramid } from "@/_types";

interface GameContextContextType {
    showGame: boolean;
    pyramid: Pyramid,
    gamerPath: Path,
    dimension: number,
    setShowGame: (showGame: boolean) => void
    handleDimension: (dimension: number) => void,
    setPyramid: (pyramid: Pyramid) => void,
    setGamerPath: Dispatch<SetStateAction<Path>>;
    newGame: () => void,
}

export default createContext<GameContextContextType | null>(null);