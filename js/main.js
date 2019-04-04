import Compositor from '../js/Compositor.js';
import {loadLevel} from '../js/loader.js';
import {loadBackgroundSprites} from "../js/sprites.js";
import {createBackgroundLayer, createSpriteLayer} from "../js/layers.js";
import {createMario} from "../js/entities.js";
import Timer from "../js/Timer.js";
import Keyboard from "../js/KeyboardState.js";

const input = new Keyboard();
input.addMapping(32,keyState =>{
    console.log(keyState);
});
input.listenTo(window);

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');


Promise.all([
    createMario(),
    loadBackgroundSprites(),
    loadLevel('1-1'),
])
    .then(([mario, backgroundSprites, level]) => {
        const comp = new Compositor();
        const backgroundLayer = createBackgroundLayer(level.backgrounds, backgroundSprites);
        comp.layers.push(backgroundLayer);

        const gravity = 2000;

        mario.pos.set(64, 180);

        const SPACE = 32;
        const input = new Keyboard();
        input.addMapping(SPACE, keyState=>{
            if (keyState){
                mario.jump.start();
            } else {
                mario.jump.cancel();
            }
        })
        input.listenTo(window);

        const spriteLayer = createSpriteLayer(mario);
        comp.layers.push(spriteLayer);

        const timer = new Timer(1 / 60);

        timer.update = function update(deltaTime) {
            mario.update(deltaTime);
            comp.draw(context);
            mario.vel.y += gravity * deltaTime;
        }
        timer.start();
    });
