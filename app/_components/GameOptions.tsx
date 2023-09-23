"use client";
import Select from "@/_components/Select";
import useGame from "@/_providers/game/useGame";

interface Level {
    label: number;
    value: number
}

const levelOptions: Level[] = [
    {
        "label": 4,
        "value": 4
    },
    {
        "label": 5,
        "value": 5
    },
    {
        "label": 6,
        "value": 6
    },
    {
        "label": 7,
        "value": 7
    },
    {
        "label": 8,
        "value": 8
    },
    {
        "label": 9,
        "value": 9
    },
    {
        "label": 10,
        "value": 10
    },
    {
        "label": 11,
        "value": 11
    },
    {
        "label": 12,
        "value": 12
    },
    {
        "label": 13,
        "value": 13
    },
    {
        "label": 14,
        "value": 14
    },
    {
        "label": 15,
        "value": 15
    },
]


const GameOptions = () => {
    const { handleDimension, dimension, newGame } = useGame();
    return (
        <section
            className="grid gap-3 w-full max-w-xl p-8 rounded-md transition-all ease-linear shadow-[0px_0px_3px_0px_#a5b4fc] hover:shadow-[0px_0px_6px_0px_#a5b4fc] bg-white">
            <h1 className="text-center text-indigo-600 font-bold text-2xl md:text-3xl xl:text-4xl">Game Options</h1>

            <div className="grid gap-1 w-full">
                <label htmlFor="level"
                       className="font-medium text-xs lg:text-sm xl:text-base text-gray-900">Dimension</label>
                <Select
                    id="level"
                    isClearable={false}
                    onChange={level => handleDimension(level?.value as number)}
                    placeholder="Select Difficulty"
                    options={levelOptions}
                    value={levelOptions.find(option => option.value === dimension)}
                />
            </div>


            <div className="grid mt-10">
                <button
                    onClick={newGame}
                    className="bg-indigo-600 hover:bg-indigo-800 transition-all shadow text-white px-5 py-2 rounded-lg">
                    Play
                </button>
            </div>
        </section>
    );
};

export default GameOptions;