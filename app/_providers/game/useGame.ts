import { useContext } from "react";
import GameContext from "./GameContext";

export default function useGame() {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error('useGame must be used within a GameContext');
    }
    return context;
};
