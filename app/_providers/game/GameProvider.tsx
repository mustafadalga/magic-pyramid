"use client";
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import GameContext, { GameState } from "./GameContext";
import createPyramid from "@/_utilities/createPyramid";
import findSolutions from "@/_utilities/findSolutions";

const LOCALSTORAGE_KEY = "dimension";


/**
 * GameProvider component. Provides game state and utility methods to its children using React context.
 * @param children - React components or elements that will have access to the provided context.
 */
export default function GameProvider({ children }: { children: ReactNode }) {
    /**
     * Determines the initial dimension of the game board.
     * @returns The initial dimension, either from local storage or defaulting to 4.
     */
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

    /**
     * Initiates a new game with a fresh pyramid and resets relevant game states.
     */
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

    /**
     * Handles the change in game dimension and stores it in local storage.
     * @param dimension - The new dimension for the game.
     */
    const handleDimension = useCallback((dimension: number) => {
        localStorage.setItem(LOCALSTORAGE_KEY, dimension.toString());
        setGameState(prevState => ({ ...prevState, dimension }))
    }, []);

    /**
     * Checks if the gamer's path is complete.
     * @returns True if the gamer's path is complete, false otherwise.
     */
    const isGamerPathCompleted = useMemo(() => gameState.gamerPath.length == gameState.dimension, [ gameState.gamerPath, gameState.dimension ])

    /**
     * Determines if the current game is won.
     * @returns True if the game is won, false otherwise.
     */
    const isGameWon = useMemo(() => {
        if (!isGamerPathCompleted || gameState.isShowSolution) return false;

        const solutions = findSolutions(gameState.pyramid, gameState.dimension);

        return solutions.some(solution => JSON.stringify(solution) == JSON.stringify(gameState.gamerPath))
    }, [ gameState.pyramid, gameState.isShowSolution, gameState.dimension, gameState.gamerPath, isGamerPathCompleted ])

    /**
     * Checks if the game is won and updates the game state accordingly.
     */
    const checkGameWin = useCallback(() => {
        if (!isGameWon) return;

        setGameState(prevState => ({ ...prevState, isGameWon: true, isGameCompleted: true }))
    }, [ isGameWon ]);

    /**
     * Constructs the value to be provided to the GameContext.
     * @returns The context value containing the game state and utility functions.
     */
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