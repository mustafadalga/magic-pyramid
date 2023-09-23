import GameScreen from "@/_components/GameScreen";
import GameProvider from "@/_providers/game/GameProvider";

export default function Home() {
    return (
        <main className="min-h-screen grid place-items-center p-4 lg:p-8">
            <GameProvider>
                <GameScreen/>
            </GameProvider>
        </main>
    )
}
