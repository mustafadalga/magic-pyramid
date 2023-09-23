"use client";
import GameOptions from "./GameOptions";
import useGame from "@/_providers/game/useGame";
import GamePyramidContainer from "./GamePyramidContainer";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import "./gameScreenStyle.css"
import { useRef } from "react";

export default function GameScreen() {
    const { gameState: { showGame } } = useGame();
    const nodeRef = useRef<HTMLDivElement | null>(null)
    return (
        <SwitchTransition mode="out-in">
            <CSSTransition
                key={showGame ? 'GamePyramidContainer' : 'GameOptions'}
                nodeRef={nodeRef}
                addEndListener={(done) => {
                    nodeRef.current?.addEventListener("transitionend", done, false);
                }}
                classNames="fade">


                <div ref={nodeRef} className="w-full flex justify-center">
                    {showGame ? <GamePyramidContainer/> : <GameOptions/>}
                </div>
            </CSSTransition>
        </SwitchTransition>
    )
};