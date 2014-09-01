ig.module('game.abilities.flame-thrower')
    .requires(
        'plusplus.abilities.ability-shoot',
        'game.entities.flame'
)
    .defines(function() {

        ig.FlameThrower = ig.AbilityShoot.extend({

            spawningEntity: ig.EntityFlame,

            offsetVelY: 200,
            offsetVelX: 200,
            effects: null

        });

    });