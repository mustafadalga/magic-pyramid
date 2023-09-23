"use client";
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import GameContext, { GameState } from "./GameContext";
import createPyramid from "@/_utilities/createPyramid";
import findSolutions from "@/_utilities/findSolutions";

const LOCALSTORAGE_KEY = "dimension";


export default function GameProvider({ children }: { children: ReactNode }) {
    const initialDimension = useMemo((): number => {
        const isBrowserEnvironment = (): boolean => typeof window !== 'undefined';

        if (!isBrowserEnvironment()) return 4;

        const storedValue = localStorage.getItem(LOCALSTORAGE_KEY);
        return storedValue ? Number(storedValue) : 4;
    }, []);

    const [ gameState, setGameState ] = useState<GameState>({
        gamerPath: [],
        pyramid: [],
        dimension: initialDimension,
        showGame: false,
        isGameCompleted: true,
        isShowSolution: false,
        isGameWon: false
    });

    const newGame = useCallback(() => {
        setGameState(prevState => ({
            ...prevState,
            pyramid: createPyramid(prevState.dimension),
            showGame: true,
            gamerPath: [],
            isGameWon: false,
            isGameCompleted: false,
            isShowSolution: false,
        }))
    }, []);

    const handleDimension = useCallback((dimension: number) => {
        localStorage.setItem(LOCALSTORAGE_KEY, dimension.toString());
        setGameState(prevState => ({ ...prevState, dimension }))
    }, []);

    const isGamerPathCompleted = useMemo(() => gameState.gamerPath.length == gameState.dimension, [ gameState.gamerPath, gameState.dimension ])
    const isGameWon = useMemo(() => {
        if (!isGamerPathCompleted || gameState.isShowSolution) return false;

        const solutions = findSolutions(gameState.pyramid, gameState.dimension);

        return solutions.some(solution => JSON.stringify(solution) == JSON.stringify(gameState.gamerPath))
    }, [ gameState.pyramid, gameState.isShowSolution, gameState.dimension, gameState.gamerPath, isGamerPathCompleted ])

    const checkGameWin = useCallback(() => {
        if (!isGameWon) return;

        setGameState(prevState => ({ ...prevState, isGameWon: true, isGameCompleted: true }))
    }, [ isGameWon ]);

    const contextValue = useMemo(() => {
        return {
            gameState,
            setGameState,
            handleDimension,
            newGame
        }

    }, [
        gameState,
        setGameState,
        handleDimension,
        newGame ]);

    useEffect(() => {
        if (isGamerPathCompleted) {
            checkGameWin();
        }
    }, [ checkGameWin, isGamerPathCompleted ])

    return (
        <GameContext.Provider value={contextValue}>
            {children}
        </GameContext.Provider>
    );
};