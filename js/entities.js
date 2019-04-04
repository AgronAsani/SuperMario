import Entity from "../js/Entity.js";
import Jump from '../js/traits/Jump.js';
import Velocity from '../js/traits/Velocity.js';
import {loadMarioSprite} from "../js/sprites.js";



export function createMario() {
    return loadMarioSprite()
        .then(sprite => {


            const mario = new Entity();

            mario.addTrait(new Velocity());
            mario.addTrait(new Jump());

            mario.draw = function drawMario(context) {
                sprite.draw('idle', context, this.pos.x, this.pos.y);
            }


            return mario;
        });
}

