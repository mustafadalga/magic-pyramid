"use client";
import GameButtonGroup from "./GameButtonGroup";
import GamePyramid from "./GamePyramid";

export default function GamePyramidContainer() {

    return (
       <div className="grid gap-10">
           <GamePyramid/>
           <GameButtonGroup/>
       </div>
    )
};