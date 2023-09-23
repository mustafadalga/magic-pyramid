"use client";
import GameButtonGroup from "./GameButtonGroup";
import GamePyramid from "./GamePyramid";
import StopWatch from "@/_components/StopWatch";
import useGame from "@/_providers/game/useGame";
import { useEffect, useMemo, useRef, useState } from "react";

export default function GamePyramidContainer() {
    const { gameState } = useGame();
    const [ initialDate, setInitialDate ] = useState<Date>(new Date());
    const previousPyramid = useRef<string | null>(null);
    const memorizePyramid = useMemo(() => JSON.stringify(gameState.pyramid), [ gameState.pyramid ]);

    useEffect(() => {
        if (previousPyramid.current !== memorizePyramid) {
            setInitialDate(new Date());
            previousPyramid.current = memorizePyramid;
        }
    }, [ initialDate, memorizePyramid ]);

    return (
        <div className="grid gap-10 h-full">
            <StopWatch key={initialDate.getTime()}
                       initialDate={initialDate}
                       isTimerRunning={!gameState.isGameCompleted}/>
            <div className="grid gap-10">
                <GamePyramid/>
                <GameButtonGroup/>
            </div>
        </div>
    )
}
