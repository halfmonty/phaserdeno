import { Basic } from './basicgame/main.ts';
import { Blastemup } from './blastemup/main.ts';
import { Dungeon } from './dungeon/main.ts';
import { Fate } from './fate/main.ts';
import { Mars } from './mars/main.ts';
import { pushpull } from './pushpull/main.ts';
import { Runner } from './runner/main.ts';
import { StarShake } from './starshake/main.ts';
import { Wallhammer } from './wallhammer/main.ts';

const urlParams = new URLSearchParams(globalThis.location.search);
const app = document.querySelector<HTMLDivElement>('#app')!;

const Games: Record<string, ()=>void> = {
    basic: Basic,
    runner: Runner,
    pushpull: pushpull,
    mars: Mars,
    wallhammer: Wallhammer,
    starshake: StarShake,
    dungeon: Dungeon,
    blastemup: Blastemup,
    fate: Fate
} as const;


function chooseGame(game: string) {
    app.innerHTML = GameSelector() + '<div id="game-container"></div>';
    Games[game]();
}

function GameSelector(): string {
    let buttons = "";
    Object.keys(Games).forEach( game => {
        buttons += `<button onclick="window.location.href='?game=${game}'">${game}</button>`
    })
    return `
<div style="flex flex-col">
    ${buttons}
</div>
    `
}

(() => {
    if(urlParams.has('game')) {
        const selectedGame = urlParams.get('game')!;
        chooseGame(selectedGame);
    } else {
        chooseGame('basic');
    }
})();