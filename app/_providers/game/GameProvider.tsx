"use client";
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { Path, Pyramid } from "@/_types";
import GameContext from "./GameContext";
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
    const [ gamerPath, setGamerPath ] = useState<Path>([]);
    const [ pyramid, setPyramid ] = useState<Pyramid>([]);
    const [ dimension, setDimension ] = useState<number>(initialDimension);
    const [ showGame, setShowGame ] = useState<boolean>(false);

    const newGame = useCallback(() => {
        setPyramid(createPyramid(dimension));
        setGamerPath([])
        setShowGame(true)
    }, [ dimension ]);

    const handleDimension = useCallback((dimension: number) => {
        localStorage.setItem(LOCALSTORAGE_KEY, dimension.toString());
        setDimension(dimension)
    }, []);

    const isGamerPathCompleted = useMemo(() => gamerPath.length == dimension, [ gamerPath, dimension ])
    const isGameWon = useMemo(() => {
        if (!isGamerPathCompleted) return false;

        const solutions = findSolutions(pyramid, dimension);
        return solutions.some(solution => JSON.stringify(solution) == JSON.stringify(gamerPath))
    }, [ pyramid, dimension, gamerPath, isGamerPathCompleted ])

    const checkGameWin = useCallback(() => {
        if (!isGameWon) return;

    }, [ isGameWon ])

    const contextValue = useMemo(() => {
        return {
            showGame,
            pyramid,
            gamerPath,
            dimension,
            setShowGame,
            setPyramid,
            setGamerPath,
            handleDimension,
            newGame
        }

    }, [ showGame, pyramid, gamerPath, dimension, setShowGame, handleDimension, setPyramid, setGamerPath, newGame ]);

    useEffect(() => {
        if (isGamerPathCompleted) {
            checkGameWin();
        }
    }, [ gamerPath, dimension, checkGameWin, isGamerPathCompleted ])

    return (
        <GameContext.Provider value={contextValue}>
            {children}
        </GameContext.Provider>
    );
};