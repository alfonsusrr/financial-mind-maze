import { GameProvider } from '../components/GameEngine';
import { GameLevel } from '../components/GameLevel';
import { GameHUD } from '../components/GameHUD';

export default function Home() {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <GameProvider>
        <GameHUD />
        <main className="flex-1 flex items-center justify-center bg-slate-50">
          <div className="game-container w-full aspect-video bg-white rounded-lg shadow-md">
            <GameLevel />
          </div>
        </main>
      </GameProvider>
    </div>
  );
}
